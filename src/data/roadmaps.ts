// ============================================
// COMPREHENSIVE ROADMAP DATA
// Detailed step-by-step learning paths for all domains
// ============================================

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  theory: string;
  youtubeId: string; // YouTube video ID
  resources: {
    title: string;
    url: string;
    type: 'video' | 'course' | 'article' | 'docs';
    isFree: boolean;
  }[];
  tasks: string[];
  estimatedHours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

export interface ProjectStep {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  resources: {
    title: string;
    url: string;
  }[];
  estimatedHours: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  order: number;
}

export interface DomainRoadmap {
  domain: string;
  steps: RoadmapStep[];
  projects: ProjectStep[];
}

// Frontend/Web Development Roadmap
export const frontendRoadmap: DomainRoadmap = {
  domain: 'Frontend Developer',
  steps: [
    {
      id: 'fe-1',
      title: 'HTML Fundamentals',
      description: 'Learn the structure of web pages with HTML tags, elements, and semantic markup.',
      theory: 'HTML (HyperText Markup Language) is the foundation of all web pages. It defines the structure and content of a webpage using elements like headings, paragraphs, links, images, and more. Understanding semantic HTML is crucial for accessibility and SEO.',
      youtubeId: 'qz0aGYrrlhU',
      resources: [
        { title: 'HTML Full Course - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=pQN-pnXPaVg', type: 'video', isFree: true },
        { title: 'MDN HTML Docs', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', type: 'docs', isFree: true },
        { title: 'HTML Course - W3Schools', url: 'https://www.w3schools.com/html/', type: 'course', isFree: true }
      ],
      tasks: [
        'Create a simple personal webpage with headings, paragraphs, and images',
        'Build a form with various input types',
        'Create a table displaying your weekly schedule',
        'Build a navigation menu using lists'
      ],
      estimatedHours: 8,
      level: 'beginner',
      order: 1
    },
    {
      id: 'fe-2',
      title: 'CSS Basics',
      description: 'Style your web pages with colors, fonts, layouts, and responsive design using CSS.',
      theory: 'CSS (Cascading Style Sheets) controls the visual presentation of HTML elements. Learn selectors, properties, the box model, positioning, and how to create beautiful, responsive designs that work on all devices.',
      youtubeId: 'yfoY53QXEnI',
      resources: [
        { title: 'CSS Full Course - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=OXGznpKZ_sA', type: 'video', isFree: true },
        { title: 'CSS Tricks', url: 'https://css-tricks.com/', type: 'article', isFree: true },
        { title: 'Flexbox Froggy Game', url: 'https://flexboxfroggy.com/', type: 'course', isFree: true }
      ],
      tasks: [
        'Style your personal webpage with colors and fonts',
        'Create a responsive layout using Flexbox',
        'Build a CSS Grid photo gallery',
        'Add hover effects and transitions to buttons'
      ],
      estimatedHours: 12,
      level: 'beginner',
      order: 2
    },
    {
      id: 'fe-3',
      title: 'JavaScript Fundamentals',
      description: 'Add interactivity to websites with variables, functions, loops, and DOM manipulation.',
      theory: 'JavaScript is the programming language of the web. It enables dynamic, interactive content by manipulating HTML and CSS in real-time. Master variables, data types, functions, conditionals, loops, and objects.',
      youtubeId: 'PkZNo7MFNFg',
      resources: [
        { title: 'JavaScript Full Course - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=jS4aFq5-91M', type: 'video', isFree: true },
        { title: 'JavaScript.info', url: 'https://javascript.info/', type: 'docs', isFree: true },
        { title: 'Eloquent JavaScript Book', url: 'https://eloquentjavascript.net/', type: 'article', isFree: true }
      ],
      tasks: [
        'Create a calculator app',
        'Build a to-do list with add/remove functionality',
        'Create an image slider',
        'Make a simple quiz app with score tracking'
      ],
      estimatedHours: 20,
      level: 'beginner',
      order: 3
    },
    {
      id: 'fe-4',
      title: 'DOM Manipulation',
      description: 'Learn to dynamically update web page content using JavaScript and the Document Object Model.',
      theory: 'The DOM (Document Object Model) is a programming interface that represents HTML as a tree structure. Learn to select elements, modify content, add event listeners, and create dynamic user interfaces.',
      youtubeId: 'y17RuWkWdn8',
      resources: [
        { title: 'DOM Manipulation - Traversy Media', url: 'https://www.youtube.com/watch?v=0ik6X4DJKCc', type: 'video', isFree: true },
        { title: 'MDN DOM Introduction', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction', type: 'docs', isFree: true }
      ],
      tasks: [
        'Create a dynamic form validator',
        'Build a modal popup from scratch',
        'Make a filterable product list',
        'Create a dark/light theme toggle'
      ],
      estimatedHours: 10,
      level: 'beginner',
      order: 4
    },
    {
      id: 'fe-5',
      title: 'Git & GitHub',
      description: 'Version control for tracking code changes and collaborating with other developers.',
      theory: 'Git is essential for managing code versions and collaborating. Learn commits, branches, merging, and pushing to GitHub. Understanding Git workflows is crucial for professional development.',
      youtubeId: 'RGOj5yH7evk',
      resources: [
        { title: 'Git & GitHub for Beginners', url: 'https://www.youtube.com/watch?v=RGOj5yH7evk', type: 'video', isFree: true },
        { title: 'Git Documentation', url: 'https://git-scm.com/doc', type: 'docs', isFree: true },
        { title: 'GitHub Learning Lab', url: 'https://lab.github.com/', type: 'course', isFree: true }
      ],
      tasks: [
        'Create a GitHub account and first repository',
        'Clone a repo and make changes',
        'Create branches and merge them',
        'Resolve a merge conflict'
      ],
      estimatedHours: 6,
      level: 'beginner',
      order: 5
    },
    {
      id: 'fe-6',
      title: 'Responsive Design',
      description: 'Build websites that look great on all devices using media queries and flexible layouts.',
      theory: 'Responsive design ensures your website adapts to different screen sizes. Learn mobile-first design, media queries, flexible grids, and how to create seamless experiences across devices.',
      youtubeId: 'srvUrASNj0s',
      resources: [
        { title: 'Responsive Web Design - FreeCodeCamp', url: 'https://www.freecodecamp.org/learn/responsive-web-design/', type: 'course', isFree: true },
        { title: 'Responsive Design Patterns', url: 'https://web.dev/patterns/layout/', type: 'article', isFree: true }
      ],
      tasks: [
        'Convert a desktop site to mobile-first design',
        'Create a responsive navigation menu',
        'Build a responsive card grid',
        'Test your site on multiple devices'
      ],
      estimatedHours: 8,
      level: 'intermediate',
      order: 6
    },
    {
      id: 'fe-7',
      title: 'React Fundamentals',
      description: 'Learn the most popular JavaScript library for building modern user interfaces.',
      theory: 'React is a component-based library that makes building complex UIs simpler. Learn JSX, components, props, state, and the virtual DOM. Understanding React opens doors to countless job opportunities.',
      youtubeId: 'bMknfKXIFA8',
      resources: [
        { title: 'React Full Course - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=bMknfKXIFA8', type: 'video', isFree: true },
        { title: 'React Official Docs', url: 'https://react.dev/', type: 'docs', isFree: true },
        { title: 'React Tutorial - Scrimba', url: 'https://scrimba.com/learn/learnreact', type: 'course', isFree: true }
      ],
      tasks: [
        'Create a counter app with useState',
        'Build a simple blog with components',
        'Create a weather app using an API',
        'Build a shopping cart with state management'
      ],
      estimatedHours: 25,
      level: 'intermediate',
      order: 7
    },
    {
      id: 'fe-8',
      title: 'React Hooks',
      description: 'Master useState, useEffect, useContext, and custom hooks for powerful React applications.',
      theory: 'Hooks revolutionized React by allowing functional components to have state and lifecycle features. Learn when and how to use each hook, and create your own custom hooks for reusable logic.',
      youtubeId: 'TNhaISOUy6Q',
      resources: [
        { title: 'React Hooks Tutorial', url: 'https://www.youtube.com/watch?v=TNhaISOUy6Q', type: 'video', isFree: true },
        { title: 'React Hooks Documentation', url: 'https://react.dev/reference/react', type: 'docs', isFree: true }
      ],
      tasks: [
        'Fetch data from an API using useEffect',
        'Create a theme system with useContext',
        'Build a custom useLocalStorage hook',
        'Create a debounced search with custom hooks'
      ],
      estimatedHours: 15,
      level: 'intermediate',
      order: 8
    },
    {
      id: 'fe-9',
      title: 'TypeScript Basics',
      description: 'Add type safety to your JavaScript code for fewer bugs and better developer experience.',
      theory: 'TypeScript is JavaScript with syntax for types. It catches errors at compile-time, provides better IDE support, and makes large codebases more maintainable. Essential for modern development.',
      youtubeId: 'd56mG7DezGs',
      resources: [
        { title: 'TypeScript Tutorial', url: 'https://www.youtube.com/watch?v=d56mG7DezGs', type: 'video', isFree: true },
        { title: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/', type: 'docs', isFree: true },
        { title: 'TypeScript Exercises', url: 'https://typescript-exercises.github.io/', type: 'course', isFree: true }
      ],
      tasks: [
        'Convert a JavaScript project to TypeScript',
        'Create typed interfaces for API responses',
        'Use generics for reusable components',
        'Set up strict type checking'
      ],
      estimatedHours: 12,
      level: 'intermediate',
      order: 9
    },
    {
      id: 'fe-10',
      title: 'State Management (Redux/Zustand)',
      description: 'Manage complex application state across multiple components efficiently.',
      theory: 'As apps grow, managing state becomes challenging. Learn Redux for predictable state management or Zustand for a simpler alternative. Understand when and why to use global state management.',
      youtubeId: 'poQXNp9ItL4',
      resources: [
        { title: 'Redux Tutorial', url: 'https://www.youtube.com/watch?v=poQXNp9ItL4', type: 'video', isFree: true },
        { title: 'Redux Toolkit Docs', url: 'https://redux-toolkit.js.org/', type: 'docs', isFree: true },
        { title: 'Zustand Documentation', url: 'https://docs.pmnd.rs/zustand/getting-started/introduction', type: 'docs', isFree: true }
      ],
      tasks: [
        'Set up Redux Toolkit in a React app',
        'Create a global user authentication state',
        'Build a cart system with Redux',
        'Implement async actions with Redux Thunk'
      ],
      estimatedHours: 18,
      level: 'advanced',
      order: 10
    },
    {
      id: 'fe-11',
      title: 'Next.js Framework',
      description: 'Build production-ready React applications with server-side rendering and static generation.',
      theory: 'Next.js is a React framework that provides server-side rendering, static site generation, API routes, and optimized performance out of the box. It\'s the industry standard for production React apps.',
      youtubeId: 'Sklc_fQBmcs',
      resources: [
        { title: 'Next.js Tutorial', url: 'https://www.youtube.com/watch?v=Sklc_fQBmcs', type: 'video', isFree: true },
        { title: 'Next.js Documentation', url: 'https://nextjs.org/docs', type: 'docs', isFree: true },
        { title: 'Next.js Learn Course', url: 'https://nextjs.org/learn', type: 'course', isFree: true }
      ],
      tasks: [
        'Create a blog with static generation',
        'Build an e-commerce site with SSR',
        'Implement API routes for backend logic',
        'Deploy a Next.js app to Vercel'
      ],
      estimatedHours: 20,
      level: 'advanced',
      order: 11
    },
    {
      id: 'fe-12',
      title: 'Performance Optimization',
      description: 'Optimize your applications for speed, efficiency, and excellent user experience.',
      theory: 'Performance is crucial for user satisfaction and SEO. Learn code splitting, lazy loading, image optimization, caching strategies, and how to measure and improve Core Web Vitals.',
      youtubeId: 'AQqFZ5t8uNc',
      resources: [
        { title: 'Web Performance - Google', url: 'https://web.dev/performance/', type: 'article', isFree: true },
        { title: 'React Performance Optimization', url: 'https://www.youtube.com/watch?v=AQqFZ5t8uNc', type: 'video', isFree: true }
      ],
      tasks: [
        'Implement code splitting in your React app',
        'Optimize images with WebP and lazy loading',
        'Use React.memo and useMemo strategically',
        'Achieve a Lighthouse score above 90'
      ],
      estimatedHours: 15,
      level: 'advanced',
      order: 12
    },
    {
      id: 'fe-13',
      title: 'Testing (Jest & React Testing Library)',
      description: 'Write automated tests to ensure code quality and catch bugs before production.',
      theory: 'Testing is essential for maintaining code quality. Learn unit tests, integration tests, and end-to-end tests. Write tests that give you confidence to refactor and ship code.',
      youtubeId: '8Xwq35cPwYg',
      resources: [
        { title: 'React Testing Library Tutorial', url: 'https://www.youtube.com/watch?v=8Xwq35cPwYg', type: 'video', isFree: true },
        { title: 'Jest Documentation', url: 'https://jestjs.io/docs/getting-started', type: 'docs', isFree: true },
        { title: 'Testing Library Docs', url: 'https://testing-library.com/docs/react-testing-library/intro/', type: 'docs', isFree: true }
      ],
      tasks: [
        'Write unit tests for utility functions',
        'Test React components with user interactions',
        'Mock API calls in tests',
        'Set up continuous integration with tests'
      ],
      estimatedHours: 12,
      level: 'advanced',
      order: 13
    },
    {
      id: 'fe-14',
      title: 'Advanced CSS & Animations',
      description: 'Create stunning animations, transitions, and modern UI effects.',
      theory: 'Advanced CSS includes animations, transitions, transforms, CSS Grid advanced patterns, custom properties (variables), and modern layout techniques. Create beautiful, performant animations.',
      youtubeId: 'YszONjKpgg4',
      resources: [
        { title: 'CSS Animations Tutorial', url: 'https://www.youtube.com/watch?v=YszONjKpgg4', type: 'video', isFree: true },
        { title: 'CSS Animation Libraries', url: 'https://animate.style/', type: 'article', isFree: true }
      ],
      tasks: [
        'Create a loading spinner with pure CSS',
        'Build an animated navigation menu',
        'Implement scroll-triggered animations',
        'Create a parallax scrolling effect'
      ],
      estimatedHours: 10,
      level: 'advanced',
      order: 14
    },
    {
      id: 'fe-15',
      title: 'Web Accessibility (a11y)',
      description: 'Build inclusive websites that everyone can use, regardless of abilities.',
      theory: 'Accessibility ensures your website works for everyone, including users with disabilities. Learn ARIA labels, semantic HTML, keyboard navigation, screen reader support, and WCAG guidelines.',
      youtubeId: 'e2nkq3h1P68',
      resources: [
        { title: 'Web Accessibility Tutorial', url: 'https://www.youtube.com/watch?v=e2nkq3h1P68', type: 'video', isFree: true },
        { title: 'WCAG Guidelines', url: 'https://www.w3.org/WAI/WCAG21/quickref/', type: 'docs', isFree: true },
        { title: 'A11y Project', url: 'https://www.a11yproject.com/', type: 'article', isFree: true }
      ],
      tasks: [
        'Audit a website with accessibility tools',
        'Add proper ARIA labels to interactive elements',
        'Ensure keyboard navigation works throughout',
        'Test your site with a screen reader'
      ],
      estimatedHours: 8,
      level: 'advanced',
      order: 15
    }
  ],
  projects: [
    {
      id: 'fe-p1',
      title: 'Personal Portfolio Website',
      description: 'Build a professional portfolio showcasing your skills, projects, and contact information.',
      requirements: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      resources: [
        { title: 'Portfolio Examples', url: 'https://www.awwwards.com/websites/portfolio/' },
        { title: 'Portfolio Guide', url: 'https://www.freecodecamp.org/news/how-to-build-a-developer-portfolio-website/' }
      ],
      estimatedHours: 15,
      level: 'beginner',
      order: 5
    },
    {
      id: 'fe-p2',
      title: 'Weather Dashboard App',
      description: 'Create a weather app that fetches real-time data from an API and displays forecasts.',
      requirements: ['React', 'API Integration', 'State Management', 'Responsive Design'],
      resources: [
        { title: 'OpenWeatherMap API', url: 'https://openweathermap.org/api' },
        { title: 'React Weather App Tutorial', url: 'https://www.youtube.com/watch?v=guEGO4Y1mX0' }
      ],
      estimatedHours: 20,
      level: 'intermediate',
      order: 8
    },
    {
      id: 'fe-p3',
      title: 'E-commerce Store',
      description: 'Build a full-featured online store with product listings, cart, checkout, and payment integration.',
      requirements: ['Next.js', 'TypeScript', 'State Management', 'API Integration', 'Authentication'],
      resources: [
        { title: 'Stripe Payment Integration', url: 'https://stripe.com/docs/payments' },
        { title: 'E-commerce Tutorial', url: 'https://www.youtube.com/watch?v=1BaBZaTm8Go' }
      ],
      estimatedHours: 40,
      level: 'advanced',
      order: 13
    }
  ]
};

// Similar comprehensive roadmaps for other domains...
// Backend, Full Stack, Data Science, etc. would follow the same pattern
// For brevity, showing structure - you can expand with actual content

export const backendRoadmap: DomainRoadmap = {
  domain: 'Backend Developer',
  steps: [
    {
      id: 'be-1',
      title: 'Node.js Fundamentals',
      description: 'Learn server-side JavaScript with Node.js runtime environment.',
      theory: 'Node.js allows you to run JavaScript on the server. It\'s built on Chrome\'s V8 engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.',
      youtubeId: 'TlB_eWDSMt4',
      resources: [
        { title: 'Node.js Tutorial - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=TlB_eWDSMt4', type: 'video', isFree: true },
        { title: 'Node.js Documentation', url: 'https://nodejs.org/docs/', type: 'docs', isFree: true }
      ],
      tasks: [
        'Set up Node.js environment',
        'Create a simple HTTP server',
        'Read and write files using fs module',
        'Build a CLI tool'
      ],
      estimatedHours: 10,
      level: 'beginner',
      order: 1
    },
    // Add 14 more backend steps...
  ],
  projects: []
};

export const dataScientistRoadmap: DomainRoadmap = {
  domain: 'Data Scientist',
  steps: [
    {
      id: 'ds-1',
      title: 'Python Programming Basics',
      description: 'Master Python syntax, data structures, and fundamental programming concepts.',
      theory: 'Python is the most popular language for data science due to its simplicity and powerful libraries. Learn variables, loops, functions, and object-oriented programming.',
      youtubeId: 'rfscVS0vtbw',
      resources: [
        { title: 'Python for Everybody', url: 'https://www.py4e.com/', type: 'course', isFree: true },
        { title: 'Python Tutorial - FreeCodeCamp', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', type: 'video', isFree: true }
      ],
      tasks: [
        'Write programs using loops and conditions',
        'Create and manipulate lists, dictionaries, and sets',
        'Define functions and classes',
        'Handle exceptions and file I/O'
      ],
      estimatedHours: 20,
      level: 'beginner',
      order: 1
    },
    // Add 14 more data science steps...
  ],
  projects: []
};

// Map domains to their roadmaps
export const domainRoadmaps: Record<string, DomainRoadmap> = {
  'Frontend Developer': frontendRoadmap,
  'Backend Developer': backendRoadmap,
  'Full Stack Developer': frontendRoadmap, // Combines both
  'Data Scientist': dataScientistRoadmap,
  'Data Analyst': dataScientistRoadmap,
  // Add more mappings...
};

export const getWhatsNext = (domain: string): string[] => {
  const nextSteps: Record<string, string[]> = {
    'Frontend Developer': [
      'Learn Backend Development to become Full Stack',
      'Master Mobile Development with React Native',
      'Explore Web3 and Blockchain Development',
      'Build your personal brand on LinkedIn and Twitter',
      'Contribute to open source projects'
    ],
    'Backend Developer': [
      'Learn Frontend to become Full Stack Developer',
      'Master Cloud platforms (AWS, Azure, GCP)',
      'Explore Microservices Architecture',
      'Learn DevOps and CI/CD',
      'Build API-first products'
    ],
    'Data Scientist': [
      'Deep dive into Deep Learning frameworks',
      'Learn MLOps and model deployment',
      'Explore Computer Vision or NLP specialization',
      'Build a data science blog',
      'Participate in Kaggle competitions'
    ]
  };
  
  return nextSteps[domain] || [
    'Continue learning advanced topics',
    'Build a strong portfolio',
    'Network with professionals',
    'Apply for internships and jobs',
    'Keep coding daily'
  ];
};
