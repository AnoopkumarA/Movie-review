import { Search, Film, Star, TrendingUp, LogIn, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { tmdb } from "@/integrations/tmdb/client";

export const Header = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<{ id: number; title: string }[]>([]);
  const debounceRef = useRef<number | null>(null);

  const handleSignOut = async () => {
    await signOut();
  };

  const runSearch = async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      return;
    }
    try {
      setIsSearching(true);
      const { results } = await tmdb.searchMovies(q, 1);
      setResults(results.slice(0, 8).map(r => ({ id: r.id, title: r.title })));
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => runSearch(query), 300);
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
    };
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (results[0]) {
      navigate(`/movie/${results[0].id}`);
      setQuery('');
      setResults([]);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-rating bg-clip-text text-transparent">
                MovieVault
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Reviews & Ratings
            </Badge>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSubmit} className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search movies..."
                className="pl-10 bg-secondary/50 border-border focus:bg-secondary"
              />
              {query && results.length > 0 && (
                <div className="absolute z-50 mt-2 w-full bg-background border rounded-md shadow-lg">
                  {results.map((r) => (
                    <button
                      key={r.id}
                      type="button"
                      className="w-full text-left px-3 py-2 hover:bg-muted"
                      onClick={() => {
                        navigate(`/movie/${r.id}`);
                        setQuery('');
                        setResults([]);
                      }}
                    >
                      {r.title}
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('/trending')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => navigate('/top-rated')}>
              <Star className="w-4 h-4 mr-2" />
              Top Rated
            </Button>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Search className="w-4 h-4" />
            </Button>
            
            {/* Auth Buttons */}
            {loading ? (
              <div className="w-8 h-8 animate-spin rounded-full border-b-2 border-primary"></div>
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
                  <User className="w-4 h-4 text-primary" />
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign Out</span>
                </Button>
              </div>
            ) : (
              <Link to="/auth">
                <Button variant="default" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};