import React from 'react';

interface QuickPromptsProps {
  onPromptSelect: (prompt: string) => void;
  registeredStocks: any[];
}

const QuickPrompts: React.FC<QuickPromptsProps> = ({ onPromptSelect, registeredStocks }) => {
  const prompts = [
    { icon: "📊", text: "이 종목의 재무 상태는 어때?", prompt: "등록된 종목들의 재무 상태를 분석해주세요." },
    { icon: "🧮", text: "이 종목의 밸류에이션 적정한가?", prompt: "등록된 종목들의 현재 밸류에이션이 적정한지 분석해주세요." },
    { icon: "📰", text: "최근 뉴스 핵심 요약해줘", prompt: "등록된 종목들의 최근 뉴스를 핵심만 요약해주세요." },
    { icon: "📈", text: "다음 주에 상승 가능성 있어?", prompt: "등록된 종목들의 다음 주 상승 가능성을 분석해주세요." },
    { icon: "☁️", text: "AI가 예측하는 위험 요인은?", prompt: "등록된 종목들의 주요 위험 요인을 분석해주세요." },
    { icon: "💼", text: "포트폴리오 진단해줘", prompt: "현재 등록된 종목들로 구성된 포트폴리오를 종합적으로 진단해주세요." }
  ];

  if (registeredStocks.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">💡 빠른 분석</h3>
      <div className="grid grid-cols-2 gap-2">
        {prompts.map((item, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(item.prompt)}
            className="flex items-center gap-2 p-2 text-xs text-left text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            <span className="text-sm">{item.icon}</span>
            <span className="truncate">{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickPrompts;