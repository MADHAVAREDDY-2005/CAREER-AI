// ============================================
// TYPE DEFINITIONS FOR CAREER RECOMMENDATION SYSTEM
// ============================================

// User's assessment input data
export interface AssessmentData {
  interests: string[];           // User's career interests (e.g., "Web Development", "Machine Learning")
  currentSkills: string[];       // Current skills the user has (e.g., "Python", "JavaScript")
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';  // User's experience level
  timeCommitment: string;        // How much time user can dedicate to learning
  careerGoals: string;           // User's career aspirations
}

// Learning phase structure (beginner, intermediate, advanced)
export interface LearningPhase {
  skills: string[];              // Skills to learn in this phase
  projects: string[];            // Project ideas for practice
  courses: string[];             // Recommended courses with links
}

// Complete roadmap structure for a career
export interface CareerRoadmap {
  beginner: LearningPhase;       // Beginner level content
  intermediate: LearningPhase;   // Intermediate level content
  advanced: LearningPhase;       // Advanced level content
}

// Main career path definition
export interface Career {
  id: number;                    // Unique identifier
  title: string;                 // Career title (e.g., "Frontend Developer")
  description: string;           // Brief description of the career
  requiredSkills: string[];      // Core skills needed for this career
  averageSalary: string;         // Salary range in INR (₹)
  jobGrowth: string;             // Job growth percentage and demand level in India
  roadmap: CareerRoadmap;        // Complete learning roadmap
  matchPercentage?: number;      // Calculated match percentage (0-100)
}

// Progress tracking for roadmap steps
export interface ProgressState {
  [stepKey: string]: boolean;    // Key: step identifier, Value: completion status
}