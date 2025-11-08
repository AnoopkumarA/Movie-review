import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight, Film, Heart, Star, Shield, Award, Users, Sparkles, Drama, Crown } from "lucide-react";
import { Link } from "react-router-dom";

// ============================================
// 🎯 PRIORITY: ADD YOUR ORIGINAL BLOG ARTICLES HERE
// ============================================
// This is your main focus for AdSense approval!
// Write 10-15 original articles (500-800 words each)
// Topics: Film analysis, top 10 lists, genre guides, director spotlights, etc.
// 
// IMPORTANT: 
// - Write from YOUR perspective
// - Share YOUR opinions and insights
// - Make each article unique and valuable
// - These examples below are just templates - replace with your real content
//
// Example structure for each article:
// {
//   id: "unique-url-slug",
//   title: "Your Article Title",
//   excerpt: "Brief description (2-3 sentences)",
//   author: "MovieVault Editorial" or your name,
//   date: "2025-11-06",
//   category: "Film Analysis" | "Film History" | "Recommendations" | etc.,
//   readTime: "8 min read",
//   image: "/placeholder.svg"
// }
// ============================================

// Export blogArticles so it can be used in BlogArticle.tsx
export const blogArticles = [
  {
    id: "shawshank-redemption-thoughts",
    title: "Why The Shawshank Redemption Stays With Me",
    excerpt: "I watched this movie years ago and it's still one of my favorites. There's something about Andy's story of hope and friendship that really stuck with me. Let me share why this movie means so much.",
    author: "MovieVault Editorial",
    date: "2025-11-06",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Heart"
  },
  {
    id: "the-godfather-classic",
    title: "The Godfather: Why It's Considered a Classic",
    excerpt: "Everyone says The Godfather is one of the best movies ever made. After watching it, I finally understand why. The story, the acting, everything about it is just perfect. Here's my take on what makes it special.",
    author: "MovieVault Editorial",
    date: "2025-11-05",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Crown"
  },
  {
    id: "godfather-part-2-sequel",
    title: "The Godfather Part II: A Sequel That Actually Works",
    excerpt: "Most sequels disappoint, but this one is different. It actually expands the story in a way that makes sense. I think it might even be better than the first one in some ways. Let me explain why.",
    author: "MovieVault Editorial",
    date: "2025-11-04",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Award"
  },
  {
    id: "schindlers-list-powerful",
    title: "Schindler's List: A Movie Everyone Should Watch",
    excerpt: "This is not an easy movie to watch, but it's an important one. The story of Oskar Schindler really moved me. It's one of those films that stays with you long after it ends. Here's why it matters.",
    author: "MovieVault Editorial",
    date: "2025-11-03",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Star"
  },
  {
    id: "12-angry-men-simple",
    title: "12 Angry Men: Proof That Simple Can Be Powerful",
    excerpt: "This movie is mostly just 12 guys in a room talking, but it's one of the most engaging films I've ever seen. It shows you don't need big action scenes to make a great movie. Here's what I learned from it.",
    author: "MovieVault Editorial",
    date: "2025-11-02",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Users"
  },
  {
    id: "spirited-away-magical",
    title: "Spirited Away: A Magical Journey I'll Never Forget",
    excerpt: "I'm not usually into animated movies, but Spirited Away changed my mind. The world it creates is so imaginative and beautiful. Chihiro's story of growing up really resonated with me. This is why I love it.",
    author: "MovieVault Editorial",
    date: "2025-11-01",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Sparkles"
  },
  {
    id: "dark-knight-best-superhero",
    title: "The Dark Knight: The Best Superhero Movie I've Seen",
    excerpt: "I've watched a lot of superhero movies, but this one stands out. Heath Ledger's Joker is incredible, and the whole movie feels more like a crime thriller than a comic book film. Here's why it's my favorite.",
    author: "MovieVault Editorial",
    date: "2025-10-31",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Shield"
  },
  {
    id: "dilwale-dulhania-romance",
    title: "Dilwale Dulhania Le Jayenge: A Romance That Never Gets Old",
    excerpt: "This Bollywood classic is one of those movies I can watch over and over. The chemistry between Shah Rukh Khan and Kajol is amazing, and the songs are so catchy. It's just a feel-good movie that always makes me smile.",
    author: "MovieVault Editorial",
    date: "2025-10-30",
    category: "Personal Favorites",
    readTime: "4 min read",
    icon: "Drama"
  }
];

