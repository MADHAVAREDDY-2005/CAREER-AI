// ============================================
// LOCAL STORAGE UTILITIES
// Functions for persisting user data
// ============================================

export interface UserProgress {
  selectedDomain: string | null;
  completedSteps: string[];
  currentStep: string | null;
  progressPercentage: number;
  lastActivity: string;
  streak: number;
  streakStartDate: string;
}

export interface UserAuth {
  isLoggedIn: boolean;
  email: string;
  userId: string;
  loginDate: string;
}

const STORAGE_KEYS = {
  USER_AUTH: 'career_app_auth',
  USER_PROGRESS: 'career_app_progress',
  DOMAIN_LOCK: 'career_app_domain_lock'
};

// Authentication functions
export const saveAuth = (email: string, userId: string): void => {
  const auth: UserAuth = {
    isLoggedIn: true,
    email,
    userId,
    loginDate: new Date().toISOString()
  };
  localStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(auth));
};

export const getAuth = (): UserAuth | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_AUTH);
  if (!data) return null;
  try {
    return JSON.parse(data) as UserAuth;
  } catch {
    return null;
  }
};

export const clearAuth = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_AUTH);
};

export const isLoggedIn = (): boolean => {
  const auth = getAuth();
  return auth?.isLoggedIn === true;
};

// Progress tracking functions
export const saveProgress = (progress: Partial<UserProgress>): void => {
  const existing = getProgress();
  const updated = { ...existing, ...progress };
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(updated));
};

export const getProgress = (): UserProgress => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
  if (!data) {
    return {
      selectedDomain: null,
      completedSteps: [],
      currentStep: null,
      progressPercentage: 0,
      lastActivity: new Date().toISOString(),
      streak: 0,
      streakStartDate: new Date().toISOString()
    };
  }
  try {
    return JSON.parse(data) as UserProgress;
  } catch {
    return {
      selectedDomain: null,
      completedSteps: [],
      currentStep: null,
      progressPercentage: 0,
      lastActivity: new Date().toISOString(),
      streak: 0,
      streakStartDate: new Date().toISOString()
    };
  }
};

export const clearProgress = (): void => {
  localStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
};

// Domain locking functions
export const lockDomain = (domain: string): void => {
  localStorage.setItem(STORAGE_KEYS.DOMAIN_LOCK, domain);
  saveProgress({ selectedDomain: domain });
};

export const getLockedDomain = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.DOMAIN_LOCK);
};

export const unlockDomain = (): void => {
  localStorage.removeItem(STORAGE_KEYS.DOMAIN_LOCK);
  saveProgress({ selectedDomain: null });
};

export const isDomainLocked = (): boolean => {
  return getLockedDomain() !== null;
};

// Streak management
export const updateStreak = (): number => {
  const progress = getProgress();
  const today = new Date().toDateString();
  const lastActivity = new Date(progress.lastActivity).toDateString();
  
  let newStreak = progress.streak;
  
  if (today !== lastActivity) {
    // Check if it's the next day
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();
    
    if (lastActivity === yesterdayStr) {
      // Continue streak
      newStreak = progress.streak + 1;
    } else {
      // Streak broken, reset
      newStreak = 1;
    }
  }
  
  saveProgress({
    streak: newStreak,
    lastActivity: new Date().toISOString(),
    streakStartDate: newStreak === 1 ? new Date().toISOString() : progress.streakStartDate
  });
  
  return newStreak;
};

export const getStreak = (): number => {
  const progress = getProgress();
  return progress.streak;
};

// Step completion
export const markStepComplete = (stepId: string): void => {
  const progress = getProgress();
  if (!progress.completedSteps.includes(stepId)) {
    const completedSteps = [...progress.completedSteps, stepId];
    saveProgress({ completedSteps });
    updateStreak();
  }
};

export const isStepCompleted = (stepId: string): boolean => {
  const progress = getProgress();
  return progress.completedSteps.includes(stepId);
};

export const getCompletedSteps = (): string[] => {
  const progress = getProgress();
  return progress.completedSteps;
};
