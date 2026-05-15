"use client";

import React from 'react';
import { ScheduleCard } from '../../components/ScheduleCard';
import { useSchedule } from '../../hooks/useSchedule';

import { SubPageHeader } from '../../components/SubPageHeader';

export default function SchedulePage() {
  const { tasks, toggleTask } = useSchedule();

  return (
    <div className="flex flex-col px-5 pb-8 animate-fade-in">
      <SubPageHeader titleEn="Daily Tasks" />
      
      <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm p-2">
        <ScheduleCard tasks={tasks} onToggleTask={toggleTask} />
      </div>
    </div>
  );
}
