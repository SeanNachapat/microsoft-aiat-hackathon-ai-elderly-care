"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendLineNotification = sendLineNotification;
const env_1 = require("../config/env");
const logger_1 = __importDefault(require("../middleware/logger"));
const elderInfo_json_1 = __importDefault(require("../../../elderly-dashboard/src/data/elderInfo.json"));
// ─── LINE Messaging API Push Service ─────────────────────────────────────────
// Sends structured Flex Messages to the caregiver via LINE when the AI detects
// actions that need human attention (loneliness, missed meds, emergencies, etc.)
const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
// ─── Priority → Visual Config ────────────────────────────────────────────────
const PRIORITY_CONFIG = {
    critical: { color: "#DC2626", emoji: "🚨", label: "ฉุกเฉิน" },
    high: { color: "#EA580C", emoji: "⚠️", label: "สำคัญมาก" },
    medium: { color: "#F59E0B", emoji: "📢", label: "ควรตรวจสอบ" },
    low: { color: "#22C55E", emoji: "📝", label: "บันทึก" },
};
// ─── Action type → Thai label ────────────────────────────────────────────────
const ACTION_LABELS = {
    sos: "ขอความช่วยเหลือฉุกเฉิน",
    call_caregiver: "ต้องการผู้ดูแลทันที",
    notify_family: "ควรโทรหาผู้สูงอายุ",
    schedule_followup: "ต้องนัดติดตามอาการ",
    medication_reminder: "ลืมรับประทานยา",
};
/**
 * Sends a LINE Flex Message to the caregiver with a full summary of the elder's
 * situation, the detected action, and all relevant context.
 */
