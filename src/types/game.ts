export type LevelId = 1 | 2 | 3 | 4 | 5;

export type QuestionStage = 'pemahaman' | 'analisis' | 'aplikasi' | 'hots';

export type QuestionType = 'multiple_choice' | 'keypad' | 'interactive_choice';

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface Question {
  id: string;
  levelId: LevelId;
  questionNumber: number;
  stage: QuestionStage;
  category: 'Pemahaman Konsep' | 'Analisis Masalah' | 'Penerapan Kontekstual' | 'Tantangan HOTS';
  title: string;
  stimulus: string; // Background story/scenario
  questionText: string;
  visualType?: 'thermometer' | 'number_line' | 'receipt' | 'factor_tree' | 'cube' | 'pizza' | 'clock';
  visualData?: any;
  type: QuestionType;
  options: QuestionOption[]; // 4 options for MC
  correctAnswer: string | number;
  hint: string;
  fullExplanation: string;
}

export interface ReflectionQuestion {
  id: string;
  prompt: string;
  type: 'rating' | 'choice' | 'scenario';
  options?: string[];
  scenarioDetail?: string;
}

export interface LevelInfo {
  id: LevelId;
  numberStr: string;
  title: string;
  themeTitle: string;
  description: string;
  iconName: string;
  accentColor: string;
  badgeName: string;
  targetCompetency: string[];
}

export interface LevelProgress {
  levelId: LevelId;
  score: number;
  totalAnswered: number;
  correctCount: number;
  wrongCount: number;
  stars: number; // 0 to 3
  badge: 'Master Matematika' | 'Juara Cerdas' | 'Petualang Hebat' | 'Pejuang Matematika' | 'Belum Dimainkan';
  completed: boolean;
  reflectionCompleted: boolean;
  reflectionAnswers?: Record<string, string>;
  lastPlayed?: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  ttsEnabled: boolean;
}
