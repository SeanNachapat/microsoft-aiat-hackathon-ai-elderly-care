import React from 'react';
import Image from 'next/image';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ 
  width = 160, 
  height = 50, 
  className = "",
  variant = 'full'
}) => {
  // If we only want the icon, we could potentially crop it or use a different file.
  // For now, the full logo is provided as a single image.
  return (
    <div className={`flex items-center ${className}`} style={{ 
      width: variant === 'icon' ? '40px' : 'auto',
      height: variant === 'icon' ? '40px' : 'auto',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <img 
        src="/logo.png" 
        alt="AEC Logo" 
        style={{
          width: variant === 'icon' ? 'auto' : `${width}px`,
          height: variant === 'icon' ? '100%' : 'auto',
          objectFit: 'contain',
          // If variant is icon, we might want to shift it to only show the circle
          marginLeft: variant === 'icon' ? '15px' : '0' 
        }}
      />
    </div>
  );
};
