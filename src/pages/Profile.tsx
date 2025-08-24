import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWatchlist } from "@/hooks/useWatchlist";
import { useNavigate } from "react-router-dom";
import { tmdbImageUrl } from "@/integrations/tmdb/client";

const Profile = () => {
  const { items, remove } = useWatchlist();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Your Watchlist</h1>

        {items.length === 0 ? (
          <Card className="p-8 text-center text-muted-foreground">No items yet.</Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-[3/4] bg-muted">
                  {item.poster_path && (
                    <img src={tmdbImageUrl(item.poster_path, 'w500') || ''} alt={item.title} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-3 space-y-2">
                  <div className="font-semibold line-clamp-2">{item.title}</div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => navigate(`/movie/${item.movie_id}`)}>Open</Button>
                    <Button size="sm" variant="outline" onClick={() => remove(item.movie_id)}>Remove</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;


