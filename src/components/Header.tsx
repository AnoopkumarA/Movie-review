import { Search, Film, Star, TrendingUp, LogIn, LogOut, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

export const Header = () => {
  const { user, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold bg-gradient-rating bg-clip-text text-transparent">
                MovieVault
              </h1>
            </div>
            <Badge variant="secondary" className="hidden sm:inline-flex">
              Reviews & Ratings
            </Badge>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search movies, actors, directors..."
                className="pl-10 bg-secondary/50 border-border focus:bg-secondary"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
              <TrendingUp className="w-4 h-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
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
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
                  <User className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{user.email?.split('@')[0]}</span>
                </div>
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