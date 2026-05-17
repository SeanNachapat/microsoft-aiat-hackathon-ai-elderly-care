import { Socket } from "socket.io";
export declare class AzureRealtimeService {
    private ws;
    private currentTurnText;
    constructor();
    startSession(socket: Socket, systemInstruction: string): Promise<void>;
    private handleAzureMessage;
    private synthesizeAzureTTS;
    sendAudio(base64Data: string): void;
    stopSession(): void;
}
//# sourceMappingURL=azureRealtime.d.ts.map