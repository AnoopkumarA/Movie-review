const TMDB_BASE_URL = "https://api.themoviedb.org/3";

export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  vote_count?: number;
  release_date: string;
  runtime?: number;
  genres?: { id: number; name: string }[];
  poster_path: string | null;
}

export interface TmdbReview {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: { rating?: number | null };
}

export interface TmdbCredit {
  id: number;
  name: string;
  character?: string;
  job?: string;
  profile_path: string | null;
  department?: string;
}

const getApiKey = (): string => {
  const key = import.meta.env.VITE_TMDB_API_KEY as string | undefined;
  if (!key) {
    console.warn("VITE_TMDB_API_KEY is not set. Please add it to your .env file.");
    return "";
  }
  return key;
};

const buildUrl = (path: string, params: Record<string, string | number | undefined> = {}) => {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", getApiKey());
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });
  return url.toString();
};

export const tmdb = {
  async getPopularMovies(page = 1) {
    const res = await fetch(buildUrl("/movie/popular", { page }));
    if (!res.ok) throw new Error("Failed to fetch popular movies");
    return res.json() as Promise<{ results: TmdbMovie[] }>; 
  },

  async getMovieDetails(movieId: string | number) {
    const res = await fetch(buildUrl(`/movie/${movieId}`));
    if (!res.ok) throw new Error("Failed to fetch movie details");
    return res.json() as Promise<TmdbMovie>;
  },

  async getMovieCredits(movieId: string | number) {
    const res = await fetch(buildUrl(`/movie/${movieId}/credits`));
    if (!res.ok) throw new Error("Failed to fetch movie credits");
    return res.json() as Promise<{ cast: TmdbCredit[]; crew: TmdbCredit[] }>;
  },

  async getMovieReviews(movieId: string | number, page = 1) {
    const res = await fetch(buildUrl(`/movie/${movieId}/reviews`, { page }));
    if (!res.ok) throw new Error("Failed to fetch movie reviews");
    return res.json() as Promise<{ results: TmdbReview[] }>;
  },
};

export const tmdbImageUrl = (path: string | null, size: 'w185' | 'w342' | 'w500' | 'original' = 'w342') => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};


