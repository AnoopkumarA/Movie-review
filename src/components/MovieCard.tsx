import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StarRating } from "./StarRating";
import { cn } from "@/lib/utils";
import { Calendar, Users } from "lucide-react";

interface MovieCardProps {
  id: string;
  title: string;
  poster: string;
  rating: number;
  imdbRating: number;
  year: number;
  genre: string[];
  cast: string[];
  onClick?: () => void;
  className?: string;
}

export const MovieCard = ({
  title,
  poster,
  rating,
  imdbRating,
  year,
  genre,
  cast,
  onClick,
  className,
}: MovieCardProps) => {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden bg-card border-border cursor-pointer",
        "transition-all duration-300 hover:bg-card-hover hover:shadow-movie-card",
        "hover:scale-105 hover:-translate-y-2",
        className
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-movie-card opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm rounded-lg px-2 py-1">
          <div className="flex items-center gap-1">
            <span className="text-rating-gold font-bold text-sm">{imdbRating}</span>
            <span className="text-muted-foreground text-xs">/10</span>
          </div>
        </div>

        {/* Genre Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="text-xs">
            {genre[0]}
          </Badge>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="font-bold text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{year}</span>
          </div>
        </div>

        <div className="space-y-2">
          <StarRating rating={rating} size="sm" />
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span className="line-clamp-1">{cast.slice(0, 2).join(", ")}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1">
          {genre.slice(1, 3).map((g) => (
            <Badge key={g} variant="outline" className="text-xs">
              {g}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
};