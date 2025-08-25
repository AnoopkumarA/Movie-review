import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export const StarRating = ({
  rating,
  maxRating = 5,
  size = "md",
  showNumber = true,
  interactive = false,
  onRatingChange,
}: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const handleStarClick = (starIndex: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  const renderStar = (index: number) => {
    const starValue = index + 1;
    const isFullyFilled = starValue <= Math.floor(rating);
    const isPartiallyFilled = starValue === Math.ceil(rating) && rating % 1 !== 0;
    const partialFillPercentage = isPartiallyFilled ? (rating % 1) * 100 : 0;

    return (
      <div
        key={index}
        className={cn(
          "relative transition-all duration-200",
          interactive && "cursor-pointer hover:scale-110"
        )}
        onClick={() => handleStarClick(index)}
      >
        {/* Background star (always visible) */}
        <Star
          className={cn(
            sizeClasses[size],
            "text-rating-muted transition-smooth",
            interactive && "hover:text-rating-gold/60"
          )}
          fill="currentColor"
        />
        
        {/* Filled star overlay */}
        {(isFullyFilled || isPartiallyFilled) && (
          <div className="absolute top-0 left-0 overflow-hidden">
            <Star
              className={cn(
                sizeClasses[size],
                "text-rating-gold transition-smooth"
              )}
              fill="currentColor"
              style={{
                clipPath: isPartiallyFilled 
                  ? `polygon(0% 0%, ${partialFillPercentage}% 0%, ${partialFillPercentage}% 100%, 0% 100%)`
                  : undefined
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        {Array.from({ length: maxRating }).map((_, index) => renderStar(index))}
      </div>
      {showNumber && (
        <span className={cn("font-medium text-rating-gold", textSizeClasses[size])}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};