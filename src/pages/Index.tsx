import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { MovieCard } from "@/components/MovieCard";
import { MovieHero } from "@/components/MovieHero";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Star, Clock } from "lucide-react";
import { tmdb, tmdbImageUrl, TmdbMovie } from "@/integrations/tmdb/client";
import { MovieStats } from "@/components/MovieStats";
import { Footer } from "@/components/Footer";
import { AdUnit } from "@/components/AdUnit";

const Index = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [popular, setPopular] = useState<TmdbMovie[]>([]);
  const [trending, setTrending] = useState<TmdbMovie[]>([]);
  const [recent, setRecent] = useState<TmdbMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch all three categories in parallel
        const [popularRes, trendingRes, recentRes] = await Promise.all([
          tmdb.getPopularMovies(1),
          tmdb.getTrendingMovies('week', 1),
          tmdb.getTopRatedMovies(1) // Using top rated as "recently added" since TMDB doesn't have a "recently added" endpoint
        ]);

        setPopular(popularRes.results);
        setTrending(trendingRes.results);
        setRecent(recentRes.results);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMovies();
  }, []);

  const featured = useMemo(() => popular[0], [popular]);

  const categories = [
    { id: "all", label: "All Movies", icon: Star, count: popular.length },
    { id: "trending", label: "Trending", icon: TrendingUp, count: trending.length },
    { id: "recent", label: "Recently Added", icon: Clock, count: recent.length },
  ];

  // Get the current movies based on selected category
  const currentMovies = useMemo(() => {
    switch (selectedCategory) {
      case "trending":
        return trending;
      case "recent":
        return recent;
      default:
        return popular;
    }
  }, [selectedCategory, popular, trending, recent]);

  // Get the category title and count
  const categoryInfo = useMemo(() => {
    switch (selectedCategory) {
      case "trending":
        return { title: "Trending Movies", count: trending.length };
      case "recent":
        return { title: "Recently Added Movies", count: recent.length };
      default:
        return { title: "All Movies", count: popular.length };
    }
  }, [selectedCategory, popular, trending, recent]);

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const handleTabChange = (categoryId: string) => {
    if (categoryId === selectedCategory) return; // Don't reload if same tab
    
    setSelectedCategory(categoryId);
    setTabLoading(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => setTabLoading(false), 300);
    
    // Smooth scroll to movies section
    const moviesSection = document.getElementById('movies-section');
    if (moviesSection) {
      moviesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      {featured && (
        <MovieHero
          movieId={String(featured.id)}
          title={featured.title}
          description={featured.overview}
          rating={Math.round((featured.vote_average / 2) * 10) / 10}
          imdbRating={Number(featured.vote_average.toFixed(1))}
          year={featured.release_date ? new Date(featured.release_date).getFullYear() : 0}
          runtime={`${featured.runtime || 0}m`}
          genre={(featured.genres || []).map(g => g.name)}
          director={""}
          cast={[]}
          backdropUrl={tmdbImageUrl(featured.backdrop_path, 'original') || tmdbImageUrl(featured.poster_path, 'original') || undefined}
          posterPath={featured.poster_path}
          onWatchTrailer={() => {
            // Navigate to movie detail page where trailer functionality exists
            window.location.href = `/movie/${featured.id}`;
          }}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Ad Space Before Categories */}
        <section className="mb-12">
          <Card className="p-8 bg-muted/10">
            <AdUnit />
          </Card>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <div className="flex flex-wrap gap-4 mb-8">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => handleTabChange(category.id)}
                  className={`flex items-center gap-2 transition-all duration-200 ${
                    isActive 
                      ? "bg-rating-gold text-background hover:bg-rating-gold/90 shadow-lg scale-105" 
                      : "hover:bg-muted/50 hover:scale-105"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-background" : "text-foreground"}`} />
                  {category.label}
                  <Badge 
                    variant={isActive ? "secondary" : "outline"} 
                    className={`ml-1 text-xs ${
                      isActive ? "bg-background/20 text-background" : "text-muted-foreground"
                    }`}
                  >
                    {category.count}
                  </Badge>
                </Button>
              );
            })}
          </div>
        </section>

        {/* Movies Grid */}
        <section id="movies-section" className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">{categoryInfo.title}</h2>
            <Badge variant="secondary">
              {categoryInfo.count} Movies Available
            </Badge>
          </div>

          {error && (
            <Card className="p-6 text-center text-destructive">{error}</Card>
          )}
          {(loading || tabLoading) ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <Card key={idx} className="aspect-[3/4] animate-pulse" />
              ))}
            </div>
          ) : (
            <div 
              key={selectedCategory} 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in-50 duration-300"
            >
              {currentMovies.map((movie) => (
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
                  onClick={() => handleMovieClick(String(movie.id))}
                />
              ))}
            </div>
          )}
        </section>

        {/* Ad Space */}
        <section className="my-16">
          <Card className="p-8 bg-muted/10">
            <AdUnit />
          </Card>
        </section>

        {/* Stats Section */}
        <MovieStats />
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
