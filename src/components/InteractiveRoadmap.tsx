import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Play, 
  BookOpen, 
  Award, 
  ExternalLink,
  Clock,
  Star,
  Github
} from 'lucide-react';
import { Career } from '@/types/career';

interface InteractiveRoadmapProps {
  career: Career;
  onBack: () => void;
}

const InteractiveRoadmap = ({ career, onBack }: InteractiveRoadmapProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const getProgressPercentage = () => {
    return Math.round((completedSteps.size / career.roadmap.length) * 100);
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="w-4 h-4" />;
      case 'course': return <BookOpen className="w-4 h-4" />;
      case 'certification': return <Award className="w-4 h-4" />;
      case 'documentation': return <BookOpen className="w-4 h-4" />;
      default: return <BookOpen className="w-4 h-4" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'text-skill-beginner';
      case 'intermediate': return 'text-skill-intermediate';
      case 'advanced': return 'text-skill-advanced';
      default: return 'text-muted-foreground';
    }
  };

  const getLevelBg = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-skill-beginner/10 border-skill-beginner/30';
      case 'intermediate': return 'bg-skill-intermediate/10 border-skill-intermediate/30';
      case 'advanced': return 'bg-skill-advanced/10 border-skill-advanced/30';
      default: return 'bg-muted/10 border-muted/30';
    }
  };

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
        <Card className="card-gradient p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Your Progress</h2>
              <p className="text-muted-foreground">Track your learning journey</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{getProgressPercentage()}%</div>
              <div className="text-sm text-muted-foreground">
                {completedSteps.size} of {career.roadmap.length} completed
              </div>
            </div>
          </div>
          <Progress value={getProgressPercentage()} className="h-3" />
        </Card>

        {/* Roadmap */}
        <div className="roadmap-path space-y-8">
          {career.roadmap.map((node, index) => {
            const isCompleted = completedSteps.has(node.id);
            const isNext = !isCompleted && index === Array.from(completedSteps).length;
            
            return (
              <div key={node.id} className="flex gap-6 relative">
                {/* Progress Node */}
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => toggleStepCompletion(node.id)}
                    className={`progress-node w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      isCompleted 
                        ? 'completed bg-success border-success' 
                        : isNext 
                        ? 'current bg-primary border-primary' 
                        : 'pending bg-muted border-border'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-success-foreground" />
                    ) : (
                      <Circle className="w-4 h-4 text-current" />
                    )}
                  </button>
                  {index < career.roadmap.length - 1 && (
                    <div className="w-0.5 h-16 bg-gradient-to-b from-primary/30 to-secondary/30 mt-2" />
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 pb-8">
                  <Card className={`card-gradient p-6 transition-all duration-300 ${
                    isCompleted 
                      ? 'border-success/50' 
                      : isNext 
                      ? 'border-primary/50' 
                      : ''
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {node.skill.name}
                        </h3>
                        <p className="text-muted-foreground mb-3">
                          {node.skill.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{node.skill.estimatedHours} hours</span>
                          </div>
                          <Badge 
                            variant="outline" 
                            className={`${getLevelBg(node.skill.level)} ${getLevelColor(node.skill.level)}`}
                          >
                            {node.skill.level}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Projects */}
                    {node.projects.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-foreground mb-3">Practice Projects</h4>
                        <div className="grid gap-4">
                          {node.projects.map((project) => (
                            <Card key={project.id} className="p-4 border border-border/50">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="font-semibold text-foreground">{project.name}</h5>
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {project.description}
                                  </p>
                                  <div className="flex flex-wrap gap-2 mb-3">
                                    {project.skills.map((skill) => (
                                      <Badge key={skill} variant="secondary" className="text-xs">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <Badge 
                                  variant="outline"
                                  className={`ml-4 ${getLevelBg(project.difficulty)} ${getLevelColor(project.difficulty)}`}
                                >
                                  {project.difficulty}
                                </Badge>
                              </div>
                              {(project.githubUrl || project.liveUrl) && (
                                <div className="flex gap-2 mt-3">
                                  {project.githubUrl && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="w-4 h-4 mr-1" />
                                        Code
                                      </a>
                                    </Button>
                                  )}
                                  {project.liveUrl && (
                                    <Button size="sm" variant="outline" asChild>
                                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4 mr-1" />
                                        Live Demo
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              )}
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Learning Resources */}
                    {node.resources.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-3">Learning Resources</h4>
                        <div className="grid gap-3">
                          {node.resources.map((resource) => (
                            <Card 
                              key={resource.id} 
                              className="p-4 border border-border/50 hover:bg-accent/5 transition-colors"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="text-primary">
                                    {getResourceIcon(resource.type)}
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-foreground text-sm">
                                      {resource.title}
                                    </h5>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                      <span>{resource.provider}</span>
                                      {resource.duration && (
                                        <>
                                          <span>•</span>
                                          <span>{resource.duration}</span>
                                        </>
                                      )}
                                      {resource.rating && (
                                        <>
                                          <span>•</span>
                                          <div className="flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current text-warning" />
                                            <span>{resource.rating}</span>
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {resource.isFree && (
                                    <Badge variant="secondary" className="text-xs bg-success/10 text-success">
                                      Free
                                    </Badge>
                                  )}
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
            );
          })}
        </div>

        {/* Completion Card */}
        {getProgressPercentage() === 100 && (
          <Card className="card-gradient p-8 text-center mt-8 border-success/50">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Congratulations!
            </h2>
            <p className="text-muted-foreground mb-6">
              You've completed the {career.title} roadmap! You're now ready to pursue this career path.
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-success to-accent text-foreground">
                Get Certificate
                <Award className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline">
                Explore Advanced Topics
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default InteractiveRoadmap;