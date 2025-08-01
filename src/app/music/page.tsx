"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MusicCard from "@/components/MusicCard";
import useYoutubeSearch from "@/hooks/useYoutubeSearch";
import { SpinnerIcon, ArrowIcon } from "@/components/icons";

function MusicSearchResult() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const genre = searchParams.get("genre") || "lofi";

  const { results, loading, fetchMusic } = useYoutubeSearch();

  useEffect(() => {
    if (genre && genre !== "lofi") {
      fetchMusic(genre);
    }
  }, [fetchMusic, genre]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center text-gray-400 py-20">
          <SpinnerIcon className="animate-spin h-12 w-12 mb-4" />
          <p>
            正在為您尋找{" "}
            <span className="text-purple-400 font-semibold">{genre}</span>{" "}
            的音樂...
          </p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="text-center text-gray-500 py-20">
          <p>找不到關於「{genre}」的音樂，請回首頁試試其他關鍵字。</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {results.map((video) => (
          <MusicCard key={video.id} video={video} />
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in w-full max-w-7xl mx-auto">
      <div className="mb-8 flex items-center gap-4 flex-wrap">
        <button 
          onClick={() => router.push('/')} 
          className="p-2 rounded-full bg-slate-800/70 hover:bg-slate-700 transition-colors flex-shrink-0"
        >
          <ArrowIcon className="w-6 h-6" />
        </button>

        <h2 className="text-xl font-bold text-gray-400 whitespace-nowrap">
          Mood:
        </h2>

        {/* 標籤區域 */}
        {genre && genre.split(' ').map((keyword, index) => (
          <span 
            key={index} 
            className="bg-purple-500/80 text-purple-100 px-4 py-1.5 rounded-full text-base font-medium"
          >
            {keyword}
          </span>
        ))}
      </div>
      {renderContent()}
    </div>
  );
}

export default function MusicPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <SpinnerIcon className="animate-spin h-12 w-12 text-purple-400" />
        </div>
      }
    >
      <div className="min-h-screen bg-slate-900 p-4 sm:p-8">
        <MusicSearchResult />
      </div>
    </Suspense>
  );
}
