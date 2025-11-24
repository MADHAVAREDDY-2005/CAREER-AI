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
  },

  {
    id: 9,
    title: "Mobile App Developer",
    description: "Creates native and cross-platform mobile applications for iOS and Android devices.",
    requiredSkills: ["React Native", "Flutter", "JavaScript", "Mobile UI/UX"],
    averageSalary: "₹5,00,000 - ₹12,00,000 per year",
    jobGrowth: "24% (High demand for mobile-first applications)",
    roadmap: {
      beginner: {
        skills: ["JavaScript Basics", "React Basics", "Mobile Design Principles"],
        projects: ["Simple Calculator App", "Weather App", "To-Do List App"],
        courses: [
          "React Native Tutorial (YouTube - https://www.youtube.com/watch?v=0-S5a0eXPoc)",
          "Mobile App Development Basics (Coursera - https://www.coursera.org/learn/react-native)"
        ]
      },
      intermediate: {
        skills: ["React Native", "API Integration", "State Management", "Navigation"],
        projects: ["E-commerce App", "Social Media Clone", "News App with API"],
        courses: [
          "React Native Full Course (YouTube - https://www.youtube.com/watch?v=ANdSdIlgsEw)",
          "Flutter for Beginners (Udemy)"
        ]
      },
      advanced: {
        skills: ["Flutter", "Native Modules", "App Deployment", "Performance Optimization"],
        projects: ["Food Delivery App", "Real-time Chat App", "Fitness Tracker"],
        courses: [
          "Advanced React Native (Udemy)",
          "Flutter Complete Guide (YouTube - https://www.youtube.com/watch?v=x0uinJvhNxI)"
        ]
      }
    }
  },

  {
    id: 10,
    title: "Cybersecurity Analyst",
    description: "Protects systems, networks, and data from cyber threats through security analysis and defense strategies.",
    requiredSkills: ["Network Security", "Ethical Hacking", "Linux", "Security Tools"],
    averageSalary: "₹6,00,000 - ₹14,00,000 per year",
    jobGrowth: "28% (Critical demand across all industries)",
    roadmap: {
      beginner: {
        skills: ["Networking Fundamentals", "Linux Basics", "Security Concepts"],
        projects: ["Network Scanner", "Password Strength Checker", "Security Audit Report"],
        courses: [
          "Cybersecurity Basics (Coursera - https://www.coursera.org/learn/intro-cyber-security)",
          "Networking Fundamentals (YouTube - https://www.youtube.com/watch?v=qiQR5rTSshw)"
        ]
      },
      intermediate: {
        skills: ["Ethical Hacking", "Penetration Testing", "Wireshark", "Metasploit"],
        projects: ["Vulnerability Assessment", "Security Monitoring System", "Firewall Configuration"],
        courses: [
          "Ethical Hacking Course (Udemy)",
          "Kali Linux Tutorial (YouTube - https://www.youtube.com/watch?v=lZAoFs75_cs)"
        ]
      },
      advanced: {
        skills: ["Advanced Penetration Testing", "Incident Response", "Security Frameworks", "Forensics"],
        projects: ["Penetration Testing Lab", "Incident Response Plan", "Security Automation Tool"],
        courses: [
          "Advanced Ethical Hacking (Udemy)",
          "CompTIA Security+ (https://www.comptia.org/certifications/security)"
        ]
      }
    }
  },

  {
    id: 11,
    title: "UI/UX Designer",
    description: "Designs intuitive and beautiful user interfaces and experiences for web and mobile applications.",
    requiredSkills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
    averageSalary: "₹4,50,000 - ₹10,00,000 per year",
    jobGrowth: "20% (Growing demand for user-centered design)",
    roadmap: {
      beginner: {
        skills: ["Design Principles", "Color Theory", "Typography", "Figma Basics"],
        projects: ["Portfolio Website Design", "Mobile App Mockup", "Landing Page Design"],
        courses: [
          "UI/UX Design Fundamentals (Coursera - https://www.coursera.org/learn/ui-ux-design)",
          "Figma Tutorial (YouTube - https://www.youtube.com/watch?v=FTFaQWZBqQ8)"
        ]
      },
      intermediate: {
        skills: ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
        projects: ["E-commerce Website Design", "Dashboard Design", "Mobile Banking App"],
        courses: [
          "Google UX Design Certificate (Coursera - https://www.coursera.org/professional-certificates/google-ux-design)",
          "Advanced Figma (YouTube - https://www.youtube.com/results?search_query=advanced+figma)"
        ]
      },
      advanced: {
        skills: ["Design Systems", "Advanced Prototyping", "Design Thinking", "A/B Testing"],
        projects: ["Complete Design System", "Interactive Prototype", "User Research Study"],
        courses: [
          "Design Systems in Figma (Udemy)",
          "UX Research Methods (Coursera - https://www.coursera.org/learn/user-research)"
        ]
      }
    }
  },

  {
    id: 12,
    title: "Game Developer",
    description: "Creates engaging games for various platforms using game engines and programming.",
    requiredSkills: ["Unity", "C#", "Game Design", "3D Modeling"],
    averageSalary: "₹4,00,000 - ₹10,00,000 per year",
    jobGrowth: "18% (Growing gaming industry in India)",
    roadmap: {
      beginner: {
        skills: ["C# Basics", "Unity Fundamentals", "Game Design Basics"],
        projects: ["2D Platformer Game", "Simple Puzzle Game", "Endless Runner"],
        courses: [
          "Unity for Beginners (YouTube - Brackeys - https://www.youtube.com/user/Brackeys)",
          "C# Programming (Coursera - https://www.coursera.org/learn/c-sharp-programming)"
        ]
      },
      intermediate: {
        skills: ["Unity 3D", "Physics & Collisions", "Game AI", "Animation"],
        projects: ["3D Adventure Game", "Multiplayer Game", "Mobile Game"],
        courses: [
          "Unity Complete Course (Udemy)",
          "Game Development Tutorial (YouTube - https://www.youtube.com/results?search_query=unity+game+development)"
        ]
      },
      advanced: {
        skills: ["Unreal Engine", "Advanced C++", "Shader Programming", "Game Optimization"],
        projects: ["FPS Game", "Open World Game", "VR Game Experience"],
        courses: [
          "Unreal Engine C++ (Udemy)",
          "Advanced Game Programming (YouTube - https://www.youtube.com/results?search_query=advanced+game+programming)"
        ]
      }
    }
  },

  {
    id: 13,
    title: "Blockchain Developer",
    description: "Builds decentralized applications and smart contracts on blockchain platforms.",
    requiredSkills: ["Solidity", "Ethereum", "Web3.js", "Smart Contracts"],
    averageSalary: "₹8,00,000 - ₹18,00,000 per year",
    jobGrowth: "32% (Emerging technology with high demand)",
    roadmap: {
      beginner: {
        skills: ["Blockchain Basics", "Cryptography", "JavaScript", "Web3 Fundamentals"],
        projects: ["Simple Blockchain in Python", "Crypto Wallet UI", "NFT Minting Page"],
        courses: [
          "Blockchain Basics (Coursera - https://www.coursera.org/learn/blockchain-basics)",
          "Cryptocurrency Fundamentals (YouTube - https://www.youtube.com/watch?v=qOVAbKKSH10)"
        ]
      },
      intermediate: {
        skills: ["Solidity", "Smart Contracts", "Ethereum", "Truffle"],
        projects: ["ERC-20 Token", "Simple DApp", "NFT Marketplace"],
        courses: [
          "Solidity Full Course (YouTube - https://www.youtube.com/watch?v=M576WGiDBdQ)",
          "Ethereum Development (Udemy)"
        ]
      },
      advanced: {
        skills: ["DeFi Protocols", "Layer 2 Solutions", "Web3.js", "Security Auditing"],
        projects: ["DEX (Decentralized Exchange)", "DAO Platform", "DeFi Lending Protocol"],
        courses: [
          "Advanced Blockchain Development (Udemy)",
          "Smart Contract Security (YouTube - https://www.youtube.com/results?search_query=smart+contract+security)"
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
  // Frontend Development skills (case-insensitive variations)
  'HTML': [1, 3],              // Frontend, Full Stack
  'html': [1, 3],
  'CSS': [1, 3],               // Frontend, Full Stack
  'css': [1, 3],
  'HTML/CSS': [1, 3],          // Frontend, Full Stack
  'html/css': [1, 3],
  'JavaScript': [1, 2, 3],     // Frontend, Backend, Full Stack
  'javascript': [1, 2, 3],
  'JS': [1, 2, 3],
  'js': [1, 2, 3],
  'React': [1, 3],             // Frontend, Full Stack
  'react': [1, 3],
  'Vue': [1, 3],               // Frontend, Full Stack
  'vue': [1, 3],
  'Angular': [1, 3],           // Frontend, Full Stack
  'angular': [1, 3],
  'Tailwind': [1, 3],          // Frontend, Full Stack
  'tailwind': [1, 3],
  'Bootstrap': [1, 3],         // Frontend, Full Stack
  'bootstrap': [1, 3],
  'Next.js': [1, 3],           // Frontend, Full Stack
  'nextjs': [1, 3],
  'next': [1, 3],
  'TypeScript': [1, 2, 3],     // Frontend, Backend, Full Stack
  'typescript': [1, 2, 3],
  'Responsive Design': [1, 3], // Frontend, Full Stack
  'responsive design': [1, 3],
  'Sass': [1, 3],              // Frontend, Full Stack
  'sass': [1, 3],
  'SCSS': [1, 3],
  'scss': [1, 3],
  'Webpack': [1, 3],
  'webpack': [1, 3],
  'Vite': [1, 3],
  'vite': [1, 3],
  
  // Backend Development skills
  'Node.js': [2, 3],           // Backend, Full Stack
  'nodejs': [2, 3],
  'node': [2, 3],
  'Express': [2, 3],           // Backend, Full Stack
  'express': [2, 3],
  'MongoDB': [2, 3],           // Backend, Full Stack
  'mongodb': [2, 3],
  'SQL': [2, 3, 4, 5, 6],      // Backend, Full Stack, Java, Python, Data
  'sql': [2, 3, 4, 5, 6],
  'PostgreSQL': [2, 3],        // Backend, Full Stack
  'postgresql': [2, 3],
  'MySQL': [2, 3, 4],          // Backend, Full Stack, Java
  'mysql': [2, 3, 4],
  'Redis': [2, 3, 8],          // Backend, Full Stack, DevOps
  'redis': [2, 3, 8],
  'REST API': [2, 3],          // Backend, Full Stack
  'rest api': [2, 3],
  'API': [2, 3],
  'api': [2, 3],
  'GraphQL': [2, 3],           // Backend, Full Stack
  'graphql': [2, 3],
  
  // Java Development skills
  'Java': [4],                 // Java Developer only (NOT JavaScript)
  'java': [4],
  'Spring Boot': [4],          // Java Developer only
  'spring boot': [4],
  'Spring': [4],
  'spring': [4],
  'Hibernate': [4],
  'hibernate': [4],
  'JPA': [4],
  'jpa': [4],
  'Maven': [4],
  'maven': [4],
  'Gradle': [4],
  'gradle': [4],
  
  // Python Development skills
  'Python': [5, 6, 7],         // Python, Data Analyst, ML Engineer
  'python': [5, 6, 7],
  'Django': [5],               // Python Developer only
  'django': [5],
  'Flask': [5],                // Python Developer only
  'flask': [5],
  'FastAPI': [5],              // Python Developer only
  'fastapi': [5],
  
  // Data Science & Analytics skills
  'Pandas': [6, 7],            // Data Analyst, ML Engineer
  'pandas': [6, 7],
  'NumPy': [6, 7],             // Data Analyst, ML Engineer
  'numpy': [6, 7],
  'Matplotlib': [6, 7],        // Data Analyst, ML Engineer
  'matplotlib': [6, 7],
  'Seaborn': [6, 7],           // Data Analyst, ML Engineer
  'seaborn': [6, 7],
  'Tableau': [6],              // Data Analyst only
  'tableau': [6],
  'Power BI': [6],             // Data Analyst only
  'power bi': [6],
  'Excel': [6],                // Data Analyst only
  'excel': [6],
  'R': [6, 7],                 // Data Analyst, ML Engineer
  'r': [6, 7],
  'Data Analysis': [6, 7],     // Data Analyst, ML Engineer
  'data analysis': [6, 7],
  'Statistics': [6, 7],        // Data Analyst, ML Engineer
  'statistics': [6, 7],
  
  // Machine Learning skills
  'TensorFlow': [7],           // ML Engineer only
  'tensorflow': [7],
  'PyTorch': [7],              // ML Engineer only
  'pytorch': [7],
  'scikit-learn': [7],         // ML Engineer only
  'sklearn': [7],
  'Keras': [7],                // ML Engineer only
  'keras': [7],
  'Deep Learning': [7],        // ML Engineer only
  'deep learning': [7],
  'Neural Networks': [7],      // ML Engineer only
  'neural networks': [7],
  'NLP': [7],                  // ML Engineer only
  'nlp': [7],
  'Computer Vision': [7],      // ML Engineer only
  'computer vision': [7],
  'Machine Learning': [7],     // ML Engineer only
  'machine learning': [7],
  'AI': [7],                   // ML Engineer only
  'ai': [7],
  
  // DevOps skills
  'Docker': [8],               // DevOps only
  'docker': [8],
  'Kubernetes': [8],           // DevOps only
  'kubernetes': [8],
  'AWS': [8],                  // DevOps only
  'aws': [8],
  'Azure': [8],                // DevOps only
  'azure': [8],
  'GCP': [8],                  // DevOps only
  'gcp': [8],
  'Jenkins': [8],              // DevOps only
  'jenkins': [8],
  'CI/CD': [8],                // DevOps only
  'ci/cd': [8],
  'Terraform': [8],            // DevOps only
  'terraform': [8],
  'Ansible': [8],              // DevOps only
  'ansible': [8],
  'Linux': [8],                // DevOps only
  'linux': [8],
  'Git': [1, 2, 3, 4, 5, 8],   // Most dev roles
  'git': [1, 2, 3, 4, 5, 8],
  
  // Mobile Development skills
  'React Native': [9],         // Mobile App Developer only
  'react native': [9],
  'Flutter': [9],              // Mobile App Developer only
  'flutter': [9],
  'Swift': [9],                // Mobile App Developer only
  'swift': [9],
  'Kotlin': [9],               // Mobile App Developer only
  'kotlin': [9],
  'iOS Development': [9],      // Mobile App Developer only
  'ios development': [9],
  'iOS': [9],
  'ios': [9],
  'Android Development': [9],  // Mobile App Developer only
  'android development': [9],
  'Android': [9],
  'android': [9],
  
  // Cybersecurity skills
  'Penetration Testing': [10], // Cybersecurity only
  'penetration testing': [10],
  'Ethical Hacking': [10],     // Cybersecurity only
  'ethical hacking': [10],
  'Network Security': [10],    // Cybersecurity only
  'network security': [10],
  'SIEM': [10],                // Cybersecurity only
  'siem': [10],
  'Firewall': [10],            // Cybersecurity only
  'firewall': [10],
  'Cryptography': [10],        // Cybersecurity only
  'cryptography': [10],
  'Security': [10],            // Cybersecurity only
  'security': [10],
  'Cybersecurity': [10],       // Cybersecurity only
  'cybersecurity': [10],
  
  // UI/UX Design skills
  'Figma': [11],               // UI/UX Designer only
  'figma': [11],
  'Adobe XD': [11],            // UI/UX Designer only
  'adobe xd': [11],
  'Sketch': [11],              // UI/UX Designer only
  'sketch': [11],
  'Prototyping': [11],         // UI/UX Designer only
  'prototyping': [11],
  'Wireframing': [11],         // UI/UX Designer only
  'wireframing': [11],
  'User Research': [11],       // UI/UX Designer only
  'user research': [11],
  'UI Design': [11],           // UI/UX Designer only
  'ui design': [11],
  'UX Design': [11],           // UI/UX Designer only
  'ux design': [11],
  'UI/UX': [11],               // UI/UX Designer only
  'ui/ux': [11],
  
  // Game Development skills
  'Unity': [12],               // Game Developer
  'unity': [12],
  'C#': [12],                  // Game Developer
  'c#': [12],
  'Unreal Engine': [12],       // Game Developer
  'unreal engine': [12],
  'Unreal': [12],
  'unreal': [12],
  'C++': [12],                 // Game Developer
  'c++': [12],
  'Game Development': [12],    // Game Developer
  'game development': [12],
  '3D Modeling': [12],         // Game Developer
  '3d modeling': [12],
  
  // Blockchain skills
  'Solidity': [13],            // Blockchain Developer
  'solidity': [13],
  'Ethereum': [13],            // Blockchain Developer
  'ethereum': [13],
  'Web3.js': [13],             // Blockchain Developer
  'web3.js': [13],
  'Web3': [13],
  'web3': [13],
  'Smart Contracts': [13],     // Blockchain Developer
  'smart contracts': [13],
  'Blockchain': [13],          // Blockchain Developer
  'blockchain': [13],
  'Cryptocurrency': [13],      // Blockchain Developer
  'cryptocurrency': [13],
};

// ============================================
// CAREER MATCHING ENGINE
// Calculates match percentage based on skills and interests
// ============================================

/**
 * Exact string matching helper to avoid false positives
 * (e.g., "javascript" should not match "java")
 */
const isExactMatch = (str1: string, str2: string): boolean => {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  // Direct exact match
  if (s1 === s2) return true;
  
  // Word boundary matching (e.g., "react" matches "React.js")
  const words1 = s1.split(/[\s/.-]+/);
  const words2 = s2.split(/[\s/.-]+/);
  
  return words1.some(w1 => words2.some(w2 => w1 === w2 && w1.length > 2));
};

/**
 * Calculate how well a career matches the user's profile
 * @param career - The career to evaluate
 * @param assessment - User's assessment data
 * @returns Match percentage (0-100)
 */
const calculateMatchPercentage = (career: Omit<Career, 'matchPercentage'>, assessment: AssessmentData): number => {
  let score = 0;
  
  // INTEREST MATCHING (Primary - 70% weight)
  // This is now the primary factor for recommendations
  let interestScore = 0;
  if (assessment.interests.length > 0) {
    const careerKeywords = [
      career.title.toLowerCase(),
      ...career.title.toLowerCase().split(' '),
      career.description.toLowerCase(),
    ];
    
    let interestMatches = 0;
    assessment.interests.forEach(interest => {
      const interestLower = interest.toLowerCase();
      
      // Exact strong interest matching with career IDs
      const interestToCareerMap: Record<string, number[]> = {
        'machine learning': [7],           // ML Engineer only
        'data science': [6, 7],            // Data Analyst, ML Engineer
        'web development': [1, 2, 3],      // Frontend, Backend, Full Stack
        'frontend development': [1],       // Frontend only
        'backend development': [2],        // Backend only
        'ai': [7],                         // ML Engineer only
        'devops': [8],                     // DevOps only
        'cloud computing': [8],            // DevOps only
        'mobile apps': [9],                // Mobile App Developer only
        'mobile development': [9],         // Mobile App Developer only
        'cybersecurity': [10],             // Cybersecurity only
        'ui/ux design': [11],              // UI/UX Designer only
        'ui/ux': [11],                     // UI/UX Designer only
        'design': [11],                    // UI/UX Designer only
        'game development': [12],          // Game Developer only
        'blockchain': [13],                // Blockchain Developer only
        'crypto': [13],                    // Blockchain Developer only
      };
      
      // Check for exact interest match
      Object.entries(interestToCareerMap).forEach(([key, careerIds]) => {
        if (interestLower.includes(key) && careerIds.includes(career.id)) {
          interestMatches += 3; // Very strong match for exact interest
        }
      });
      
      // Fallback: check for partial keyword matches
      if (careerKeywords.some(keyword => 
        isExactMatch(keyword, interestLower) || 
        (keyword.includes(interestLower) && interestLower.length > 3)
      )) {
        interestMatches += 1;
      }
    });
    
    if (interestMatches > 0) {
      interestScore = Math.min(100, (interestMatches / assessment.interests.length) * 100);
    }
  }
  
  // SKILL MATCHING (Secondary - 30% weight, or Primary if no interests provided)
  let skillScore = 0;
  if (assessment.currentSkills.length > 0) {
    // Find all careers that match the user's skills
    const skillMatchCount = new Map<number, number>();
    
    assessment.currentSkills.forEach(userSkill => {
      const userSkillLower = userSkill.toLowerCase().trim();
      
      // Check skillToCareerMap for exact matches
      Object.entries(skillToCareerMap).forEach(([skillKey, careerIds]) => {
        if (isExactMatch(userSkillLower, skillKey)) {
          careerIds.forEach(careerId => {
            skillMatchCount.set(careerId, (skillMatchCount.get(careerId) || 0) + 1);
          });
        }
      });
      
      // Also check against career's required skills for exact matches
      career.requiredSkills.forEach(reqSkill => {
        if (isExactMatch(userSkillLower, reqSkill)) {
          skillMatchCount.set(career.id, (skillMatchCount.get(career.id) || 0) + 1);
        }
      });
    });
    
    // Calculate score if this career has skill matches
    if (skillMatchCount.has(career.id)) {
      const matches = skillMatchCount.get(career.id) || 0;
      // More matches = higher score
      skillScore = Math.min(100, (matches / Math.min(assessment.currentSkills.length, 4)) * 100);
      
      // Bonus for careers with many matching skills
      if (matches >= 2) {
        skillScore = Math.min(100, skillScore * 1.2);
      }
    }
  }
  
  // Calculate weighted final score
  // SKILLS are now PRIMARY (70%), INTERESTS are secondary (30%)
  if (assessment.interests.length > 0 && assessment.currentSkills.length > 0) {
    // When both interests and skills are provided - Skills are weighted more heavily
    score = (skillScore * 0.7) + (interestScore * 0.3);
  } else if (assessment.currentSkills.length > 0) {
    // When only skills are provided, they become primary
    score = skillScore;
  } else if (assessment.interests.length > 0) {
    // When only interests are provided, use them
    score = interestScore;
  } else {
    score = 0;
  }
  
  // Ensure minimum score only if there's at least some match
  const hasAnyMatch = interestScore > 0 || skillScore > 0;
  return hasAnyMatch ? Math.min(100, Math.max(20, Math.round(score))) : 0;
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
  
  // Sort by match percentage (highest first) and filter out low matches
  const sortedCareers = careersWithMatches
    .filter(career => career.matchPercentage >= 30) // Only show careers with strong match (>=30%)
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Return top 6 matches (or all if less than 6)
  return sortedCareers.slice(0, 6);
};
