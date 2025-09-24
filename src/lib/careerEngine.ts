import { AssessmentData, Career, RoadmapNode, Skill, Project, Resource } from '@/types/career';

// Mock career database - in a real app, this would be a proper database
const careerDatabase: Omit<Career, 'matchPercentage'>[] = [
  {
    id: 'web-developer',
    title: 'Web Developer',
    description: 'Build websites and web applications using modern technologies',
    category: 'web',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Git', 'SQL'],
    averageSalary: '$75,000 - $120,000',
    jobGrowth: '13% (Faster than average)',
    roadmap: []
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    description: 'Develop and deploy machine learning models and AI systems',
    category: 'ml',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch', 'Statistics', 'SQL', 'Git', 'Docker'],
    averageSalary: '$130,000 - $200,000',
    jobGrowth: '22% (Much faster than average)',
    roadmap: []
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure and services',
    category: 'cloud',
    requiredSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Linux', 'Python', 'Terraform'],
    averageSalary: '$95,000 - $160,000',
    jobGrowth: '25% (Much faster than average)',
    roadmap: []
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Analyze complex data to help organizations make informed decisions',
    category: 'data',
    requiredSkills: ['Python', 'R', 'SQL', 'Statistics', 'Machine Learning', 'Pandas', 'Matplotlib'],
    averageSalary: '$120,000 - $180,000',
    jobGrowth: '35% (Much faster than average)',
    roadmap: []
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Specialist',
    description: 'Protect organizations from digital threats and security breaches',
    category: 'cyber',
    requiredSkills: ['Network Security', 'Linux', 'Python', 'Penetration Testing', 'CISSP', 'Wireshark'],
    averageSalary: '$85,000 - $150,000',
    jobGrowth: '33% (Much faster than average)',
    roadmap: []
  },
  {
    id: 'mobile-developer',
    title: 'Mobile Developer',
    description: 'Create mobile applications for iOS and Android platforms',
    category: 'mobile',
    requiredSkills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'JavaScript', 'Git', 'REST APIs'],
    averageSalary: '$80,000 - $140,000',
    jobGrowth: '19% (Much faster than average)',
    roadmap: []
  }
];

// Generate roadmaps for each career
const generateRoadmap = (careerId: string): RoadmapNode[] => {
  const roadmaps: Record<string, RoadmapNode[]> = {
    'web-developer': [
      {
        id: 'html-css',
        skill: {
          id: 'html-css',
          name: 'HTML & CSS Fundamentals',
          level: 'beginner',
          description: 'Learn the building blocks of web development with HTML structure and CSS styling',
          estimatedHours: 40
        },
        projects: [
          {
            id: 'portfolio-site',
            name: 'Personal Portfolio Website',
            description: 'Create a responsive portfolio website showcasing your skills',
            skills: ['HTML', 'CSS', 'Responsive Design'],
            difficulty: 'beginner'
          },
          {
            id: 'landing-page',
            name: 'Product Landing Page',
            description: 'Design and build a landing page for a fictional product',
            skills: ['HTML', 'CSS', 'Flexbox', 'Grid'],
            difficulty: 'beginner'
          }
        ],
        resources: [
          {
            id: 'html-css-course',
            title: 'HTML & CSS Complete Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=mU6anWqZJcc',
            provider: 'freeCodeCamp',
            isFree: true,
            rating: 4.8,
            duration: '11 hours'
          },
          {
            id: 'mdn-html',
            title: 'MDN HTML Documentation',
            type: 'documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Web/HTML',
            provider: 'Mozilla',
            isFree: true
          }
        ],
        prerequisites: [],
        isCompleted: false,
        isCurrent: true
      },
      {
        id: 'javascript',
        skill: {
          id: 'javascript',
          name: 'JavaScript Programming',
          level: 'intermediate',
          description: 'Master JavaScript fundamentals and DOM manipulation',
          estimatedHours: 60
        },
        projects: [
          {
            id: 'todo-app',
            name: 'Interactive Todo Application',
            description: 'Build a dynamic todo app with local storage',
            skills: ['JavaScript', 'DOM', 'Local Storage'],
            difficulty: 'intermediate'
          },
          {
            id: 'weather-app',
            name: 'Weather Dashboard',
            description: 'Create a weather app using external APIs',
            skills: ['JavaScript', 'APIs', 'Fetch', 'JSON'],
            difficulty: 'intermediate'
          }
        ],
        resources: [
          {
            id: 'js-course',
            title: 'JavaScript Full Course',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg',
            provider: 'freeCodeCamp',
            isFree: true,
            rating: 4.9,
            duration: '8 hours'
          }
        ],
        prerequisites: ['html-css'],
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 'react',
        skill: {
          id: 'react',
          name: 'React Framework',
          level: 'intermediate',
          description: 'Learn modern React development with hooks and components',
          estimatedHours: 50
        },
        projects: [
          {
            id: 'react-ecommerce',
            name: 'E-commerce Website',
            description: 'Build a full-featured e-commerce site with React',
            skills: ['React', 'Context API', 'React Router'],
            difficulty: 'intermediate'
          }
        ],
        resources: [
          {
            id: 'react-course',
            title: 'React Complete Guide',
            type: 'video',
            url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            provider: 'React',
            isFree: true,
            rating: 4.7,
            duration: '12 hours'
          }
        ],
        prerequisites: ['javascript'],
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 'fullstack',
        skill: {
          id: 'fullstack',
          name: 'Full-Stack Development',
          level: 'advanced',
          description: 'Combine frontend and backend skills to build complete applications',
          estimatedHours: 80
        },
        projects: [
          {
            id: 'social-media-app',
            name: 'Social Media Platform',
            description: 'Build a complete social media application with authentication',
            skills: ['React', 'Node.js', 'MongoDB', 'JWT'],
            difficulty: 'advanced'
          }
        ],
        resources: [
          {
            id: 'fullstack-course',
            title: 'MERN Stack Development',
            type: 'course',
            url: 'https://www.coursera.org/learn/mern-stack',
            provider: 'Coursera',
            isFree: false,
            rating: 4.6,
            duration: '6 weeks'
          }
        ],
        prerequisites: ['react'],
        isCompleted: false,
        isCurrent: false
      }
    ],
    'ml-engineer': [
      {
        id: 'python-basics',
        skill: {
          id: 'python-basics',
          name: 'Python Programming',
          level: 'beginner',
          description: 'Learn Python fundamentals and data structures',
          estimatedHours: 50
        },
        projects: [
          {
            id: 'data-analysis',
            name: 'Data Analysis Project',
            description: 'Analyze a dataset using Python and pandas',
            skills: ['Python', 'Pandas', 'Matplotlib'],
            difficulty: 'beginner'
          }
        ],
        resources: [
          {
            id: 'python-course',
            title: 'Python for Everybody Specialization',
            type: 'course',
            url: 'https://www.coursera.org/specializations/python',
            provider: 'University of Michigan',
            isFree: true,
            rating: 4.8,
            duration: '5 courses'
          }
        ],
        prerequisites: [],
        isCompleted: false,
        isCurrent: true
      },
      {
        id: 'machine-learning',
        skill: {
          id: 'machine-learning',
          name: 'Machine Learning Fundamentals',
          level: 'intermediate',
          description: 'Understand ML algorithms and implement models',
          estimatedHours: 70
        },
        projects: [
          {
            id: 'house-price-prediction',
            name: 'House Price Prediction',
            description: 'Build a regression model to predict house prices',
            skills: ['Python', 'Scikit-learn', 'Linear Regression'],
            difficulty: 'intermediate'
          }
        ],
        resources: [
          {
            id: 'ml-course',
            title: 'Machine Learning Course',
            type: 'course',
            url: 'https://www.coursera.org/learn/machine-learning',
            provider: 'Stanford University',
            isFree: false,
            rating: 4.9,
            duration: '11 weeks'
          }
        ],
        prerequisites: ['python-basics'],
        isCompleted: false,
        isCurrent: false
      },
      {
        id: 'deep-learning',
        skill: {
          id: 'deep-learning',
          name: 'Deep Learning & Neural Networks',
          level: 'advanced',
          description: 'Master deep learning with TensorFlow and PyTorch',
          estimatedHours: 90
        },
        projects: [
          {
            id: 'image-classifier',
            name: 'Image Classification System',
            description: 'Build a CNN for image recognition',
            skills: ['TensorFlow', 'CNN', 'Computer Vision'],
            difficulty: 'advanced'
          }
        ],
        resources: [
          {
            id: 'deep-learning-course',
            title: 'Deep Learning Specialization',
            type: 'course',
            url: 'https://www.coursera.org/specializations/deep-learning',
            provider: 'deeplearning.ai',
            isFree: false,
            rating: 4.8,
            duration: '5 courses'
          }
        ],
        prerequisites: ['machine-learning'],
        isCompleted: false,
        isCurrent: false
      }
    ]
  };

  return roadmaps[careerId] || [];
};

