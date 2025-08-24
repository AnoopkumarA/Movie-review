import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { MovieHero } from "@/components/MovieHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
// import { movies, featuredMovie } from "@/data/movies";
import { TrendingUp, Star, Clock } from "lucide-react";
import { tmdb, tmdbImageUrl, TmdbMovie } from "@/integrations/tmdb/client";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [popular, setPopular] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        setError(null);
        const { results } = await tmdb.getPopularMovies(1);
        setPopular(results);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  const featured = useMemo(() => popular[0], [popular]);

  const categories = [
    { id: "all", label: "All Movies", icon: Star },
    { id: "trending", label: "Trending", icon: TrendingUp },
    { id: "recent", label: "Recently Added", icon: Clock },
  ];

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      {featured && (
        <MovieHero
          title={featured.title}
          description={featured.overview}
          rating={Math.round((featured.vote_average / 2) * 10) / 10}
          imdbRating={featured.vote_average}
          year={featured.release_date ? new Date(featured.release_date).getFullYear() : 0}
          runtime={`${featured.runtime || 0}m`}
          genre={(featured.genres || []).map(g => g.name)}
          director={""}
          cast={[]}
          backdropUrl={tmdbImageUrl(featured.backdrop_path, 'w500') || tmdbImageUrl(featured.poster_path, 'w500') || undefined}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* Movies Grid */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Movies</h2>
            <Badge variant="secondary">
              {popular.length} Movies Available
            </Badge>
          </div>

          {error && (
            <Card className="p-6 text-center text-destructive">{error}</Card>
          )}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Card key={idx} className="aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {popular.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={String(movie.id)}
                  title={movie.title}
                  poster={tmdbImageUrl(movie.poster_path, 'w500') || ''}
                  rating={Math.round((movie.vote_average / 2) * 10) / 10}
                  imdbRating={movie.vote_average}
                  year={movie.release_date ? new Date(movie.release_date).getFullYear() : 0}
                  genre={(movie.genres || []).map(g => g.name)}
                  cast={[]}
                  onClick={() => handleMovieClick(String(movie.id))}
                />
              ))}
            </div>
          )}
        </section>

        {/* Ad Space */}
        <section className="my-16">
          <Card className="p-8 text-center bg-muted/50 border-dashed">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">Advertisement Space</p>
              <p className="text-sm">Google AdSense integration ready - Premium ad placement</p>
            </div>
          </Card>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">850+</div>
            <div className="text-muted-foreground">Movies Reviewed</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">15K+</div>
            <div className="text-muted-foreground">User Reviews</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8</div>
            <div className="text-muted-foreground">Average Rating</div>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Index;
