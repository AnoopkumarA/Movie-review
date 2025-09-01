import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { MovieHero } from "@/components/MovieHero";
import { StarRating } from "@/components/StarRating";
import { UserReviewForm } from "@/components/UserReviewForm";
import { CastAndCrew } from "@/components/CastAndCrew";
import { Footer } from "@/components/Footer";
import { MovieImageGallery } from "@/components/MovieImageGallery";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CastMember } from "@/data/movies";
import { tmdb, tmdbImageUrl, TmdbMovie, TmdbCredit, TmdbReview } from "@/integrations/tmdb/client";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { ThumbsUp, Calendar, User, Star, Clock, Clapperboard, DollarSign, TrendingUp, MessageSquare, Share } from "lucide-react";
import { Link } from "react-router-dom";
import { TrailerModal } from "@/components/TrailerModal";
import { youtube } from "@/integrations/youtube/client";

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
  const [tmdbMovie, setTmdbMovie] = useState<TmdbMovie | null>(null);
  const [creditsCast, setCreditsCast] = useState<TmdbCredit[]>([]);
  const [creditsCrew, setCreditsCrew] = useState<TmdbCredit[]>([]);
  const [tmdbReviews, setTmdbReviews] = useState<TmdbReview[]>([]);
  const [backdropUrls, setBackdropUrls] = useState<string[]>([]);
  const [posterUrls, setPosterUrls] = useState<string[]>([]);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [trailerVideoId, setTrailerVideoId] = useState<string | null>(null);
  const [userReviews, setUserReviews] = useState<UserReview[]>([]);
  const [userExistingReview, setUserExistingReview] = useState<{ rating: number; content: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [overallRating, setOverallRating] = useState(0);

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "";
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  const mapCrewRole = (job?: string, department?: string): CastMember['role'] | null => {
    const j = (job || '').toLowerCase();
    const d = (department || '').toLowerCase();
    if (j.includes('director')) return 'director';
    if (j.includes('producer')) return 'producer';
    if (j.includes('screenplay') || j.includes('writer') || d.includes('writing')) return 'writer';
    if (j.includes('director of photography') || j.includes('cinematography')) return 'cinematographer';
    if (d.includes('sound') || j.includes('music') || j.includes('composer')) return 'composer';
    return null;
  };

  const computeOverallRating = (details: TmdbMovie | null, reviews: UserReview[]) => {
    const tmdbAvg5 = details ? (details.vote_average || 0) / 2 : 0;
    const tmdbVotes = details?.vote_count ?? 0;
    const tmdbWeight = Math.min(tmdbVotes, 1000); // cap to keep user ratings impactful

    if (!reviews || reviews.length === 0) {
      setOverallRating(tmdbAvg5);
      return;
    }

    const userAvg5 = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    const combined =
      (tmdbAvg5 * tmdbWeight + userAvg5 * reviews.length) /
      (tmdbWeight + reviews.length);
    setOverallRating(combined);
  };

  const formatCurrency = (value?: number | null) => {
    if (value == null) return "—";
    try {
      return value.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      });
    } catch {
      return `$${value}`;
    }
  };

  const fetchTmdbData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const [details, creditsRes, reviewsRes, imagesRes] = await Promise.all([
        tmdb.getMovieDetails(id),
        tmdb.getMovieCredits(id),
        tmdb.getMovieReviews(id),
        tmdb.getMovieImages(id),
      ]);
      setTmdbMovie(details);
      setCreditsCast(creditsRes.cast || []);
      setCreditsCrew(creditsRes.crew || []);
      setTmdbReviews(reviewsRes.results || []);
      setBackdropUrls((imagesRes.backdrops || []).slice(0, 12).map(img => tmdbImageUrl(img.file_path, 'original')!).filter(Boolean));
      setPosterUrls((imagesRes.posters || []).slice(0, 12).map(img => tmdbImageUrl(img.file_path, 'original')!).filter(Boolean));
      computeOverallRating(details, userReviews);
    } catch (e) {
      console.error('Error fetching TMDB data:', e);
    } finally {
      setLoading(false);
    }
  };

  const findAndOpenTrailer = async () => {
    try {
      if (!tmdbMovie) return;
      const year = tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : '';
      const query = `${tmdbMovie.title} ${year} official trailer`;
      const { items } = await youtube.searchVideos(query, 1);
      const vid = items?.[0]?.id?.videoId || null;
      setTrailerVideoId(vid);
      setTrailerOpen(true);
    } catch (err) {
      console.error('Error finding trailer:', err);
      setTrailerVideoId(null);
      setTrailerOpen(true);
    }
  };

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

      // Fetch profiles separately and map to typed structure
      const reviewsWithProfiles: UserReview[] = await Promise.all(
        (reviews || []).map(async (review) => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('username')
            .eq('user_id', review.user_id)
            .single();
          
          const mapped: UserReview = {
            id: review.id,
            user_id: review.user_id,
            movie_id: review.movie_id,
            rating: review.rating,
            content: review.content,
            created_at: review.created_at,
            profiles: profile ? { username: profile.username ?? null } : null,
          };

          return mapped;
        })
      );

      setUserReviews(reviewsWithProfiles);
      computeOverallRating(tmdbMovie, reviewsWithProfiles);

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
    fetchTmdbData();
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [id, user, tmdbMovie]);

  if (!tmdbMovie && !loading) {
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
      
      {tmdbMovie && (
      <MovieHero
          movieId={id!}
          title={tmdbMovie.title}
          description={tmdbMovie.overview}
        rating={overallRating}
          imdbRating={tmdbMovie.vote_average}
          year={tmdbMovie.release_date ? new Date(tmdbMovie.release_date).getFullYear() : 0}
          runtime={formatRuntime(tmdbMovie.runtime)}
          genre={(tmdbMovie.genres || []).map(g => g.name)}
          director={(creditsCrew.find(c => (c.job || '').toLowerCase() === 'director')?.name) || ''}
          cast={(creditsCast.slice(0, 5)).map(c => c.name)}
          backdropUrl={tmdbImageUrl(tmdbMovie.backdrop_path, 'original') || tmdbImageUrl(tmdbMovie.poster_path, 'original') || undefined}
          posterPath={tmdbMovie.poster_path}
          onWatchTrailer={findAndOpenTrailer}
        />
      )}

      <div className="container mx-auto px-4 py-12">
        {/* Cast and Crew Section */}
        {tmdbMovie && (
          <section className="mb-12">
            {(() => {
              const castMembers: CastMember[] = creditsCast.slice(0, 30).map((c) => ({
                id: String(c.id),
                name: c.name,
                character: c.character || '',
                image: tmdbImageUrl(c.profile_path, 'original') || undefined,
                role: 'actor',
              }));

              const crewMembers: CastMember[] = creditsCrew
                .map((c) => {
                  const role = mapCrewRole(c.job, c.department);
                  if (!role) return null;
                  return {
                    id: String(c.id),
                    name: c.name,
                    character: c.job || c.department || '',
                    image: tmdbImageUrl(c.profile_path, 'original') || undefined,
                    role,
                  } as CastMember;
                })
                .filter((m): m is CastMember => Boolean(m));

              return (
                <CastAndCrew castAndCrew={[...castMembers, ...crewMembers]} />
              );
            })()}
          </section>
        )}

        {/* Image Galleries */}
        {(backdropUrls.length > 0 || posterUrls.length > 0) && (
          <section className="mb-12 space-y-8">
            {backdropUrls.length > 0 && (
              <MovieImageGallery imageUrls={backdropUrls} title="Backdrops" />
            )}
            {posterUrls.length > 0 && (
              <MovieImageGallery imageUrls={posterUrls} title="Posters" />
            )}
          </section>
        )}

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

                {/* Combined Reviews Section */}
        <section className="space-y-8">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
              <h2 className="text-2xl sm:text-3xl font-bold">
                TMDB Reviews
                {(userReviews.length + tmdbReviews.length) > 0 && (
                  <span className="text-base sm:text-lg font-normal text-muted-foreground ml-2">
                    ({userReviews.length + tmdbReviews.length} {(userReviews.length + tmdbReviews.length) === 1 ? 'review' : 'reviews'})
                </span>
              )}
            </h2>
            <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-rating-gold" fill="currentColor" />
                <span className="font-semibold text-sm sm:text-base">{overallRating.toFixed(1)}</span>
                <span className="text-muted-foreground text-xs sm:text-sm">overall rating</span>
              </div>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              Professional critic reviews from TMDB and user reviews from our community
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="p-6 rounded-xl border-2 border-border/80 bg-card/60 backdrop-blur-sm shadow-md">
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
          ) : (userReviews.length > 0 || tmdbReviews.length > 0) ? (
            <div className="grid gap-6">
              {/* User Reviews */}
              {userReviews.map((review) => (
                <Card key={`user-${review.id}`} className="p-6 rounded-xl border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="p-[2px] rounded-full bg-gradient-to-br from-primary/60 via-primary/20 to-transparent">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">
                          {review.profiles?.username || 'Anonymous User'}
                        </h4>
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/30">
                            User Review
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{review.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {review.content && (
                    <p className="text-muted-foreground leading-relaxed mt-4">
                      {review.content}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                      <ThumbsUp className="w-4 h-4 mr-2" />
                      Helpful
                    </Button>
                  </div>
                </Card>
              ))}

              {/* TMDB Reviews */}
              {tmdbReviews.map((review) => (
                <Card key={`tmdb-${review.id}`} className="p-6 rounded-xl border-2 border-border/80 bg-card/60 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/40 flex items-center justify-center ring-1 ring-border">
                        <User className="w-5 h-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{review.author}</h4>
                          <Badge variant="outline" className="text-xs bg-secondary/20 text-secondary-foreground border-secondary/40">
                            TMDB Review
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {typeof review.author_details?.rating === 'number' && (
                      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{(review.author_details.rating / 2).toFixed(1)}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed mt-4">{review.content}</p>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <div className="text-muted-foreground">
                <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No reviews yet</p>
                <p className="text-sm">Be the first to share your thoughts about this movie!</p>
              </div>
            </Card>
          )}

          {/* Show personalized message if user hasn't reviewed */}
          {!loading && user && userReviews.length === 0 && (
            <Card className="p-6 border-2 border-dashed border-muted-foreground/30 bg-muted/20">
              <div className="text-center">
                <MessageSquare className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  You haven't reviewed this movie yet. Share your thoughts!
                </p>
              </div>
            </Card>
          )}
        </section>


        {/* Movie Details */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Movie Details</h2>
          <Button 
            variant="outline" 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: tmdbMovie?.title || 'Movie',
                  text: tmdbMovie?.overview || '',
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                // You could add a toast notification here
              }
            }}
          >
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Details - modern stat cards */}
            <Card className="p-6 bg-gradient-to-br from-background to-primary/5 border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-semibold">Technical Details</h3>
                <Clapperboard className="w-5 h-5 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-xl border bg-card/50 p-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Clapperboard className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Director</div>
                    <div className="font-semibold">{(creditsCrew.find(c => (c.job || '').toLowerCase() === 'director')?.name) || '—'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border bg-card/50 p-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Runtime</div>
                    <div className="font-semibold">{formatRuntime(tmdbMovie?.runtime)}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border bg-card/50 p-4">
                  <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Release Year</div>
                    <div className="font-semibold">{tmdbMovie?.release_date ? new Date(tmdbMovie.release_date).getFullYear() : '—'}</div>
                  </div>
                </div>
                <div className="rounded-xl border bg-card/50 p-4 col-span-2">
                  <div className="text-xs text-muted-foreground mb-2">Genres</div>
                  <div className="flex flex-wrap gap-2">
                    {(tmdbMovie?.genres || []).map((g) => (
                      <Badge key={typeof g === 'string' ? g : g.id} variant="secondary" className="bg-secondary/70">
                        {typeof g === 'string' ? g : g.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Financials - glossy cards with ROI */}
            <Card className="p-6 bg-gradient-to-br from-background to-primary/5 border border-primary/10 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-semibold">Financials</h3>
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border bg-card/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="w-3.5 h-3.5" /> Budget
                  </div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(tmdbMovie?.budget)}</div>
                </div>
                <div className="rounded-xl border bg-card/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <DollarSign className="w-3.5 h-3.5" /> Box Office
                  </div>
                  <div className="text-2xl font-bold mt-1">{formatCurrency(tmdbMovie?.revenue)}</div>
                    </div>
                <div className="rounded-xl border bg-card/50 p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <TrendingUp className="w-3.5 h-3.5" /> Profit
                  </div>
                  {(() => {
                    const profit = (tmdbMovie?.revenue ?? 0) - (tmdbMovie?.budget ?? 0);
                    const roi = tmdbMovie?.budget ? (profit / tmdbMovie.budget) * 100 : null;
                    return (
                      <div className="mt-1">
                        <div className={`text-2xl font-bold ${profit < 0 ? 'text-destructive' : 'text-foreground'}`}>{formatCurrency(profit)}</div>
                        {roi != null && (
                          <div className={`text-xs mt-1 ${profit < 0 ? 'text-destructive' : 'text-primary'}`}>
                            ROI {roi.toFixed(1)}%
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <Footer />
      
      <TrailerModal open={trailerOpen} onOpenChange={setTrailerOpen} videoId={trailerVideoId || undefined} title={tmdbMovie?.title} />
    </div>
  );
};

export default MovieDetail;
