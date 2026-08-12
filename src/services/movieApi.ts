import type { Genre, Movie, MovieDetails } from "../types/Movie";

const API_URL = "https://imdb236.p.rapidapi.com/api/imdb";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

const API_HOST = "imdb236.p.rapidapi.com";

const request = async (endpoint: string) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const data = await request("/top250-movies");

  return data.map(
    (item: any): Movie => ({
      id: item.id,
      title: item.primaryTitle || item.originalTitle || "Untitled",
      overview: item.description || "",
      poster_path: item.primaryImage || item.thumbnails?.[0]?.url || "",
      release_date: item.releaseDate || "",
      vote_average: item.averageRating || 0,
      popularity: item.numVotes || 0,
      genres: item.genres || [],
      runtime: item.runtimeMinutes || null,
    }),
  );
};

export const getGenres = async (): Promise<Genre[]> => {
  const data = await request("/genres");

  return data.map(
    (genre: string): Genre => ({
      id: genre,
      name: genre,
    }),
  );
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const data = await request(`/search?query=${encodeURIComponent(query)}`);

  const results = Array.isArray(data) ? data : data.results || [];

  return results.map(
    (item: any): Movie => ({
      id: item.id,
      title: item.primaryTitle || item.originalTitle || "Untitled",
      overview: item.description || "",
      poster_path: item.primaryImage || item.thumbnails?.[0]?.url || "",
      release_date: item.releaseDate || "",
      vote_average: item.averageRating || 0,
      popularity: item.numVotes || 0,
      genres: item.genres || [],
      runtime: item.runtimeMinutes || null,
    }),
  );
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const data = await request(`/${id}`);

  return {
    id: data.id,
    title: data.primaryTitle || data.originalTitle || "Untitled",
    overview: data.description || "",
    poster_path: data.primaryImage || data.thumbnails?.[0]?.url || "",
    release_date: data.releaseDate || "",
    vote_average: data.averageRating || 0,
    popularity: data.numVotes || 0,
    genres: data.genres || [],
    runtime: data.runtimeMinutes || null,
  };
};
