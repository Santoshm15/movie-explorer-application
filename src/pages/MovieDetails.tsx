import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import type { Movie } from "../types/Movie";
import { getMovieDetails } from "../services/movieApi";

import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

interface MovieDetailsProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const MovieDetails = ({ favorites, onToggleFavorite }: MovieDetailsProps) => {
  const { id } = useParams<{
    id: string;
  }>();

  const navigate = useNavigate();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadMovieDetails = async () => {
      if (!id) {
        setError("Movie not found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to load movie details.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const handleBackToMovies = () => {
    navigate("/movies");
  };

  const handleFavorite = () => {
    if (!movie) {
      return;
    }

    onToggleFavorite(movie);
  };

  if (loading) {
    return (
      <main className="page-container">
        <Loader />
      </main>
    );
  }

  if (error) {
    return (
      <main className="page-container">
        <ErrorMessage message={error} />

        <button
          type="button"
          className="back-button"
          onClick={handleBackToMovies}
        >
          Back to Movies
        </button>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="page-container">
        <ErrorMessage message="Movie not found." />

        <button
          type="button"
          className="back-button"
          onClick={handleBackToMovies}
        >
          Back to Movies
        </button>
      </main>
    );
  }

  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  return (
    <main className="page-container">
      <button
        type="button"
        className="back-button"
        onClick={handleBackToMovies}
      >
        ← Back to Movies
      </button>

      <section className="details-section">
        <div className="details-poster-wrapper">
          {movie.poster_path ? (
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="details-poster"
            />
          ) : (
            <div className="details-poster-placeholder">No Poster</div>
          )}
        </div>

        <div className="details-content">
          <p className="hero-label">MOVIE DETAILS</p>

          <h1>{movie.title}</h1>

          <div className="details-rating">
            ⭐{" "}
            {movie.vote_average > 0
              ? movie.vote_average.toFixed(1)
              : "Not Rated"}
          </div>

          <p className="details-overview">{movie.overview}</p>

          <div className="details-info">
            <div>
              <strong>Release Date</strong>

              <span>{movie.release_date || "Unknown"}</span>
            </div>

            <div>
              <strong>Rating</strong>

              <span>
                {movie.vote_average > 0
                  ? movie.vote_average.toFixed(1)
                  : "Not Rated"}
              </span>
            </div>

            <div>
              <strong>Genres</strong>

              <span>
                {movie.genres.length > 0 ? movie.genres.join(", ") : "Unknown"}
              </span>
            </div>

            <div>
              <strong>Runtime</strong>

              <span>
                {movie.runtime !== null
                  ? `${movie.runtime} minutes`
                  : "Unknown"}
              </span>
            </div>

            <div>
              <strong>Popularity</strong>

              <span>
                {movie.popularity > 0
                  ? movie.popularity.toLocaleString()
                  : "Unknown"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="favorite-main-button"
            onClick={handleFavorite}
          >
            {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default MovieDetails;