// Calculate career match percentage
const calculateMatchPercentage = (career: Omit<Career, 'matchPercentage'>, assessment: AssessmentData): number => {
  let score = 0;
  let maxScore = 0;

  // Interest matching (60% weight)
  const interestWeight = 0.6;
  const careerKeywords = [
    career.title.toLowerCase(),
    career.description.toLowerCase(),
    ...career.requiredSkills.map(skill => skill.toLowerCase()),
    career.category
  ];

  assessment.interests.forEach(interest => {
    const interestLower = interest.toLowerCase();
    const hasMatch = careerKeywords.some(keyword => 
      keyword.includes(interestLower) || interestLower.includes(keyword)
    );
    if (hasMatch) {
      score += interestWeight * (100 / assessment.interests.length);
    }
    maxScore += interestWeight * (100 / assessment.interests.length);
  });

  // Skill matching (40% weight)
  const skillWeight = 0.4;
  if (assessment.currentSkills.length > 0) {
    const matchingSkills = assessment.currentSkills.filter(skill =>
      career.requiredSkills.some(reqSkill => 
        reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    );
    score += skillWeight * ((matchingSkills.length / career.requiredSkills.length) * 100);
  } else {
    // If no skills specified, give some base score based on experience level
    const baseScores = { beginner: 20, intermediate: 50, advanced: 70 };
    score += skillWeight * baseScores[assessment.experienceLevel];
  }
  maxScore += skillWeight * 100;

  // Ensure we don't exceed 100% and have a minimum of 10%
  const percentage = Math.min(100, Math.max(10, Math.round((score / maxScore) * 100)));
  return percentage;
};

// Main function to generate career recommendations
export const generateCareerRecommendations = async (assessment: AssessmentData): Promise<Career[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Calculate matches for all careers
  const careersWithMatches: Career[] = careerDatabase.map(career => {
    const matchPercentage = calculateMatchPercentage(career, assessment);
    const roadmap = generateRoadmap(career.id);
    
    return {
      ...career,
      matchPercentage,
      roadmap
    };
  });

  // Sort by match percentage and return top matches
  const sortedCareers = careersWithMatches
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .slice(0, 4); // Show top 4 matches

  return sortedCareers;
};