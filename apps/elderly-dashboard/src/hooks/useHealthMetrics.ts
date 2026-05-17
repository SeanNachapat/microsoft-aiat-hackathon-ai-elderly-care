import { useState, useEffect } from 'react';
import { Metric } from '../models/dashboard';

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { emoji: '💓', label: 'Heart Rate', value: '92 bpm', status: 'Warning', statusType: 'warning' },
    { emoji: '🩺', label: 'Blood Pressure', value: '173/106 mmHg', status: 'Critical', statusType: 'critical' },
    { emoji: '🫁', label: 'SpO2', value: '97%', status: 'Normal', statusType: 'normal' },
    { emoji: '🌡️', label: 'Temperature', value: '36.6°C', status: 'Normal', statusType: 'normal' },
  ]);

  // In a real MVC, this would fetch from a service
  const refreshMetrics = async () => {
    // Logic for fetching new data
  };

  return { metrics, refreshMetrics };
};
