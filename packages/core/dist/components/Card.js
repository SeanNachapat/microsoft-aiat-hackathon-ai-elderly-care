"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Card = ({ children, variant = 'default', padding = '24px', className = '', style }) => {
    const baseStyle = {
        borderRadius: 'var(--radius)',
        padding,
        overflow: 'hidden',
        position: 'relative',
        transition: 'all 0.3s ease',
        ...style
    };
    const variantStyles = {
        default: {
            backgroundColor: 'var(--aec-surface)',
            border: '1px solid var(--aec-border)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
        },
        glass: {
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
        },
        outline: {
            backgroundColor: 'transparent',
            border: '2px dashed var(--aec-border)',
            boxShadow: 'none',
        }
    };
    return ((0, jsx_runtime_1.jsx)("div", { className: className, style: { ...variantStyles[variant], ...baseStyle }, children: children }));
};
exports.Card = Card;
//# sourceMappingURL=Card.js.map