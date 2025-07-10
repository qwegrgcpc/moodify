import { NextResponse } from "next/server";
import { YouTubeSearchListResponse, YouTubeSearchItem, YouTubeSearchResult } from "@/types/youtube";

export async function GET() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=lofi%20chill&type=video&videoCategoryId=10&key=${process.env.YOUTUBE_API_KEY}&maxResults=10`;

  const res = await fetch(url);
  const data: YouTubeSearchListResponse = await res.json();

  const videos = data.items.map((item: YouTubeSearchItem): YouTubeSearchResult => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.default?.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));

  return NextResponse.json({ videos });
}