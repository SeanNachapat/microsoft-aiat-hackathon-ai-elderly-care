import React from 'react';
interface PatientAvatarProps {
    name: string;
    size?: 'sm' | 'md' | 'lg';
}
export declare const PatientAvatar: React.FC<PatientAvatarProps>;
interface StatusBadgeProps {
    status: 'critical' | 'warning' | 'normal';
}
export declare const StatusBadge: React.FC<StatusBadgeProps>;
interface VitalPillProps {
    label: string;
    value: string | number;
    unit: string;
    status?: 'critical' | 'warning' | 'normal';
}
export declare const VitalPill: React.FC<VitalPillProps>;
interface AlertDotProps {
    status: 'critical' | 'warning' | 'normal' | 'inactive';
}
export declare const AlertDot: React.FC<AlertDotProps>;
interface SectionHeaderProps {
    title: string;
    actionLabel?: string;
    onAction?: () => void;
}
export declare const SectionHeader: React.FC<SectionHeaderProps>;
interface AuditItemProps {
    title: string;
    body: string;
    icon?: React.ReactNode;
}
export declare const AuditItem: React.FC<AuditItemProps>;
interface ProgressTrackProps {
    value: number;
    variant?: 'normal' | 'warning' | 'critical';
}
export declare const ProgressTrack: React.FC<ProgressTrackProps>;
export * from './Sidebar';
export * from './HeroBanner';
export * from './Logo';
//# sourceMappingURL=index.d.ts.map