interface ActionPayload {
    type: string;
    priority: string;
    trigger: string;
    message: string;
    timestamp: string;
}
/**
 * Sends a LINE Flex Message to the caregiver with a full summary of the elder's
 * situation, the detected action, and all relevant context.
 */
export declare function sendLineNotification(action: ActionPayload): Promise<boolean>;
export {};
//# sourceMappingURL=lineNotify.d.ts.map