export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  model: Model;
}

export type Model = 
  | 'deepseek-r1:1.5b'
  | 'deepseek-r1:7b'
  | 'deepseek-r1:8b'
  | 'deepseek-r1:14b'
  | 'deepseek-r1:32b'
  | 'deepseek-r1:70b'
  | 'deepseek-r1:671b';

export type Language = 'ko' | 'en';

export interface Settings {
  theme: 'system' | 'dark' | 'light';
  fontSize: 'sm' | 'base' | 'lg';
  enterToSend: boolean;
  language: Language;
}