import type { TurnAnalysis } from "@healthcare/core";
/**
 * Evaluates behavior_flags from turn analysis and auto-triggers actions.
 * Each action is emitted to the caregiver dashboard via socket AND
 * pushed to the caregiver's LINE account as a rich Flex Message.
 */
export declare function evaluateActions(analysis: TurnAnalysis, emitAction: (action: string, data: any) => void): void;
//# sourceMappingURL=alertRouter.d.ts.map