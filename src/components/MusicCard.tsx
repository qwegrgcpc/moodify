"useStrict";
import { YouTubeSearchResult } from "@/types/youtube";

export default function MusicCard({ video }: { video: YouTubeSearchResult }) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <p className="font-semibold text-lg">{video.title}</p>
      <p className="text-sm text-gray-400 mb-2">{video.channel}</p>
      <iframe
        className="w-full rounded"
        height="200"
        src={`https://www.youtube.com/embed/${video.id}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
}