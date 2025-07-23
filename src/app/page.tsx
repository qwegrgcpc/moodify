"use client";
import { useState } from "react";
import { YouTubeSearchResult } from "@/types/youtube";
import Tabs from "@/components/Tabs";
import MusicCard from "@/components/MusicCard";

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<YouTubeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    setLoading(true);
    const res = await fetch('/api/youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });
    const data = await res.json();
    setResults(data.videos);
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🎶 選擇曲風建立音樂牆</h1>
      <Tabs />
      <h1 className="text-2xl font-bold mb-4">🎶 依關鍵字進行搜尋</h1>
      <input
        type="text"
        placeholder="輸入關鍵字"
        className="w-full p-2 border rounded mb-4"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={search}
      >搜尋</button>

      {loading && <p className="mt-4">載入中...</p>}

      <div className="mt-6 space-y-4">
        {results.map((video) => (
          <MusicCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
