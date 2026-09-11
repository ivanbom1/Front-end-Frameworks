import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

const App = () => {
  return (
    <div className="app-layout">
      <main className="main-container">
        <h1>Movie App</h1>
        <SearchBar />
        <MovieList movies={SAMPLE_MOVIES} />
      </main>
    </div>
  );
};

export default App;