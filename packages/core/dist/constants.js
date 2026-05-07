"use strict";
// ─── Constants ──────────────────────────────────────────────────────────────
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_COLORS = exports.RISK_LEVELS = exports.WS_BASE_URL = exports.API_BASE_URL = void 0;
exports.API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
exports.WS_BASE_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:4000';
exports.RISK_LEVELS = {
    CRITICAL: 'วิกฤต',
    HIGH: 'เสี่ยงสูง',
    MEDIUM: 'ปานกลาง',
    NORMAL: 'ปกติ',
    LOW: 'ต่ำ'
};
exports.STATUS_COLORS = {
    CRITICAL: 'bg-red-500',
    HIGH: 'bg-orange-500',
    MEDIUM: 'bg-amber-400',
    NORMAL: 'bg-emerald-400',
    LOW: 'bg-emerald-500'
};
//# sourceMappingURL=constants.js.map