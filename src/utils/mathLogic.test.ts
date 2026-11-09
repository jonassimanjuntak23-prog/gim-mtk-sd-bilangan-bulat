import test from 'node:test';
import assert from 'node:assert/strict';
import {
  gcd,
  lcm,
  isPrime,
  calculateCube,
  calculateCubeRoot,
  simplifyFraction,
  calculateScore,
  getQuestionsForLevel,
} from './mathLogic';
import { calculateBadge, calculateStars } from './storage';
import { QUESTIONS_DATA, LEVELS_CONFIG } from '../data/levelsData';

test('Math Helpers: gcd and lcm', () => {
  assert.equal(gcd(36, 48), 12);
  assert.equal(gcd(40, 60), 20);
  assert.equal(lcm(12, 18), 36);
  assert.equal(lcm(6, 8), 24);
  assert.equal(lcm(4, 6), 12);
});

test('Math Helpers: isPrime checks', () => {
  assert.equal(isPrime(1), false);
  assert.equal(isPrime(2), true);
  assert.equal(isPrime(3), true);
  assert.equal(isPrime(4), false);
  assert.equal(isPrime(5), true);
  assert.equal(isPrime(9), false);
  assert.equal(isPrime(11), true);
  assert.equal(isPrime(13), true);
});

test('Math Helpers: cube and cube root', () => {
  assert.equal(calculateCube(5), 125);
  assert.equal(calculateCube(6), 216);
  assert.equal(calculateCube(7), 343);
  assert.equal(calculateCube(8), 512);
  assert.equal(calculateCube(9), 729);
  assert.equal(calculateCubeRoot(125), 5);
  assert.equal(calculateCubeRoot(512), 8);
  assert.equal(calculateCubeRoot(1728), 12);
});

test('Math Helpers: simplifyFraction', () => {
  assert.deepEqual(simplifyFraction(40, 100), [2, 5]);
  assert.deepEqual(simplifyFraction(6, 15), [2, 5]);
  assert.deepEqual(simplifyFraction(3, 8), [3, 8]);
});

test('Scoring and Badges', () => {
  assert.equal(calculateScore(10, 10), 100);
  assert.equal(calculateScore(8, 10), 80);
  assert.equal(calculateBadge(95), 'Master Matematika');
  assert.equal(calculateBadge(85), 'Juara Cerdas');
  assert.equal(calculateBadge(75), 'Petualang Hebat');
  assert.equal(calculateBadge(60), 'Pejuang Matematika');
  assert.equal(calculateStars(100), 3);
  assert.equal(calculateStars(80), 2);
  assert.equal(calculateStars(60), 1);
  assert.equal(calculateStars(50), 0);
});

test('Database Integrity: 5 Levels with at least 10 questions each (total >= 50)', () => {
  assert.equal(LEVELS_CONFIG.length, 5);
  assert.ok(QUESTIONS_DATA.length >= 50, `Expected at least 50 questions, got ${QUESTIONS_DATA.length}`);

  for (let lvl = 1; lvl <= 5; lvl++) {
    const questions = getQuestionsForLevel(lvl as any);
    assert.ok(
      questions.length >= 10,
      `Level ${lvl} must have at least 10 questions, found ${questions.length}`
    );

    // Each question must have exactly 4 options and exactly one correct answer
    for (const q of questions) {
      assert.equal(q.options.length, 4, `Question ${q.id} must have 4 options`);
      const correctOptions = q.options.filter((o) => o.isCorrect);
      assert.equal(correctOptions.length, 1, `Question ${q.id} must have exactly 1 correct option`);
      assert.ok(q.hint.length > 5, `Question ${q.id} must have a descriptive hint`);
      assert.ok(q.fullExplanation.length > 10, `Question ${q.id} must have a full explanation`);
    }
  }
});
