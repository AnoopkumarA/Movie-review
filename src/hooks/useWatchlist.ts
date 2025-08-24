import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/components/ui/use-toast';

export interface WatchlistItem {
  id: string;
  movie_id: string;
  title: string;
  poster_path: string | null;
  created_at: string;
}

export const useWatchlist = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('watchlist')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });
    setItems((data as WatchlistItem[]) || []);
    setLoading(false);
  };

  const add = async (movieId: string, title: string, posterPath: string | null) => {
    if (!user) {
      toast({ title: 'Sign in required', description: 'Please sign in to use your watchlist.' });
      return;
    }
    const { error } = await supabase.from('watchlist').upsert({
      user_id: user.id,
      movie_id: movieId,
      title,
      poster_path: posterPath,
    }, { onConflict: 'user_id,movie_id' });
    if (error) {
      toast({ title: 'Failed to add to watchlist', description: error.message });
      return;
    }
    await fetchWatchlist();
    toast({ title: 'Added to watchlist' });
  };

  const remove = async (movieId: string) => {
    if (!user) {
      toast({ title: 'Sign in required' });
      return;
    }
    const { error } = await supabase.from('watchlist').delete().eq('user_id', user.id).eq('movie_id', movieId);
    if (error) {
      toast({ title: 'Failed to remove from watchlist', description: error.message });
      return;
    }
    await fetchWatchlist();
    toast({ title: 'Removed from watchlist' });
  };

  const exists = (movieId: string) => items.some(i => i.movie_id === movieId);

  useEffect(() => {
    fetchWatchlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return { items, loading, add, remove, exists, refresh: fetchWatchlist };
};


