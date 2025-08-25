import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { tmdb } from "@/integrations/tmdb/client";
import { Film, Star, MessageSquare } from "lucide-react";

interface MovieStatsData {
  totalMovies: number;
  averageRating: string;
  totalReviews: number;
}

export const MovieStats = () => {
  const [stats, setStats] = useState<MovieStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await tmdb.getMovieStats();
        setStats(data);
      } catch (error) {
        console.error('Failed to fetch movie stats:', error);
        // Fallback to default stats
        setStats({
          totalMovies: 850,
          averageRating: '4.8',
          totalReviews: 15000
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-8 text-center animate-pulse">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-8 bg-muted rounded w-24 mx-auto"></div>
                    <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!stats) return null;

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Movies Reviewed */}
          <Card className="p-8 text-center border border-border/60 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Film className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-primary">
                  {stats.totalMovies.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Movies Reviewed
                </div>
              </div>
            </div>
          </Card>

          {/* User Reviews */}
          <Card className="p-8 text-center border border-border/60 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto">
                <MessageSquare className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-secondary-foreground">
                  {stats.totalReviews.toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  User Reviews
                </div>
              </div>
            </div>
          </Card>

          {/* Average Rating */}
          <Card className="p-8 text-center border border-border/60 bg-background/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="w-16 h-16 rounded-full bg-rating-gold/10 flex items-center justify-center mx-auto">
                <Star className="w-8 h-8 text-rating-gold" fill="currentColor" />
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-rating-gold">
                  {stats.averageRating}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  Average Rating
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
