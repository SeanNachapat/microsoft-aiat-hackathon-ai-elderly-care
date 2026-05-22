"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMOTION_META = exports.EMOTION_COLORS = void 0;
exports.EMOTION_COLORS = {
    // ── Green: Positive / Stable ──
    calm: 'green',
    happy: 'green',
    grateful: 'green',
    content: 'green',
    // ── Amber: Needs Attention ──
    lonely: 'amber',
    anxious: 'amber',
    sad: 'amber',
    frustrated: 'amber',
    nostalgic: 'amber',
    tired: 'amber',
    // ── Red: Urgent / Distress ──
    pain: 'red',
    confused: 'red',
    distressed: 'red',
    fearful: 'red',
    angry: 'red',
    hopeless: 'red',
};
// ─── Emotion display metadata for caregiver panel ───
exports.EMOTION_META = {
    calm: { emoji: '😌', label: 'Calm', severity: 0 },
    happy: { emoji: '😊', label: 'Happy', severity: 0 },
    grateful: { emoji: '🙏', label: 'Grateful', severity: 0 },
    content: { emoji: '☺️', label: 'Content', severity: 0 },
    lonely: { emoji: '😔', label: 'Lonely', severity: 1 },
    anxious: { emoji: '😰', label: 'Anxious', severity: 1 },
    sad: { emoji: '😢', label: 'Sad', severity: 1 },
    frustrated: { emoji: '😤', label: 'Frustrated', severity: 1 },
    nostalgic: { emoji: '🥹', label: 'Nostalgic', severity: 1 },
    tired: { emoji: '😴', label: 'Tired', severity: 1 },
    pain: { emoji: '🤕', label: 'Pain', severity: 2 },
    confused: { emoji: '😵', label: 'Confused', severity: 2 },
    distressed: { emoji: '😫', label: 'Distressed', severity: 2 },
    fearful: { emoji: '😱', label: 'Fearful', severity: 2 },
    angry: { emoji: '😡', label: 'Angry', severity: 2 },
    hopeless: { emoji: '💔', label: 'Hopeless', severity: 2 },
};
//# sourceMappingURL=analysis.js.map