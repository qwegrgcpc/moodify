'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SpinnerIcon } from '@/components/icons';

export default function InputWithAI() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    // 防止在載入中或沒有文字時重複點擊
    if (!text || loading) return;
    setLoading(true);

    try {
      const res = await fetch('/api/ai/keywords', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || 'API 請求失敗');
      }

      const data = await res.json();
      if (data.keywords) {
        router.push(`/music?genre=${encodeURIComponent(data.keywords)}`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '發生未知錯誤';
      alert(`AI 轉換失敗: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="輸入一句話，例如：下雨天想專心工作"
          className="w-full h-14 rounded-lg border border-gray-600 bg-gray-700/50 py-2 px-4 text-white placeholder-gray-500 transition-all duration-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 focus:outline-none disabled:opacity-50"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleClick();
          }}
          disabled={loading}
        />
      </div>

      <button
        onClick={handleClick}
        className="mt-4 flex h-14 w-full items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:bg-none disabled:bg-gray-600 disabled:opacity-70 hover:scale-105 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40"
        disabled={loading || !text}
      >
        {loading ? (
          <>
            <SpinnerIcon className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
            分析中...
          </>
        ) : (
          '轉換心情為旋律'
        )}
      </button>
    </div>
  );
}
