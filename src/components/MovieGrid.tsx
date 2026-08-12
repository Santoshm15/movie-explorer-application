import type { Movie } from "../types/Movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const MovieGrid = ({ movies, favorites, onToggleFavorite }: MovieGridProps) => {
  const favoriteIds = favorites.map((movie) => movie.id);

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
};

export default MovieGrid;
