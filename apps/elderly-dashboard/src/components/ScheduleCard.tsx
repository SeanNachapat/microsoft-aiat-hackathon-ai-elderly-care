"use client";

import React from 'react';
import { Clipboard, Check } from 'lucide-react';
import { Task } from '../models/dashboard';

interface ScheduleCardProps {
  tasks: Task[];
  onToggleTask: (index: number) => void;
}

export const ScheduleCard: React.FC<ScheduleCardProps> = ({ tasks, onToggleTask }) => {
  return (
    <div style={{
      backgroundColor: 'var(--warm-white)',
      border: '1.5px solid var(--border)',
      borderRadius: '16px',
      margin: '0 16px 14px',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        backgroundColor: 'var(--sage-light)',
        borderBottom: '1.5px solid var(--sage-mid)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <Clipboard size={18} color="var(--sage)" />
        <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--sage-dark)' }}>📋 กิจวัตรวันนี้ · Daily Schedule</span>
      </div>

      {/* Task List */}
      <div>
        {tasks.map((task, i) => (
          <div 
            key={i} 
            onClick={() => onToggleTask(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '13px 16px',
              borderBottom: i === tasks.length - 1 ? 'none' : '1px solid var(--border-light)',
              minHeight: '56px',
              cursor: 'pointer'
            }}
          >
            {/* Checkbox */}
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              border: task.done ? '2px solid var(--sage)' : '2px solid var(--stone)',
              backgroundColor: task.done ? 'var(--sage)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              flexShrink: 0
            }}>
              {task.done && <Check size={14} color="white" strokeWidth={3} />}
            </div>

            {/* Task Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                color: task.done ? 'var(--text-muted)' : 'var(--text-primary)',
                textDecoration: task.done ? 'line-through' : 'none',
              }}>
                {task.th}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{task.en}</span>
            </div>

            {/* Time */}
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--sky)' }}>
              {task.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
