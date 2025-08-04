import { useState, useRef, useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { useStockStore } from "../store/stockStore";
import {
  sendChatMessage,
  testGeminiConnection,
  uploadToNotion,
} from "../api/chat";
import type { ChatMessage } from "../types/chat";
import {
  PaperAirplaneIcon,
  TrashIcon,
  DocumentArrowUpIcon,
} from "@heroicons/react/24/outline";
import QuickPrompts from "./QuickPrompts";

const StockChatPanel = () => {
  const registeredStocks = useStockStore((state) => state.registeredStocks);
  const [input, setInput] = useState("");
  const { messages, isLoading, addMessage, setLoading, clearMessages } =
    useChatStore();
  const [testResult, setTestResult] = useState<string>("");
  const [showPrompts, setShowPrompts] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 자동 스크롤 비활성화 - 사용자가 수동으로 제어
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const stockContext = registeredStocks.map((stock) => ({
        name: stock.name,
        code: stock.code,
      }));

      const aiResponse = await sendChatMessage(input, stockContext);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      addMessage(aiMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "죄송합니다. 응답을 가져오는데 실패했습니다.",
        isUser: false,
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleTest = async () => {
    try {
      const result = await testGeminiConnection();
      setTestResult(`연결 성공: ${JSON.stringify(result)}`);
    } catch (error: any) {
      setTestResult(`연결 실패: ${error.message}`);
    }
  };

  const handleClearChat = () => {
    if (confirm("채팅 내역을 모두 삭제하시겠습니까?")) {
      clearMessages();
    }
  };

  const handleUploadToNotion = async () => {
    if (messages.length === 0) {
      alert("업로드할 채팅 내역이 없습니다.");
      return;
    }

    if (confirm("채팅 내역을 노션에 업로드하시겠습니까?")) {
      try {
        setLoading(true);
        await uploadToNotion(messages);
        alert("노션에 성공적으로 업로드되었습니다!");
      } catch (error: any) {
        alert(`노션 업로드 실패: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePromptSelect = async (prompt: string) => {
    setInput(prompt);
    setShowPrompts(false);

    // 바로 실행
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: prompt,
      isUser: true,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    setInput("");
    setLoading(true);

    try {
      const stockContext = registeredStocks.map((stock) => ({
        name: stock.name,
        code: stock.code,
      }));

      const aiResponse = await sendChatMessage(prompt, stockContext);

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      addMessage(aiMessage);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "죄송합니다. 응답을 가져오는데 실패했습니다.",
        isUser: false,
        timestamp: new Date(),
      };
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleInputFocus = () => {
    if (registeredStocks.length > 0) {
      setShowPrompts(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => setShowPrompts(false), 200);
  };

  return (
    <div className="border rounded-lg shadow overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 h-[95vh]">
      <div className="bg-gray-100 dark:bg-gray-900/50 px-6 py-4 border-b dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              🤖 AI 주식 상담
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              등록된 종목에 대해 AI와 대화해보세요.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() =>
                window.open(
                  "https://www.notion.so/23ca19d44ff88049ba5dc23677b5578c?v=23ca19d44ff8808c8b55000c26b93dbc",
                  "_blank"
                )
              }
              className="px-3 py-2 w-22 h-10 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-150 flex items-center justify-center transform hover:-translate-y-0.5"
              title="노션으로 이동"
            >
              <span className="text-xs">Notion 이동</span>
            </button>
            <button
              onClick={handleUploadToNotion}
              disabled={messages.length === 0 || isLoading}
              className="px-3 py-2 w-22 h-10 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center transform hover:-translate-y-0.5"
              title="노션에 업로드"
            >
              <span className="text-xs">Notion 등록</span>
            </button>

            <button
              onClick={handleClearChat}
              className="px-3 py-2 w-20 h-10 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-md hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 flex items-center justify-center transform hover:-translate-y-0.5"
              title="새로운 채팅 시작"
            >
              <span className="text-xs">Clear</span>
            </button>
          </div>
        </div>
        {testResult && (
          <p className="text-xs mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
            {testResult}
          </p>
        )}
      </div>

      <div className="h-[85vh] flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              AI와 주식에 대해 대화를 시작해보세요!
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                <p className="text-xs opacity-70 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="border-t dark:border-gray-700 p-4 relative">
          {showPrompts && (
            <div className="absolute bottom-full left-4 right-4 mb-2 z-10">
              <QuickPrompts
                onPromptSelect={handlePromptSelect}
                registeredStocks={registeredStocks}
              />
            </div>
          )}
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              placeholder="주식에 대해 질문해보세요..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="relative px-4 py-2.5 w-12 font-light text-white bg-gray-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none before:absolute before:inset-0 before:bg-gray-700 before:rounded-lg before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-200 flex items-center justify-center"
              style={{ fontFamily: "Georgia, serif" }}
            >
              <span className="relative z-10">
                <PaperAirplaneIcon className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockChatPanel;
