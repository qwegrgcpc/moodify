"use client";
import { useRouter } from "next/navigation";
import { useState } from "react"

const genres = ["lofi", "jazz", "chill", "ambient"]

export default function Tabs() {
  const router = useRouter()
  const [genre, setGenre] = useState("")

  const handleGenreClick = (g: string) => {
    setGenre(g)
    router.push(`/music/${encodeURIComponent(g)}`)
  }

  return (
    <div className="flex space-x-3 mb-4">
      {genres.map((g) => (
        <button
          key={g}
          onClick={() => handleGenreClick(g)}
          className={`px-4 py-2 rounded ${
            genre === g ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  )
}
