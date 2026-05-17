import logger from "../middleware/logger";
import type { TurnAnalysis } from "@healthcare/core";

/**
 * Evaluates behavior_flags from turn analysis and auto-triggers actions.
 * In production, this would call Azure Communication Services.
 * For hackathon demo, we log + emit socket events.
 */
export function evaluateActions(
  analysis: TurnAnalysis,
  emitAction: (action: string, data: any) => void
) {
  const { behavior_flags, needs_analysis, emotion } = analysis;

  // 1. Emergency SOS — highest priority
  if (behavior_flags.emergency_detected || needs_analysis.urgency === 'critical') {
    logger.warn(`🚨 EMERGENCY DETECTED for transcript: "${analysis.transcript}"`);
    emitAction('action:sos', {
      type: 'sos',
      priority: 'critical',
      trigger: 'auto',
      message: `Emergency detected: "${analysis.transcript}"`,
      timestamp: new Date().toISOString()
    });
  }

  // 2. Isolation / Loneliness alert to family
  if (behavior_flags.isolation_signal && emotion.confidence > 0.75) {
    logger.info(`📱 Auto-alert: Isolation signal detected`);
    emitAction('action:notify_family', {
      type: 'notify_family',
      priority: 'medium',
      trigger: 'auto',
      message: `Somsri may be feeling lonely. Transcript: "${analysis.transcript}"`,
      timestamp: new Date().toISOString()
    });
  }

  // 3. Pain mentioned
  if (behavior_flags.pain_mentioned) {
    logger.info(`🩺 Auto-alert: Pain mentioned`);
    emitAction('action:call_caregiver', {
      type: 'call_caregiver',
      priority: 'high',
      trigger: 'auto',
      message: `Pain mentioned by elder: "${analysis.transcript}"`,
      timestamp: new Date().toISOString()
    });
  }

  // 4. Confusion detected
  if (behavior_flags.confusion_detected) {
    logger.info(`🧠 Auto-alert: Confusion detected`);
    emitAction('action:schedule_followup', {
      type: 'schedule_followup',
      priority: 'medium',
      trigger: 'auto',
      message: `Confusion detected. Consider cognitive check.`,
      timestamp: new Date().toISOString()
    });
  }

  // 5. Medication skip
  if (behavior_flags.medication_skipped) {
    logger.info(`💊 Auto-alert: Medication may have been skipped`);
    emitAction('action:medication_reminder', {
      type: 'schedule_followup',
      priority: 'high',
      trigger: 'auto',
      message: `Elder mentioned skipping or forgetting medication.`,
      timestamp: new Date().toISOString()
    });
  }
}
