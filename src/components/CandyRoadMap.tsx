// ============================================
// CANDY CRUSH-STYLE INTERACTIVE ROADMAP
// Visual learning path with animated nodes, progress tracking, and embedded videos
// ============================================

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  ArrowLeft, 
  CheckCircle2,
  Lock,
  Play,
  Award,
  ExternalLink,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Career } from '@/types/career';
import { RoadmapNode, RoadmapProgress } from '@/types/roadmap';
import { toast } from '@/hooks/use-toast';

interface CandyRoadMapProps {
  career: Career;
  onBack: () => void;
}

// Storage key for localStorage
const STORAGE_KEY = 'career_roadmap_progress';

// Convert career roadmap to node structure
const convertToNodes = (career: Career): RoadmapNode[] => {
  const nodes: RoadmapNode[] = [];
  let nodeIndex = 0;

  // Beginner phase
  career.roadmap.beginner.skills.forEach((skill, idx) => {
    nodes.push({
      id: `beginner-skill-${nodeIndex}`,
      type: 'skill',
      title: skill,
      description: `Master ${skill} fundamentals to build your foundation.`,
      youtubeId: extractYouTubeId(career.roadmap.beginner.courses[0] || ''),
      resources: career.roadmap.beginner.courses.map(course => ({
        title: course.split('(')[0].trim(),
        url: extractUrl(course),
        type: 'course' as const,
        isFree: true
      })),
      estimatedHours: 10 + idx * 5
    });
    nodeIndex++;
  });

  career.roadmap.beginner.projects.forEach((project, idx) => {
    nodes.push({
      id: `beginner-project-${nodeIndex}`,
      type: 'project',
      title: project,
      description: `Build this project to practice your beginner skills: ${career.roadmap.beginner.skills.join(', ')}.`,
      resources: [{
        title: 'Project Ideas & Tutorials',
        url: 'https://www.freecodecamp.org/news/tag/projects/',
        type: 'article',
        isFree: true
      }],
      estimatedHours: 15 + idx * 5
    });
    nodeIndex++;
  });

  // Intermediate phase
  career.roadmap.intermediate.skills.forEach((skill, idx) => {
    nodes.push({
      id: `intermediate-skill-${nodeIndex}`,
      type: 'skill',
      title: skill,
      description: `Level up with ${skill} to build more complex applications.`,
      youtubeId: extractYouTubeId(career.roadmap.intermediate.courses[0] || ''),
      resources: career.roadmap.intermediate.courses.map(course => ({
        title: course.split('(')[0].trim(),
        url: extractUrl(course),
        type: 'course' as const,
        isFree: true
      })),
      estimatedHours: 20 + idx * 8
    });
    nodeIndex++;
  });

  career.roadmap.intermediate.projects.forEach((project, idx) => {
    nodes.push({
      id: `intermediate-project-${nodeIndex}`,
      type: 'project',
      title: project,
      description: `Apply your intermediate skills: ${career.roadmap.intermediate.skills.join(', ')}.`,
      resources: [{
        title: 'Intermediate Projects',
        url: 'https://github.com/topics/project-ideas',
        type: 'article',
        isFree: true
      }],
      estimatedHours: 25 + idx * 10
    });
    nodeIndex++;
  });

  // Advanced phase
  career.roadmap.advanced.skills.forEach((skill, idx) => {
    nodes.push({
      id: `advanced-skill-${nodeIndex}`,
      type: 'skill',
      title: skill,
      description: `Master advanced ${skill} for professional-grade applications.`,
      youtubeId: extractYouTubeId(career.roadmap.advanced.courses[0] || ''),
      resources: career.roadmap.advanced.courses.map(course => ({
        title: course.split('(')[0].trim(),
        url: extractUrl(course),
        type: 'course' as const,
        isFree: true
      })),
      estimatedHours: 30 + idx * 12
    });
    nodeIndex++;
  });

  career.roadmap.advanced.projects.forEach((project, idx) => {
    nodes.push({
      id: `advanced-project-${nodeIndex}`,
      type: 'project',
      title: project,
      description: `Showcase your expertise with this advanced project using ${career.roadmap.advanced.skills.join(', ')}.`,
      resources: [{
        title: 'Advanced Project Ideas',
        url: 'https://github.com/practical-tutorials/project-based-learning',
        type: 'article',
        isFree: true
      }],
      estimatedHours: 40 + idx * 15
    });
    nodeIndex++;
  });

  return nodes;
};

// Extract YouTube video ID from URL
const extractYouTubeId = (url: string): string | undefined => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : undefined;
};

// Extract URL from course string
const extractUrl = (courseString: string): string => {
  const urlMatch = courseString.match(/https?:\/\/[^\s)]+/);
  return urlMatch ? urlMatch[0] : '';
};

