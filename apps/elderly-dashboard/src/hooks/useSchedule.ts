import { useState } from 'react';
import { Task } from '../models/dashboard';

export const useSchedule = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { th: 'ทานยาเช้า', en: 'Morning Medicine', time: '08:00', done: true },
    { th: 'ดื่มน้ำ 2 แก้ว', en: 'Drink Water', time: '10:00', done: true },
    { th: 'ทานอาหารกลางวัน', en: 'Lunch Time', time: '12:00', done: false },
    { th: 'เดินเบาๆ', en: 'Light Walk', time: '15:00', done: false },
  ]);

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  return { tasks, toggleTask };
};
