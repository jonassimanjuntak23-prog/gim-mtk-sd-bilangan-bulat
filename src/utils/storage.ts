import { LevelId, LevelProgress, GameSettings } from '../types/game';

const PROGRESS_KEY = 'teramia_math_progress_v1';
const SETTINGS_KEY = 'teramia_math_settings_v1';

export const INITIAL_PROGRESS: Record<LevelId, LevelProgress> = {
  1: {
    levelId: 1,
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    badge: 'Belum Dimainkan',
    completed: false,
    reflectionCompleted: false,
  },
  2: {
    levelId: 2,
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    badge: 'Belum Dimainkan',
    completed: false,
    reflectionCompleted: false,
  },
  3: {
    levelId: 3,
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    badge: 'Belum Dimainkan',
    completed: false,
    reflectionCompleted: false,
  },
  4: {
    levelId: 4,
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    badge: 'Belum Dimainkan',
    completed: false,
    reflectionCompleted: false,
  },
  5: {
    levelId: 5,
    score: 0,
    totalAnswered: 0,
    correctCount: 0,
    wrongCount: 0,
    stars: 0,
    badge: 'Belum Dimainkan',
    completed: false,
    reflectionCompleted: false,
  },
};

export const INITIAL_SETTINGS: GameSettings = {
  soundEnabled: true,
  ttsEnabled: true,
};

export function getStoredProgress(): Record<LevelId, LevelProgress> {
  if (typeof window === 'undefined') return INITIAL_PROGRESS;
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return INITIAL_PROGRESS;
    const parsed = JSON.parse(raw);
    return { ...INITIAL_PROGRESS, ...parsed };
  } catch {
    return INITIAL_PROGRESS;
  }
}

export function saveLevelProgress(progress: LevelProgress): void {
  if (typeof window === 'undefined') return;
  try {
    const all = getStoredProgress();
    all[progress.levelId] = progress;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function resetAllProgress(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    console.error('Failed to clear progress', e);
  }
}

export function getStoredSettings(): GameSettings {
  if (typeof window === 'undefined') return INITIAL_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return INITIAL_SETTINGS;
    return { ...INITIAL_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings', e);
  }
}

export function calculateBadge(score: number): LevelProgress['badge'] {
  if (score >= 90) return 'Master Matematika';
  if (score >= 80) return 'Juara Cerdas';
  if (score >= 70) return 'Petualang Hebat';
  return 'Pejuang Matematika';
}

export function calculateStars(score: number): number {
  if (score >= 90) return 3;
  if (score >= 75) return 2;
  if (score >= 60) return 1;
  return 0;
}
