"use client";

import React from 'react';
import { VoiceScreen } from '@/components/VoiceMode';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();

  return (
    <VoiceScreen 
      onSOS={() => router.push('/sos?triggered=true')} 
    />
  );
}
