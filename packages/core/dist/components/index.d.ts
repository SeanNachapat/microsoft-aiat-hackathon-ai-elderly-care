import React from 'react';
export * from './Button';
export * from './Card';
export * from './Sidebar';
export * from './Logo';
export declare const StatusBadge: React.FC<{
    status: 'normal' | 'warning' | 'critical' | 'success';
    label?: string;
}>;
export declare const SensorCard: React.FC<{
    icon: React.ReactNode;
    label: string;
    value: string | number;
    unit?: string;
    status?: 'normal' | 'warning' | 'critical';
}>;
export declare const AppTypography: React.FC<{
    variant: 'h1' | 'h2' | 'body' | 'caps' | 'mono';
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
}>;
export declare const PatientAvatar: React.FC<{
    name: string;
    size?: 'sm' | 'md' | 'lg';
}>;
//# sourceMappingURL=index.d.ts.map