export interface Metric {
  emoji: string;
  th: string;
  en: string;
  value: string;
  statusTh: string;
  statusEn: string;
  statusType: 'normal' | 'warning' | 'critical';
}

export interface Meal {
  emoji: string;
  th: string;
  en: string;
  dish: string;
  note: string;
  color: string;
}

export interface Task {
  th: string;
  en: string;
  time: string;
  done: boolean;
}

export interface ChatMessage {
  role: 'ai' | 'user';
  th: string;
  en: string;
}

export interface QuickReply {
  label: string;
  value: string;
}
