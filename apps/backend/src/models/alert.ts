import { Alert, AlertSeverity, AlertStatus } from '@healthcare/core';

export { Alert, AlertSeverity, AlertStatus };

export interface AcknowledgeAlertRequest {
  acknowledgedBy: string;
}
