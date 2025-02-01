import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { Message, OllamaResponse, Chat, Model, Settings } from './types';
import { ChatMessage } from './components/ChatMessage';
import { Sidebar } from './components/Sidebar';
import { ModelSelect, MODEL_INFO } from './components/ModelSelect';

function App() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [model, setModel] = useState<Model>('deepseek-r1:14b');
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    fontSize: 'base',
    enterToSend: true,
    language: 'ko'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const currentChat = chats.find(chat => chat.id === currentChatId);
  const messages = currentChat?.messages || [];

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === 'system') {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    } else if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    root.style.fontSize = {
      sm: '14px',
      base: '16px',
      lg: '18px'
    }[settings.fontSize];

    root.setAttribute('data-language', settings.language);
  }, [settings]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: crypto.randomUUID(),
      title: settings.language === 'ko' ? '새로운 채팅' : 'New Chat',
      messages: [],
      createdAt: new Date(),
      model: model
    };
    setChats(prev => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setInput('');
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (currentChatId === chatId) {
      const remainingChats = chats.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        setCurrentChatId(remainingChats[0].id);
      } else {
        setCurrentChatId(null);
      }
    }
  };

  const clearChats = () => {
    setChats([]);
    setCurrentChatId(null);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const updateChatTitle = (chatId: string, messages: Message[]) => {
    if (messages.length === 1) {
      const title = messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '');
      setChats(prev => prev.map(chat => 
        chat.id === chatId ? { ...chat, title } : chat
      ));
    }
  };

  const cleanResponse = (text: string): string => {
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    if (!currentChatId) {
      createNewChat();
    }

    const chatId = currentChatId || chats[0].id;
    const chat = chats.find(c => c.id === chatId);
    if (!chat) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentMessages = chat.messages;
    const updatedMessages = [...currentMessages, userMessage];
    
    setChats(prev => prev.map(c => 
      c.id === chatId ? { ...c, messages: updatedMessages } : c
    ));
    updateChatTitle(chatId, updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: MODEL_INFO[chat.model].ollamaModel,
          prompt: input,
          stream: false
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OllamaResponse = await response.json();
      const cleanedResponse = cleanResponse(data.response);
      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanedResponse
      };

      setChats(prev => prev.map(c => 
        c.id === chatId 
          ? { ...c, messages: [...updatedMessages, assistantMessage] }
          : c
      ));
    } catch (error) {
      console.error('Ollama API Error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: settings.language === 'ko' 
          ? `오류: Deepseek에 연결할 수 없습니다. 다음을 확인해주세요:\n\n1. Ollama가 실행 중인지 확인\n2. 선택한 모델(${MODEL_INFO[chat.model].name})이 설치되어 있는지 확인\n3. http://localhost:11434 접근이 가능한지 확인` 
          : `Error: Failed to connect to Deepseek. Please check:\n\n1. Ollama is running\n2. Selected model (${MODEL_INFO[chat.model].name}) is installed\n3. http://localhost:11434 is accessible`
      };
      setChats(prev => prev.map(c => 
        c.id === chatId 
          ? { ...c, messages: [...updatedMessages, errorMessage] }
          : c
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && settings.enterToSend) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  const handleModelChange = (newModel: Model) => {
    setModel(newModel);
    if (currentChatId) {
      setChats(prev => prev.map(chat =>
        chat.id === currentChatId ? { ...chat, model: newModel } : chat
      ));
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={createNewChat}
        onSelectChat={setCurrentChatId}
        onDeleteChat={deleteChat}
        onClearChats={clearChats}
        settings={settings}
        onUpdateSettings={setSettings}
      />
      
      <div className="flex-1 flex flex-col relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
        
        <div className="absolute top-4 left-4 z-50">
          <ModelSelect model={model} onModelChange={handleModelChange} />
        </div>
        
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 w-full pt-20">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] flex-col">
                <div className="relative mb-8">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-75 blur" />
                  <h1 className="relative bg-gray-900/50 backdrop-blur-sm px-8 py-4 rounded-2xl text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                    Prism Chat
                  </h1>
                </div>
                <p className="text-gray-400 text-center mb-12 max-w-lg">
                  {settings.language === 'ko' 
                    ? 'Prism Chat (local)은 Ollama로 직접 구동한 로컬 DeepSeek R1 모델을 손쉽게 사용할 수 있는 WebUI 인터페이스입니다.'
                    : 'Prism Chat (local) is a WebUI interface that allows you to easily use the local DeepSeek R1 model running directly with Ollama.'}
                </p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
                  <div className="col-span-2 text-center text-sm text-gray-400 mb-2">
                    {settings.language === 'ko' ? '기능' : 'Capabilities'}
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
                    <h3 className="font-medium text-gray-200 mb-2">
                      {settings.language === 'ko' ? '자연어 처리' : 'Natural Language'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {settings.language === 'ko' 
                        ? '고급 자연어 이해 및 생성 능력' 
                        : 'Advanced understanding and generation of human language'}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
                    <h3 className="font-medium text-gray-200 mb-2">
                      {settings.language === 'ko' ? '코드 생성' : 'Code Generation'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {settings.language === 'ko'
                        ? '다양한 프로그래밍 언어로 코드 작성 및 설명'
                        : 'Write and explain code across multiple languages'}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
                    <h3 className="font-medium text-gray-200 mb-2">
                      {settings.language === 'ko' ? '문제 해결' : 'Problem Solving'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {settings.language === 'ko'
                        ? '복잡한 문제를 단계별로 해결'
                        : 'Break down complex problems into manageable steps'}
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-gray-800/80 via-gray-800/90 to-gray-800/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 hover:border-violet-500/20 transition-colors duration-300">
                    <h3 className="font-medium text-gray-200 mb-2">
                      {settings.language === 'ko' ? '지식 베이스' : 'Knowledge Base'}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {settings.language === 'ko'
                        ? '다양한 분야의 폭넓은 지식 보유'
                        : 'Access to broad knowledge across various domains'}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col pb-32">
                {messages.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </main>

        <div className="sticky bottom-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4 w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <div className="relative flex">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 opacity-75 blur-lg" />
                <textarea
                  ref={textareaRef}
                  rows={1}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    adjustTextareaHeight();
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={settings.language === 'ko' ? '메시지 보내기...' : 'Send a message...'}
                  className="relative w-full resize-none rounded-2xl bg-gray-800/50 backdrop-blur-sm px-4 py-3.5 pr-12 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/50 disabled:opacity-50"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-3 bottom-3 rounded-lg p-1.5 text-gray-400 hover:text-gray-100 disabled:opacity-50 transition-colors duration-200"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-center text-gray-500">
                {settings.language === 'ko'
                  ? '무료 연구 프리뷰. Deepseek는 사람, 장소 또는 사실에 대한 부정확한 정보를 생성할 수 있습니다.'
                  : 'Free Research Preview. Deepseek may produce inaccurate information about people, places, or facts.'}
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
