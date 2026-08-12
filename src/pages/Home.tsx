import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import type { Movie } from "../types/Movie";
import { getPopularMovies } from "../services/movieApi";

import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

interface HomeProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const Home = ({ favorites, onToggleFavorite }: HomeProps) => {
  const navigate = useNavigate();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadFeaturedMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getPopularMovies();

        setMovies(data.slice(0, 6));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load movies.");
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedMovies();
  }, []);

  const handleSearch = () => {
    const searchValue = searchText.trim();

    if (searchValue) {
      navigate(`/movies?search=${encodeURIComponent(searchValue)}`);
    } else {
      navigate("/movies");
    }
  };

  const handleExploreMovies = () => {
    navigate("/movies");
  };

  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <p className="hero-label">DISCOVER MOVIES</p>

          <h1>Movie Explorer</h1>

          <p className="hero-description">
            Explore movies, search for your favorite titles, check movie
            details, and save movies to your favorites.
          </p>

          <SearchBar
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onSearch={handleSearch}
          />

          <button
            type="button"
            className="explore-button"
            onClick={handleExploreMovies}
          >
            Explore Movies
          </button>
        </div>
      </section>

      <section className="featured-section">
        <div className="section-heading">
          <h2>Featured Movies</h2>

          <p>Explore some popular movies.</p>
        </div>

        {loading && <Loader />}

        {!loading && error && <ErrorMessage message={error} />}

        {!loading && !error && movies.length > 0 && (
          <MovieGrid
            movies={movies}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        )}

        {!loading && !error && movies.length === 0 && (
          <div className="empty-state">
            <h2>No movies found.</h2>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
