import assert from 'assert';
import { calculateCompatibility, getTier } from './compatibilityEngine';
import { PSYCHOLOGY_QUESTIONS } from '../data/psychologyQuestions';

function testCompatibilityEngine() {
  console.log('Testing compatibility engine...');

  // 1. Validate dataset questions count
  assert.strictEqual(PSYCHOLOGY_QUESTIONS.length, 12, 'Must have exactly 12 questions');

  // 2. Test perfect alignment
  const allMaleA = Object.fromEntries(PSYCHOLOGY_QUESTIONS.map(q => [q.id, 'a' as const]));
  const allFemaleA = Object.fromEntries(PSYCHOLOGY_QUESTIONS.map(q => [q.id, 'a' as const]));

  const resultPerfect = calculateCompatibility(allMaleA, allFemaleA);
  assert(resultPerfect.overallScore >= 95, `Expected score >= 95 for perfect match, got ${resultPerfect.overallScore}`);
  assert.strictEqual(resultPerfect.tier.themeColor, 'emerald');
  assert.strictEqual(resultPerfect.pillars.length, 5);

  // 3. Test contrasting answers
  const maleAnswers: Record<string, 'a'|'b'|'c'|'d'> = {
    q1: 'a', q2: 'a', q3: 'd', q4: 'a',
    q5: 'a', q6: 'a', q7: 'a', q8: 'a',
    q9: 'c', q10: 'a', q11: 'c', q12: 'a'
  };
  const femaleAnswers: Record<string, 'a'|'b'|'c'|'d'> = {
    q1: 'c', q2: 'b', q3: 'a', q4: 'b',
    q5: 'b', q6: 'd', q7: 'c', q8: 'c',
    q9: 'd', q10: 'c', q11: 'a', q12: 'd'
  };

  const resultContrast = calculateCompatibility(maleAnswers, femaleAnswers);
  assert(resultContrast.overallScore < 80, `Expected score < 80 for contrasting answers, got ${resultContrast.overallScore}`);
  assert(resultContrast.criticalDiscussions.length > 0, 'Should identify critical discussions');

  // 4. Test Tier bounds
  assert.strictEqual(getTier(95).badge, 'Visionary Soulmates');
  assert.strictEqual(getTier(80).badge, 'Highly Harmonious');
  assert.strictEqual(getTier(70).badge, 'Promising with Alignment Areas');
  assert.strictEqual(getTier(50).badge, 'Deep Conversation Needed');

  console.log('✓ All compatibility engine tests passed successfully!');
}

testCompatibilityEngine();
