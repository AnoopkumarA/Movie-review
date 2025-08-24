import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MovieHero } from "@/components/MovieHero";
import { StarRating } from "@/components/StarRating";
import { UserReviewForm } from "@/components/UserReviewForm";
import { CastAndCrew } from "@/components/CastAndCrew";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { movies } from "@/data/movies";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ThumbsUp, Calendar, User, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface UserReview {
  id: string;
  user_id: string;
  movie_id: string;
  rating: number;
  content: string | null;
  created_at: string;
  profiles: {
    username: string | null;
  } | null;
}

const MovieDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const movie = movies.find(m => m.id === id);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [userExistingReview, setUserExistingReview] = useState<{ rating: number; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0);

  const fetchReviews = async () => {
    if (!id) return;
    
    try {
      // Fetch all user reviews for this movie
      const { data: reviews, error } = await supabase
        .from('user_reviews')
        .select('*')
        .eq('movie_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Fetch profiles separately for now
      const reviewsWithProfiles = await Promise.all(
        (reviews || []).map(async (review) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('user_id', review.user_id)
            .single();
          
          return {
            ...review,
            profiles: profile
          };
        })
      );

      setUserReviews(reviewsWithProfiles as UserReview[]);
      
      // Calculate overall rating from user reviews
      if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        setOverallRating(avgRating);
      } else {
        setOverallRating(movie?.rating || 0);
      }

      // Check if current user has already reviewed this movie
      if (user) {
        const existingReview = reviews?.find(review => review.user_id === user.id);
        if (existingReview) {
          setUserExistingReview({
            rating: existingReview.rating,
            content: existingReview.content || ''
          });
        }
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id, user]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Movie Not Found</h1>
          <p className="text-muted-foreground">The movie you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <MovieHero
        title={movie.title}
        description={movie.description}
        rating={overallRating}
        imdbRating={movie.imdbRating}
        year={movie.year}
        runtime={movie.runtime}
        genre={movie.genre}
        director={movie.director}
        cast={movie.cast}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Cast and Crew Section */}
        <section className="mb-12">
          <CastAndCrew castAndCrew={movie.castAndCrew} />
        </section>

        {/* User Review Form */}
        {user ? (
          <section className="mb-12">
            <UserReviewForm 
              movieId={id!} 
              onReviewSubmitted={fetchReviews}
              existingReview={userExistingReview}
            />
          </section>
        ) : (
          <section className="mb-12">
            <Card className="p-6 text-center">
              <div className="space-y-4">
                <Star className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Want to rate this movie?</h3>
                  <p className="text-muted-foreground mb-4">
                    Sign in to rate and review movies, and share your opinions with other movie lovers.
                  </p>
                  <Link to="/auth">
                    <Button>Sign In to Review</Button>
                  </Link>
                </div>
              </div>
            </Card>
          </section>
        )}

        {/* Reviews Section */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">
              User Reviews
              {userReviews.length > 0 && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({userReviews.length} {userReviews.length === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-rating-gold" fill="currentColor" />
              <span className="font-semibold">{overallRating.toFixed(1)}</span>
              <span className="text-muted-foreground">overall rating</span>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-muted rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-24"></div>
                        <div className="h-3 bg-muted rounded w-32"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : userReviews.length > 0 ? (
            <div className="grid gap-6">
              {userReviews.map((review) => (
                <Card key={review.id} className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">
                          {review.profiles?.username || 'Anonymous User'}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <StarRating rating={review.rating} size="sm" showNumber={false} />
                  </div>

                  {review.content && (
                    <p className="text-muted-foreground leading-relaxed">{review.content}</p>
                  )}

                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No user reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts about this movie!</p>
              </div>
            </Card>
          )}

          {/* Original Reviews from mock data */}
          {movie.reviews.length > 0 && (
            <div className="space-y-6">
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold mb-6">Editorial Reviews</h3>
                <div className="grid gap-6">
                  {movie.reviews.map((review) => (
                    <Card key={review.id} className="p-6 space-y-4 border-dashed">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-secondary/50 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-secondary-foreground" />
                          </div>
                          <div>
                            <h4 className="font-semibold">{review.author}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              {new Date(review.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <StarRating rating={review.rating} size="sm" showNumber={false} />
                      </div>

                      <p className="text-muted-foreground leading-relaxed">{review.content}</p>

                      <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="w-4 h-4 mr-2" />
                          Helpful ({review.helpful})
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Ad Space */}
        <section className="my-16">
          <Card className="p-8 text-center bg-muted/50 border-dashed">
            <div className="text-muted-foreground">
              <p className="text-lg font-medium mb-2">Advertisement Space</p>
              <p className="text-sm">Google AdSense integration ready</p>
            </div>
          </Card>
        </section>

        {/* Movie Details */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold">Movie Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Technical Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Director:</span>
                  <span>{movie.director}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Runtime:</span>
                  <span>{movie.runtime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Release Year:</span>
                  <span>{movie.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genres:</span>
                  <div className="flex gap-1">
                    {movie.genre.map((g) => (
                      <Badge key={g} variant="outline" className="text-xs">
                        {g}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 space-y-4">
              <h3 className="text-xl font-semibold">Cast & Crew</h3>
              <div className="space-y-3">
                {movie.cast.map((actor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <span>{actor}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MovieDetail;