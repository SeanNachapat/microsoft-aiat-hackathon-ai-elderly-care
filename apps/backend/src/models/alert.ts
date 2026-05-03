// ─── Alert Model ──────────────────────────────────────────────────────────────

export type AlertSeverity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved';

export interface Alert {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description: string;
  severity: AlertSeverity;
  status: AlertStatus;
  triggeredAt: string;
  acknowledgedAt?: string;
  acknowledgedBy?: string;
  resolvedAt?: string;
  source: 'iot' | 'ai' | 'manual';
  metadata?: Record<string, unknown>;
}

export interface AcknowledgeAlertRequest {
  acknowledgedBy: string;
}
