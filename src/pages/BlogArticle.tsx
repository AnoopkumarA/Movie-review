import { useParams, Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Clock, Film } from "lucide-react";
import { blogArticles } from "./Blog";

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Find the article by slug
  const article = blogArticles.find((a) => a.id === slug);

  // If article not found, show 404
  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-14 py-12 max-w-[1640px]">
          <Card className="p-12 text-center">
            <Film className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h1 className="text-3xl font-bold mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/blog">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Check if article has full content
  const hasContent = "content" in article && 
    typeof (article as any).content === "string" && 
    (article as any).content.trim().length > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-14 py-12 max-w-[1640px]">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12">
            {/* Category Badge */}
            <div className="mb-6">
              <Badge variant="secondary" className="text-sm">
                {article.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-8 pb-8 border-b">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(article.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Article Content */}
            {hasContent ? (
              <div className="prose prose-lg max-w-none">
                <div
                  className="article-content text-base md:text-lg leading-relaxed space-y-6"
                  dangerouslySetInnerHTML={{ __html: (article as any).content }}
                />
              </div>
            ) : (
              <Card className="p-12 text-center bg-muted/50">
                <Film className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">Content Coming Soon</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  We're currently writing the full article for "{article.title}". 
                  Check back soon for the complete content!
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    <strong>Excerpt:</strong> {article.excerpt}
                  </p>
                  <Link to="/blog">
                    <Button>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Browse More Articles
                    </Button>
                  </Link>
                </div>
              </Card>
            )}

            {/* Article Footer */}
            {hasContent && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Category</p>
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <Link to="/blog">
                    <Button variant="outline">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Blog
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>
        </article>

        {/* Related Articles Section */}
        {hasContent && (
          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">More Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {blogArticles
                .filter((a) => a.id !== article.id)
                .slice(0, 2)
                .map((relatedArticle) => (
                  <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <Badge variant="secondary" className="text-xs mb-3">
                        {relatedArticle.category}
                      </Badge>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">
                        {relatedArticle.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {relatedArticle.excerpt}
                      </p>
                      <Link to={`/blog/${relatedArticle.id}`}>
                        <Button variant="ghost" className="w-full">
                          Read Article
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogArticle;

