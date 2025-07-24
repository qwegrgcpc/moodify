"use client";

import { useState } from "react";

export default function InputWithAI({
  genre,
  onSearch,
}: {
  genre?: string;
  onSearch: (q: string) => void;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!text) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text }),
      });

      const data = await res.json();
      if (data.keywords) {
        onSearch(`${data.keywords} ${genre || ""}`.trim());
      }
    } catch (err) {
      alert(`AI 轉換失敗 ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="輸入一句話，例如：下雨天想專心工作"
        className="w-full p-2 rounded text-white placeholder-gray bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        onClick={handleClick}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "分析中..." : "AI 幫我找音樂"}
      </button>
    </div>
  );
}
