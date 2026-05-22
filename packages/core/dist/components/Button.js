"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Button = ({ children, variant = 'primary', size = 'md', style, ...props }) => {
    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        cursor: 'pointer',
        border: 'none',
        transition: 'all 0.2s ease',
        outline: 'none',
        fontFamily: 'var(--font-sans)',
    };
    const themes = {
        primary: {
            backgroundColor: 'var(--aec-green)',
            color: 'white',
        },
        secondary: {
            backgroundColor: 'var(--aec-gold)',
            color: 'var(--aec-green)',
        },
        danger: {
            backgroundColor: 'var(--aec-alert)',
            color: 'white',
        },
        ghost: {
            backgroundColor: 'transparent',
            color: 'var(--aec-text-muted)',
            border: '1px solid var(--aec-border)',
        }
    };
    const sizes = {
        sm: { padding: '8px 16px', fontSize: '0.85em', borderRadius: 'var(--radius-sm)' },
        md: { padding: '12px 24px', fontSize: '1em', borderRadius: 'var(--radius)' },
        lg: { padding: '18px 36px', fontSize: '1.25em', borderRadius: 'var(--radius-lg)' },
    };
    return ((0, jsx_runtime_1.jsx)("button", { style: { ...baseStyle, ...themes[variant], ...sizes[size], ...style }, ...props, children: children }));
};
exports.Button = Button;
//# sourceMappingURL=Button.js.map