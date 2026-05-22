import type { TurnAnalysis } from "@healthcare/core";
/**
 * Analyzes an elder's transcript to produce structured emotion + behavior JSON.
 * Uses Azure OpenAI (gpt-4o-mini) for highly accurate emotion detection, including Thai support.
 */
export declare function analyzeTurn(transcript: string): Promise<TurnAnalysis>;
//# sourceMappingURL=analyzeTurn.d.ts.map