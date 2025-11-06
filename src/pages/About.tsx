import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Star, Users, Target, Heart, Award } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 md:px-8 lg:px-10 xl:px-14 py-12 max-w-[1640px]">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Film className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-rating bg-clip-text text-transparent">
              About MovieVault
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted destination for honest movie reviews, in-depth analysis, and passionate film discussion
          </p>
        </section>

        {/* Mission Statement */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-background">
            <div className="flex items-start gap-4 mb-4">
              <Target className="w-8 h-8 text-primary mt-1" />
              <div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  At MovieVault, we believe that cinema is more than just entertainment—it's an art form that deserves thoughtful analysis and passionate discussion. Our mission is to provide movie enthusiasts with honest, in-depth reviews and a platform to share their own perspectives on the films they love (or love to critique).
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We're dedicated to helping you discover hidden gems, understand the craft behind filmmaking, and make informed decisions about what to watch next. Whether you're a casual moviegoer or a dedicated cinephile, MovieVault is your companion in the world of cinema.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* What Makes Us Different */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">What Makes Us Different</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Honest Reviews</h3>
              <p className="text-muted-foreground">
                We provide unbiased, detailed reviews that go beyond surface-level criticism. Our team analyzes cinematography, storytelling, performances, and the overall impact of each film.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Driven</h3>
              <p className="text-muted-foreground">
                Your voice matters. We combine professional reviews with community ratings to give you a complete picture. Share your thoughts, rate movies, and engage with fellow film lovers.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Curated Content</h3>
              <p className="text-muted-foreground">
                From blockbusters to indie films, we cover a diverse range of cinema. Our curated lists and recommendations help you discover movies that match your taste.
              </p>
            </Card>
          </div>
        </section>

        {/* Our Approach */}
        <section className="mb-16">
          <Card className="p-8">
            <h2 className="text-3xl font-bold mb-6">Our Review Approach</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">1</Badge> Comprehensive Analysis
                </h3>
                <p className="text-muted-foreground ml-8">
                  Every movie review on MovieVault covers multiple aspects: plot and storytelling, character development, cinematography and visual effects, acting performances, direction and pacing, soundtrack and score, and overall impact.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">2</Badge> Context Matters
                </h3>
                <p className="text-muted-foreground ml-8">
                  We understand that every film should be judged within its context—genre conventions, budget constraints, cultural significance, and the filmmaker's intent all play a role in our evaluation.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">3</Badge> Spoiler-Free First
                </h3>
                <p className="text-muted-foreground ml-8">
                  Our reviews are structured to provide valuable insights without spoiling your viewing experience. When we discuss specific plot points, we clearly mark spoiler sections.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <Badge variant="secondary">4</Badge> Community Integration
                </h3>
                <p className="text-muted-foreground ml-8">
                  We combine our editorial reviews with community ratings and reviews, giving you multiple perspectives to help you decide what to watch next.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-muted-foreground">
                We maintain editorial independence and never compromise our reviews for promotional considerations. Our opinions are honest and unbiased.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-3">Inclusivity</h3>
              <p className="text-muted-foreground">
                We celebrate diversity in cinema and welcome perspectives from all backgrounds. Every voice in our community deserves to be heard.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-muted-foreground">
                Our love for cinema drives everything we do. We're dedicated film enthusiasts who want to share that passion with you.
              </p>
            </Card>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-muted-foreground">
                We're committed to providing well-researched, thoughtfully written content that adds value to your movie-watching experience.
              </p>
            </Card>
          </div>
        </section>

        {/* Join Us */}
        <section className="text-center">
          <Card className="p-12 bg-gradient-to-br from-primary/10 to-background">
            <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              MovieVault is more than a review site—it's a community of passionate movie lovers. 
              Sign up to rate and review movies, build your personal watchlist, and connect with fellow cinephiles who share your enthusiasm for great storytelling.
            </p>
            <Badge variant="outline" className="text-sm">
              Made with ❤️ for movie lovers everywhere
            </Badge>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;

