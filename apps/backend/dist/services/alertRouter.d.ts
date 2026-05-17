import type { TurnAnalysis } from "@healthcare/core";
/**
 * Evaluates behavior_flags from turn analysis and auto-triggers actions.
 * In production, this would call Azure Communication Services.
 * For hackathon demo, we log + emit socket events.
 */
export declare function evaluateActions(analysis: TurnAnalysis, emitAction: (action: string, data: any) => void): void;
//# sourceMappingURL=alertRouter.d.ts.map