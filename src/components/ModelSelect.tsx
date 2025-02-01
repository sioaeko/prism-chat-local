import React, { useState, useRef, useEffect } from 'react';
import { Model } from '../types';
import { ChevronDown, CheckIcon, Sparkles } from 'lucide-react';

interface ModelSelectProps {
  model: Model;
  onModelChange: (model: Model) => void;
}

const MODEL_INFO: Record<Model, { 
  name: string; 
  description: { ko: string; en: string }; 
  performance: { ko: string; en: string }; 
  ollamaModel: string;
}> = {
  'deepseek-r1:1.5b': {
    name: 'Deepseek R1 1.5B',
    description: {
      ko: '초경량 모델, 매우 빠른 응답',
      en: 'Ultra-lightweight model, very fast response'
    },
    performance: {
      ko: '기본적인 대화에 적합',
      en: 'Suitable for basic conversations'
    },
    ollamaModel: 'deepseek-r1:1.5b'
  },
  'deepseek-r1:7b': {
    name: 'Deepseek R1 7B',
    description: {
      ko: '경량 모델, 효율적인 성능',
      en: 'Lightweight model, efficient performance'
    },
    performance: {
      ko: '일상적인 대화에 적합',
      en: 'Ideal for everyday conversations'
    },
    ollamaModel: 'deepseek-r1:7b'
  },
  'deepseek-r1:8b': {
    name: 'Deepseek R1 8B',
    description: {
      ko: '개선된 경량 모델',
      en: 'Enhanced lightweight model'
    },
    performance: {
      ko: '향상된 언어 이해력',
      en: 'Improved language comprehension'
    },
    ollamaModel: 'deepseek-r1:8b'
  },
  'deepseek-r1:14b': {
    name: 'Deepseek R1 14B',
    description: {
      ko: '중형 모델, 균형잡힌 성능',
      en: 'Medium-sized model, balanced performance'
    },
    performance: {
      ko: '다양한 작업에 적합',
      en: 'Suitable for various tasks'
    },
    ollamaModel: 'deepseek-r1:14b'
  },
  'deepseek-r1:32b': {
    name: 'Deepseek R1 32B',
    description: {
      ko: '대형 모델, 뛰어난 이해력',
      en: 'Large model, superior comprehension'
    },
    performance: {
      ko: '복잡한 작업 처리 가능',
      en: 'Capable of handling complex tasks'
    },
    ollamaModel: 'deepseek-r1:32b'
  },
  'deepseek-r1:70b': {
    name: 'Deepseek R1 70B',
    description: {
      ko: '초대형 모델, 탁월한 성능',
      en: 'Extra-large model, excellent performance'
    },
    performance: {
      ko: '전문적인 작업에 적합',
      en: 'Suitable for professional tasks'
    },
    ollamaModel: 'deepseek-r1:70b'
  },
  'deepseek-r1:671b': {
    name: 'Deepseek R1 671B',
    description: {
      ko: '최상위 모델, 최고의 성능',
      en: 'Ultimate model, maximum performance'
    },
    performance: {
      ko: '가장 복잡한 작업에 적합',
      en: 'Perfect for the most complex tasks'
    },
    ollamaModel: 'deepseek-r1:671b'
  }
};

export { MODEL_INFO };

export function ModelSelect({ model, onModelChange }: ModelSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [language, setLanguage] = useState<'ko' | 'en'>('ko');

  useEffect(() => {
    // Get language from root element's data attribute
    const root = document.documentElement;
    const currentLanguage = root.getAttribute('data-language') as 'ko' | 'en';
    setLanguage(currentLanguage || 'ko');

    // Watch for language changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-language') {
          const newLanguage = root.getAttribute('data-language') as 'ko' | 'en';
          setLanguage(newLanguage || 'ko');
        }
      });
    });

    observer.observe(root, { attributes: true });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm text-gray-100 rounded-xl px-4 py-3 text-sm hover:bg-gray-700/50 transition-colors duration-200"
      >
        <Sparkles className="w-5 h-5 text-violet-400" />
        <span className="text-base font-medium">{MODEL_INFO[model].name}</span>
        <ChevronDown className="w-5 h-5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed mt-2 w-96 max-h-[calc(100vh-6rem)] overflow-y-auto bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50">
          <div className="p-2 space-y-1">
            {Object.entries(MODEL_INFO).map(([key, info]) => (
              <button
                key={key}
                onClick={() => {
                  onModelChange(key as Model);
                  setIsOpen(false);
                }}
                className={`flex items-start gap-4 w-full p-4 text-left rounded-lg transition-colors duration-200 ${
                  model === key 
                    ? 'bg-violet-500/20 hover:bg-violet-500/30' 
                    : 'hover:bg-gray-700/50'
                }`}
              >
                <Sparkles className={`w-5 h-5 mt-0.5 ${
                  model === key ? 'text-violet-400' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className={`font-medium text-base ${
                      model === key ? 'text-violet-400' : 'text-gray-100'
                    }`}>
                      {info.name}
                    </span>
                    {model === key && (
                      <CheckIcon className="w-5 h-5 text-violet-400" />
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{info.description[language]}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{info.performance[language]}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}