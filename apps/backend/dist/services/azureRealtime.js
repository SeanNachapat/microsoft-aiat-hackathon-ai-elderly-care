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
class AzureRealtimeService {
    constructor() {
        this.ws = null;
        this.currentTurnText = "";
        if (!env_1.env.AZURE_OPENAI_ENDPOINT || !env_1.env.AZURE_OPENAI_API_KEY || !env_1.env.AZURE_OPENAI_DEPLOYMENT) {
            throw new Error("Azure OpenAI credentials are not fully defined in environment");
        }
    }
    async startSession(socket, systemInstruction) {
        try {
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
                        instructions: systemInstruction,
                        temperature: 0.7,
                        max_response_output_tokens: 150,
                        turn_detection: {
                            type: "server_vad",
                            threshold: 0.35,
                            prefix_padding_ms: 400,
                            silence_duration_ms: 900
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
            case 'input_audio_buffer.speech_started':
                this.currentTurnText = "";
                socket.emit("voice:interrupted");
                break;
            case 'response.text.delta':
                if (message.delta) {
                    this.currentTurnText += message.delta;
                    socket.emit("voice:text", message.delta);
                }
                break;
            case 'response.done':
                if (this.currentTurnText.trim().length > 0) {
                    this.synthesizeAzureTTS(this.currentTurnText.trim(), socket);
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