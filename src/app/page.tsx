"use client";

import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
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
      <h1 className="text-2xl font-bold mb-4">🎶 依文字產生播放清單</h1>
      <input
        type="text"
        placeholder="輸入一句話..."
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
          <div key={video.id} className="border p-3 rounded">
            <p className="font-semibold">{video.title}</p>
            <p className="text-sm text-gray-500">{video.channel}</p>
            <iframe
              className="mt-2"
              width="100%"
              height="180"
              src={`https://www.youtube.com/embed/${video.id}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}
