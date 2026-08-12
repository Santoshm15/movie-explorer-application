import { useEffect, useMemo, useState } from "react";

import { useSearchParams } from "react-router-dom";

import type { Genre, Movie } from "../types/Movie";

import {
  getGenres,
  getPopularMovies,
  searchMovies,
} from "../services/movieApi";

import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

interface MoviesProps {
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

const Movies = ({ favorites, onToggleFavorite }: MoviesProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [searchText, setSearchText] = useState<string>(
    searchParams.get("search") ?? "",
  );

  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const [selectedSort, setSelectedSort] = useState<string>("default");

  const [loading, setLoading] = useState<boolean>(true);

  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await getGenres();

        setGenres(data);
      } catch {
        setGenres([]);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        setError("");

        const query = searchParams.get("search") ?? "";

        let data: Movie[];

        if (query.trim()) {
          data = await searchMovies(query);
        } else {
          data = await getPopularMovies();
        }

        setMovies(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load movies.");

        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [searchParams]);

  const handleSearch = () => {
    const searchValue = searchText.trim();

    if (searchValue) {
      setSearchParams({
        search: searchValue,
      });
    } else {
      setSearchParams({});
    }
  };

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (selectedGenre !== "all") {
      result = result.filter((movie) => movie.genres.includes(selectedGenre));
    }

    if (selectedSort === "high") {
      result.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (selectedSort === "low") {
      result.sort((a, b) => a.vote_average - b.vote_average);
    }

    return result;
  }, [movies, selectedGenre, selectedSort]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGenre(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSort(event.target.value);
  };

  return (
    <main className="page-container">
      <section className="page-header">
        <p className="hero-label">MOVIE LIBRARY</p>

        <h1>Movies</h1>

        <p>Search, filter, and sort movies.</p>
      </section>

      <section className="movies-controls">
        <SearchBar
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onSearch={handleSearch}
        />

        <Filter
          genres={genres}
          selectedGenre={selectedGenre}
          selectedSort={selectedSort}
          onGenreChange={handleGenreChange}
          onSortChange={handleSortChange}
        />
      </section>

      {loading && <Loader />}

      {!loading && error && <ErrorMessage message={error} />}

      {!loading && !error && filteredMovies.length === 0 && (
        <div className="empty-state">
          <h2>No movies found.</h2>

          <p>Try a different search or filter.</p>
        </div>
      )}

      {!loading && !error && filteredMovies.length > 0 && (
        <>
          <div className="results-info">
            <p>
              Showing <strong>{filteredMovies.length}</strong> movies
            </p>
          </div>

          <MovieGrid
            movies={filteredMovies}
            favorites={favorites}
            onToggleFavorite={onToggleFavorite}
          />
        </>
      )}
    </main>
  );
};

export default Movies;
