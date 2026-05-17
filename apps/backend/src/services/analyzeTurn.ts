import { GoogleGenerativeAI } from "@google/generative-ai";
import type { TurnAnalysis } from "@healthcare/core";
import logger from "../middleware/logger";

/**
 * Analyzes an elder's transcript to produce structured emotion + behavior JSON.
 * Uses Gemini to simulate Azure AI Language sentiment analysis.
 */
export async function analyzeTurn(
  transcript: string,
  apiKey: string
): Promise<TurnAnalysis> {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze the following elderly person's speech transcript.
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

Transcript: "${transcript}"`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Strip markdown code fences if present
    if (text.startsWith("```")) {
      text = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
    }

    const analysis: TurnAnalysis = JSON.parse(text);
    return analysis;
  } catch (error) {
    logger.error(`Turn analysis failed: ${error}`);
    // Return safe default
    return {
      turn_id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      transcript,
      needs_analysis: { primary_need: 'emotional', urgency: 'low' },
      emotion: { detected: 'calm', confidence: 0.5, valence: 0, arousal: 0.3, speech_pace: 'normal', voice_energy: 'normal' },
      behavior_flags: { isolation_signal: false, pain_mentioned: false, confusion_detected: false, medication_skipped: false, fall_risk_mention: false, emergency_detected: false },
      recommended_actions: [],
    };
  }
}
