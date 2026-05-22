"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureRealtimeService = void 0;
const ws_1 = __importDefault(require("ws"));
const logger_1 = __importDefault(require("../middleware/logger"));
const env_1 = require("../config/env");
const sdk = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
const analyzeTurn_1 = require("./analyzeTurn");
const alertRouter_1 = require("./alertRouter");
const crypto_1 = __importDefault(require("crypto"));
const nurseJira_config_selector_1 = require("../config/nurseJira.config.selector");
const elderInfo_json_1 = __importDefault(require("../../../elderly-dashboard/src/data/elderInfo.json"));
class AzureRealtimeService {
    constructor() {
        this.ws = null;
        this.currentTurnText = "";
        if (!env_1.env.AZURE_OPENAI_ENDPOINT || !env_1.env.AZURE_OPENAI_API_KEY || !env_1.env.AZURE_OPENAI_DEPLOYMENT) {
            throw new Error("Azure OpenAI credentials are not fully defined in environment");
        }
    }
    async startSession(socket, _systemInstruction) {
        try {
            const lang = process.env.NURSE_JIRA_LANG ?? 'th';
            const config = (0, nurseJira_config_selector_1.getNurseJiraConfig)(lang);
            const profile = elderInfo_json_1.default;
            const finalInstruction = config.buildPrompt(profile);
            logger_1.default.info(`📝 System prompt built (lang=${lang}, length=${finalInstruction.length} chars)`);
            const url = new URL(env_1.env.AZURE_OPENAI_ENDPOINT);
            const wsUrl = `wss://${url.hostname}/openai/realtime?api-version=2024-10-01-preview&deployment=${env_1.env.AZURE_OPENAI_DEPLOYMENT}`;
            this.ws = new ws_1.default(wsUrl, {
                headers: {
                    'api-key': env_1.env.AZURE_OPENAI_API_KEY
                }
            });
            this.ws.on('open', () => {
                logger_1.default.info(`🎙️ [${socket.id}] Connected to Azure Realtime API`);
                socket.emit("voice:status", "connected");
                // Send session.update immediately
                const sessionUpdate = {
                    type: "session.update",
                    session: {
                        modalities: ["text"],
                        instructions: finalInstruction,
                        temperature: config.temperature,
                        max_response_output_tokens: config.maxResponseTokens,
                        turn_detection: {
                            type: "server_vad",
                            threshold: config.vadThreshold,
                            prefix_padding_ms: config.prefixPaddingMs,
                            silence_duration_ms: config.silenceDurationMs
                        },
                        input_audio_transcription: {
                            model: "whisper-1", // Using whisper-1 as it supports multiple languages, or 'gpt-4o-transcribe' based on snippet
                            language: config.transcriptionLanguage
                        }
                    }
                };
                this.ws?.send(JSON.stringify(sessionUpdate));
            });
            this.ws.on('message', (data) => {
                try {
                    const message = JSON.parse(data.toString());
                    this.handleAzureMessage(message, socket);
                }
                catch (e) {
                    logger_1.default.error(`Error parsing message from Azure: ${e}`);
                }
            });
            this.ws.on('error', (e) => {
                logger_1.default.error(`🎙️ [${socket.id}] Azure Realtime error: ${e.message}`);
                socket.emit("voice:error", e.message || "Azure Realtime error");
            });
            this.ws.on('close', () => {
                logger_1.default.info(`🎙️ [${socket.id}] Azure Realtime session closed`);
                socket.emit("voice:status", "disconnected");
            });
        }
        catch (error) {
            logger_1.default.error(`Failed to start Azure Realtime for ${socket.id}: ${error}`);
            socket.emit("voice:error", "Failed to connect to AI voice service");
        }
    }
    handleAzureMessage(message, socket) {
        switch (message.type) {
            case 'session.created':
                logger_1.default.info(`✅ [${socket.id}] Azure Realtime session created successfully`);
                break;
            case 'session.updated':
                logger_1.default.info(`✅ [${socket.id}] Azure Realtime session config applied`);
                break;
            case 'input_audio_buffer.speech_started':
                this.currentTurnText = "";
                socket.emit("voice:interrupted");
                break;
            case 'conversation.item.input_audio_transcription.completed':
                const transcript = message.transcript?.trim();
                if (transcript) {
                    logger_1.default.info(`🗣️ [Whisper→Model] Elder said: "${transcript}"`);
                    // 1. Push elder transcript to caregiver panel
                    socket.server.to('caregiver-panel').emit('transcript:new', {
                        speaker: 'elder',
                        text: transcript,
                        timestamp: new Date().toISOString()
                    });
                    // 2. Run analysis + distress routing pipeline
                    this.runTurnAnalysis(transcript, socket);
                }
                break;
            case 'response.text.delta':
                if (message.delta) {
                    this.currentTurnText += message.delta;
                    socket.emit("voice:text", message.delta);
                }
                break;
            case 'response.done':
                if (this.currentTurnText.trim().length > 0) {
                    const aiText = this.currentTurnText.trim();
                    logger_1.default.info(`🤖 [Model→TTS] Nurse Jira: "${aiText}"`);
                    // 1. Push AI transcript to caregiver panel
                    socket.server.to('caregiver-panel').emit('transcript:new', {
                        speaker: 'ai',
                        text: aiText,
                        timestamp: new Date().toISOString()
                    });
                    // 2. Synthesize audio via Azure Speech SDK (SSML)
                    this.synthesizeAzureTTS(aiText, socket);
                    this.currentTurnText = "";
                }
                else {
                    socket.emit("voice:turn_complete");
                }
                break;
            case 'error':
                logger_1.default.error(`Azure Realtime API error: ${JSON.stringify(message.error)}`);
                break;
        }
    }
    async runTurnAnalysis(transcript, socket) {
        let analysis;
        try {
            analysis = await (0, analyzeTurn_1.analyzeTurn)(transcript);
        }
        catch (err) {
            logger_1.default.error(`Turn analysis failed: ${err}`);
        }
        // Bulletproof Fallback: Rule-based analysis if Gemini key is missing/failed (Ensures SOS triggers instantly for Hackathon demo!)
        if (!analysis) {
            logger_1.default.info("Using robust fallback rule-based emotion & distress analyzer.");
            const lower = transcript.toLowerCase();
            // ── Keyword detection flags ──
            const pain = lower.includes('pain') || lower.includes('hurt') || lower.includes('ache') || lower.includes('chest') || lower.includes('stomach') || lower.includes('knee');
            const confusion = lower.includes('confused') || lower.includes('where am i') || lower.includes('forget') || lower.includes('lost') || lower.includes('who are you');
            const medication = lower.includes('pill') || lower.includes('med') || lower.includes('skip') || lower.includes('forgot my medicine');
            const isolation = lower.includes('lonely') || lower.includes('alone') || lower.includes('miss') || lower.includes('nobody');
            const emergency = lower.includes('help') || lower.includes('fall') || lower.includes('emergency') || lower.includes('sos') || lower.includes('dying') || lower.includes('ambulance') || lower.includes('doctor');
            const sadness = lower.includes('sad') || lower.includes('cry') || lower.includes('tears') || lower.includes('depressed');
            const anxiety = lower.includes('worried') || lower.includes('anxious') || lower.includes('nervous') || lower.includes('scared') || lower.includes('afraid');
            const anger = lower.includes('angry') || lower.includes('mad') || lower.includes('frustrated') || lower.includes('annoyed') || lower.includes('irritated');
            const hopelessness = lower.includes('no point') || lower.includes('give up') || lower.includes('hopeless') || lower.includes('what\'s the use') || lower.includes('don\'t care');
            const tiredness = lower.includes('tired') || lower.includes('exhausted') || lower.includes('sleepy') || lower.includes('no energy') || lower.includes('fatigue');
            const fear = lower.includes('fear') || lower.includes('terrified') || lower.includes('panic') || lower.includes('nightmare');
            const nostalgia = lower.includes('remember') || lower.includes('used to') || lower.includes('back then') || lower.includes('old days') || lower.includes('when i was');
            const gratitude = lower.includes('thank') || lower.includes('grateful') || lower.includes('appreciate') || lower.includes('bless');
            const happiness = lower.includes('happy') || lower.includes('glad') || lower.includes('wonderful') || lower.includes('great') || lower.includes('good day') || lower.includes('love');
            // ── Priority-based emotion detection (most urgent first) ──
            let detectedEmotion = 'calm';
            if (emergency)
                detectedEmotion = 'distressed';
            else if (hopelessness)
                detectedEmotion = 'hopeless';
            else if (pain)
                detectedEmotion = 'pain';
            else if (fear)
                detectedEmotion = 'fearful';
            else if (confusion)
                detectedEmotion = 'confused';
            else if (anger)
                detectedEmotion = 'angry';
            else if (anxiety)
                detectedEmotion = 'anxious';
            else if (sadness)
                detectedEmotion = 'sad';
            else if (isolation)
                detectedEmotion = 'lonely';
            else if (tiredness)
                detectedEmotion = 'tired';
            else if (nostalgia)
                detectedEmotion = 'nostalgic';
            else if (gratitude)
                detectedEmotion = 'grateful';
            else if (happiness)
                detectedEmotion = 'happy';
            const urgency = emergency || hopelessness ? 'critical' : (pain || fear ? 'high' : (confusion || isolation || anger || anxiety || sadness ? 'medium' : 'low'));
            analysis = {
                turn_id: crypto_1.default.randomUUID ? crypto_1.default.randomUUID() : Math.random().toString(36).substring(2, 15),
                timestamp: new Date().toISOString(),
                transcript,
                needs_analysis: {
                    primary_need: emergency ? 'safety' : (pain ? 'medical' : (isolation ? 'social_connection' : 'emotional')),
                    urgency
                },
                emotion: {
                    detected: detectedEmotion,
                    confidence: 0.9,
                    valence: detectedEmotion === 'calm' ? 0.3 : -0.6,
                    arousal: emergency ? 0.9 : 0.4,
                    speech_pace: emergency ? 'fast' : 'normal',
                    voice_energy: emergency ? 'high' : 'normal'
                },
                behavior_flags: {
                    isolation_signal: isolation,
                    pain_mentioned: pain,
                    confusion_detected: confusion,
                    medication_skipped: medication,
                    fall_risk_mention: lower.includes('fall') || lower.includes('dropped'),
                    emergency_detected: emergency
                },
                recommended_actions: []
            };
        }
        // Broadcast emotion analysis to caregiver panel
        socket.server.to('caregiver-panel').emit('analysis:new', analysis);
        // Evaluate actions and trigger auto-alerts (action:sos, action:call_caregiver, etc.)
        (0, alertRouter_1.evaluateActions)(analysis, (action, payload) => {
            logger_1.default.info(`🚨 Dispatching Caregiver Action: ${action}`);
            socket.server.to('caregiver-panel').emit(action, payload);
        });
    }
    synthesizeAzureTTS(text, socket) {
        if (!env_1.env.AZURE_SPEECH_KEY || !env_1.env.AZURE_SPEECH_REGION) {
            logger_1.default.error("Azure Speech config missing. Cannot synthesize TTS.");
            socket.emit("voice:turn_complete");
            return;
        }
        const lang = process.env.NURSE_JIRA_LANG ?? 'th';
        const config = (0, nurseJira_config_selector_1.getNurseJiraConfig)(lang);
        const speechConfig = sdk.SpeechConfig.fromSubscription(env_1.env.AZURE_SPEECH_KEY, env_1.env.AZURE_SPEECH_REGION);
        speechConfig.speechSynthesisVoiceName = config.speechVoice;
        speechConfig.speechSynthesisOutputFormat =
            sdk.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm;
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
        const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${config.ssmlLang}">
        <voice name="${config.speechVoice}">
          <prosody rate="${config.prosodyRate}" pitch="${config.prosodyPitch}">
            ${safeText}
          </prosody>
        </voice>
      </speak>`;
        synthesizer.speakSsmlAsync(ssml, (result) => {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                const audioData = result.audioData;
                if (audioData) {
                    const buffer = Buffer.from(audioData);
                    const base64Audio = buffer.toString('base64');
                    socket.emit("voice:audio", base64Audio);
                }
            }
            else {
                logger_1.default.error(`Azure TTS failed. Reason: ${result.reason}`);
            }
            socket.emit("voice:turn_complete");
            synthesizer.close();
        }, (error) => {
            logger_1.default.error(`Azure TTS error: ${error}`);
            socket.emit("voice:turn_complete");
            synthesizer.close();
        });
    }
    sendAudio(base64Data) {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            try {
                const message = {
                    type: "input_audio_buffer.append",
                    audio: base64Data
                };
                this.ws.send(JSON.stringify(message));
            }
            catch (err) {
                logger_1.default.error(`Error sending audio to Azure Realtime: ${err}`);
            }
        }
    }
    stopSession() {
        if (this.ws) {
            try {
                this.ws.close();
            }
            catch (e) { }
            this.ws = null;
        }
    }
}
exports.AzureRealtimeService = AzureRealtimeService;
//# sourceMappingURL=azureRealtime.js.map