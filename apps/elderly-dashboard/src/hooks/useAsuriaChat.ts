import { useState } from 'react';
import { ChatMessage, QuickReply } from '../models/dashboard';

export const useAsuriaChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', th: '', en: "Hello Khun Thiem! How are you feeling today? I'm here to help. 😊" }
  ]);

  const quickReplies: QuickReply[] = [
    { label: '😣 I have a headache', value: 'I have a headache' },
    { label: '🤕 I fell', value: 'I fell' },
    { label: '💊 Missed meds', value: 'Missed meds' },
    { label: '😊 I\'m feeling fine', value: 'I\'m feeling fine' },
  ];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: 'user', th: '', en: text }]);
    
    // Mock response logic
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        th: '', 
        en: 'I have received your message and am informing the nurse immediately.' 
      }]);
    }, 1000);
  };

  return { messages, quickReplies, sendMessage };
};
