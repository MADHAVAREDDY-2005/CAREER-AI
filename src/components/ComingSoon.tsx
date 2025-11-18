// ============================================
// COMING SOON FEATURES
// Preview of upcoming features
// ============================================

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bot, FileText, Briefcase, Sparkles } from 'lucide-react';

const ComingSoon = () => {
  const upcomingFeatures = [
    {
      icon: Bot,
      title: 'AI Career Chatbot',
      description: 'Get personalized career advice, answer your questions, and receive guidance from an AI mentor 24/7.',
      color: 'from-primary/20 to-primary/5'
    },
    {
      icon: FileText,
      title: 'AI Resume Builder',
      description: 'Create ATS-friendly resumes tailored to your target role with AI-powered suggestions and templates.',
      color: 'from-secondary/20 to-secondary/5'
    },
    {
      icon: Briefcase,
      title: 'Job & Internship Finder',
      description: 'Discover opportunities matched to your skills, location, and experience level. Apply directly through our platform.',
      color: 'from-accent/20 to-accent/5'
    },
    {
      icon: Sparkles,
      title: 'Skill Assessment Tests',
      description: 'Take automated coding challenges and skill tests to validate your knowledge and earn certificates.',
      color: 'from-warning/20 to-warning/5'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-2">Coming Soon</h2>
        <p className="text-muted-foreground">
          Exciting features we're building to supercharge your career journey
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {upcomingFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card
              key={index}
              className={`p-6 relative overflow-hidden border-2 opacity-75 hover:opacity-90 transition-opacity`}
            >
              <Badge className="absolute top-4 right-4 bg-muted text-muted-foreground">
                Coming Soon
              </Badge>

              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-foreground" />
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>

              {/* Decorative gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 pointer-events-none`} />
            </Card>
          );
        })}
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Want early access?
          </h3>
          <p className="text-sm text-muted-foreground">
            These features are in active development. Keep learning and check back soon for updates!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default ComingSoon;
