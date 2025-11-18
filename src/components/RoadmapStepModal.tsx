// ============================================
// ROADMAP STEP MODAL
// Detailed view of learning step with video, resources, and tasks
// ============================================

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Clock, CheckCircle2, BookOpen } from 'lucide-react';
import { RoadmapStep } from '@/data/roadmaps';
import { markStepComplete, isStepCompleted } from '@/lib/storage';
import { toast } from '@/hooks/use-toast';

interface RoadmapStepModalProps {
  step: RoadmapStep | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const RoadmapStepModal = ({ step, isOpen, onClose, onComplete }: RoadmapStepModalProps) => {
  const [tasksDone, setTasksDone] = useState<Set<number>>(new Set());
  
  if (!step) return null;

  const isCompleted = isStepCompleted(step.id);
  const allTasksCompleted = tasksDone.size === step.tasks.length;

  const handleTaskToggle = (index: number) => {
    setTasksDone(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const handleComplete = () => {
    if (!allTasksCompleted) {
      toast({
        title: 'Complete all tasks first',
        description: 'Finish all mini tasks before marking this step as complete',
        variant: 'destructive'
      });
      return;
    }

    markStepComplete(step.id);
    toast({
      title: '🎉 Step completed!',
      description: `You've finished ${step.title}. Keep going!`
    });
    onComplete();
    onClose();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-skill-beginner text-white';
      case 'intermediate': return 'bg-skill-intermediate text-white';
      case 'advanced': return 'bg-skill-advanced text-white';
      default: return 'bg-muted';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <DialogTitle className="text-2xl">{step.title}</DialogTitle>
            <Badge className={getLevelColor(step.level)}>
              {step.level}
            </Badge>
            {isCompleted && (
              <Badge className="bg-success text-white">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          <DialogDescription className="text-base">
            {step.description}
          </DialogDescription>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <Clock className="w-4 h-4" />
            <span>Estimated: {step.estimatedHours} hours</span>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Video Section */}
          {step.youtubeId && (
            <div>
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Video Tutorial
              </h3>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${step.youtubeId}`}
                  title={step.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="border-0"
                />
              </div>
            </div>
          )}

          {/* Theory Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">📚 What You'll Learn</h3>
            <p className="text-muted-foreground leading-relaxed">
              {step.theory}
            </p>
          </div>

          {/* Tasks Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">
              ✅ Practice Tasks ({tasksDone.size}/{step.tasks.length})
            </h3>
            <div className="space-y-3">
              {step.tasks.map((task, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <Checkbox
                    id={`task-${index}`}
                    checked={tasksDone.has(index)}
                    onCheckedChange={() => handleTaskToggle(index)}
                    className="mt-1"
                  />
                  <label
                    htmlFor={`task-${index}`}
                    className={`flex-1 cursor-pointer ${
                      tasksDone.has(index) ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {task}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div>
            <h3 className="font-semibold text-lg mb-3">🔗 Learning Resources</h3>
            <div className="grid gap-3">
              {step.resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">
                      {resource.type}
                    </Badge>
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {resource.title}
                    </span>
                    {resource.isFree && (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Free
                      </Badge>
                    )}
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Close
            </Button>
            {!isCompleted && (
              <Button
                onClick={handleComplete}
                disabled={!allTasksCompleted}
                className="flex-1"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoadmapStepModal;
