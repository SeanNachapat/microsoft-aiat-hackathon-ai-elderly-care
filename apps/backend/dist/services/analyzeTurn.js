"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeTurn = analyzeTurn;
const logger_1 = __importDefault(require("../middleware/logger"));
const env_1 = require("../config/env");
const crypto_1 = __importDefault(require("crypto"));
/**
 * Analyzes an elder's transcript to produce structured emotion + behavior JSON.
 * Uses Azure OpenAI (gpt-4o-mini) for highly accurate emotion detection, including Thai support.
 */
async function analyzeTurn(transcript) {
    if (!env_1.env.AZURE_OPENAI_ENDPOINT || !env_1.env.AZURE_OPENAI_API_KEY) {
        throw new Error("Azure OpenAI credentials are not fully defined in environment");
    }
    const url = new URL(env_1.env.AZURE_OPENAI_ENDPOINT);
    // Default to gpt-4o-mini for fast, accurate emotion analysis
    const deploymentName = 'gpt-4o-mini';
    const apiUrl = `https://${url.hostname}/openai/deployments/${deploymentName}/chat/completions?api-version=2024-02-01`;
    const systemPrompt = `You are an expert clinical sentiment analyzer.
Analyze the following elderly person's speech transcript. The user might speak in Thai or English.
Return ONLY a valid JSON object matching this exact schema (no markdown, no code fences):

{
  "turn_id": "unique-uuid",
  "timestamp": "ISO8601 now",
  "transcript": "the original transcript",
  "needs_analysis": {
    "primary_need": "social_connection | medical | safety | emotional | daily_living",
    "urgency": "low | medium | high | critical"
  },
  "emotion": {
    "detected": "calm | happy | grateful | content | lonely | anxious | sad | frustrated | fearful | nostalgic | pain | confused | distressed | angry | hopeless | tired",
    "confidence": 0.0-1.0,
    "valence": -1.0 to 1.0,
    "arousal": 0.0 to 1.0,
    "speech_pace": "slow | normal | fast",
    "voice_energy": "low | normal | high"
  },
  "behavior_flags": {
    "isolation_signal": boolean,
    "pain_mentioned": boolean,
    "confusion_detected": boolean,
    "medication_skipped": boolean,
    "fall_risk_mention": boolean,
    "emergency_detected": boolean
  },
  "recommended_actions": [
    {
      "type": "notify_family | call_caregiver | schedule_followup | sos | medication_reminder",
      "priority": "low | medium | high | critical",
      "trigger": "auto | manual",
      "message": "Plain English description"
    }
  ]
}

Very Important: If the user says things like "เจ็บเข่า" (knee pain) or "เหงา" (lonely), make sure the "emotion.detected" strongly reflects this (e.g. "pain" or "lonely"). Never default to "calm" if distress words are present!`;
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': env_1.env.AZURE_OPENAI_API_KEY
            },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: `Transcript: "${transcript}"` }
                ],
                temperature: 0.2, // Low temp for consistent JSON output
                response_format: { type: "json_object" }
            })
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Azure API error: ${response.status} ${errorText}`);
        }
        const data = await response.json();
        let text = data.choices[0].message.content.trim();
        // Strip markdown code fences if present
        if (text.startsWith("```")) {
            text = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        }
        const analysis = JSON.parse(text);
        // Ensure we have a UUID and timestamp
        if (!analysis.turn_id || analysis.turn_id === 'unique-uuid')
            analysis.turn_id = crypto_1.default.randomUUID();
        if (!analysis.timestamp || analysis.timestamp === 'ISO8601 now')
            analysis.timestamp = new Date().toISOString();
        // Override transcript to exactly match the input
        analysis.transcript = transcript;
        return analysis;
    }
    catch (error) {
        logger_1.default.error(`Turn analysis failed: ${error}`);
        // Return safe default so the backend doesn't crash, but it won't trigger false positives
        return {
            turn_id: crypto_1.default.randomUUID(),
            timestamp: new Date().toISOString(),
            transcript,
            needs_analysis: { primary_need: 'emotional', urgency: 'low' },
            emotion: { detected: 'calm', confidence: 0.5, valence: 0, arousal: 0.3, speech_pace: 'normal', voice_energy: 'normal' },
            behavior_flags: { isolation_signal: false, pain_mentioned: false, confusion_detected: false, medication_skipped: false, fall_risk_mention: false, emergency_detected: false },
            recommended_actions: [],
        };
    }
}
//# sourceMappingURL=analyzeTurn.js.map