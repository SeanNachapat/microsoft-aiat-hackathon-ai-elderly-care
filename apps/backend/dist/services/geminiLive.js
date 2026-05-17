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
exports.GeminiLiveService = void 0;
const generative_ai_1 = require("@google/generative-ai");
const logger_1 = __importDefault(require("../middleware/logger"));
const env_1 = require("../config/env");
const sdk = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
class GeminiLiveService {
    constructor() {
        this.currentTurnText = "";
        if (!env_1.env.GOOGLE_AI_API_KEY) {
            throw new Error("GOOGLE_AI_API_KEY is not defined in environment");
        }
        this.genAI = new generative_ai_1.GoogleGenerativeAI(env_1.env.GOOGLE_AI_API_KEY);
    }
    async startSession(socket, systemInstruction) {
        try {
            // @ts-ignore - Using Multimodal Live API logic from user's repo
            // Note: The specific SDK structure for .live.connect is based on the user's reference implementation
            const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
            // Using the pattern identified in SeanNachapat/Mist-Gemini-Live-Agent-Challenge-2026
            // @ts-ignore
            this.session = await this.genAI.live.connect({
                model: "gemini-2.0-flash-exp",
                config: {
                    system_instruction: { parts: [{ text: systemInstruction }] },
                    generation_config: {
                        response_modalities: ["text"],
                    }
                },
                callbacks: {
                    onopen: () => {
                        logger_1.default.info(`🎙️ [${socket.id}] Connected to Gemini Live API`);
                        socket.emit("voice:status", "connected");
                    },
                    onmessage: (message) => {
                        this.handleGeminiMessage(message, socket);
                    },
                    onerror: (e) => {
                        logger_1.default.error(`🎙️ [${socket.id}] Gemini Live error: ${e.message}`);
                        socket.emit("voice:error", e.message || "Gemini Live error");
                    },
                    onclose: () => {
                        logger_1.default.info(`🎙️ [${socket.id}] Gemini Live session closed`);
                        socket.emit("voice:status", "disconnected");
                    }
                }
            });
        }
        catch (error) {
            logger_1.default.error(`Failed to start Gemini Live for ${socket.id}: ${error}`);
            socket.emit("voice:error", "Failed to connect to AI voice service");
        }
    }
    handleGeminiMessage(message, socket) {
        // 1. Handle Interruptions (User speaking over AI)
        if (message.serverContent?.interrupted) {
            this.currentTurnText = "";
            socket.emit("voice:interrupted");
            return;
        }
        // 2. Process Model Turn (Audio & Text)
        if (message.serverContent?.modelTurn?.parts) {
            for (const part of message.serverContent.modelTurn.parts) {
                // Send Audio Data back to frontend (only if fallback to Gemini audio)
                if (part.inlineData?.data) {
                    socket.emit("voice:audio", part.inlineData.data);
                }
                // Extract and Parse Text (transcripts)
                if (part.text) {
                    this.currentTurnText += part.text;
                    socket.emit("voice:text", part.text);
                }
            }
        }
        // 3. Turn Complete
        if (message.serverContent?.turnComplete) {
            if (this.currentTurnText.trim().length > 0) {
                this.synthesizeAzureTTS(this.currentTurnText.trim(), socket);
                this.currentTurnText = "";
            }
            else {
                socket.emit("voice:turn_complete");
            }
        }
    }
    synthesizeAzureTTS(text, socket) {
        if (!env_1.env.AZURE_SPEECH_KEY || !env_1.env.AZURE_SPEECH_REGION) {
            logger_1.default.error("Azure Speech config missing. Cannot synthesize TTS.");
            socket.emit("voice:turn_complete");
            return;
        }
        const speechConfig = sdk.SpeechConfig.fromSubscription(env_1.env.AZURE_SPEECH_KEY, env_1.env.AZURE_SPEECH_REGION);
        // Match frontend's 24kHz 16-bit PCM Mono expectation
        speechConfig.speechSynthesisOutputFormat =
            sdk.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm;
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig);
        // Escape special characters for SSML
        const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="en-US-JennyNeural">
          <prosody rate="-15%" pitch="-5%">
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
        if (this.session) {
            try {
                this.session.sendRealtimeInput({
                    audio: {
                        data: base64Data,
                        mimeType: "audio/pcm;rate=16000",
                    },
                });
            }
            catch (err) {
                logger_1.default.error(`Error sending audio to Gemini: ${err}`);
            }
        }
    }
    stopSession() {
        if (this.session) {
            try {
                this.session.disconnect();
            }
            catch (e) { }
            this.session = null;
        }
    }
}
exports.GeminiLiveService = GeminiLiveService;
//# sourceMappingURL=geminiLive.js.map