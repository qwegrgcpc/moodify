"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import MusicCard from "@/components/MusicCard";
import useYoutubeSearch from "@/hooks/useYoutubeSearch";

const SpinnerIcon = (props: React.ComponentProps<"svg">) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

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
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
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
