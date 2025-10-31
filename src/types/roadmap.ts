// ============================================
// ENHANCED ROADMAP TYPES FOR CANDY CRUSH-STYLE UI
// ============================================

// Individual roadmap node (a step in the learning path)
export interface RoadmapNode {
  id: string;                    // Unique identifier for the node
  type: 'skill' | 'project';     // Type of node
  title: string;                 // Node title (e.g., "HTML Basics")
  description: string;           // Detailed description
  youtubeId?: string;            // YouTube video ID for embedding (e.g., "mU6anWqZJcc")
  resources: Resource[];         // Additional learning resources
  estimatedHours?: number;       // Estimated time to complete
}

// Learning resource (courses, tutorials, docs)
export interface Resource {
  title: string;                 // Resource title
  url: string;                   // Resource URL
  type: 'video' | 'course' | 'article' | 'docs';  // Resource type
  isFree: boolean;               // Whether the resource is free
}

// Enhanced learning phase with structured nodes
export interface EnhancedLearningPhase {
  title: string;                 // Phase title (Beginner, Intermediate, Advanced)
  description: string;           // Phase description
  nodes: RoadmapNode[];          // Array of learning nodes in sequence
  color: string;                 // Phase color for visual distinction
}

// Progress state for tracking completion
export interface RoadmapProgress {
  careerId: number;              // Career ID
  careerTitle: string;           // Career title for display
  completedNodeIds: string[];    // Array of completed node IDs
  currentNodeId: string;         // Currently active node
  lastUpdated: number;           // Timestamp of last update
  percentComplete: number;       // Overall completion percentage
}
