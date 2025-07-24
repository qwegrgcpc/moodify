import { useState } from "react";
import { YouTubeSearchResult } from "@/types/youtube";

export default function useYoutubeSearch() {
    const [results, setResults] = useState<YouTubeSearchResult[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchMusic = async (query: string) => {
        setLoading(true);
        try {
            const res = await fetch('/api/youtube', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query })
            });
            const data = await res.json();
            setResults(data.music || []);
        } catch (error) {
            console.error("Error fetching YouTube videos:", error);
        } finally {
            setLoading(false);
        }
    };

    return { results, loading, fetchMusic };
}