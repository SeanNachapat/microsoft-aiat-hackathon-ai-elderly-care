export interface Metric {
  emoji: string;
  label: string;
  value: string;
  status: string;
  statusType: 'normal' | 'warning' | 'critical';
}

export interface Meal {
  emoji: string;
  label: string;
  dish: string;
  note: string;
  color: string;
}

export interface Task {
  label: string;
  time: string;
  done: boolean;
}

export interface ChatMessage {
  role: 'ai' | 'user';
  text: string;
}

export interface QuickReply {
  label: string;
  value: string;
}
