import { NextResponse } from "next/server";
import { YouTubeSearchListResponse, YouTubeSearchResult } from "@/types/youtube";

export async function POST(req: Request) {
  const { query } = await req.json();
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&type=video&videoCategoryId=10&key=${process.env.YOUTUBE_API_KEY}&maxResults=10`;

  const res = await fetch(url);
  const data: YouTubeSearchListResponse = await res.json();

  const videos = data.items.map((item: YouTubeSearchResult) => ({
    id: item.id.videoId,
    title: item.snippet.title,
    channel: item.snippet.channelTitle,
    thumbnail: item.snippet.thumbnails?.default?.url,
    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  }));

  return NextResponse.json({ query, videos });
}