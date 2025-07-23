"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

const genres = [
  { label: "Lo-fi", value: "lofi" },
  { label: "Jazz", value: "jazz" },
  { label: "Chillhop", value: "chillhop" },
  { label: "Beats", value: "beats" },
  { label: "Dream Pop", value: "dream-pop" },
];

export default function Tabs() {
  const router = useRouter()
  const [genre, setGenre] = useState("")

  const handleGenreClick = (g: string) => {
    setGenre(g)
    router.push(`/music/${encodeURIComponent(g)}`)
  }

  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {genres.map((g) => (
        <button
          key={g.value}
          onClick={() => handleGenreClick(g.value)}
          className={`px-4 py-2 rounded border ${genre === g.value ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
        >
          {g.label}
        </button>
      ))}
    </div>
  )
}
