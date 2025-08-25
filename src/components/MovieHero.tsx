import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Play, Bookmark, Share, Check } from "lucide-react";
import { useWatchlist } from "@/hooks/useWatchlist";
import heroBackground from "@/assets/hero-background-4k.jpg";

interface MovieHeroProps {
  title: string;
  description: string;
  rating: number;
  imdbRating: number;
  year: number;
  runtime: string;
  genre: string[];
  director: string;
  cast: string[];
  backdropUrl?: string | null;
  onWatchTrailer?: () => void;
  movieId?: string;
  posterPath?: string | null;
}

export const MovieHero = ({
  title,
  description,
  rating,
  imdbRating,
  year,
  runtime,
  genre,
  director,
  cast,
  backdropUrl,
  onWatchTrailer,
  movieId,
  posterPath,
}: MovieHeroProps) => {
  const { add, exists, remove } = useWatchlist();
  const effectiveMovieId = movieId || (typeof window !== 'undefined' ? window.location.pathname.split('/').pop() || '' : '');
  const inWatchlist = exists(effectiveMovieId);
  const toggleWatchlist = () => {
    if (!effectiveMovieId) return;
    if (inWatchlist) {
      remove(effectiveMovieId);
    } else {
      add(effectiveMovieId, title, posterPath ?? null);
    }
  };
  return (
    <section className="relative min-h-[60vh] md:min-h-[80vh] flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl || heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40 md:from-background md:via-background/80 md:to-background/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl space-y-6">
          {/* Genre Tags */}
          <div className="flex flex-wrap gap-2">
            {genre.map((g) => (
              <Badge key={g} variant="secondary" className="bg-secondary/80">
                {g}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            
            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-muted-foreground">
              <span className="font-medium">{year}</span>
              <span className="hidden sm:inline">•</span>
              <span>{runtime}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Directed by {director}</span>
              <span className="sm:hidden">• {director}</span>
            </div>
          </div>

          {/* Ratings */}
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 sm:gap-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">imdb Rating</div>
              <div className="flex items-center gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-rating-gold">{rating.toFixed(2)}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">User Rating</div>
              <StarRating rating={rating} size="lg" />
            </div>
          </div>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* Cast */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Starring</div>
            <p className="text-sm md:text-base text-foreground">{cast.slice(0, 4).join(", ")}</p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row gap-3 sm:gap-4 pt-4">
            <Button size="default" className="w-full sm:w-auto sm:size-lg bg-primary hover:bg-primary/90 shadow-rating" onClick={onWatchTrailer}>
              <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Watch Trailer
            </Button>
            {effectiveMovieId && (
            <Button variant="outline" size="default" className="w-full sm:w-auto sm:size-lg" onClick={toggleWatchlist}>
              {inWatchlist ? <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
              {inWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            </Button>
            )}
            <Button variant="ghost" size="default" className="w-full sm:w-auto sm:size-lg col-span-2 sm:col-span-1" onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: title,
                  text: description,
                  url: window.location.href
                });
              } else {
                // Fallback for browsers that don't support Web Share API
                navigator.clipboard.writeText(window.location.href);
                // You could add a toast notification here
              }
            }}>
              <Share className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};