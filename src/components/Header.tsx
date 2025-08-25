import { Search, Film, Star, TrendingUp, LogIn, LogOut, User, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
      setIsMobileMenuOpen(false);
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 md:w-8 md:h-8 text-primary" />
              <h1 className="text-lg md:text-2xl font-bold bg-gradient-rating bg-clip-text text-transparent">
                MovieVault
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Reviews & Ratings
            </Badge>
          </Link>

          {/* Search Bar - Desktop Only */}
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

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="default"
            className="md:hidden p-3"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => handleNavigation('/trending')}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleNavigation('/top-rated')}>
              <Star className="w-4 h-4 mr-2" />
              Top Rated
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            {/* Mobile Search */}
            <div className="mb-4">
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
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {r.title}
                      </button>
                    ))}
                  </div>
                )}
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('/trending')}
              >
                <TrendingUp className="w-4 h-4 mr-3" />
                Trending
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start" 
                onClick={() => handleNavigation('/top-rated')}
              >
                <Star className="w-4 h-4 mr-3" />
                Top Rated
              </Button>
            </div>

            {/* Mobile Auth Section */}
            {loading ? (
              <div className="flex justify-center py-4">
                <div className="w-6 h-6 animate-spin rounded-full border-b-2 border-primary"></div>
              </div>
            ) : user ? (
              <div className="space-y-2">
                <Link 
                  to="/profile" 
                  className="flex items-center w-full p-3 rounded-md bg-primary/10 hover:bg-primary/20 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-4 h-4 mr-3 text-primary" />
                  Profile
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-start" 
                  onClick={handleSignOut}
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link 
                to="/auth" 
                className="block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="default" size="sm" className="w-full">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};