// Visual Candy Crush-style roadmap with road, nodes, and decorations
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle2, Lock, Play, Award } from 'lucide-react';
import { Career } from '@/types/career';
import { frontendRoadmap } from '@/data/roadmaps';
import RoadmapStepModal from './RoadmapStepModal';
import ProgressTracker from './ProgressTracker';
import StreakTracker from './StreakTracker';
import ComingSoon from './ComingSoon';
import { isStepCompleted, lockDomain } from '@/lib/storage';

interface VisualRoadmapProps {
  career: Career;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  onBack: () => void;
}

const VisualRoadmap = ({ career, experienceLevel, onBack }: VisualRoadmapProps) => {
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Lock domain when roadmap is accessed
  useState(() => {
    lockDomain(career.title);
  });

  const roadmapData = frontendRoadmap; // Map career to roadmap
  const steps = roadmapData.steps.filter(s => 
    s.level === 'beginner' || 
    (experienceLevel !== 'beginner' && s.level === 'intermediate') ||
    (experienceLevel === 'advanced' && s.level === 'advanced')
  );

  const handleStepClick = (step: any) => {
    setSelectedStep(step);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen p-6" style={{ background: 'var(--gradient-hero)' }}>
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <h1 className="text-4xl font-bold text-foreground mb-2">{career.title} Roadmap</h1>
        <p className="text-muted-foreground mb-8">Follow the path to master your skills</p>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <ProgressTracker totalSteps={steps.length} />
          </div>
          <StreakTracker />
        </div>

        {/* Visual Road with Steps */}
        <Card className="p-8 mb-8 bg-gradient-to-b from-background to-muted/30">
          <div className="relative">
            {/* Road visualization */}
            <div className="grid gap-6">
              {steps.map((step, index) => {
                const completed = isStepCompleted(step.id);
                const isLocked = index > 0 && !isStepCompleted(steps[index - 1].id);

                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-4 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}
                  >
                    <div
                      onClick={() => !isLocked && handleStepClick(step)}
                      className={`flex-1 p-6 rounded-xl border-2 cursor-pointer transition-all ${
                        completed ? 'bg-success/10 border-success' :
                        isLocked ? 'bg-muted/50 border-muted cursor-not-allowed' :
                        'bg-background border-primary/30 hover:border-primary hover:shadow-lg'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            completed ? 'bg-success text-white' :
                            isLocked ? 'bg-muted' :
                            'bg-primary/20 text-primary'
                          }`}>
                            {completed ? <CheckCircle2 className="w-6 h-6" /> :
                             isLocked ? <Lock className="w-5 h-5" /> :
                             <Play className="w-5 h-5" />}
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{step.title}</h3>
                            <p className="text-sm text-muted-foreground">{step.estimatedHours}h • {step.level}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </Card>

        <ComingSoon />
      </div>

      <RoadmapStepModal
        step={selectedStep}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={() => {}}
      />
    </div>
  );
};

export default VisualRoadmap;