const categories = ["All", "Personal Favorites", "Film Analysis", "Film History", "Recommendations"];

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter articles based on selected category
  const filteredArticles = useMemo(() => {
    if (selectedCategory === "All") {
      return blogArticles;
    }
    return blogArticles.filter(article => article.category === selectedCategory);
  }, [selectedCategory]);

  // Get featured article (first article from filtered results)
  const featuredArticle = filteredArticles[0];
  // Get remaining articles for grid
  const gridArticles = filteredArticles.slice(1);

  // Icon mapping
  const iconMap: Record<string, any> = {
    Heart,
    Star,
    Shield,
    Award,
    Users,
    Sparkles,
    Drama,
    Crown,
    Film
  };

  const getIcon = (iconName: string = "Film") => {
    return iconMap[iconName] || Film;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-14 py-12 max-w-[1640px]">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Film className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold">MovieVault Blog</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep dives, analysis, and insights into the world of cinema. 
            Explore our original articles on filmmaking, storytelling, and the art of movies.
          </p>
        </section>

        {/* Category Filter */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "default" : "outline"}
                className={selectedCategory === category ? "bg-primary" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </section>

         {/* Featured Article */}
         {featuredArticle && (() => {
           const FeaturedIcon = getIcon(featuredArticle.icon);
           return (
           <section className="mb-16">
             <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-background">
               <div className="grid md:grid-cols-2 gap-0">
                 <div className="aspect-video md:aspect-auto bg-gradient-to-br from-primary/10 to-muted flex items-center justify-center">
                   <FeaturedIcon className="w-24 h-24 text-primary/30" />
                 </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge variant="default" className="w-fit mb-3">
                    Featured Article
                  </Badge>
                  <h2 className="text-3xl font-bold mb-3">{featuredArticle.title}</h2>
                  <p className="text-muted-foreground mb-4">{featuredArticle.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(featuredArticle.date).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${featuredArticle.id}`}>
                    <Button className="w-fit">
                      Read Article <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                 </div>
               </div>
             </Card>
           </section>
           );
         })()}

        {/* Articles Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {selectedCategory === "All" ? "Latest Articles" : `${selectedCategory} Articles`}
            {gridArticles.length > 0 && (
              <span className="text-lg font-normal text-muted-foreground ml-2">
                ({gridArticles.length} {gridArticles.length === 1 ? 'article' : 'articles'})
              </span>
            )}
          </h2>
          {gridArticles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
               {gridArticles.map((article) => {
                 const IconComponent = getIcon(article.icon);
                 return (
                 <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                   <div className="aspect-video bg-gradient-to-br from-primary/5 to-muted flex items-center justify-center">
                     <IconComponent className="w-16 h-16 text-primary/40" />
                   </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      <span>{article.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(article.date).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                  </div>
                  <Link to={`/blog/${article.id}`}>
                    <Button variant="ghost" className="w-full">
                      Read More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                 </div>
               </Card>
                 );
               })}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <Film className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                There are no articles in the "{selectedCategory}" category yet.
              </p>
            </Card>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mb-16">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-background">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get notified when we publish new articles about cinema, filmmaking, and the movies you love.
              Join our community of film enthusiasts.
            </p>
            <Link to="/contact">
              <Button size="lg">
                Contact Us to Subscribe
              </Button>
            </Link>
          </Card>
        </section>

        {/* Topics Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Explore by Topic</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Film Analysis</h3>
              <p className="text-sm text-muted-foreground">12 articles</p>
            </Card>
            <Card className="p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Director Spotlights</h3>
              <p className="text-sm text-muted-foreground">8 articles</p>
            </Card>
            <Card className="p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Film Techniques</h3>
              <p className="text-sm text-muted-foreground">15 articles</p>
            </Card>
            <Card className="p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer">
              <h3 className="font-semibold mb-2">Movie Lists</h3>
              <p className="text-sm text-muted-foreground">20 articles</p>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;

