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
      theory: `${skill} is a foundational skill in ${career.title}. Understanding the core concepts and syntax is essential. Take time to practice with small exercises and understand the 'why' behind each concept, not just the 'how'. Build a strong foundation here as it will support all your future learning.`,
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
      theory: `This project will help you apply the fundamental concepts you've learned. Focus on building a working solution and don't worry about perfection. The key is to practice implementing what you've studied.`,
      youtubeId: 'dQw4w9WgXcQ', // Placeholder - will be updated with actual project tutorials
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
      theory: `${skill} builds upon your foundational knowledge and introduces more advanced concepts. At this level, focus on understanding design patterns, best practices, and how to write maintainable code. Study real-world examples and understand how professionals use this skill in production environments.`,
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
      theory: `At this intermediate level, focus on building more complex applications that solve real problems. Pay attention to code organization, best practices, and user experience. This is where you start thinking like a professional developer.`,
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
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
      theory: `${skill} represents advanced expertise in ${career.title}. At this level, you should understand not just how to use the technology, but when and why to use it. Study system design, performance optimization, security considerations, and scalability. Master the trade-offs and decision-making processes that professionals use.`,
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
      theory: `Advanced projects are your opportunity to demonstrate mastery and build portfolio-worthy applications. Focus on scalability, performance, testing, and production-ready code. These projects should showcase your ability to architect and deliver professional-grade solutions.`,
      youtubeId: 'dQw4w9WgXcQ', // Placeholder
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
  const [isRoadmapLocked, setIsRoadmapLocked] = useState(false);

  // Check if user has started this roadmap (has any progress)
  const hasStartedRoadmap = progress.completedNodeIds.length > 0;

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const allProgress: RoadmapProgress[] = stored ? JSON.parse(stored) : [];
    const otherProgress = allProgress.filter(p => p.careerId !== career.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...otherProgress, progress]));

    // Set active career lock when user starts making progress
    if (progress.completedNodeIds.length > 0) {
      localStorage.setItem('active_career_id', career.id.toString());
    }
  }, [progress, career.id]);

  // Check if another career is locked
  useEffect(() => {
    const activeCareer = localStorage.getItem('active_career_id');
    if (activeCareer && activeCareer !== career.id.toString()) {
      setIsRoadmapLocked(true);
    }
  }, [career.id]);

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
      // Clear the career lock when roadmap is completed
      localStorage.removeItem('active_career_id');
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
    <div className="min-h-screen bg-gradient-to-b from-sky-200 via-sky-100 to-green-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-2 hover:bg-primary/5 bg-white"
            disabled={hasStartedRoadmap}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {hasStartedRoadmap ? 'Complete to Go Back' : 'Back'}
          </Button>
          <h1 className="text-3xl font-bold text-foreground drop-shadow-sm">{career.title} Journey</h1>
          <div className="w-20"></div>
        </div>

        {/* Progress Card */}
        <Card className="p-6 mb-12 border-2 shadow-lg bg-white/95 backdrop-blur">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-primary" />
                Your Progress
              </h2>
              <p className="text-muted-foreground mt-1">
                {progress.completedNodeIds.length} of {nodes.length} steps completed
              </p>
              {hasStartedRoadmap && (
                <p className="text-xs text-amber-600 mt-2 font-medium">
                  🔒 Complete this roadmap to explore other careers
                </p>
              )}
            </div>
            <div className="text-right">
              <div className="text-5xl font-bold text-primary">{progress.percentComplete}%</div>
            </div>
          </div>
          <Progress value={progress.percentComplete} className="h-4" />
        </Card>

        {/* 3D Mountain Road Roadmap */}
        <div className="relative min-h-[3000px]">
          {/* Realistic Background with Green Grass and Trees */}
          <div className="absolute inset-0 bg-gradient-to-b from-green-200 via-green-100 to-green-50 pointer-events-none"></div>
          
          {/* Realistic Decorations along the road */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Left side - realistic trees and buildings */}
            <div className="absolute left-[10%] top-20 text-7xl opacity-90 drop-shadow-2xl">🌲</div>
            <div className="absolute left-[8%] top-80 text-7xl opacity-85">🌲</div>
            <div className="absolute left-[12%] top-[400px] text-6xl opacity-80">🏠</div>
            <div className="absolute left-[5%] top-[600px] text-7xl opacity-90">🌳</div>
            <div className="absolute left-[10%] top-[800px] text-7xl opacity-85">🌲</div>
            <div className="absolute left-[8%] top-[1000px] text-6xl opacity-80">🏪</div>
            <div className="absolute left-[12%] top-[1200px] text-7xl opacity-90">🌲</div>
            <div className="absolute left-[6%] top-[1400px] text-7xl opacity-85">🌳</div>
            <div className="absolute left-[10%] top-[1600px] text-6xl opacity-80">🏢</div>
            <div className="absolute left-[8%] top-[1800px] text-7xl opacity-90">🌲</div>
            <div className="absolute left-[12%] top-[2000px] text-7xl opacity-85">🌳</div>
            <div className="absolute left-[7%] top-[2200px] text-6xl opacity-80">🏛️</div>
            <div className="absolute left-[10%] top-[2400px] text-7xl opacity-90">🌲</div>
            
            {/* Right side - realistic trees and buildings */}
            <div className="absolute right-[10%] top-40 text-7xl opacity-90 drop-shadow-2xl">🌳</div>
            <div className="absolute right-[8%] top-[300px] text-7xl opacity-85">🌲</div>
            <div className="absolute right-[12%] top-[500px] text-6xl opacity-80">🏫</div>
            <div className="absolute right-[6%] top-[700px] text-7xl opacity-90">🌳</div>
            <div className="absolute right-[10%] top-[900px] text-7xl opacity-85">🌲</div>
            <div className="absolute right-[8%] top-[1100px] text-6xl opacity-80">🏠</div>
            <div className="absolute right-[12%] top-[1300px] text-7xl opacity-90">🌳</div>
            <div className="absolute right-[7%] top-[1500px] text-7xl opacity-85">🌲</div>
            <div className="absolute right-[10%] top-[1700px] text-6xl opacity-80">🏛️</div>
            <div className="absolute right-[8%] top-[1900px] text-7xl opacity-90">🌳</div>
            <div className="absolute right-[12%] top-[2100px] text-7xl opacity-85">🌲</div>
            <div className="absolute right-[6%] top-[2300px] text-6xl opacity-80">🏪</div>
            <div className="absolute right-[10%] top-[2500px] text-7xl opacity-90">🌳</div>
          </div>

          {/* 3D Curved Mountain Road */}
          <div className="relative z-10">
            <svg 
              width="100%" 
              height={nodes.length * 200 + 400}
              className="absolute top-0 left-0"
              style={{ minHeight: '2800px' }}
            >
              <defs>
                {/* Road gradient for 3D effect */}
                <linearGradient id="roadGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                  <stop offset="30%" style={{ stopColor: '#2d2d2d', stopOpacity: 1 }} />
                  <stop offset="50%" style={{ stopColor: '#3a3a3a', stopOpacity: 1 }} />
                  <stop offset="70%" style={{ stopColor: '#2d2d2d', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: '#1a1a1a', stopOpacity: 1 }} />
                </linearGradient>
                
                {/* Shadow for depth */}
                <filter id="roadShadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
                  <feOffset dx="0" dy="8" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.5"/>
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Main curved road path - winding mountain road */}
              <path
                d={`M ${window.innerWidth * 0.7} 100 
                   Q ${window.innerWidth * 0.6} 250, ${window.innerWidth * 0.5} 400
                   Q ${window.innerWidth * 0.35} 600, ${window.innerWidth * 0.45} 800
                   Q ${window.innerWidth * 0.55} 1000, ${window.innerWidth * 0.4} 1200
                   Q ${window.innerWidth * 0.25} 1400, ${window.innerWidth * 0.5} 1600
                   Q ${window.innerWidth * 0.65} 1800, ${window.innerWidth * 0.5} 2000
                   Q ${window.innerWidth * 0.35} 2200, ${window.innerWidth * 0.5} 2400
                   Q ${window.innerWidth * 0.6} 2600, ${window.innerWidth * 0.5} 2800`}
                stroke="url(#roadGradient)"
                strokeWidth="160"
                fill="none"
                strokeLinecap="round"
                filter="url(#roadShadow)"
                className="drop-shadow-2xl"
              />

              {/* White dashed center line */}
              <path
                d={`M ${window.innerWidth * 0.7} 100 
                   Q ${window.innerWidth * 0.6} 250, ${window.innerWidth * 0.5} 400
                   Q ${window.innerWidth * 0.35} 600, ${window.innerWidth * 0.45} 800
                   Q ${window.innerWidth * 0.55} 1000, ${window.innerWidth * 0.4} 1200
                   Q ${window.innerWidth * 0.25} 1400, ${window.innerWidth * 0.5} 1600
                   Q ${window.innerWidth * 0.65} 1800, ${window.innerWidth * 0.5} 2000
                   Q ${window.innerWidth * 0.35} 2200, ${window.innerWidth * 0.5} 2400
                   Q ${window.innerWidth * 0.6} 2600, ${window.innerWidth * 0.5} 2800`}
                stroke="white"
                strokeWidth="6"
                fill="none"
                strokeDasharray="40,30"
                strokeLinecap="round"
                opacity="0.9"
              />
            </svg>

            {/* Roadmap Nodes positioned along the curved road */}
            {nodes.map((node, index) => {
              const status = getNodeStatus(node.id);
              const isClickable = status !== 'locked';
              
              // Calculate position along the curved path
              const progress = index / (nodes.length - 1);
              const pathPoints = [
                { x: window.innerWidth * 0.7, y: 100 },
                { x: window.innerWidth * 0.5, y: 400 },
                { x: window.innerWidth * 0.45, y: 800 },
                { x: window.innerWidth * 0.4, y: 1200 },
                { x: window.innerWidth * 0.5, y: 1600 },
                { x: window.innerWidth * 0.5, y: 2000 },
                { x: window.innerWidth * 0.5, y: 2400 },
                { x: window.innerWidth * 0.5, y: 2800 }
              ];
              
              const segmentIndex = Math.floor(progress * (pathPoints.length - 1));
              const segmentProgress = (progress * (pathPoints.length - 1)) - segmentIndex;
              const startPoint = pathPoints[Math.min(segmentIndex, pathPoints.length - 1)];
              const endPoint = pathPoints[Math.min(segmentIndex + 1, pathPoints.length - 1)];
              
              const xPos = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress;
              const yPos = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress;

              return (
                <motion.div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${xPos}px`,
                    top: `${yPos}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.button
                    onClick={() => isClickable && setSelectedNode(node)}
                    disabled={!isClickable}
                    className={`relative ${isClickable ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                    whileHover={isClickable ? { scale: 1.2 } : {}}
                    whileTap={isClickable ? { scale: 0.95 } : {}}
                  >
                    {/* 3D Node with depth */}
                    <div className="relative">
                      {/* Shadow layer for 3D effect */}
                      <div className="absolute inset-0 bg-black/30 rounded-full blur-lg transform translate-y-1"></div>
                      
                      {/* Main node - medium sized */}
                      <div
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center border-3 border-white transition-all ${
                          status === 'completed'
                            ? 'bg-gradient-to-br from-green-400 via-green-500 to-green-700 shadow-xl shadow-green-500/50'
                            : status === 'current'
                            ? `${getNodeColor(node)} shadow-xl shadow-amber-500/50`
                            : 'bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg'
                        }`}
                        style={{
                          boxShadow: status === 'current' 
                            ? '0 10px 30px -10px rgba(251, 191, 36, 0.6), inset 0 2px 4px rgba(255,255,255,0.3)' 
                            : '0 10px 20px -10px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.2)'
                        }}
                      >
                        {/* Inner glow */}
                        <div className="absolute inset-1 bg-white/20 rounded-full blur-sm"></div>
                        
                        {status === 'completed' ? (
                          <CheckCircle2 className="relative z-10 w-8 h-8 text-white drop-shadow-lg" />
                        ) : status === 'locked' ? (
                          <Lock className="relative z-10 w-7 h-7 text-gray-700" />
                        ) : (
                          <div className="relative z-10 text-2xl drop-shadow-lg">
                            {node.type === 'skill' ? '📚' : '💻'}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Glowing pulse animation for current node */}
                    {status === 'current' && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-full bg-yellow-400/40 blur-xl"
                          animate={{ 
                            scale: [1, 1.5, 1], 
                            opacity: [0.5, 0, 0.5] 
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-full border-3 border-yellow-400"
                          animate={{ 
                            scale: [1, 1.3, 1], 
                            opacity: [1, 0, 1] 
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                      </>
                    )}

                    {/* Node label - positioned below icon */}
                    <div 
                      className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-32 text-center bg-white/95 backdrop-blur px-2 py-1.5 rounded-lg shadow-lg border border-gray-200"
                    >
                      <p className={`font-bold text-xs line-clamp-2 leading-tight ${
                        node.type === 'project' ? 'text-red-600' : 'text-foreground'
                      }`}>
                        {node.title}
                      </p>
                      <Badge variant="outline" className={`text-[8px] mt-0.5 ${
                        node.type === 'project' ? 'border-red-500 text-red-600' : 'border-blue-500 text-blue-600'
                      }`}>
                        {node.type === 'project' ? 'PROJECT' : 'SKILL'}
                      </Badge>
                    </div>
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Node Detail Modal */}
        <Dialog open={!!selectedNode} onOpenChange={() => setSelectedNode(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedNode && (
              <>
                <DialogHeader>
                  <DialogTitle className={`text-2xl flex items-center gap-2 ${
                    selectedNode.type === 'project' ? 'text-red-600' : ''
                  }`}>
                    {selectedNode.type === 'skill' ? '📚' : '💻'}
                    {selectedNode.title}
                    <Badge className={selectedNode.type === 'project' 
                      ? 'bg-red-500 text-white ml-2' 
                      : 'bg-blue-500 text-white ml-2'
                    }>
                      {selectedNode.type === 'project' ? 'PROJECT' : 'SKILL'}
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Description Section */}
                  <div className={`border-l-4 p-4 rounded-r-lg ${
                    selectedNode.type === 'project' 
                      ? 'bg-red-50 border-red-500' 
                      : 'bg-blue-50 border-blue-500'
                  }`}>
                    <h3 className={`font-bold mb-2 flex items-center gap-2 ${
                      selectedNode.type === 'project' ? 'text-red-900' : 'text-blue-900'
                    }`}>
                      📖 What You'll {selectedNode.type === 'project' ? 'Build' : 'Learn'}
                    </h3>
                    <p className={selectedNode.type === 'project' ? 'text-red-800' : 'text-blue-800'}>
                      {selectedNode.description}
                    </p>
                  </div>

                  {/* Theory Section for Theory Learners */}
                  {selectedNode.theory && (
                    <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                      <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                        🧠 Theory & Understanding
                      </h3>
                      <p className="text-purple-800 leading-relaxed">{selectedNode.theory}</p>
                    </div>
                  )}

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
