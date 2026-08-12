import { useNavigate } from "react-router-dom";
import type { Movie } from "../types/Movie";

interface MovieCardProps {
  movie: Movie;
  isFavorite: boolean;
  onToggleFavorite: (movie: Movie) => void;
}

const MovieCard = ({ movie, isFavorite, onToggleFavorite }: MovieCardProps) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleFavorite = () => {
    onToggleFavorite(movie);
  };

  return (
    <article className="movie-card">
      {movie.poster_path ? (
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="movie-poster"
        />
      ) : (
        <div className="movie-poster-placeholder">No Poster</div>
      )}

      <div className="movie-card-content">
        <h3>{movie.title}</h3>

        <p>
          <strong>Release Date:</strong> {movie.release_date || "Unknown"}
        </p>

        <p>
          <strong>Rating:</strong>{" "}
          {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : "Not Rated"}
        </p>

        <p>
          <strong>Genre:</strong>{" "}
          {movie.genres.length > 0 ? movie.genres.join(", ") : "Unknown"}
        </p>

        <div className="movie-card-actions">
          <button
            type="button"
            className="details-button"
            onClick={handleViewDetails}
          >
            View Details
          </button>

          <button
            type="button"
            className={`favorite-button ${isFavorite ? "favorite-active" : ""}`}
            onClick={handleFavorite}
          >
            {isFavorite ? "★ Remove Favorite" : "☆ Add Favorite"}
          </button>
        </div>
      </div>
    </article>
  );
};

export default MovieCard;
