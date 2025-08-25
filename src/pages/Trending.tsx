import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { Card } from "@/components/ui/card";
import { tmdb, tmdbImageUrl, TmdbMovie } from "@/integrations/tmdb/client";
import { Footer } from "@/components/Footer";

const Trending = () => {
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const { results } = await tmdb.getTrendingMovies('day', 1);
        setMovies(results);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Trending Movies</h1>
        {error && <Card className="p-6 text-destructive">{error}</Card>}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <Card key={idx} className="aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={String(movie.id)}
                title={movie.title}
                poster={tmdbImageUrl(movie.poster_path, 'original') || ''}
                rating={Math.round((movie.vote_average / 2) * 10) / 10}
                imdbRating={Number(movie.vote_average.toFixed(1))}
                year={movie.release_date ? new Date(movie.release_date).getFullYear() : 0}
                genre={(movie.genres || []).map(g => g.name)}
                cast={[]}
                onClick={() => (window.location.href = `/movie/${movie.id}`)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Trending;


