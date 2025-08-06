'use client';
import { useState } from 'react';
import type { ApiResponse, AnalysisData } from '@/types/quiz';
import Link from 'next/link';
import { Tags } from '@/components/Tags';

export default function QuizPage() {
  const [history, setHistory] = useState<ApiResponse['history']>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [finalResult, setFinalResult] = useState<AnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNextStep = async (selectedAnswer: string | null) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          history,
          answer: selectedAnswer,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.detail || 'API 請求失敗');
      }

      const data: ApiResponse = await response.json();

      setHistory(data.history);

      if (data.type === 'question') {
        setCurrentQuestion(data.data.question);
        setCurrentOptions(data.data.options);
      } else if (data.type === 'analysis') {
        setFinalResult(data.data);
        setCurrentQuestion(null);
      }
    } catch (e: unknown) {
      let errorMessage = '發生了一個未知的錯誤';

      if (e instanceof Error) {
        errorMessage = e.message;
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setHistory([]);
    setCurrentQuestion(null);
    setCurrentOptions([]);
    setFinalResult(null);
    setError(null);
  };

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
      const encodedKeywords = encodeURIComponent(
        finalResult.keywords.join(' ')
      );
      const musicPageUrl = `/music?genre=${encodedKeywords}`;

      return (
        <div className="text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-purple-300 mb-4">分析結果</h2>
          <p className="text-gray-300 mb-6">{finalResult.reasoning}</p>
          <div className="flex justify-center">
            <Tags tags={finalResult.keywords} />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link href={musicPageUrl} passHref className="w-full">
              <button className="w-full h-12 rounded-lg bg-purple-600 text-white font-bold transition-colors hover:bg-purple-700">
                前往我的音樂牆
              </button>
            </Link>
            <button
              onClick={handleReset}
              className="w-full h-12 rounded-lg bg-transparent border border-gray-600 text-gray-300 font-bold transition-colors hover:bg-gray-700 hover:border-gray-500"
            >
              再玩一次
            </button>
          </div>
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
                  onChange={() => fetchNextStep(option)}
                  className="sr-only peer"
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
          onClick={() => fetchNextStep(null)}
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
