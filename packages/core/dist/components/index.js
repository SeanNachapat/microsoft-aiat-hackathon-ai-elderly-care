"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgressTrack = exports.AuditItem = exports.SectionHeader = exports.AlertDot = exports.VitalPill = exports.StatusBadge = exports.PatientAvatar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const PatientAvatar = ({ name, size = 'md' }) => {
    const initial = name.charAt(0);
    // Deterministic color mapping
    const getColor = (char) => {
        if (['ท', 'ส'].includes(char))
            return 'var(--amber)';
        if (['ม', 'อ'].includes(char))
            return 'var(--sage)';
        if (['ป'].includes(char))
            return 'var(--sky)';
        return 'var(--stone)';
    };
    const sizeMap = {
        sm: '28px',
        md: '36px',
        lg: '52px'
    };
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            width: sizeMap[size],
            height: sizeMap[size],
            borderRadius: '50%',
            backgroundColor: getColor(initial),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 600,
            fontSize: size === 'sm' ? '12px' : size === 'lg' ? '20px' : '14px',
            flexShrink: 0
        }, children: initial }));
};
exports.PatientAvatar = PatientAvatar;
const StatusBadge = ({ status }) => {
    const config = {
        critical: { th: 'วิกฤต', en: 'Critical', bg: 'var(--coral-light)', text: 'var(--coral)', border: '3px solid var(--coral)' },
        warning: { th: 'เฝ้าระวัง', en: 'Warning', bg: 'var(--amber-light)', text: 'var(--amber)', border: '3px solid var(--amber)' },
        normal: { th: 'ปกติ', en: 'Normal', bg: 'var(--sage-light)', text: 'var(--sage-dark)', border: '3px solid var(--sage)' }
    };
    const { th, en, bg, text, border } = config[status];
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: bg,
            color: text,
            padding: '2px 10px',
            borderRadius: '20px',
            fontSize: '10px',
            fontWeight: 600,
            borderLeft: border
        }, children: [(0, jsx_runtime_1.jsx)("span", { children: th }), (0, jsx_runtime_1.jsx)("span", { style: { opacity: 0.7 }, children: "\u00B7" }), (0, jsx_runtime_1.jsx)("span", { children: en })] }));
};
exports.StatusBadge = StatusBadge;
const VitalPill = ({ label, value, unit, status = 'normal' }) => {
    const statusColor = {
        critical: 'var(--coral)',
        warning: 'var(--amber)',
        normal: 'var(--text-primary)'
    }[status];
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            backgroundColor: 'var(--sand)',
            padding: '6px 10px',
            borderRadius: '6px',
            display: 'flex',
            flexDirection: 'column',
            minWidth: '60px'
        }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '9px', color: 'var(--text-muted)', fontWeight: 500, textTransform: 'uppercase' }, children: label }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: '2px' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '13px', fontWeight: 600, color: statusColor }, children: value }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '9px', color: 'var(--text-muted)' }, children: unit })] })] }));
};
exports.VitalPill = VitalPill;
const AlertDot = ({ status }) => {
    const colorMap = {
        critical: 'var(--coral)',
        warning: 'var(--amber)',
        normal: 'var(--sage)',
        inactive: 'var(--stone)'
    };
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: colorMap[status],
            flexShrink: 0
        } }));
};
exports.AlertDot = AlertDot;
const SectionHeader = ({ title, actionLabel, onAction }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }, children: [(0, jsx_runtime_1.jsx)("h3", { style: { fontSize: '14px', fontWeight: 600, color: 'var(--earth)' }, children: title }), actionLabel && ((0, jsx_runtime_1.jsx)("button", { onClick: onAction, style: {
                    fontSize: '12px',
                    color: 'var(--sage)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontWeight: 500
                }, children: actionLabel }))] }));
};
exports.SectionHeader = SectionHeader;
const AuditItem = ({ title, body, icon }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            backgroundColor: 'var(--sand)',
            borderRadius: 'var(--radius-sm)',
            padding: '10px 12px',
            marginBottom: '8px'
        }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }, children: [icon, (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }, children: title })] }), (0, jsx_runtime_1.jsx)("p", { style: { fontSize: '10px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }, children: body })] }));
};
exports.AuditItem = AuditItem;
const ProgressTrack = ({ value, variant = 'normal' }) => {
    const colorMap = {
        normal: 'var(--sage)',
        warning: 'var(--amber)',
        critical: 'var(--coral)'
    };
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            height: '6px',
            width: '100%',
            backgroundColor: 'var(--sand2)',
            borderRadius: '20px',
            overflow: 'hidden'
        }, children: (0, jsx_runtime_1.jsx)("div", { style: {
                height: '100%',
                width: `${Math.min(100, Math.max(0, value))}%`,
                backgroundColor: colorMap[variant],
                borderRadius: '20px',
                transition: 'width 0.3s ease'
            } }) }));
};
exports.ProgressTrack = ProgressTrack;
__exportStar(require("./Sidebar"), exports);
__exportStar(require("./HeroBanner"), exports);
__exportStar(require("./Logo"), exports);
//# sourceMappingURL=index.js.map