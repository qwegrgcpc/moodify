"use client";

import { useState } from "react";
import Header from "@/components/Header";

type Track = {
  id: string;
  name: string;
  artist: string;
  url: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [emotion, setEmotion] = useState("");
  const [genre, setGenre] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);

  const handleGenerate = () => {
    setEmotion("relaxed");
    setGenre("chill");
    setTracks([
      {
        id: "1",
        name: "Magic",
        artist: "WIM",
        url: "https://open.spotify.com/track/1",
      },
      {
        id: "2",
        name: "Ride",
        artist: "HYBS",
        url: "https://open.spotify.com/track/2",
      },
    ]);
  };

  return (
    <div>
      <Header />
      <main className="max-w-xl mx-auto mt-10 p-4">
        <h2 className="text-xl font-medium mb-2">請輸入一句話</h2>
        <textarea
          className="w-full border rounded p-2 mb-4"
          rows={3}
          placeholder="今天好像適合聽點 chill 的歌。"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          🎵 產生播放清單
        </button>

        {emotion && (
          <div className="mt-6">
            <p> 情緒：{emotion}</p>
            <p>音樂風格：{genre}</p>
            <ul className="mt-4 space-y-2">
              {tracks.map((track) => (
                <li key={track.id}>
                  <a
                    href={track.url}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    {track.name} - {track.artist}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
