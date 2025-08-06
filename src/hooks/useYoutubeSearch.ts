import { useState, useCallback } from 'react';
import { YouTubeSearchResult } from '@/types/youtube';
import { mockYoutubeResults as mock } from '@/mocks/youtubeSearch.mock';

export default function useYoutubeSearch() {
  const [results, setResults] = useState<YouTubeSearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMusic = useCallback(
    async (query: string) => {
      setLoading(true);

      if (process.env.NEXT_PUBLIC_USE_MOCK === 'true') {
        setResults(mock);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/api/youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });
        const data = await res.json();
        setResults(data.music || []);
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    },
    [setResults, setLoading]
  );

  return { results, loading, fetchMusic };
}
