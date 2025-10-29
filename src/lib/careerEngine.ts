// ============================================
// CAREER RECOMMENDATION ENGINE
// This file contains the career database and matching algorithm
// ============================================

import { AssessmentData, Career } from '@/types/career';

// ============================================
// CAREER DATABASE
// Complete career paths with detailed roadmaps
// All careers now use the new structure with beginner/intermediate/advanced phases
// ============================================

const careerDatabase: Omit<Career, 'matchPercentage'>[] = [
  {
    id: 1,
    title: "Frontend Developer",
    description: "Builds interactive and user-friendly interfaces for web applications using HTML, CSS, and JavaScript frameworks.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React"],
    averageSalary: "₹4,50,000 - ₹9,00,000 per year",
    jobGrowth: "22% (High demand in startups and product companies)",
    roadmap: {
      beginner: {
        skills: ["HTML", "CSS", "JavaScript"],
        projects: [
          "Personal Portfolio Website",
          "Landing Page for a Startup",
          "Basic To-Do List App"
        ],
        courses: [
          "HTML & CSS Crash Course (YouTube - https://www.youtube.com/watch?v=mU6anWqZJcc)",
          "FreeCodeCamp Responsive Web Design (https://www.freecodecamp.org/learn/responsive-web-design/)"
        ]
      },
      intermediate: {
        skills: ["React", "Git", "Bootstrap", "Responsive Design"],
        projects: [
          "React Blog App",
          "Weather Dashboard using APIs"
        ],
        courses: [
          "React Full Course (YouTube - FreeCodeCamp - https://www.youtube.com/watch?v=bMknfKXIFA8)",
          "Coursera: Front-End Development with React (https://www.coursera.org/learn/front-end-react)"
        ]
      },
      advanced: {
        skills: ["Next.js", "TypeScript", "Performance Optimization"],
        projects: [
          "E-commerce Store",
          "Portfolio with Next.js and Tailwind"
        ],
        courses: [
          "Next.js Mastery (YouTube - Net Ninja - https://www.youtube.com/playlist?list=PL4cUxeGkcC9g9gP2onazU5-2M-AzA8eBw)",
          "Advanced Frontend System Design (Udemy)"
        ]
      }
    }
  },

  {
    id: 2,
    title: "Backend Developer",
    description: "Handles the logic, database, and server-side of applications to ensure smooth data flow and security.",
    requiredSkills: ["Node.js", "Express", "MongoDB", "SQL"],
    averageSalary: "₹6,00,000 - ₹12,00,000 per year",
    jobGrowth: "19% (Strong demand for scalable app development)",
    roadmap: {
      beginner: {
        skills: ["JavaScript", "Node.js", "Express"],
        projects: ["REST API for Notes App", "User Authentication System"],
        courses: [
          "Backend Development Crash Course (YouTube - Traversy Media - https://www.youtube.com/watch?v=rltfdjcXjmk)",
          "Coursera: Building RESTful APIs with Node.js (https://www.coursera.org/projects/building-restful-apis-with-nodejs)"
        ]
      },
      intermediate: {
        skills: ["MongoDB", "SQL", "Authentication", "Error Handling"],
        projects: [
          "Blog API with MongoDB",
          "E-commerce API with JWT Authentication"
        ],
        courses: [
          "MongoDB for Developers (MongoDB University - https://university.mongodb.com/)",
          "Postman API Testing Tutorial (YouTube - https://www.youtube.com/watch?v=VywxIQ2ZXw4)"
        ]
      },
      advanced: {
        skills: ["Docker", "Microservices", "Caching (Redis)", "Testing"],
        projects: ["Microservices Architecture Demo", "Scalable Backend App"],
        courses: [
          "Microservices with Node & Docker (Udemy)",
          "System Design Primer (YouTube - https://www.youtube.com/watch?v=bUHFg8CZFws)"
        ]
      }
    }
  },

  {
    id: 3,
    title: "Full Stack Developer",
    description: "Works on both frontend and backend, capable of building complete web applications end-to-end.",
    requiredSkills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    averageSalary: "₹7,00,000 - ₹14,00,000 per year",
    jobGrowth: "25% (Most in-demand developer profile)",
    roadmap: {
      beginner: {
        skills: ["HTML", "CSS", "JavaScript"],
        projects: ["Portfolio Website", "Simple Blog"],
        courses: [
          "Frontend Basics (FreeCodeCamp - https://www.freecodecamp.org/learn/)",
          "The Odin Project: Foundations (https://www.theodinproject.com/paths/foundations/courses/foundations)"
        ]
      },
      intermediate: {
        skills: ["React", "Node.js", "Express", "MongoDB"],
        projects: ["MERN Stack Blog", "Real-time Chat App"],
        courses: [
          "MERN Stack Crash Course (YouTube - Traversy Media - https://www.youtube.com/watch?v=7CqJlxBYj-M)",
          "Full Stack Web Development (Coursera - https://www.coursera.org/specializations/full-stack-react)"
        ]
      },
      advanced: {
        skills: ["Next.js", "TypeScript", "AWS Deployment"],
        projects: ["E-commerce App", "Job Portal App"],
        courses: [
          "Advanced MERN Stack Projects (YouTube - https://www.youtube.com/results?search_query=advanced+mern+stack)",
          "AWS Cloud Deployment Guide (https://aws.amazon.com/getting-started/)"
        ]
      }
    }
  },

  {
    id: 4,
    title: "Java Developer",
    description: "Builds enterprise-grade backend systems and applications using Java frameworks like Spring Boot.",
    requiredSkills: ["Java", "Spring Boot", "SQL", "OOP"],
    averageSalary: "₹6,50,000 - ₹13,00,000 per year",
    jobGrowth: "20% (Used heavily in enterprise and fintech)",
    roadmap: {
      beginner: {
        skills: ["Core Java", "OOP", "Collections"],
        projects: ["Library Management System", "Bank Account Simulation"],
        courses: [
          "Java Programming (YouTube - Kunal Kushwaha - https://www.youtube.com/watch?v=yRpLlJmRo2w)",
          "Java Basics (Coursera - https://www.coursera.org/learn/java-programming)"
        ]
      },
      intermediate: {
        skills: ["Spring Boot", "JPA", "REST API"],
        projects: ["Employee CRUD App", "E-commerce Backend"],
        courses: [
          "Spring Boot Tutorial (YouTube - Telusko - https://www.youtube.com/watch?v=9SGDpanrc8U)",
          "Java Full Stack Development (Great Learning - https://www.mygreatlearning.com/academy)"
        ]
      },
      advanced: {
        skills: ["Microservices", "Hibernate", "Docker", "Jenkins"],
        projects: ["Banking System Backend", "Microservices Demo"],
        courses: [
          "Microservices with Spring Boot (Udemy)",
          "DevOps for Java Developers (YouTube - https://www.youtube.com/results?search_query=devops+java)"
        ]
      }
    }
  },

  {
    id: 5,
    title: "Python Developer",
    description: "Develops automation scripts, web apps, and data-related systems using Python and its frameworks.",
    requiredSkills: ["Python", "Flask", "Django", "SQL"],
    averageSalary: "₹5,50,000 - ₹11,00,000 per year",
    jobGrowth: "21% (Used across automation, data, and backend)",
    roadmap: {
      beginner: {
        skills: ["Python Basics", "OOP", "File Handling"],
        projects: ["Calculator App", "Expense Tracker"],
        courses: [
          "Python Full Course (YouTube - BroCode - https://www.youtube.com/watch?v=XKHEtdqhLK8)",
          "Coursera: Python for Everybody (https://www.coursera.org/specializations/python)"
        ]
      },
      intermediate: {
        skills: ["Flask", "APIs", "Databases"],
        projects: ["Flask Blog App", "Weather App with API"],
        courses: [
          "Flask Tutorial (YouTube - Traversy Media - https://www.youtube.com/watch?v=Z1RJmh_OqeA)",
          "Django for Beginners (Udemy)"
        ]
      },
      advanced: {
        skills: ["Django", "Testing", "REST APIs"],
        projects: ["E-commerce API", "Job Portal App"],
        courses: [
          "Advanced Django Projects (YouTube - https://www.youtube.com/results?search_query=advanced+django)",
          "Full Stack Python (FreeCodeCamp - https://www.freecodecamp.org/news/tag/python/)"
        ]
      }
    }
  },

  {
    id: 6,
    title: "Data Analyst",
    description: "Analyzes data and extracts insights using visualization, statistics, and dashboards.",
    requiredSkills: ["Python", "SQL", "Excel", "Tableau"],
    averageSalary: "₹4,00,000 - ₹9,00,000 per year",
    jobGrowth: "23% (High demand in all industries)",
    roadmap: {
      beginner: {
        skills: ["Excel", "SQL", "Python Basics"],
        projects: ["Sales Data Dashboard", "HR Analytics"],
        courses: [
          "Excel for Data Analysis (Coursera - https://www.coursera.org/learn/excel-basics-data-analysis-ibm)",
          "SQL Tutorial (Kaggle - https://www.kaggle.com/learn/intro-to-sql)"
        ]
      },
      intermediate: {
        skills: ["Pandas", "Matplotlib", "Data Cleaning"],
        projects: ["Covid Data Analysis", "E-commerce Dataset Study"],
        courses: [
          "Data Analysis with Python (FreeCodeCamp - https://www.freecodecamp.org/learn/data-analysis-with-python/)",
          "Python Pandas Tutorial (YouTube - https://www.youtube.com/watch?v=vmEHCJofslg)"
        ]
      },
      advanced: {
        skills: ["Power BI", "Tableau", "Storytelling"],
        projects: ["Power BI Dashboard", "Tableau Visualization"],
        courses: [
          "Tableau for Beginners (YouTube - https://www.youtube.com/watch?v=aHaOIvR00So)",
          "Power BI Masterclass (Coursera - https://www.coursera.org/learn/power-bi)"
        ]
      }
    }
  },

  {
    id: 7,
    title: "Data Scientist / ML Engineer",
    description: "Builds predictive and intelligent systems using statistics, data, and machine learning.",
    requiredSkills: ["Python", "NumPy", "Pandas", "Scikit-learn", "TensorFlow"],
    averageSalary: "₹8,00,000 - ₹18,00,000 per year",
    jobGrowth: "30% (Top AI/ML demand in India)",
    roadmap: {
      beginner: {
        skills: ["Python", "Maths for ML", "Pandas"],
        projects: ["House Price Prediction", "Iris Classification"],
        courses: [
          "Machine Learning for Beginners (YouTube - FreeCodeCamp - https://www.youtube.com/watch?v=NWONeJKn6kc)",
          "Coursera: ML by Andrew Ng (https://www.coursera.org/learn/machine-learning)"
        ]
      },
      intermediate: {
        skills: ["Scikit-learn", "Data Preprocessing", "Model Evaluation"],
        projects: ["Spam Classifier", "Stock Price Predictor"],
        courses: [
          "ML Project Tutorials (YouTube - Krish Naik - https://www.youtube.com/c/Krishnaik06)",
          "Kaggle: Intro to Machine Learning (https://www.kaggle.com/learn/intro-to-machine-learning)"
        ]
      },
      advanced: {
        skills: ["TensorFlow", "NLP", "Deep Learning"],
        projects: ["Image Classifier CNN", "Sentiment Analysis NLP"],
        courses: [
          "Deep Learning Specialization (Coursera - https://www.coursera.org/specializations/deep-learning)",
          "TensorFlow Developer (YouTube - https://www.youtube.com/results?search_query=tensorflow+tutorial)"
        ]
      }
    }
  },

  {
    id: 8,
    title: "DevOps Engineer",
    description: "Bridges the gap between development and operations through automation, CI/CD, and cloud deployment.",
    requiredSkills: ["Linux", "Docker", "Kubernetes", "AWS", "CI/CD"],
    averageSalary: "₹7,50,000 - ₹16,00,000 per year",
    jobGrowth: "26% (Rapid growth due to cloud adoption)",
    roadmap: {
      beginner: {
        skills: ["Linux Basics", "Shell Scripting"],
        projects: ["Automated Backup Script", "Server Setup"],
        courses: [
          "Linux for Beginners (YouTube - https://www.youtube.com/watch?v=sWbUDq4S6Y8)",
          "Coursera: DevOps Basics (https://www.coursera.org/learn/intro-to-devops)"
        ]
      },
      intermediate: {
        skills: ["Docker", "Jenkins", "GitHub Actions"],
        projects: ["Dockerized App", "CI/CD Pipeline Demo"],
        courses: [
          "Docker Tutorial (YouTube - TechWorld with Nana - https://www.youtube.com/watch?v=3c-iBn73dDE)",
          "Jenkins for Beginners (Udemy)"
        ]
      },
      advanced: {
        skills: ["Kubernetes", "AWS", "Monitoring"],
        projects: ["Kubernetes Deployment", "AWS CI/CD Pipeline"],
        courses: [
          "Kubernetes in 1 Hour (YouTube - https://www.youtube.com/watch?v=s_o8dwzRlu4)",
          "AWS DevOps Engineer (Coursera - https://www.coursera.org/professional-certificates/aws-devops-engineer)"
        ]
      }
    }
  }
];

