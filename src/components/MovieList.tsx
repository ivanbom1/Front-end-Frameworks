import { Movie } from "../types.ts";
import MovieCard from "./MovieCard";
import { useGenres } from "../hooks/useGenres";

interface MovieListProps {
  movies: Movie[];
}

const MovieList = ({ movies }: MovieListProps) => {
  const { genreMap } = useGenres();

  return (
    <div className="movies-grid">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} genreMap={genreMap} />))
      )}
    </div>
  );
};

export default MovieList;