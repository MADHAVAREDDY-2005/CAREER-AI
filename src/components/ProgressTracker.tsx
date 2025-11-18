// ============================================
// PROGRESS TRACKER
// Visual progress overview with stats
// ============================================

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, Clock, TrendingUp } from 'lucide-react';
import { getProgress } from '@/lib/storage';

interface ProgressTrackerProps {
  totalSteps: number;
}

const ProgressTracker = ({ totalSteps }: ProgressTrackerProps) => {
  const progress = getProgress();
  const completedCount = progress.completedSteps.length;
  const progressPercentage = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  const getProgressMessage = () => {
    if (progressPercentage === 0) return "Let's start your learning journey!";
    if (progressPercentage < 25) return "Great start! Keep building momentum!";
    if (progressPercentage < 50) return "You're making solid progress!";
    if (progressPercentage < 75) return "More than halfway there! Don't stop now!";
    if (progressPercentage < 100) return "Almost there! You're so close!";
    return "🎉 Congratulations! You've completed the roadmap!";
  };

  const getProgressColor = () => {
    if (progressPercentage < 25) return 'text-muted-foreground';
    if (progressPercentage < 50) return 'text-warning';
    if (progressPercentage < 75) return 'text-primary';
    return 'text-success';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-primary/5 border-2">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Progress
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {getProgressMessage()}
            </p>
          </div>
          <div className={`text-4xl font-bold ${getProgressColor()}`}>
            {progressPercentage}%
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-4" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{completedCount} completed</span>
            <span>{totalSteps - completedCount} remaining</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-5 h-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{completedCount}</div>
            <div className="text-xs text-muted-foreground">Steps Done</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-foreground">{totalSteps - completedCount}</div>
            <div className="text-xs text-muted-foreground">To Go</div>
          </div>

          <div className="text-center">
            <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-2xl font-bold text-foreground">{progress.streak}</div>
            <div className="text-xs text-muted-foreground">Day Streak</div>
          </div>
        </div>

        {/* Achievement Badge */}
        {progressPercentage === 100 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-success/20 to-primary/20 rounded-lg border-2 border-success/50">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-success" />
              <div>
                <div className="font-bold text-foreground">Roadmap Completed!</div>
                <div className="text-sm text-muted-foreground">
                  Amazing work! Check out what's next for you.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProgressTracker;
