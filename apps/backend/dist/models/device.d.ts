export type DeviceType = 'watch' | 'wifi' | 'pad' | 'bed';
export type DeviceStatus = 'online' | 'offline' | 'warning';
export interface Device {
    id: string;
    patientId: string;
    name: string;
    type: DeviceType;
    batteryLevel: number;
    signalStrength: number;
    status: DeviceStatus;
    firmware: string;
    lastSeen: string;
    registeredAt: string;
    telemetry?: {
        temperature?: number;
        humidity?: number;
        accelerometer?: {
            x: number;
            y: number;
            z: number;
        };
    };
}
//# sourceMappingURL=device.d.ts.map