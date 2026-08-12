export interface Movie {
  id: string;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  popularity: number;
  genres: string[];
  runtime: number | null;
}

export interface MovieApiResponse {
  id: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  description: string | null;
  primaryImage: string | null;
  releaseDate: string | null;
  genres: string[];
  runtimeMinutes: number | null;
  averageRating: number | null;
  numVotes: number | null;
}

export interface MovieSearchResponse {
  rows: number;
  numFound: number;
  results: MovieApiResponse[];
  nextCursorMark?: string;
}

export interface MovieDetailsResponse extends MovieApiResponse {
  popularity?: number | null;
}

export interface Genre {
  id: string;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}
export type MovieDetails = Movie;
