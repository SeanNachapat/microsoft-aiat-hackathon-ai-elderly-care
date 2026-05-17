import { Socket } from "socket.io";
export declare class GeminiLiveService {
    private genAI;
    private session;
    private currentTurnText;
    constructor();
    startSession(socket: Socket, systemInstruction: string): Promise<void>;
    private handleGeminiMessage;
    private synthesizeAzureTTS;
    sendAudio(base64Data: string): void;
    stopSession(): void;
}
//# sourceMappingURL=geminiLive.d.ts.map