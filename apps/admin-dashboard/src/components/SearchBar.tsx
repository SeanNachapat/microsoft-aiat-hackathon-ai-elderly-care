import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div style={{
      backgroundColor: 'var(--warm-white)',
      border: '1.5px solid var(--border)',
      borderRadius: '12px',
      height: '44px',
      padding: '0 16px',
      width: '100%',
      marginBottom: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s ease'
    }}>
      <Search size={16} style={{ color: 'var(--text-muted)' }} />
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "ค้นหาผู้ป่วย · Search patients..."}
        style={{
          flex: 1,
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: '14px',
          fontFamily: 'inherit',
          color: 'var(--text-primary)'
        }}
      />
      <button style={{
        backgroundColor: 'var(--sage-light)',
        color: 'var(--sage-dark)',
        borderRadius: '20px',
        fontSize: '12px',
        padding: '4px 14px',
        border: 'none',
        fontWeight: 700,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '28px'
      }}>
        กรอง · Filter
      </button>
    </div>
  );
};
