import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { StarRating } from '@/components/StarRating';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserReviewFormProps {
  movieId: string;
  onReviewSubmitted: () => void;
  existingReview?: {
    rating: number;
    content: string;
  };
}

export const UserReviewForm = ({ movieId, onReviewSubmitted, existingReview }: UserReviewFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [content, setContent] = useState(existingReview?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a star rating before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData = {
        user_id: user.id,
        movie_id: movieId,
        rating,
        content: content.trim() || null
      };

      let result;
      if (existingReview) {
        // Update existing review
        result = await supabase
          .from('user_reviews')
          .update(reviewData)
          .eq('user_id', user.id)
          .eq('movie_id', movieId);
      } else {
        // Insert new review
        result = await supabase
          .from('user_reviews')
          .insert(reviewData);
      }

      if (result.error) {
        throw result.error;
      }

      toast({
        title: existingReview ? "Review updated" : "Review submitted",
        description: "Thank you for your feedback!"
      });

      if (!existingReview) {
        setRating(0);
        setContent('');
      }
      
      onReviewSubmitted();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {existingReview ? 'Update Your Review' : 'Rate This Movie'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-2">Your Rating</label>
              <StarRating
                rating={rating}
                interactive={true}
                onRatingChange={setRating}
                showNumber={false}
                size="lg"
              />
            </div>

            <div>
              <label htmlFor="review-content" className="block text-sm font-medium mb-2">
                Your Review (optional)
              </label>
              <Textarea
                id="review-content"
                placeholder="Share your thoughts about this movie..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={isSubmitting || rating === 0}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
              {existingReview ? 'Updating...' : 'Submitting...'}
            </div>
          ) : (
            existingReview ? 'Update Review' : 'Submit Review'
          )}
        </Button>
      </form>
    </Card>
  );
};