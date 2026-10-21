import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getNextIndex,
  getPrevIndex,
  calculateProgressPercent,
  generateInitialPetals,
  calculateMilestoneNumbers,
} from './anniversaryLogic.ts';

test('getNextIndex loops forward correctly', () => {
  assert.equal(getNextIndex(0, 4), 1);
  assert.equal(getNextIndex(1, 4), 2);
  assert.equal(getNextIndex(2, 4), 3);
  assert.equal(getNextIndex(3, 4), 0, 'Should loop back to start');
  assert.equal(getNextIndex(0, 0), 0, 'Safe with zero items');
});

test('getPrevIndex loops backward correctly', () => {
  assert.equal(getPrevIndex(3, 4), 2);
  assert.equal(getPrevIndex(2, 4), 1);
  assert.equal(getPrevIndex(1, 4), 0);
  assert.equal(getPrevIndex(0, 4), 3, 'Should loop back to end');
  assert.equal(getPrevIndex(0, 0), 0, 'Safe with zero items');
});

test('calculateProgressPercent computes proper percentages', () => {
  assert.equal(calculateProgressPercent(0, 4), 25);
  assert.equal(calculateProgressPercent(1, 4), 50);
  assert.equal(calculateProgressPercent(2, 4), 75);
  assert.equal(calculateProgressPercent(3, 4), 100);
});

test('generateInitialPetals creates requested count with valid properties', () => {
  const petals = generateInitialPetals(15);
  assert.equal(petals.length, 15);
  for (const petal of petals) {
    assert.ok(petal.leftPercent >= 0 && petal.leftPercent <= 100);
    assert.ok(petal.size >= 10 && petal.size <= 50);
    assert.ok(petal.durationSec > 0);
    assert.ok(petal.opacity >= 0.4 && petal.opacity <= 1);
  }
});

test('calculateMilestoneNumbers outputs 4 months stats', () => {
  const stats = calculateMilestoneNumbers(4);
  assert.equal(stats.months, 4);
  assert.ok(stats.days >= 120);
  assert.ok(stats.hours >= 2880);
});

test('generateFallingFlowers outputs slow, gentle falling lilies', async () => {
  const { generateFallingFlowers, formatSlideIndex } = await import('./anniversaryLogic.ts');
  const flowers = generateFallingFlowers(20);
  assert.equal(flowers.length, 20);
  for (const f of flowers) {
    assert.ok(f.durationSec >= 8, 'Flowers must fall slowly (8s+)');
    assert.ok(f.size >= 25, 'Flowers must have visible bloom size');
    assert.ok(f.leftPercent >= 0 && f.leftPercent <= 100);
  }
  assert.equal(formatSlideIndex(0, 4), '01 / 04');
  assert.equal(formatSlideIndex(3, 4), '04 / 04');
  assert.equal(formatSlideIndex(4, 5), '05 / 05');
});

test('generateCanopyLilies produces dense grid covering full screen with valid fall timings', async () => {
  const { generateCanopyLilies } = await import('./anniversaryLogic.ts');
  const canopy = generateCanopyLilies(); // default 11x10 = 110
  assert.equal(canopy.length, 110);
  for (const item of canopy) {
    assert.ok(item.durationSec >= 2.0 && item.durationSec <= 4.0, 'Fluid fall duration');
    assert.ok(item.size >= 120, 'Must have large presence covering screen significantly');
    assert.ok(item.delaySec >= 0 && item.delaySec <= 0.5, 'Falls all at once with subtle flutter');
  }
});
