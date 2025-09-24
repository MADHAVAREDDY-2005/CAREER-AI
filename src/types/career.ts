export interface AssessmentData {
  interests: string[];
  currentSkills: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  timeCommitment: string;
  careerGoals: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  estimatedHours: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  skills: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  githubUrl?: string;
  liveUrl?: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'video' | 'course' | 'certification' | 'documentation';
  url: string;
  provider: string;
  isFree: boolean;
  rating?: number;
  duration?: string;
}

export interface RoadmapNode {
  id: string;
  skill: Skill;
  projects: Project[];
  resources: Resource[];
  prerequisites: string[];
  isCompleted: boolean;
  isCurrent: boolean;
}

export interface Career {
  id: string;
  title: string;
  description: string;
  category: 'web' | 'mobile' | 'ml' | 'cloud' | 'data' | 'cyber';
  matchPercentage: number;
  requiredSkills: string[];
  averageSalary: string;
  jobGrowth: string;
  roadmap: RoadmapNode[];
}

export interface CareerRecommendation {
  careers: Career[];
  skillGaps: string[];
  recommendations: string[];
}