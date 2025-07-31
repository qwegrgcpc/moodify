'use client';

import Link from 'next/link';
import InputWithAI from '@/components/InputWithAI';


export default function HomePage() {;
  return (
    <main className="min-h-screen w-full bg-gray-900 text-white flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
          Moodify: <span className="text-purple-400">你的心情配樂師</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
          無論陰鬱或燦爛，為你的心情找到專屬旋律。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">

        {/* --- 卡片 1: 心情直達 --- */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 animate-fade-in transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">心情直達</h2>
          </div>
          <p className="text-gray-400 my-6">輸入任何描述你當下感受的詞句，讓 AI 為你翻譯成音樂。</p>
          <InputWithAI />
        </div>
        
        {/* --- 卡片 2: 風格探測 --- */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700 flex flex-col animate-fade-in transition-all duration-300 hover:-translate-y-1" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-white">風格探測</h2>
          </div>
          <p className="text-gray-400 my-6 flex-grow">不確定想聽什麼？讓 DJ Moo 透過引導式問答，發掘你潛在的音樂靈魂。</p>
          <Link href="/quiz" passHref>
            <button className="w-full flex items-center justify-center h-14 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-lg font-bold text-white transition-all duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 hover:scale-105 shadow-lg shadow-purple-600/30 hover:shadow-purple-500/40">
              開啟音樂探索
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}