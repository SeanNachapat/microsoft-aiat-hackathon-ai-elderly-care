import { useState, useEffect } from 'react';
import { Metric } from '../models/dashboard';

export const useHealthMetrics = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { emoji: '💓', th: 'ชีพจร', en: 'Heart Rate', value: '92 bpm', statusTh: 'สังเกต', statusEn: 'warning', statusType: 'warning' },
    { emoji: '🩺', th: 'ความดัน', en: 'Blood Pressure', value: '173/106 mmHg', statusTh: 'เฝ้าระวัง', statusEn: 'critical', statusType: 'critical' },
    { emoji: '🫁', th: 'ออกซิเจน', en: 'SpO2', value: '97%', statusTh: 'ปกติ', statusEn: 'normal', statusType: 'normal' },
    { emoji: '🌡️', th: 'อุณหภูมิ', en: 'Temperature', value: '36.6°C', statusTh: 'ปกติ', statusEn: 'normal', statusType: 'normal' },
  ]);

  // In a real MVC, this would fetch from a service
  const refreshMetrics = async () => {
    // Logic for fetching new data
  };

  return { metrics, refreshMetrics };
};
