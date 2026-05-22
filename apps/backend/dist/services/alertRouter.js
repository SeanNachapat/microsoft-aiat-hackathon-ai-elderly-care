"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateActions = evaluateActions;
const logger_1 = __importDefault(require("../middleware/logger"));
const lineNotify_1 = require("./lineNotify");
/**
 * Evaluates behavior_flags from turn analysis and auto-triggers actions.
 * Each action is emitted to the caregiver dashboard via socket AND
 * pushed to the caregiver's LINE account as a rich Flex Message.
 */
function evaluateActions(analysis, emitAction) {
    const { behavior_flags, needs_analysis, emotion } = analysis;
    // 1. Emergency SOS — highest priority
    if (behavior_flags.emergency_detected || needs_analysis.urgency === 'critical') {
        logger_1.default.warn(`🚨 EMERGENCY DETECTED for transcript: "${analysis.transcript}"`);
        const payload = {
            type: 'sos',
            priority: 'critical',
            trigger: 'auto',
            message: `ตรวจพบเหตุฉุกเฉิน: "${analysis.transcript}"`,
            timestamp: new Date().toISOString()
        };
        emitAction('action:sos', payload);
        (0, lineNotify_1.sendLineNotification)(payload);
    }
    // 2. Isolation / Loneliness alert to family
    if (behavior_flags.isolation_signal && emotion.confidence > 0.75) {
        logger_1.default.info(`📱 Auto-alert: Isolation signal detected`);
        const payload = {
            type: 'notify_family',
            priority: 'medium',
            trigger: 'auto',
            message: `ผู้สูงอายุแสดงความเหงาหรือโดดเดี่ยว: "${analysis.transcript}"`,
            timestamp: new Date().toISOString()
        };
        emitAction('action:notify_family', payload);
        (0, lineNotify_1.sendLineNotification)(payload);
    }
    // 3. Pain mentioned
    if (behavior_flags.pain_mentioned) {
        logger_1.default.info(`🩺 Auto-alert: Pain mentioned`);
        const payload = {
            type: 'call_caregiver',
            priority: 'high',
            trigger: 'auto',
            message: `ผู้สูงอายุพูดถึงความเจ็บปวด: "${analysis.transcript}"`,
            timestamp: new Date().toISOString()
        };
        emitAction('action:call_caregiver', payload);
        (0, lineNotify_1.sendLineNotification)(payload);
    }
    // 4. Confusion detected
    if (behavior_flags.confusion_detected) {
        logger_1.default.info(`🧠 Auto-alert: Confusion detected`);
        const payload = {
            type: 'schedule_followup',
            priority: 'medium',
            trigger: 'auto',
            message: `ตรวจพบอาการสับสนหรือหลงลืม: "${analysis.transcript}"`,
            timestamp: new Date().toISOString()
        };
        emitAction('action:schedule_followup', payload);
        (0, lineNotify_1.sendLineNotification)(payload);
    }
    // 5. Medication skip
    if (behavior_flags.medication_skipped) {
        logger_1.default.info(`💊 Auto-alert: Medication may have been skipped`);
        const payload = {
            type: 'medication_reminder',
            priority: 'high',
            trigger: 'auto',
            message: `ผู้สูงอายุอาจลืมรับประทานยา: "${analysis.transcript}"`,
            timestamp: new Date().toISOString()
        };
        emitAction('action:medication_reminder', payload);
        (0, lineNotify_1.sendLineNotification)(payload);
    }
}
//# sourceMappingURL=alertRouter.js.map