import { Link } from "react-router-dom";
import { Star, TrendingUp, Clock, User, Film, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "Discover": [
      { name: "All Movies", href: "/", icon: Film },
      { name: "Trending", href: "/trending", icon: TrendingUp },
      { name: "Top Rated", href: "/top-rated", icon: Star },
      { name: "Recently Added", href: "/", icon: Clock },
    ],
    "Account": [
      { name: "Profile", href: "/profile", icon: User },
      { name: "Watchlist", href: "/profile", icon: Heart },
    ],
    "Legal": [
      { name: "Privacy Policy", href: "#", icon: Film },
    ],
  };

  return (
    <footer className="bg-background border-t border-border/50 mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Film className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-bold bg-gradient-rating bg-clip-text text-transparent">
                MovieVault
              </h1>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Your ultimate destination for movie reviews, ratings, and recommendations. 
              Discover the best films and share your thoughts with our community.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="w-3 h-3 text-rating-gold" fill="currentColor" />
              <span>Powered by TMDB</span>
            </div>
          </div>

          {/* Discover Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Discover</h3>
            <ul className="space-y-2">
              {footerLinks["Discover"].map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Account</h3>
            <ul className="space-y-2">
              {footerLinks["Account"].map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Legal Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              {footerLinks["Legal"].map((link) => {
                const Icon = link.icon;
                return (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      <Icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-border/30">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get notified about new movie releases and trending films.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm bg-muted border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-rating-gold/50 focus:border-rating-gold"
              />
              <Button size="sm" className="bg-rating-gold hover:bg-rating-gold/90 text-background">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

             {/* Bottom Footer */}
       <div className="border-t border-border/30 bg-muted/20">
         <div className="container mx-auto px-4 py-6">
           <div className="flex flex-col items-center gap-6">
             {/* Copyright and TMDB Attribution */}
             <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-muted-foreground">
               <span>© {currentYear} MovieVault. All rights reserved.</span>
               <Separator orientation="vertical" className="h-4 hidden md:block" />
               <span className="text-xs">
                 Movie data and reviews are provided by{' '}
                 <span className="font-bold text-foreground">TMDB</span>
                 {' '}•{' '}
                
               </span>
             </div>
             
             {/* Love Message */}
             <div className="text-center">
               <span className="text-sm text-muted-foreground">Made with ❤️ for movie lovers</span>
             </div>
           </div>
         </div>
       </div>
    </footer>
  );
};
