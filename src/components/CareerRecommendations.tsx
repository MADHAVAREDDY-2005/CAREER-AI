import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, Users, Clock } from 'lucide-react';
import { AssessmentData, Career } from '@/types/career';
import { generateCareerRecommendations } from '@/lib/careerEngine';

interface CareerRecommendationsProps {
  assessmentData: AssessmentData;
  onCareerSelect: (career: Career) => void;
  onBack: () => void;
}

const CareerRecommendations = ({ assessmentData, onCareerSelect, onBack }: CareerRecommendationsProps) => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateRecommendations = async () => {
      setLoading(true);
      try {
        const recommendations = await generateCareerRecommendations(assessmentData);
        setCareers(recommendations);
      } catch (error) {
        console.error('Error generating recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    generateRecommendations();
  }, [assessmentData]);

  const getCareerIcon = (category: string) => {
    const icons = {
      web: '🌐',
      mobile: '📱',
      ml: '🤖',
      cloud: '☁️',
      data: '📊',
      cyber: '🔒'
    };
    return icons[category as keyof typeof icons] || '💻';
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 75) return 'text-accent';
    if (percentage >= 60) return 'text-warning';
    return 'text-muted-foreground';
  };

  if (loading) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <Card className="card-gradient p-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full mx-auto animate-bounce-in"></div>
            <h3 className="text-xl font-semibold">Analyzing your profile...</h3>
            <p className="text-muted-foreground">Finding the best career matches for you</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-foreground hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessment
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Your Career Recommendations</h1>
          <div className="w-32"></div>
        </div>

        {/* Summary Card */}
        <Card className="card-gradient p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Assessment Summary</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Your Interests</h3>
              <div className="flex flex-wrap gap-2">
                {assessmentData.interests.map((interest) => (
                  <Badge key={interest} variant="secondary" className="bg-primary/10 text-primary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-sm text-muted-foreground mb-2">Current Skills</h3>
              <div className="flex flex-wrap gap-2">
                {assessmentData.currentSkills.length > 0 ? (
                  assessmentData.currentSkills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-success/10 text-success">
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-muted-foreground text-sm">No skills specified</span>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Career Recommendations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Recommended Career Paths</h2>
          
          {careers.length === 0 ? (
            <Card className="card-gradient p-8 text-center">
              <p className="text-muted-foreground">No career recommendations found. Please try adjusting your interests or skills.</p>
            </Card>
          ) : (
            <div className="grid gap-6">
              {careers.map((career) => (
                <Card 
                  key={career.id} 
                  className="career-card p-6 cursor-pointer"
                  data-career={career.category}
                  onClick={() => onCareerSelect(career)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{getCareerIcon(career.category)}</div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{career.title}</h3>
                        <p className="text-muted-foreground">{career.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getMatchColor(career.matchPercentage)}`}>
                        {career.matchPercentage}%
                      </div>
                      <div className="text-xs text-muted-foreground">Match</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Career Match</span>
                      <span className={getMatchColor(career.matchPercentage)}>
                        {career.matchPercentage}%
                      </span>
                    </div>
                    <Progress value={career.matchPercentage} className="h-2" />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      <div>
                        <div className="text-sm font-semibold">{career.averageSalary}</div>
                        <div className="text-xs text-muted-foreground">Average Salary</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-accent" />
                      <div>
                        <div className="text-sm font-semibold">{career.jobGrowth}</div>
                        <div className="text-xs text-muted-foreground">Job Growth</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-warning" />
                      <div>
                        <div className="text-sm font-semibold">{career.roadmap.length} Steps</div>
                        <div className="text-xs text-muted-foreground">Learning Path</div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">Required Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.slice(0, 6).map((skill) => (
                        <Badge 
                          key={skill} 
                          variant="outline"
                          className={`
                            ${assessmentData.currentSkills.includes(skill) 
                              ? 'bg-success/10 text-success border-success/30' 
                              : 'bg-muted/10 text-muted-foreground border-muted/30'
                            }
                          `}
                        >
                          {skill}
                          {assessmentData.currentSkills.includes(skill) && ' ✓'}
                        </Badge>
                      ))}
                      {career.requiredSkills.length > 6 && (
                        <Badge variant="outline" className="text-muted-foreground">
                          +{career.requiredSkills.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Click to view detailed roadmap
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {careers.length > 0 && (
          <Card className="card-gradient p-6 mt-8 text-center">
            <h3 className="font-semibold mb-2">Not seeing what you expected?</h3>
            <p className="text-muted-foreground text-sm mb-4">
              These recommendations are based on your current input. You can go back and adjust your interests or skills for different results.
            </p>
            <Button variant="outline" onClick={onBack}>
              Retake Assessment
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CareerRecommendations;