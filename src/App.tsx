import MovieList from "./components/MovieList";
import { SAMPLE_MOVIES } from "./data/sampleMovies";

const App = () => {
  return (
    <div className="app-layout">
      <main className="main-container">
        <h1>Movie App</h1>
        <section>
          <MovieList movies={SAMPLE_MOVIES} />
        </section>
      </main>
    </div>
  );
};

export default App;