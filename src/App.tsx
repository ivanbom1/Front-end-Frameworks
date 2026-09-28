import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import { useState, useEffect } from "react";
import { useMovies } from "./hooks/useMovies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.BASE_URL
const apiUrl = `${import.meta.env.VITE_TMDB_BASE_URL}/movie/popular?language=en-US&page=1;`

const App = () => {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovies(apiUrl);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="app-layout">
      <main className="main-container">
        <h1>Movie App</h1>
        <SearchBar query={query} onChange={setQuery} />
        <MovieList movies={filteredMovies} />
      </main>
    </div>
  );
};

export default App;