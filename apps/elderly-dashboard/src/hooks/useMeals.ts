import { useState } from 'react';
import { Meal } from '../models/dashboard';

export const useMeals = () => {
  const [meals] = useState<Meal[]>([
    { emoji: '🌅', th: 'เช้า', en: 'Breakfast', dish: 'ข้าวต้มปลา', note: 'ลดเกลือ · Low-sodium', color: 'var(--amber)' },
    { emoji: '☀️', th: 'กลางวัน', en: 'Lunch', dish: 'ผักนึ่ง ไก่ต้ม', note: 'ไขมันต่ำ · Low-fat', color: 'var(--sage)' },
    { emoji: '🌙', th: 'เย็น', en: 'Dinner', dish: 'ต้มจืดเต้าหู้นุ่ม', note: 'ย่อยง่าย · Soft', color: 'var(--sky)' },
  ]);

  return { meals };
};
