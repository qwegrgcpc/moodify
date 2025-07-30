"use client";

import { useState } from "react";
import type { Content } from "@google/genai";

interface QuestionPayload {
  type: "question";
  data: {
    question: string;
    options: string[];
  };
  history: Content[];
}

interface AnalysisPayload {
  type: "analysis";
  data: {
    keywords: string[];
    reasoning: string;
  };
  history: Content[];
}

type ApiResponse = QuestionPayload | AnalysisPayload;

// --- UI 元件 ---
export default function QuizPage() {
  // --- State 管理 ---
  const [history, setHistory] = useState<Content[]>([]);
  const [turn, setTurn] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<
    AnalysisPayload["data"] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- API 溝通函式 ---
  const fetchNextStep = async (selectedAnswer: string | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/ai/quiz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          history: history,
          answer: selectedAnswer,
          turn: turn,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || "API 請求失敗");
      }

      const data: ApiResponse = await response.json();

      // 更新對話歷史紀錄
      setHistory(data.history);

      if (data.type === "question") {
        setCurrentQuestion(data.data.question);
        setCurrentOptions(data.data.options);
        setTurn((prev) => prev + 1);
      } else if (data.type === "analysis") {
        setFinalResult(data.data);
        setCurrentQuestion(null); // 清空問題，準備顯示結果
      }
    } catch (e: unknown) {
      // 明確標記為 unknown
      let errorMessage = "發生了一個未知的錯誤";

      if (e instanceof Error) {
        errorMessage = e.message;
      }

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // --- 事件處理函式 ---
  const handleStartQuiz = () => {
    fetchNextStep(null); // 傳入 null answer 來觸發第一個問題
  };

  const handleOptionSelect = (option: string) => {
    // 選擇選項後，立刻觸發下一題
    fetchNextStep(option);
  };

  const handleReset = () => {
    setHistory([]);
    setTurn(0);
    setCurrentQuestion(null);
    setCurrentOptions([]);
    setFinalResult(null);
    setError(null);
  };

  // --- 渲染邏輯 ---
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-48">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-4 text-gray-400">DJ Moo 正在思考中...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center text-red-400 bg-red-500/10 p-4 rounded-lg">
          <p>糟糕，發生錯誤了：</p>
          <p className="mt-2 font-mono text-sm">{error}</p>
          <button
            onClick={handleReset}
            className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            重新開始
          </button>
        </div>
      );
    }

    if (finalResult) {
      return (
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">分析結果</h2>
          <p className="text-gray-300 mb-6">{finalResult.reasoning}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            {finalResult.keywords.map((keyword, index) => (
              <span
                key={index}
                className="bg-purple-500/50 text-purple-200 px-4 py-2 rounded-full text-sm font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
          <button
            onClick={handleReset}
            className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            再玩一次
          </button>
        </div>
      );
    }

    if (currentQuestion) {
      return (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-6">
            {currentQuestion}
          </h2>
          <div className="space-y-4">
            {currentOptions.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="quiz-option"
                  value={option}
                  onChange={() => handleOptionSelect(option)}
                  className="sr-only peer" // 隱藏原生 radio，使用 peer state
                />
                <label
                  htmlFor={`option-${index}`}
                  className="flex items-center justify-center p-4 bg-gray-700 rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-600/80 peer-checked:bg-purple-600 peer-checked:ring-2 peer-checked:ring-purple-400 peer-checked:shadow-lg peer-checked:scale-105"
                >
                  <span className="text-lg font-medium">{option}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      );
    }

    // 起始畫面
    return (
      <div className="text-center flex flex-col items-center justify-center h-96 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-white mb-2">
          音樂風格探測器
        </h1>
        <p className="text-gray-400 mb-8">讓 AI DJ Moo 為你找出命定曲風</p>
        <button
          onClick={handleStartQuiz}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-transform duration-200 ease-in-out hover:scale-105 shadow-lg"
        >
          開始測驗
        </button>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 border border-gray-700">
        {renderContent()}
      </div>
      <footer className="text-center mt-8 text-gray-500">
        <p>由 Google Gemini API 驅動</p>
      </footer>
    </main>
  );
}
