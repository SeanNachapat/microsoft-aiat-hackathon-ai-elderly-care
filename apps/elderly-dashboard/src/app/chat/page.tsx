"use client";

import React from 'react';
import { AsuriaChatCard } from '../../components/AsuriaChatCard';
import { useAsuriaChat } from '../../hooks/useAsuriaChat';

export default function ChatPage() {
  const { messages, quickReplies, sendMessage } = useAsuriaChat();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '16px' }}>
      <AsuriaChatCard 
        messages={messages} 
        quickReplies={quickReplies} 
        onSendMessage={sendMessage} 
      />
    </div>
  );
}
