"use strict";
"use client";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const lucide_react_1 = require("lucide-react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const Sidebar = ({ role }) => {
    const pathname = (0, navigation_1.usePathname)();
    const [hoveredPath, setHoveredPath] = (0, react_1.useState)(null);
    const [collapsed, setCollapsed] = (0, react_1.useState)(false);
    const adminNav = [
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, { size: 20 }), label: 'System Overview', path: '/' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 20 }), label: 'User Management', path: '/users' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Activity, { size: 20 }), label: 'Device Management', path: '/devices' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 20 }), label: 'Alert Center', path: '/alerts' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { size: 20 }), label: 'Analytics', path: '/analytics' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldCheck, { size: 20 }), label: 'Security', path: '/security' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { size: 20 }), label: 'Configuration', path: '/settings' },
    ];
    const caregiverNav = [
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.LayoutDashboard, { size: 20 }), label: 'Dashboard', path: '/' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Radio, { size: 20 }), label: 'Live Monitoring', path: '/live', badge: undefined },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Users, { size: 20 }), label: 'My Patients', path: '/patients' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Bell, { size: 20 }), label: 'Active Alerts', path: '/alerts', badge: 3 },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Hospital, { size: 20 }), label: 'Visit Schedule', path: '/schedule' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, { size: 20 }), label: 'Reports', path: '/reports' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, { size: 20 }), label: 'Messages', path: '/messages' },
        { icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Settings, { size: 20 }), label: 'Settings', path: '/settings' },
    ];
    const navItems = role === 'admin' ? adminNav : caregiverNav;
    return ((0, jsx_runtime_1.jsxs)("aside", { style: {
            width: collapsed ? '72px' : '280px',
            height: '100vh',
            backgroundColor: 'var(--aec-surface)',
            borderRight: '1px solid var(--aec-border)',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            transition: 'width 0.25s ease',
            overflow: 'hidden',
        }, className: "aec-shadow", children: [(0, jsx_runtime_1.jsxs)("div", { style: {
                    padding: collapsed ? '24px 0' : '32px 24px',
                    display: 'flex', alignItems: 'center', gap: '16px',
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    minHeight: '96px'
                }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                            width: '40px', height: '40px', borderRadius: '12px',
                            backgroundColor: 'white', display: 'flex',
                            alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid var(--aec-border)',
                            flexShrink: 0
                        }, children: (0, jsx_runtime_1.jsx)("img", { src: "/logo.png", alt: "AEC Logo", style: { width: '28px' } }) }), !collapsed && ((0, jsx_runtime_1.jsxs)("div", { style: { overflow: 'hidden', whiteSpace: 'nowrap' }, children: [(0, jsx_runtime_1.jsx)("span", { style: { fontWeight: 900, fontSize: '18px', color: 'var(--aec-green)', display: 'block', letterSpacing: '-0.02em' }, children: "AEC Platform" }), (0, jsx_runtime_1.jsxs)("span", { style: { fontSize: '11px', fontWeight: 700, color: 'var(--aec-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }, children: [role, " portal"] })] }))] }), (0, jsx_runtime_1.jsx)("div", { style: { padding: collapsed ? '0 0 8px' : '0 16px 8px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end' }, children: (0, jsx_runtime_1.jsx)("button", { onClick: () => setCollapsed(c => !c), title: collapsed ? 'Expand sidebar' : 'Collapse sidebar', style: {
                        width: '32px', height: '32px', borderRadius: '8px', border: '1px solid var(--aec-border)',
                        backgroundColor: 'var(--aec-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--aec-text-muted)', transition: 'all 0.2s ease',
                    }, children: collapsed ? (0, jsx_runtime_1.jsx)(lucide_react_1.PanelLeft, { size: 16 }) : (0, jsx_runtime_1.jsx)(lucide_react_1.PanelLeftClose, { size: 16 }) }) }), (0, jsx_runtime_1.jsx)("nav", { style: { padding: collapsed ? '0 8px' : '0 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }, children: navItems.map((item) => {
                    const isActive = pathname === item.path;
                    const isHovered = hoveredPath === item.path;
                    return ((0, jsx_runtime_1.jsxs)(link_1.default, { href: item.path, onMouseEnter: () => setHoveredPath(item.path), onMouseLeave: () => setHoveredPath(null), title: collapsed ? item.label : undefined, style: {
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            height: '48px',
                            padding: collapsed ? '0' : '0 16px',
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            backgroundColor: isActive ? 'rgba(27, 77, 62, 0.05)' : isHovered ? 'var(--aec-bg)' : 'transparent',
                            color: isActive ? 'var(--aec-green)' : 'var(--aec-text-muted)',
                            transition: 'all 0.2s ease',
                            position: 'relative',
                        }, children: [(0, jsx_runtime_1.jsx)("div", { style: { color: isActive ? 'var(--aec-green)' : 'inherit', flexShrink: 0 }, children: item.icon }), !collapsed && ((0, jsx_runtime_1.jsx)("span", { style: { fontSize: '14px', fontWeight: isActive ? 700 : 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: item.label })), !collapsed && item.badge && ((0, jsx_runtime_1.jsx)("span", { style: {
                                    backgroundColor: 'var(--aec-alert)', color: 'white',
                                    fontSize: '10px', fontWeight: 800, padding: '2px 6px', borderRadius: '8px'
                                }, children: item.badge })), collapsed && item.badge && ((0, jsx_runtime_1.jsx)("span", { style: {
                                    position: 'absolute', top: '6px', right: '6px',
                                    width: '8px', height: '8px', borderRadius: '50%',
                                    backgroundColor: 'var(--aec-alert)'
                                } })), !collapsed && isActive && (0, jsx_runtime_1.jsx)("div", { style: { width: '4px', height: '16px', backgroundColor: 'var(--aec-green)', borderRadius: '2px' } })] }, item.path));
                }) }), (0, jsx_runtime_1.jsx)("div", { style: { padding: collapsed ? '16px 8px' : '24px', borderTop: '1px solid var(--aec-border)' }, children: (0, jsx_runtime_1.jsxs)("div", { style: { display: 'flex', alignItems: 'center', gap: '12px', justifyContent: collapsed ? 'center' : 'flex-start' }, children: [(0, jsx_runtime_1.jsx)("div", { style: {
                                width: '40px', height: '40px', borderRadius: '50%',
                                backgroundColor: 'var(--aec-green)', color: 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontWeight: 800, fontSize: '13px', flexShrink: 0
                            }, children: role === 'admin' ? 'AD' : 'CG' }), !collapsed && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)("span", { style: { display: 'block', fontSize: '14px', fontWeight: 700, color: 'var(--aec-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }, children: role === 'admin' ? 'Admin User' : 'Caregiver User' }), (0, jsx_runtime_1.jsx)("span", { style: { display: 'block', fontSize: '11px', color: 'var(--aec-text-muted)', fontWeight: 600 }, children: role === 'admin' ? 'System Master' : 'Assigned Facility A' })] }), (0, jsx_runtime_1.jsx)(lucide_react_1.LogOut, { size: 18, color: "var(--aec-text-muted)", style: { cursor: 'pointer' } })] }))] }) })] }));
};
exports.Sidebar = Sidebar;
//# sourceMappingURL=Sidebar.js.map