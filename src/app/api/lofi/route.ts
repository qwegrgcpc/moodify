import { NextRequest, NextResponse } from "next/server";
import { YouTubeSearchListResponse, YouTubeSearchItem, YouTubeSearchResult } from "@/types/youtube";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || 'lofi chill';

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    q
  )}&type=video&videoCategoryId=10&key=${process.env.YOUTUBE_API_KEY}&maxResults=10`;

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