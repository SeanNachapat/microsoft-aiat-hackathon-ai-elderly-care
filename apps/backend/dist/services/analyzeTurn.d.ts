import type { TurnAnalysis } from "@healthcare/core";
/**
 * Analyzes an elder's transcript to produce structured emotion + behavior JSON.
 * Uses Gemini to simulate Azure AI Language sentiment analysis.
 */
export declare function analyzeTurn(transcript: string, apiKey: string): Promise<TurnAnalysis>;
//# sourceMappingURL=analyzeTurn.d.ts.map