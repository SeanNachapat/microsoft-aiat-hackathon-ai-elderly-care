import WebSocket from 'ws';
import { Socket } from "socket.io";
import logger from "../middleware/logger";
import { env } from "../config/env";
import * as sdk from 'microsoft-cognitiveservices-speech-sdk';
import { analyzeTurn } from './analyzeTurn';
import { evaluateActions } from './alertRouter';
import crypto from 'crypto';

export class AzureRealtimeService {
  private ws: WebSocket | null = null;
  private currentTurnText: string = "";

  constructor() {
    if (!env.AZURE_OPENAI_ENDPOINT || !env.AZURE_OPENAI_API_KEY || !env.AZURE_OPENAI_DEPLOYMENT) {
      throw new Error("Azure OpenAI credentials are not fully defined in environment");
    }
  }

  async startSession(socket: Socket, systemInstruction: string) {
    try {
      const url = new URL(env.AZURE_OPENAI_ENDPOINT!);
      const wsUrl = `wss://${url.hostname}/openai/realtime?api-version=2024-10-01-preview&deployment=${env.AZURE_OPENAI_DEPLOYMENT}`;
      
      this.ws = new WebSocket(wsUrl, {
        headers: {
          'api-key': env.AZURE_OPENAI_API_KEY!
        }
      });

      this.ws.on('open', () => {
        logger.info(`🎙️ [${socket.id}] Connected to Azure Realtime API`);
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
            },
            input_audio_transcription: {
              model: "whisper-1"
            }
          }
        };
        this.ws?.send(JSON.stringify(sessionUpdate));
      });

      this.ws.on('message', (data) => {
        try {
          const message = JSON.parse(data.toString());
          this.handleAzureMessage(message, socket);
        } catch (e) {
          logger.error(`Error parsing message from Azure: ${e}`);
        }
      });

      this.ws.on('error', (e) => {
        logger.error(`🎙️ [${socket.id}] Azure Realtime error: ${e.message}`);
        socket.emit("voice:error", e.message || "Azure Realtime error");
      });

      this.ws.on('close', () => {
        logger.info(`🎙️ [${socket.id}] Azure Realtime session closed`);
        socket.emit("voice:status", "disconnected");
      });

    } catch (error) {
      logger.error(`Failed to start Azure Realtime for ${socket.id}: ${error}`);
      socket.emit("voice:error", "Failed to connect to AI voice service");
    }
  }

  private handleAzureMessage(message: any, socket: Socket) {
    switch (message.type) {
      case 'input_audio_buffer.speech_started':
        this.currentTurnText = "";
        socket.emit("voice:interrupted");
        break;

      case 'conversation.item.input_audio_transcription.completed':
        const transcript = message.transcript?.trim();
        if (transcript) {
          logger.info(`🗣️ [Whisper] Elder transcript: "${transcript}"`);
          
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
          
          // 1. Push AI transcript to caregiver panel
          socket.server.to('caregiver-panel').emit('transcript:new', {
            speaker: 'ai',
            text: aiText,
            timestamp: new Date().toISOString()
          });

          // 2. Synthesize audio via Azure Speech SDK (SSML)
          this.synthesizeAzureTTS(aiText, socket);
          this.currentTurnText = "";
        } else {
          socket.emit("voice:turn_complete");
        }
        break;
        
      case 'error':
        logger.error(`Azure Realtime API error: ${JSON.stringify(message.error)}`);
        break;
    }
  }

  private async runTurnAnalysis(transcript: string, socket: Socket) {
    const hasGoogleKey = env.GOOGLE_AI_API_KEY && env.GOOGLE_AI_API_KEY !== 'your-google-ai-key-here';
    
    let analysis;
    if (hasGoogleKey) {
      try {
        analysis = await analyzeTurn(transcript, env.GOOGLE_AI_API_KEY!);
      } catch (err) {
        logger.error(`Gemini turn analysis failed: ${err}`);
      }
    }

    // Bulletproof Fallback: Rule-based analysis if Gemini key is missing/failed (Ensures SOS triggers instantly for Hackathon demo!)
    if (!analysis) {
      logger.info("Using robust fallback rule-based emotion & distress analyzer.");
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
      let detectedEmotion: string = 'calm';
      if (emergency) detectedEmotion = 'distressed';
      else if (hopelessness) detectedEmotion = 'hopeless';
      else if (pain) detectedEmotion = 'pain';
      else if (fear) detectedEmotion = 'fearful';
      else if (confusion) detectedEmotion = 'confused';
      else if (anger) detectedEmotion = 'angry';
      else if (anxiety) detectedEmotion = 'anxious';
      else if (sadness) detectedEmotion = 'sad';
      else if (isolation) detectedEmotion = 'lonely';
      else if (tiredness) detectedEmotion = 'tired';
      else if (nostalgia) detectedEmotion = 'nostalgic';
      else if (gratitude) detectedEmotion = 'grateful';
      else if (happiness) detectedEmotion = 'happy';

      const urgency = emergency || hopelessness ? 'critical' : (pain || fear ? 'high' : (confusion || isolation || anger || anxiety || sadness ? 'medium' : 'low'));

      analysis = {
        turn_id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 15),
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
    evaluateActions(analysis, (action, payload) => {
      logger.info(`🚨 Dispatching Caregiver Action: ${action}`);
      socket.server.to('caregiver-panel').emit(action, payload);
    });
  }

  private synthesizeAzureTTS(text: string, socket: Socket) {
    if (!env.AZURE_SPEECH_KEY || !env.AZURE_SPEECH_REGION) {
      logger.error("Azure Speech config missing. Cannot synthesize TTS.");
      socket.emit("voice:turn_complete");
      return;
    }

    const speechConfig = sdk.SpeechConfig.fromSubscription(
      env.AZURE_SPEECH_KEY,
      env.AZURE_SPEECH_REGION
    );

    speechConfig.speechSynthesisOutputFormat =
      sdk.SpeechSynthesisOutputFormat.Raw24Khz16BitMonoPcm;

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    const safeText = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const ssml = `
      <speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
        <voice name="en-US-JennyNeural">
          <prosody rate="-15%" pitch="-5%">
            ${safeText}
          </prosody>
        </voice>
      </speak>`;

    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          const audioData = result.audioData;
          if (audioData) {
            const buffer = Buffer.from(audioData);
            const base64Audio = buffer.toString('base64');
            socket.emit("voice:audio", base64Audio);
          }
        } else {
          logger.error(`Azure TTS failed. Reason: ${result.reason}`);
        }
        socket.emit("voice:turn_complete");
        synthesizer.close();
      },
      (error) => {
        logger.error(`Azure TTS error: ${error}`);
        socket.emit("voice:turn_complete");
        synthesizer.close();
      }
    );
  }

  sendAudio(base64Data: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        const message = {
          type: "input_audio_buffer.append",
          audio: base64Data
        };
        this.ws.send(JSON.stringify(message));
      } catch (err) {
        logger.error(`Error sending audio to Azure Realtime: ${err}`);
      }
    }
  }

  stopSession() {
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }
  }
}
