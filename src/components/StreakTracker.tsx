// ============================================
// STREAK TRACKER
// Gamified daily learning streak counter
// ============================================

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, TrendingUp, Calendar } from 'lucide-react';
import { getStreak, getProgress } from '@/lib/storage';

const StreakTracker = () => {
  const [streak, setStreak] = useState(0);
  const [lastActivity, setLastActivity] = useState<string>('');

  useEffect(() => {
    const progress = getProgress();
    setStreak(progress.streak);
    setLastActivity(progress.lastActivity);
  }, []);

  const getStreakMessage = () => {
    const today = new Date().toDateString();
    const lastActivityDate = new Date(lastActivity).toDateString();
    
    if (streak === 0) {
      return "Start your learning streak today!";
    }
    
    if (today !== lastActivityDate) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toDateString();
      
      if (lastActivityDate === yesterdayStr) {
        return "Complete a step today to continue your streak!";
      } else {
        return "You missed yesterday. Start a new streak today!";
      }
    }
    
    if (streak === 1) {
      return "Great start! Come back tomorrow to build your streak!";
    }
    
    if (streak < 7) {
      return `${streak}-day streak! Keep it going! 🔥`;
    }
    
    if (streak < 30) {
      return `Amazing ${streak}-day streak! You're on fire! 🔥🔥`;
    }
    
    return `Incredible ${streak}-day streak! You're unstoppable! 🔥🔥🔥`;
  };

  const getStreakColor = () => {
    if (streak === 0) return 'text-muted-foreground';
    if (streak < 7) return 'text-warning';
    if (streak < 30) return 'text-primary';
    return 'text-destructive';
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-background to-muted/30 border-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full bg-gradient-to-br ${
            streak === 0 ? 'from-muted to-muted/50' :
            streak < 7 ? 'from-warning/20 to-warning/10' :
            streak < 30 ? 'from-primary/20 to-primary/10' :
            'from-destructive/20 to-destructive/10'
          }`}>
            <Flame className={`w-8 h-8 ${getStreakColor()}`} />
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-2xl font-bold text-foreground">
                {streak} {streak === 1 ? 'Day' : 'Days'}
              </h3>
              {streak >= 7 && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  On Fire!
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{getStreakMessage()}</p>
          </div>
        </div>

        {streak > 0 && (
          <div className="text-right">
            <div className="flex items-center gap-1 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4" />
              <span>Since {new Date(getProgress().streakStartDate).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Streak milestones */}
      {streak > 0 && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-4 gap-2">
            {[7, 14, 30, 100].map((milestone) => (
              <div
                key={milestone}
                className={`text-center p-2 rounded ${
                  streak >= milestone
                    ? 'bg-success/10 text-success'
                    : 'bg-muted/50 text-muted-foreground'
                }`}
              >
                <div className="text-lg font-bold">{milestone}</div>
                <div className="text-xs">days</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default StreakTracker;
