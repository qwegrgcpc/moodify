"use client";
import { useState } from "react";
import Tabs from "@/components/Tabs";
import MusicCard from "@/components/MusicCard";
import useYoutubeSearch from "@/hooks/useYoutubeSearch";

export default function Home() {
  const [query, setQuery] = useState("");
  const { results, loading, fetchMusic } = useYoutubeSearch();

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
        onClick={() => fetchMusic(query)}
      >
        搜尋
      </button>

      {loading && <p className="mt-4">載入中...</p>}

      <div className="mt-6 space-y-4">
        {results.map((video) => (
          <MusicCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
