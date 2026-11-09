import { QUESTIONS_DATA } from '../data/levelsData';
import { LevelId, Question } from '../types/game';

// Mathematical pure logic functions
export function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const temp = y;
    y = x % y;
    x = temp;
  }
  return x;
}

export function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

export function calculateCube(n: number): number {
  return n * n * n;
}

export function calculateCubeRoot(n: number): number {
  return Math.round(Math.cbrt(n));
}

export function simplifyFraction(numerator: number, denominator: number): [number, number] {
  const common = gcd(numerator, denominator);
  return [numerator / common, denominator / common];
}

export function calculateScore(correctCount: number, totalQuestions: number): number {
  if (totalQuestions === 0) return 0;
  return Math.round((correctCount / totalQuestions) * 100);
}

export function getQuestionsForLevel(levelId: LevelId): Question[] {
  return QUESTIONS_DATA.filter((q) => q.levelId === levelId);
}

export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
