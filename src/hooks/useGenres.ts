import { SAMPLE_MOVIES } from "../data/sampleMovies";
import { useState, useEffect, useMemo } from "react";
import { Genre } from "../types";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const GENRES_URL = import.meta.env.VITE_TMDB_GENRE_URL;

export const useGenres = (url: string = GENRES_URL) => {
    const [genres, setGenres] = useState<Genre[]>([]);
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
          .then((data) => setGenres(data.genres ?? []))
          .catch((err) => setError(err.message))
          .finally(() => setLoading(false));
    }, [url]);

    const genreMap = useMemo(
        () => Object.fromEntries(genres.map((g) => [g.id, g.name])) as Record<number, string>,[genres]
    );

    return { genres, genreMap, loading, error };
};