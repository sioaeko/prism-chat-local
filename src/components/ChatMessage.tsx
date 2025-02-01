import React from 'react';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`group w-full text-gray-100 border-b border-gray-800/50 ${
      isUser ? 'bg-transparent' : 'bg-gray-800/30 backdrop-blur-sm'
    }`}>
      <div className="max-w-3xl mx-auto py-6 flex gap-6">
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isUser ? 'bg-violet-500/80' : 'bg-teal-500/80'
        }`}>
          {isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        </div>
        <div className="min-h-[20px] flex-1">
          <div className="prose prose-invert max-w-none">
            {message.content.split('\n').map((line, i) => (
              line.trim() ? (
                <p key={i} className="mb-4 last:mb-0 text-[15px] leading-7">
                  {line}
                </p>
              ) : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}