"use client";
import { useEffect, use } from "react";
import InputWithAI from "@/components/InputWithAI";
import MusicCard from "@/components/MusicCard";
import useYoutubeSearch from "@/hooks/useYoutubeSearch";

type Params = {
  genre: string;
};

export default function MusicPage({ params }: { params: Promise<Params> }) {
  const { genre } = use(params);
  const { results, loading, fetchMusic } = useYoutubeSearch();

  useEffect(() => {
    fetchMusic(genre);
  }, [fetchMusic, genre]);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">🎧 {genre} 音樂牆</h1>
      <InputWithAI genre={genre} onSearch={fetchMusic} />
      {loading ? (
        <p>載入中...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {results.map((video) => (
            <MusicCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}
