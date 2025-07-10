"use client";

import { useEffect, useState } from "react";
import { YouTubeSearchResult } from "@/types/youtube";
import InputWithAI from "@/components/InputWithAI";

export default function LoFiPage() {
  const [results, setResults] = useState<YouTubeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVideos = async (q: string = "lofi chill") => {
    setLoading(true);
    const res = await fetch(`/api/lofi?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setResults(data.videos);
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">🎧 Lo-fi 音樂牆</h1>
      <InputWithAI onSearch={fetchVideos} />
      {loading ? (
        <p>載入中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((video) => (
            <div
              key={video.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg"
            >
              <p className="font-semibold text-lg">{video.title}</p>
              <p className="text-sm text-gray-400 mb-2">{video.channel}</p>
              <iframe
                className="w-full rounded"
                height="200"
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
