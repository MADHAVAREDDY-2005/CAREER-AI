// ============================================
// INTERACTIVE ROADMAP COMPONENT
// Displays step-by-step learning path with progress tracking
// ============================================

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  CheckCircle2,
  BookOpen, 
  Award,
  ExternalLink
} from 'lucide-react';
import { Career } from '@/types/career';

interface InteractiveRoadmapProps {
  career: Career;
  onBack: () => void;
}

const InteractiveRoadmap = ({ career, onBack }: InteractiveRoadmapProps) => {
  // Track which phases are completed (beginner, intermediate, advanced)
  const [completedPhases, setCompletedPhases] = useState<Set<string>>(new Set());

  // Toggle phase completion
  const togglePhaseCompletion = (phase: string) => {
    setCompletedPhases(prev => {
      const newSet = new Set(prev);
      if (newSet.has(phase)) {
        newSet.delete(phase);
      } else {
        newSet.add(phase);
      }
      return newSet;
    });
  };

  // Calculate progress percentage (3 phases total)
  const totalPhases = 3;
  const progressPercentage = Math.round((completedPhases.size / totalPhases) * 100);

  // Define the learning phases
  const phases = [
    { key: 'beginner', title: 'Beginner', data: career.roadmap.beginner, color: 'success' },
    { key: 'intermediate', title: 'Intermediate', data: career.roadmap.intermediate, color: 'warning' },
    { key: 'advanced', title: 'Advanced', data: career.roadmap.advanced, color: 'destructive' }
  ];

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
            Back to Recommendations
          </Button>
          <h1 className="text-2xl font-bold text-foreground">{career.title} Roadmap</h1>
          <div className="w-40"></div>
        </div>

        {/* Progress Overview */}
        <Card className="card-gradient p-6 mb-8 border shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-foreground">Your Progress</h2>
              <p className="text-muted-foreground">Track your learning journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{progressPercentage}%</div>
              <div className="text-sm text-muted-foreground">
                {completedPhases.size} of {totalPhases} phases completed
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </Card>

        {/* Roadmap Phases */}
        <div className="space-y-8">
          {phases.map((phase, index) => {
            const isCompleted = completedPhases.has(phase.key);
            
            return (
              <Card 
                key={phase.key}
                className={`p-6 border shadow-md transition-all ${
                  isCompleted ? 'border-success/50 bg-success/5' : ''
                }`}
              >
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-success text-white' : 'bg-primary/10 text-primary'
                    }`}>
                      {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold">{index + 1}</span>}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{phase.title} Level</h3>
                      <p className="text-sm text-muted-foreground">{phase.data.skills.length} skills to learn</p>
                    </div>
                  </div>
                  <Button
                    variant={isCompleted ? "outline" : "default"}
                    onClick={() => togglePhaseCompletion(phase.key)}
                  >
                    {isCompleted ? 'Mark Incomplete' : 'Mark Complete'}
                  </Button>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    Skills to Learn
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {phase.data.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    Practice Projects
                  </h4>
                  <ul className="space-y-2">
                    {phase.data.projects.map((project, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground">
                        <span className="text-primary mt-1">•</span>
                        <span>{project}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Courses */}
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Learning Resources
                  </h4>
                  <div className="space-y-2">
                    {phase.data.courses.map((course, idx) => (
                      <div key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                        <span className="text-primary">→</span>
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Completion Card */}
        {progressPercentage === 100 && (
          <Card className="card-gradient p-8 text-center mt-8 border-success border shadow-lg">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Congratulations!
            </h2>
            <p className="text-muted-foreground mb-6">
              You've completed the {career.title} roadmap! You're now ready to pursue this career path.
            </p>
            <Button className="bg-gradient-to-r from-success to-accent text-white">
              Download Certificate
              <Award className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InteractiveRoadmap;
