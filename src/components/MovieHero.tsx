import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { Play, Bookmark, Share } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

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
}: MovieHeroProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
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
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              {title}
            </h1>
            
            {/* Movie Info */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="font-medium">{year}</span>
              <span>•</span>
              <span>{runtime}</span>
              <span>•</span>
              <span>Directed by {director}</span>
            </div>
          </div>

          {/* Ratings */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">imdb Rating</div>
              <div className="flex items-center gap-2">
                <span className="text-3xl font-bold text-rating-gold">{rating}</span>
                <span className="text-muted-foreground">/5</span>
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-sm text-muted-foreground">User Rating</div>
              <StarRating rating={rating} size="lg" />
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* Cast */}
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Starring</div>
            <p className="text-foreground">{cast.slice(0, 4).join(", ")}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-rating">
              <Play className="w-5 h-5 mr-2" />
              Watch Trailer
            </Button>
            <Button variant="outline" size="lg">
              <Bookmark className="w-5 h-5 mr-2" />
              Add to Watchlist
            </Button>
            <Button variant="ghost" size="lg">
              <Share className="w-5 h-5 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};