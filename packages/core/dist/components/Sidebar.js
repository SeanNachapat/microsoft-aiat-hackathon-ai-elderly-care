"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const Logo_1 = require("./Logo");
const Sidebar = ({ appName, appLabelTh }) => {
    const pathname = (0, navigation_1.usePathname)();
    const [hoveredPath, setHoveredPath] = (0, react_1.useState)(null);
    const navItems = [
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, { size: 18 }), labelTh: 'ภาพรวม', labelEn: 'Overview', path: '/' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 18 }), labelTh: 'ผู้ป่วย', labelEn: 'Patients', path: '/patients' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 18 }), labelTh: 'การแจ้งเตือน', labelEn: 'Alerts', path: '/alerts', badge: 4 },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, { size: 18 }), labelTh: 'AI วิเคราะห์', labelEn: 'AI Analysis', path: '/ai' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { size: 18 }), labelTh: 'ตั้งค่า', labelEn: 'Settings', path: '/settings' },
    ];
    return ((0, jsx_runtime_1.jsxs)("aside", { style: {
            width: '240px',
            height: '100vh',
            backgroundColor: 'var(--warm-white)',
            borderRight: '1.5px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 10
        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { padding: '16px 20px 24px', display: 'flex', alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(Logo_1.Logo, { width: 160 }) }), (0, jsx_runtime_1.jsxs)("div", { style: { padding: '0 12px', flex: 1 }, children: [(0, jsx_runtime_1.jsx)("p", { style: {
                            fontSize: '10px',
                            fontWeight: 700,
                            color: 'var(--text-muted)',
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            padding: '16px 8px 8px'
                        }, children: "Main Navigation" }), (0, jsx_runtime_1.jsx)("nav", { style: { display: 'flex', flexDirection: 'column', gap: '4px' }, children: navItems.map((item) => {
                            const isActive = pathname === item.path;
                            const isHovered = hoveredPath === item.path;
                            return ((0, jsx_runtime_1.jsxs)("div", { onMouseEnter: () => setHoveredPath(item.path), onMouseLeave: () => setHoveredPath(null), style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    height: '44px',
                                    padding: '0 12px',
                                    borderRadius: 'var(--radius-sm)',
                                    cursor: 'pointer',
                                    backgroundColor: isActive ? 'var(--sage-light)' : isHovered ? 'var(--sand)' : 'transparent',
                                    color: isActive ? 'var(--sage-dark)' : 'var(--text-primary)',
                                    fontWeight: isActive ? 700 : 500,
                                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                                    position: 'relative'
                                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                            width: '30px',
                                            height: '30px',
                                            borderRadius: '8px',
                                            backgroundColor: isActive ? 'var(--sage)' : 'var(--sage-light)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: isActive ? 'white' : 'var(--sage)',
                                            flexShrink: 0
                                        }, children: item.icon }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', lineHeight: 1.1, flex: 1 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '12.5px' }, children: item.labelTh }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '9px', opacity: 0.6, fontWeight: 500 }, children: item.labelEn })] }), item.badge && !isHovered && ((0, jsx_runtime_1.jsx)("span", { style: {
                                            backgroundColor: 'var(--coral)',
                                            color: 'white',
                                            fontSize: '9px',
                                            fontWeight: 700,
                                            padding: '1px 6px',
                                            borderRadius: '10px'
                                        }, children: item.badge })), isHovered && !isActive && ((0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRight, { size: 14, style: { opacity: 0.5 } }))] }, item.path));
                        }) })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: '20px 16px',
                    borderTop: '1.5px solid var(--border-light)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsxs)("div", { style: { position: 'relative', cursor: 'pointer' }, children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 20, color: "var(--text-muted)" }), (0, jsx_runtime_1.jsx)("div", { style: {
                                            position: 'absolute',
                                            top: '-2px',
                                            right: '-2px',
                                            width: '8px',
                                            height: '8px',
                                            backgroundColor: 'var(--coral)',
                                            borderRadius: '50%',
                                            border: '2px solid var(--warm-white)'
                                        } })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 18, color: "var(--text-muted)", style: { cursor: 'pointer' } })] }), (0, jsx_runtime_1.jsxs)("div", { style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    border: '2px solid var(--sage-mid)',
                                    backgroundColor: 'var(--sage-light)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--sage-dark)',
                                    fontSize: '14px',
                                    fontWeight: 700,
                                    overflow: 'hidden'
                                }, children: "SN" }), (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', flexDirection: 'column', minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontSize: '13px', fontWeight: 700, color: 'var(--earth)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: "Sean N." }), (0, jsx_runtime_1.jsx)("span", { style: { fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }, children: "Chief Nurse" })] })] })] })] }));
};
exports.Sidebar = Sidebar;
//# sourceMappingURL=Sidebar.js.map