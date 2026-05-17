import { useState } from 'react';
import { Meal } from '../models/dashboard';

export const useMeals = () => {
  const [meals] = useState<Meal[]>([
    { emoji: '🌅', label: 'Breakfast', dish: 'Fish Porridge', note: 'Low-sodium', color: 'var(--amber)' },
    { emoji: '☀️', label: 'Lunch', dish: 'Steamed Veggies & Chicken', note: 'Low-fat', color: 'var(--sage)' },
    { emoji: '🌙', label: 'Dinner', dish: 'Soft Tofu Soup', note: 'Easy to digest', color: 'var(--sky)' },
  ]);

  return { meals };
};