// ============================================
// SKILL MATCHING ALGORITHM
// Maps specific skills to relevant career IDs for accurate matching
// ============================================

const skillToCareerMap: Record<string, number[]> = {
  // Frontend/Web Development skills
  'HTML': [1, 3],           // Frontend, Full Stack
  'CSS': [1, 3],            // Frontend, Full Stack
  'JavaScript': [1, 2, 3, 5], // Frontend, Backend, Full Stack, Python (for web)
  'React': [1, 3],          // Frontend, Full Stack
  'Next.js': [1, 3],        // Frontend, Full Stack
  'TypeScript': [1, 2, 3],  // Frontend, Backend, Full Stack
  'Bootstrap': [1, 3],      // Frontend, Full Stack
  
  // Backend Development skills
  'Node.js': [2, 3],        // Backend, Full Stack
  'Express': [2, 3],        // Backend, Full Stack
  'Java': [4],              // Java Developer
  'Spring Boot': [4],       // Java Developer
  'Python': [5, 6, 7],      // Python Dev, Data Analyst, ML Engineer
  'Flask': [5],             // Python Developer
  'Django': [5],            // Python Developer
  
  // Database skills
  'SQL': [2, 3, 4, 5, 6],   // Backend, Full Stack, Java, Python, Data Analyst
  'MongoDB': [2, 3],        // Backend, Full Stack
  'PostgreSQL': [2, 3, 5],  // Backend, Full Stack, Python
  
  // Data & ML skills
  'Pandas': [6, 7],         // Data Analyst, ML Engineer
  'NumPy': [7],             // ML Engineer
  'Scikit-learn': [7],      // ML Engineer
  'TensorFlow': [7],        // ML Engineer
  'Excel': [6],             // Data Analyst
  'Tableau': [6],           // Data Analyst
  'Power BI': [6],          // Data Analyst
  
  // DevOps & Cloud skills
  'Docker': [2, 4, 8],      // Backend, Java, DevOps
  'Kubernetes': [8],        // DevOps
  'AWS': [8],               // DevOps
  'Linux': [8],             // DevOps
  'Git': [1, 2, 3, 4, 5],   // All development roles
  'CI/CD': [8],             // DevOps
  'Jenkins': [8],           // DevOps
};

