// ─── Device Model ─────────────────────────────────────────────────────────────

export type DeviceType = 'watch' | 'wifi' | 'pad' | 'bed';
export type DeviceStatus = 'online' | 'offline' | 'warning';

export interface Device {
  id: string;
  patientId: string;
  name: string;
  type: DeviceType;
  batteryLevel: number;   // 0-100
  signalStrength: number; // 0-100
  status: DeviceStatus;
  firmware: string;
  lastSeen: string;
  registeredAt: string;
  telemetry?: {
    temperature?: number;
    humidity?: number;
    accelerometer?: { x: number; y: number; z: number };
  };
}
