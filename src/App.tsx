import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";
import { useState, useEffect } from "react";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(SAMPLE_MOVIES);

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", {
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
      .catch((err) => console.error(err));
  }, []);

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