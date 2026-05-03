import { Server as SocketIOServer } from 'socket.io';
import { patientsStore, updatePatientVitals } from './patients';
import logger from '../middleware/logger';

// ─── Vital Sign Simulator ─────────────────────────────────────────────────────
// Generates realistic fluctuations every interval, mimicking IoT Hub telemetry.

let simulatorInterval: ReturnType<typeof setInterval> | null = null;

/** Clamp a number between min and max */
const clamp = (val: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, val));

/** Return a random float jitter within ±range */
const jitter = (current: number, range: number, decimals = 0): number => {
  const delta = (Math.random() - 0.5) * 2 * range;
  const result = current + delta;
  return decimals > 0
    ? parseFloat(result.toFixed(decimals))
    : Math.round(result);
};

/** Parse "sys/dia" blood pressure string, jitter, return new string */
const jitterBP = (bp: string): string => {
  const [sys, dia] = bp.split('/').map(Number);
  const newSys = clamp(jitter(sys, 4), 90, 200);
  const newDia = clamp(jitter(dia, 3), 50, 130);
  return `${newSys}/${newDia}`;
};

/** Determine if a patient should have a critical alert label */
const computeAlertLabel = (spo2: number, hr: number): { type: 'critical' | 'warning'; count: number; label: string }[] => {
  if (spo2 < 93 || hr > 110 || hr < 50) {
    return [{ type: 'critical', count: 1, label: 'วิกฤต' }];
  }
  if (spo2 < 95 || hr > 100 || hr < 55) {
    return [{ type: 'warning', count: 1, label: 'เตือน' }];
  }
  return [];
};

export const startSimulator = (io: SocketIOServer, intervalMs: number): void => {
  if (simulatorInterval) return; // already running

  logger.info(`🔬 Mock IoT simulator started — interval: ${intervalMs}ms`);

  simulatorInterval = setInterval(() => {
    patientsStore.forEach((patient) => {
      // Simulate realistic vital fluctuations
      const newHr = clamp(jitter(patient.detail.vitals.hr, 3), 45, 130);
      const newSpo2 = clamp(jitter(patient.detail.vitals.spo2, 1), 82, 100);
      const newBp = jitterBP(patient.detail.vitals.bp);
      const newTemp = clamp(jitter(patient.detail.vitals.temp, 0.1, 1), 35.0, 39.5);
      const newMovement = clamp(jitter(patient.detail.vitals.movement, 5), 0, 100);

      const updatedPatient = updatePatientVitals(patient.id, {
        hr: newHr,
        spo2: newSpo2,
        bp: newBp,
        temp: newTemp,
        movement: newMovement,
      });

      if (!updatedPatient) return;

      // Recompute top-level alert badges
      updatedPatient.alerts = computeAlertLabel(newSpo2, newHr);

      // Emit per-patient vitals update event
      const payload = {
        patientId: patient.id,
        vitals: updatedPatient.detail.vitals,
        hr: newHr,
        spo2: newSpo2,
        bp: newBp,
        risk: updatedPatient.risk,
        alerts: updatedPatient.alerts,
        timestamp: new Date().toISOString(),
      };

      io.emit('patient:vitals-update', payload);

      // Trigger alert event if vitals cross thresholds
      if (newSpo2 < 93) {
        io.emit('patient:alert-triggered', {
          patientId: patient.id,
          patientName: patient.name,
          title: `SpO2 ต่ำวิกฤต ${newSpo2}%`,
          severity: 'critical',
          timestamp: new Date().toISOString(),
        });
      } else if (newHr > 110) {
        io.emit('patient:alert-triggered', {
          patientId: patient.id,
          patientName: patient.name,
          title: `อัตราการเต้นหัวใจสูง ${newHr} bpm`,
          severity: 'warning',
          timestamp: new Date().toISOString(),
        });
      }
    });

    // Emit a global system tick so dashboards can show "last updated"
    io.emit('system:tick', { timestamp: new Date().toISOString() });
  }, intervalMs);
};

export const stopSimulator = (): void => {
  if (simulatorInterval) {
    clearInterval(simulatorInterval);
    simulatorInterval = null;
    logger.info('🛑 Mock IoT simulator stopped');
  }
};
