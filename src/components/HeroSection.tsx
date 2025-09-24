import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Target, TrendingUp, Users } from 'lucide-react';

interface HeroSectionProps {
  onStartAssessment: () => void;
}

const HeroSection = ({ onStartAssessment }: HeroSectionProps) => {
  return (
    <div className="hero-gradient min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">CareerAI</span>
          </div>
          <Button variant="outline" className="border-primary/30 hover:bg-primary/10">
            Sign In
          </Button>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-bounce-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
              Find Your Perfect
              <br />
              Tech Career Path
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Stop jumping between technologies. Get AI-powered recommendations 
              based on your interests and skills, with personalized roadmaps to success.
            </p>
          </div>

          <div className="mb-12 animate-slide-in-right">
            <Button 
              onClick={onStartAssessment}
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-secondary hover:from-primary-hover hover:to-secondary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Start Career Assessment
              <Target className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="card-gradient p-6 hover-lift">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Advanced algorithms analyze your skills and interests to find perfect career matches
              </p>
            </Card>

            <Card className="card-gradient p-6 hover-lift">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Interactive Roadmaps</h3>
              <p className="text-muted-foreground text-sm">
                Step-by-step visual paths with projects, courses, and certifications
              </p>
            </Card>

            <Card className="card-gradient p-6 hover-lift">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-muted-foreground text-sm">
                Monitor your learning journey and celebrate milestone achievements
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-muted-foreground">Students Guided</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-success mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Career Paths</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;