async function sendLineNotification(action) {
    const token = env_1.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = env_1.env.LINE_CAREGIVER_USER_ID;
    if (!token || !userId) {
        logger_1.default.warn("⚠️ LINE credentials not configured — skipping notification");
        return false;
    }
    const priority = PRIORITY_CONFIG[action.priority] || PRIORITY_CONFIG.medium;
    const actionLabel = ACTION_LABELS[action.type] || action.type;
    const elder = elderInfo_json_1.default;
    const now = new Date();
    const timeStr = now.toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" });
    const dateStr = now.toLocaleDateString("th-TH", { weekday: "short", day: "numeric", month: "short" });
    // Build LINE Flex Message
    const flexMessage = {
        to: userId,
        messages: [
            {
                type: "flex",
                altText: `${priority.emoji} [${priority.label}] ${actionLabel} — ${elder.name}`,
                contents: {
                    type: "bubble",
                    size: "mega",
                    header: {
                        type: "box",
                        layout: "vertical",
                        backgroundColor: priority.color,
                        paddingAll: "16px",
                        contents: [
                            {
                                type: "text",
                                text: `${priority.emoji} ${priority.label.toUpperCase()}`,
                                color: "#FFFFFF",
                                size: "sm",
                                weight: "bold"
                            },
                            {
                                type: "text",
                                text: actionLabel,
                                color: "#FFFFFF",
                                size: "xl",
                                weight: "bold",
                                wrap: true
                            }
                        ]
                    },
                    body: {
                        type: "box",
                        layout: "vertical",
                        spacing: "md",
                        paddingAll: "16px",
                        contents: [
                            // Elder Info Section
                            {
                                type: "box",
                                layout: "horizontal",
                                spacing: "md",
                                contents: [
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        flex: 1,
                                        contents: [
                                            { type: "text", text: "ผู้สูงอายุ", size: "xs", color: "#999999" },
                                            { type: "text", text: elder.name, size: "md", weight: "bold" }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        flex: 1,
                                        contents: [
                                            { type: "text", text: "อายุ", size: "xs", color: "#999999" },
                                            { type: "text", text: `${elder.age} ปี`, size: "md", weight: "bold" }
                                        ]
                                    },
                                    {
                                        type: "box",
                                        layout: "vertical",
                                        flex: 1,
                                        contents: [
                                            { type: "text", text: "เวลา", size: "xs", color: "#999999" },
                                            { type: "text", text: `${timeStr}`, size: "md", weight: "bold" }
                                        ]
                                    }
                                ]
                            },
                            // Separator
                            { type: "separator", margin: "md" },
                            // What happened
                            {
                                type: "box",
                                layout: "vertical",
                                spacing: "sm",
                                margin: "md",
                                contents: [
                                    { type: "text", text: "📋 รายละเอียด", size: "sm", weight: "bold", color: "#333333" },
                                    { type: "text", text: action.message, size: "sm", color: "#555555", wrap: true }
                                ]
                            },
                            // Separator
                            { type: "separator", margin: "md" },
                            // Health context
                            {
                                type: "box",
                                layout: "vertical",
                                spacing: "sm",
                                margin: "md",
                                contents: [
                                    { type: "text", text: "🩺 ข้อมูลสุขภาพ", size: "sm", weight: "bold", color: "#333333" },
                                    {
                                        type: "text",
                                        text: `โรค: ${elder.healthConditions.map((h) => h.condition).join(", ")}`,
                                        size: "xs",
                                        color: "#666666",
                                        wrap: true
                                    },
                                    {
                                        type: "text",
                                        text: `ยา: ${elder.medications.map((m) => `${m.name} ${m.dose} (${m.schedule})`).join(", ")}`,
                                        size: "xs",
                                        color: "#666666",
                                        wrap: true
                                    },
                                    {
                                        type: "text",
                                        text: `ลืมกินยาสัปดาห์นี้: ${elder.missedMedicationsThisWeek ?? 0} ครั้ง`,
                                        size: "xs",
                                        color: (elder.missedMedicationsThisWeek ?? 0) > 0 ? "#EA580C" : "#666666"
                                    }
                                ]
                            },
                            // Separator
                            { type: "separator", margin: "md" },
                            // Context
                            {
                                type: "box",
                                layout: "vertical",
                                spacing: "sm",
                                margin: "md",
                                contents: [
                                    { type: "text", text: "👤 บริบท", size: "sm", weight: "bold", color: "#333333" },
                                    {
                                        type: "text",
                                        text: `ครอบครัวโทรล่าสุด: ${elder.familyCalledRecently ? "โทรมาแล้ว" : "ยังไม่ได้โทร"}`,
                                        size: "xs",
                                        color: "#666666",
                                        wrap: true
                                    },
                                    {
                                        type: "text",
                                        text: `อารมณ์ล่าสุด: ${elder.lastSessionMood ?? "ไม่ทราบ"}`,
                                        size: "xs",
                                        color: "#666666"
                                    },
                                    {
                                        type: "text",
                                        text: `ที่อยู่: ${elder.livingSituation.split(".")[0]}`,
                                        size: "xs",
                                        color: "#666666",
                                        wrap: true
                                    }
                                ]
                            }
                        ]
                    },
                    footer: {
                        type: "box",
                        layout: "vertical",
                        spacing: "sm",
                        paddingAll: "16px",
                        contents: [
                            {
                                type: "button",
                                action: {
                                    type: "uri",
                                    label: `📞 โทรหา${elder.emergencyContact.name}`,
                                    uri: `tel:${elder.emergencyContact.phone.replace(/[\s-]/g, "")}`
                                },
                                style: "primary",
                                color: priority.color,
                                height: "sm"
                            },
                            {
                                type: "box",
                                layout: "horizontal",
                                spacing: "sm",
                                margin: "sm",
                                contents: [
                                    { type: "text", text: `${dateStr} ${timeStr}`, size: "xxs", color: "#AAAAAA", align: "center" },
                                    { type: "text", text: `ID: ${elder.patientId}`, size: "xxs", color: "#AAAAAA", align: "center" }
                                ]
                            }
                        ]
                    }
                }
            }
        ]
    };
    try {
        const response = await fetch(LINE_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(flexMessage)
        });
        if (!response.ok) {
            const errorBody = await response.text();
            logger_1.default.error(`❌ LINE API error (${response.status}): ${errorBody}`);
            return false;
        }
        logger_1.default.info(`✅ LINE notification sent: [${priority.label}] ${actionLabel}`);
        return true;
    }
    catch (error) {
        logger_1.default.error(`❌ LINE notification failed: ${error}`);
        return false;
    }
}
//# sourceMappingURL=lineNotify.js.map