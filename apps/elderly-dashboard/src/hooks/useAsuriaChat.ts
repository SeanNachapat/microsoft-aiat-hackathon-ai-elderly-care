import { useState } from 'react';
import { ChatMessage, QuickReply } from '../models/dashboard';

export const useAsuriaChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', th: 'สวัสดีครับคุณเทียม! วันนี้รู้สึกเป็นอย่างไรบ้างครับ? ผมพร้อมช่วยเหลือเสมอนะครับ 😊', en: "Hello Khun Thiem! How are you feeling today? I'm here to help." }
  ]);

  const quickReplies: QuickReply[] = [
    { label: '😣 ปวดหัว · I have a headache', value: 'ปวดหัว' },
    { label: '🤕 ล้มหกล้ม · I fell', value: 'ล้มหกล้ม' },
    { label: '💊 ยังไม่ได้ทานยา · Missed meds', value: 'ยังไม่ได้ทานยา' },
    { label: '😊 ฉันสบายดี · I\'m feeling fine', value: 'ฉันสบายดี' },
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', th: text, en: '' }]);
    
    // Mock response logic
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        th: 'รับทราบครับ ผมกำลังแจ้งพยาบาลให้ทราบทันที', 
        en: 'I have received your message and am informing the nurse.' 
      }]);
    }, 1000);
  };

  return { messages, quickReplies, sendMessage };
};
