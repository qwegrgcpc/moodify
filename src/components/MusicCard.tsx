'use client';

import { useState } from 'react';
import Image from 'next/image';
import { YouTubeSearchResult } from '@/types/youtube';
import { PlayIcon } from '@/components/icons';

export default function MusicCard({ video }: { video: YouTubeSearchResult }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const thumbnailUrl = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const embedUrl = `https://www.youtube.com/embed/${video.id}?autoplay=1`;

  return (
    <div className="group bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/30">
      <div className="relative mb-4 overflow-hidden rounded-lg aspect-video">
        {!isPlaying ? (
          <div
            onClick={() => setIsPlaying(true)}
            className="relative h-full w-full cursor-pointer"
          >
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 bg-purple-600/70 rounded-full flex items-center justify-center backdrop-blur-sm">
                <PlayIcon className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        ) : (
          <iframe
            className="w-full h-full absolute inset-0"
            src={embedUrl}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
      <div>
        <h3
          className="font-bold text-white text-lg leading-tight line-clamp-2"
          title={video.title}
        >
          {video.title}
        </h3>
        <p className="text-sm text-gray-400 mt-1">{video.channel}</p>
      </div>
    </div>
  );
}