const CandyRoadMap = ({ career, onBack }: CandyRoadMapProps) => {
  const [nodes] = useState<RoadmapNode[]>(() => convertToNodes(career));
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [progress, setProgress] = useState<RoadmapProgress>(() => {
    // Load progress from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const allProgress: RoadmapProgress[] = JSON.parse(stored);
      const careerProgress = allProgress.find(p => p.careerId === career.id);
      if (careerProgress) {
        return careerProgress;
      }
    }
    // Initialize new progress
    return {
      careerId: career.id,
      careerTitle: career.title,
      completedNodeIds: [],
      currentNodeId: nodes[0]?.id || '',
      lastUpdated: Date.now(),
      percentComplete: 0
    };
  });

  const [showCompletionModal, setShowCompletionModal] = useState(false);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProgress: RoadmapProgress[] = stored ? JSON.parse(stored) : [];
    const otherProgress = allProgress.filter(p => p.careerId !== career.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...otherProgress, progress]));
  }, [progress, career.id]);

  // Mark node as complete
  const completeNode = (nodeId: string) => {
    if (progress.completedNodeIds.includes(nodeId)) return;

    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    const newCompletedIds = [...progress.completedNodeIds, nodeId];
    const percentComplete = Math.round((newCompletedIds.length / nodes.length) * 100);
    const nextNode = nodes[nodeIndex + 1];

    setProgress({
      ...progress,
      completedNodeIds: newCompletedIds,
      currentNodeId: nextNode?.id || nodeId,
      lastUpdated: Date.now(),
      percentComplete
    });

    toast({
      title: "Step completed! 🎉",
      description: `You're making great progress on your ${career.title} journey!`
    });

    // Check if all nodes completed
    if (percentComplete === 100) {
      setShowCompletionModal(true);
    }

    setSelectedNode(null);
  };

  // Get node status
  const getNodeStatus = (nodeId: string): 'completed' | 'current' | 'locked' => {
    if (progress.completedNodeIds.includes(nodeId)) return 'completed';
    const nodeIndex = nodes.findIndex(n => n.id === nodeId);
    const currentIndex = nodes.findIndex(n => n.id === progress.currentNodeId);
    if (nodeIndex <= currentIndex) return 'current';
    return 'locked';
  };

  // Get node color based on phase and type
  const getNodeColor = (node: RoadmapNode): string => {
    const nodeIndex = nodes.findIndex(n => n.id === node.id);
    const totalNodes = nodes.length;
    
    if (nodeIndex < totalNodes / 3) {
      return node.type === 'skill' ? 'bg-emerald-500' : 'bg-emerald-600';
    } else if (nodeIndex < (totalNodes * 2) / 3) {
      return node.type === 'skill' ? 'bg-amber-500' : 'bg-amber-600';
    } else {
      return node.type === 'skill' ? 'bg-rose-500' : 'bg-rose-600';
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-2 hover:bg-primary/5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{career.title} Journey</h1>
          <div className="w-20"></div>
        </div>

        {/* Progress Card */}
        <Card className="p-6 mb-12 border-2 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Your Progress
              </h2>
              <p className="text-muted-foreground mt-1">
                {progress.completedNodeIds.length} of {nodes.length} steps completed
              </p>
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-primary">{progress.percentComplete}%</div>
            </div>
          </div>
          <Progress value={progress.percentComplete} className="h-4" />
        </Card>

        {/* Candy Crush Style Roadmap */}
        <div className="relative">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <div
                key={`tree-${i}`}
                className="absolute text-6xl"
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`,
                  transform: 'rotate(-5deg)'
                }}
              >
                🌳
              </div>
            ))}
            {[...Array(8)].map((_, i) => (
              <div
                key={`flower-${i}`}
                className="absolute text-4xl"
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${10 + (i % 3) * 25}%`
                }}
              >
                🌸
              </div>
            ))}
          </div>

          {/* Road path */}
          <div className="relative z-10 min-h-screen">
            <svg className="absolute inset-0 w-full h-full" style={{ minHeight: `${nodes.length * 150}px` }}>
              <defs>
                <pattern id="road-pattern" x="0" y="0" width="20" height="80" patternUnits="userSpaceOnUse">
                  <line x1="10" y1="0" x2="10" y2="40" stroke="white" strokeWidth="4" strokeDasharray="20,20" />
                </pattern>
              </defs>
              <path
                d={`M 50,50 Q 400,150 300,300 T 500,600 Q 600,750 400,900 T 300,${nodes.length * 150 - 100}`}
                stroke="#1a1a1a"
                strokeWidth="120"
                fill="none"
                opacity="0.15"
              />
              <path
                d={`M 50,50 Q 400,150 300,300 T 500,600 Q 600,750 400,900 T 300,${nodes.length * 150 - 100}`}
                stroke="url(#road-pattern)"
                strokeWidth="6"
                fill="none"
              />
            </svg>

            {/* Roadmap nodes */}
            <div className="relative" style={{ minHeight: `${nodes.length * 150}px` }}>
              {nodes.map((node, index) => {
                const status = getNodeStatus(node.id);
                const isClickable = status !== 'locked';
                
                // Calculate position along the curved path
                const progress = index / Math.max(nodes.length - 1, 1);
                const xOffset = 50 + Math.sin(progress * Math.PI * 3) * 300;
                const yOffset = 50 + index * 150;

                return (
                  <motion.div
                    key={node.id}
                    className="absolute"
                    style={{
                      left: `${xOffset}px`,
                      top: `${yOffset}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <motion.button
                      onClick={() => isClickable && setSelectedNode(node)}
                      disabled={!isClickable}
                      className={`relative ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                      whileHover={isClickable ? { scale: 1.1 } : {}}
                      whileTap={isClickable ? { scale: 0.95 } : {}}
                    >
                      {/* Node circle */}
                      <div
                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-white transition-all ${
                          status === 'completed'
                            ? 'bg-gradient-to-br from-green-400 to-green-600'
                            : status === 'current'
                            ? getNodeColor(node)
                            : 'bg-gray-300'
                        }`}
                      >
                        {status === 'completed' ? (
                          <CheckCircle2 className="w-12 h-12 text-white" />
                        ) : status === 'locked' ? (
                          <Lock className="w-10 h-10 text-gray-500" />
                        ) : (
                          <div className="text-white text-center">
                            {node.type === 'skill' ? '📚' : '💻'}
                          </div>
                        )}
                      </div>

                      {/* Glowing effect for current node */}
                      {status === 'current' && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-primary/30"
                          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}

                      {/* Node label */}
                      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-40 text-center">
                        <p className="font-semibold text-sm text-foreground line-clamp-2">
                          {node.title}
                        </p>
                        <Badge variant="secondary" className="mt-1 text-xs">
                          {node.type === 'skill' ? '📖 Skill' : '🎯 Project'}
                        </Badge>
                      </div>
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Node Detail Modal */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedNode && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl flex items-center gap-2">
                    {selectedNode.type === 'skill' ? '📚' : '💻'}
                    {selectedNode.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Description */}
                  <p className="text-muted-foreground">{selectedNode.description}</p>

                  {/* Estimated time */}
                  {selectedNode.estimatedHours && (
                    <Badge variant="outline" className="text-sm">
                      ⏱️ Estimated: {selectedNode.estimatedHours} hours
                    </Badge>
                  )}

                  {/* YouTube Video Embed */}
                  {selectedNode.youtubeId && (
                    <div className="space-y-2">
                      <h3 className="font-semibold flex items-center gap-2">
                        <Play className="w-5 h-5 text-primary" />
                        Video Tutorial
                      </h3>
                      <div className="aspect-video rounded-lg overflow-hidden border-2">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${selectedNode.youtubeId}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Resources */}
                  {selectedNode.resources.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-semibold flex items-center gap-2">
                        <ExternalLink className="w-5 h-5 text-primary" />
                        Learning Resources
                      </h3>
                      <div className="space-y-2">
                        {selectedNode.resources.map((resource, idx) => (
                          <a
                            key={idx}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                          >
                            <div>
                              <p className="font-medium text-foreground">{resource.title}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {resource.type}
                                </Badge>
                                {resource.isFree && (
                                  <Badge variant="outline" className="text-xs text-green-600 border-green-600">
                                    FREE
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action button */}
                  <Button
                    onClick={() => completeNode(selectedNode.id)}
                    disabled={progress.completedNodeIds.includes(selectedNode.id)}
                    className="w-full"
                    size="lg"
                  >
                    {progress.completedNodeIds.includes(selectedNode.id) ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mr-2" />
                        Completed
                      </>
                    ) : (
                      <>
                        Mark as Complete
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Completion Celebration Modal */}
        <Dialog open={showCompletionModal} onOpenChange={setShowCompletionModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-3xl text-center">
                🎉 Congratulations! 🎉
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-6 text-center">
              <div className="text-8xl">
                <Trophy className="w-32 h-32 mx-auto text-yellow-500" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  You've completed the {career.title} roadmap!
                </h3>
                <p className="text-muted-foreground">
                  You're now ready to pursue this career path professionally.
                </p>
              </div>

              <div className="space-y-3 text-left bg-accent/50 p-6 rounded-lg">
                <h4 className="font-semibold text-lg">🚀 What's Next?</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Apply for internships on Internshala, LinkedIn Jobs, and AngelList</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Contribute to open-source projects on GitHub</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Build a strong portfolio showcasing your projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Update your resume with all your new skills and projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">→</span>
                    <span>Network with professionals in your field on LinkedIn</span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-3">
                <Button asChild variant="outline" className="flex-1">
                  <a href="https://internshala.com" target="_blank" rel="noopener noreferrer">
                    Find Internships
                  </a>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <a href="https://github.com/topics" target="_blank" rel="noopener noreferrer">
                    Explore Open Source
                  </a>
                </Button>
              </div>

              <Button onClick={() => setShowCompletionModal(false)} className="w-full" size="lg">
                Continue Exploring
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CandyRoadMap;
