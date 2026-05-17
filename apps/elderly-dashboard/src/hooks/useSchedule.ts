import { useState } from 'react';
import { Task } from '../models/dashboard';

export const useSchedule = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { label: 'Morning Medicine', time: '08:00', done: true },
    { label: 'Drink Water', time: '10:00', done: true },
    { label: 'Lunch Time', time: '12:00', done: false },
    { label: 'Light Walk', time: '15:00', done: false },
  ]);

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  return { tasks, toggleTask };
};
