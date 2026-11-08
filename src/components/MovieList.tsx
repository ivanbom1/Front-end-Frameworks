import { Movie } from "../types.ts";
import MovieCard from "./MovieCard";
import { useGenres } from "../hooks/useGenres";

interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;   // 1. add to the type
}

const MovieList = ({ movies, onMovieClick }: MovieListProps) => {   // 2. receive it
  const { genreMap } = useGenres();

  return (
    <div className="movies-grid">
      {movies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            genreMap={genreMap}
            onMovieClick={onMovieClick}   // 3. pass it to the card
          />
        ))
      )}
    </div>
  );
};

export default MovieList;