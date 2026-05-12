"use client";

import React from 'react';
import { ScheduleCard } from '../../components/ScheduleCard';
import { useSchedule } from '../../hooks/useSchedule';

export default function SchedulePage() {
  const { tasks, toggleTask } = useSchedule();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px' }}>
      <ScheduleCard tasks={tasks} onToggleTask={toggleTask} />
    </div>
  );
}