// ============================================
// CAREER MATCHING ENGINE
// Calculates match percentage based on skills and interests
// ============================================

/**
 * Calculate how well a career matches the user's profile
 * @param career - The career to evaluate
 * @param assessment - User's assessment data
 * @returns Match percentage (0-100)
 */
const calculateMatchPercentage = (career: Omit<Career, 'matchPercentage'>, assessment: AssessmentData): number => {
  let score = 0;
  const maxScore = 100;
  
  // SKILL MATCHING (70% weight) - Most important factor
  const skillWeight = 0.7;
  if (assessment.currentSkills.length > 0) {
    const matchingSkills = assessment.currentSkills.filter(userSkill => {
      // Check if any required skill matches or is similar to user's skill
      return career.requiredSkills.some(reqSkill => 
        reqSkill.toLowerCase().includes(userSkill.toLowerCase()) ||
        userSkill.toLowerCase().includes(reqSkill.toLowerCase())
      );
    });
    
    // Calculate skill match score
    const skillMatchRatio = matchingSkills.length / career.requiredSkills.length;
    score += skillWeight * maxScore * skillMatchRatio;
  } else {
    // If no skills, give base score based on experience level
    const experienceScores = { beginner: 30, intermediate: 50, advanced: 60 };
    score += skillWeight * experienceScores[assessment.experienceLevel];
  }
  
  // INTEREST MATCHING (30% weight)
  const interestWeight = 0.3;
  if (assessment.interests.length > 0) {
    const careerKeywords = [
      career.title.toLowerCase(),
      career.description.toLowerCase(),
      ...career.requiredSkills.map(s => s.toLowerCase())
    ];
    
    const matchingInterests = assessment.interests.filter(interest => {
      const interestLower = interest.toLowerCase();
      return careerKeywords.some(keyword => 
        keyword.includes(interestLower) || interestLower.includes(keyword)
      );
    });
    
    if (matchingInterests.length > 0) {
      score += interestWeight * maxScore * (matchingInterests.length / assessment.interests.length);
    }
  }
  
  // Ensure score is between 10 and 100
  return Math.min(100, Math.max(10, Math.round(score)));
};

// ============================================
// MAIN RECOMMENDATION FUNCTION
// Generates personalized career recommendations
// ============================================

/**
 * Generate career recommendations based on user assessment
 * @param assessment - User's assessment data
 * @returns Array of matching careers sorted by match percentage
 */
export const generateCareerRecommendations = async (assessment: AssessmentData): Promise<Career[]> => {
  // Simulate API processing delay (remove in production)
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Calculate match for each career
  const careersWithMatches = careerDatabase.map(career => ({
    ...career,
    matchPercentage: calculateMatchPercentage(career, assessment)
  }));
  
  // Sort by match percentage (highest first)
  const sortedCareers = careersWithMatches
    .sort((a, b) => b.matchPercentage - a.matchPercentage)
    .filter(career => career.matchPercentage >= 15); // Only show careers with >15% match
  
  // Return top 6 matches (or all if less than 6)
  return sortedCareers.slice(0, 6);
};
