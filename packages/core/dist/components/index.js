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
exports.PatientAvatar = exports.AppTypography = exports.SensorCard = exports.StatusBadge = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
// Re-exports
__exportStar(require("./Button"), exports);
__exportStar(require("./Card"), exports);
__exportStar(require("./Sidebar"), exports);
__exportStar(require("./Logo"), exports);
// AEC Status Badge
const StatusBadge = ({ status, label }) => {
    const config = {
        normal: { color: 'var(--aec-green)', bg: 'rgba(27, 77, 62, 0.1)', text: 'All Normal' },
        success: { color: 'var(--aec-success)', bg: 'rgba(22, 163, 74, 0.1)', text: 'Resolved' },
        warning: { color: 'var(--aec-amber)', bg: 'rgba(232, 156, 47, 0.1)', text: 'Warning' },
        critical: { color: 'var(--aec-alert)', bg: 'rgba(217, 64, 64, 0.1)', text: 'Critical Alert' },
    };
    const { color, bg, text } = config[status];
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: bg, color: color, padding: '8px 16px',
            borderRadius: '40px', fontWeight: 700, fontSize: '0.85em'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color } }), label || text] }));
};
exports.StatusBadge = StatusBadge;
// AEC Sensor Reading Card
const SensorCard = ({ icon, label, value, unit, status = 'normal' }) => {
    const colorMap = {
        normal: 'var(--aec-green)',
        warning: 'var(--aec-amber)',
        critical: 'var(--aec-alert)',
    };
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            backgroundColor: 'var(--aec-surface)', padding: '20px',
            borderRadius: 'var(--radius)', border: '1px solid var(--aec-border)',
            display: 'flex', flexDirection: 'column', gap: '12px'
        }, className: "aec-shadow", children: [(0, jsx_runtime_1.jsxs)("div", { style: { color: 'var(--aec-text-muted)', display: 'flex', alignItems: 'center', gap: '8px' }, children: [icon, (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.8em', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }, children: label })] }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'baseline', gap: '4px' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '1.5em', fontWeight: 800, color: colorMap[status] }, children: value }), unit && (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '0.9em', color: 'var(--aec-text-muted)' }, children: unit })] })] }));
};
exports.SensorCard = SensorCard;
// AEC Typography
const AppTypography = ({ variant, children, style, className }) => {
    const styles = {
        h1: { fontSize: '1.75em', fontWeight: 800, letterSpacing: '-0.02em', margin: 0, fontFamily: 'var(--font-sans)' },
        h2: { fontSize: '1.25em', fontWeight: 700, margin: 0, fontFamily: 'var(--font-sans)' },
        body: { fontSize: '1em', lineHeight: 1.5, fontFamily: 'var(--font-sans)' },
        caps: { fontSize: '0.7em', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--aec-text-muted)', fontFamily: 'var(--font-sans)' },
        mono: { fontSize: '0.9em', fontFamily: 'var(--font-mono)', opacity: 0.8 },
    };
    const Tag = (variant === 'h1' || variant === 'h2' ? variant : 'p');
    return (0, jsx_runtime_1.jsx)(Tag, { className: className, style: { ...styles[variant], ...style }, children: children });
};
exports.AppTypography = AppTypography;
// AEC Patient Avatar
const PatientAvatar = ({ name, size = 'md' }) => {
    const initial = name.charAt(0);
    const sizeMap = { sm: '40px', md: '56px', lg: '80px' };
    return ((0, jsx_runtime_1.jsx)("div", { style: {
            width: sizeMap[size], height: sizeMap[size], borderRadius: '50%',
            background: 'var(--aec-green)', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: size === 'lg' ? '2em' : '1.2em'
        }, className: "aec-shadow", children: initial }));
};
exports.PatientAvatar = PatientAvatar;
//# sourceMappingURL=index.js.map