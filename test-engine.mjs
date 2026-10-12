import assert from 'node:assert';
import { calculateCompatibility } from './src/utils/compatibilityEngine.ts';

console.log('Testing Compatibility Engine...');

// Test Case 1: Identical ideal responses
const answersA = {
  v1: 'a', v2: 'a', v3: 'a',
  f1: 'a', f2: 'a',
  c1: 'a', c2: 'a', c3: 'a',
  g1: 'a', g2: 'a',
  r1: 'a', r2: 'a',
};
const res1 = calculateCompatibility('Arya', 'Dewi', answersA, answersA);
assert.strictEqual(res1.overallScore, 100, 'Identical answers must yield 100% score');
assert.ok(res1.tier.label.includes('Sangat') || res1.tier.label.includes('Tinggi'), 'Status level should be high');
assert.strictEqual(res1.pillars.length, 5, 'Must evaluate 5 core psychological dimensions');
res1.pillars.forEach((p) => {
  assert.strictEqual(p.score, 100, `Dimension ${p.pillar} score must be 100`);
});

// Test Case 2: Divergent responses
const answersB = {
  v1: 'd', v2: 'd', v3: 'd',
  f1: 'd', f2: 'd',
  c1: 'd', c2: 'd', c3: 'd',
  g1: 'd', g2: 'd',
  r1: 'd', r2: 'd',
};
const res2 = calculateCompatibility('Budi', 'Siti', answersA, answersB);
assert.ok(res2.overallScore < 50, 'Opposite answers should yield low score');
assert.ok(res2.actionRecommendations.length >= 3, 'Must produce practical psychological recommendations');

// Test Case 3: Mixed responses
const answersC = {
  v1: 'a', v2: 'b', v3: 'c',
  f1: 'a', f2: 'c',
  c1: 'a', c2: 'b', c3: 'a',
  g1: 'b', g2: 'a',
  r1: 'c', r2: 'd',
};
const res3 = calculateCompatibility('Fikri', 'Nadia', answersA, answersC);
assert.ok(res3.overallScore > 30 && res3.overallScore < 100, 'Mixed answers score should be realistic');
assert.ok(res3.keyStrengths !== undefined, 'Must contain key strengths array');

console.log('✅ All Compatibility Engine tests passed successfully!');
