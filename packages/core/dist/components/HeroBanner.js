"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeroBanner = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const HeroBanner = ({ titleTh, titleEn, subtitleTh, subtitleEn, color = 'var(--sage-dark)' }) => {
    return ((0, jsx_runtime_1.jsxs)("div", { style: {
            width: '100%',
            minHeight: '120px',
            backgroundColor: color,
            borderRadius: '20px',
            padding: '28px 32px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white',
            marginBottom: '24px',
            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                    position: 'absolute',
                    right: '-40px',
                    top: '-40px',
                    width: '240px',
                    height: '240px',
                    opacity: 0.08,
                    pointerEvents: 'none'
                }, children: (0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 200 200", xmlns: "http://www.w3.org/2000/svg", children: [(0, jsx_runtime_1.jsx)("circle", { cx: "100", cy: "100", r: "100", fill: "white" }), (0, jsx_runtime_1.jsx)("circle", { cx: "100", cy: "100", r: "80", stroke: "white", strokeWidth: "2", fill: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: "100", cy: "100", r: "60", stroke: "white", strokeWidth: "2", fill: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: "100", cy: "100", r: "40", stroke: "white", strokeWidth: "2", fill: "none" }), (0, jsx_runtime_1.jsx)("circle", { cx: "100", cy: "100", r: "20", stroke: "white", strokeWidth: "2", fill: "none" })] }) }), (0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', zIndex: 1 }, children: [(0, jsx_runtime_1.jsxs)("h1", { style: {
                            fontFamily: "'DM Serif Display', serif",
                            fontSize: '28px',
                            margin: 0,
                            lineHeight: 1.2
                        }, children: [titleTh, " \u00B7 ", titleEn] }), (0, jsx_runtime_1.jsxs)("p", { style: {
                            fontFamily: "'Sarabun', sans-serif",
                            fontSize: '13px',
                            marginTop: '6px',
                            color: 'rgba(255, 255, 255, 0.75)',
                            fontWeight: 400
                        }, children: [subtitleTh, " \u00B7 ", subtitleEn] })] })] }));
};
exports.HeroBanner = HeroBanner;
//# sourceMappingURL=HeroBanner.js.map