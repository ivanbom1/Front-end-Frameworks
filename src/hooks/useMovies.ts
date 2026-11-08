import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useMovies = (url: string) => {
    const [movies, setMovies] = useState(SAMPLE_MOVIES);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(url, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
        })
          .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
          })
          .then((data) => setMovies(data.results))
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
    }, [url]);

    return { movies, loading, error };
};