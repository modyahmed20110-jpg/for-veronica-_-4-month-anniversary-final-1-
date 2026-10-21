/**
 * Pure helper functions for anniversary celebration logic, slide navigation,
 * milestone counters, and petal animations.
 */

export interface PetalConfig {
  id: number;
  leftPercent: number;
  size: number;
  durationSec: number;
  delaySec: number;
  driftX: number;
  rotateDeg: number;
  opacity: number;
  colorType: 'blush' | 'rose' | 'creamy' | 'petal-light';
}

export function getNextIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current + 1) % total;
}

export function getPrevIndex(current: number, total: number): number {
  if (total <= 0) return 0;
  return (current - 1 + total) % total;
}

export function calculateProgressPercent(currentIndex: number, total: number): number {
  if (total <= 1) return 100;
  const clamped = Math.max(0, Math.min(currentIndex, total - 1));
  return Math.round(((clamped + 1) / total) * 100);
}

export function getSlideAriaLabel(currentIndex: number, total: number): string {
  return `Slide ${currentIndex + 1} of ${total}`;
}

export function generateInitialPetals(count: number = 22): PetalConfig[] {
  const colorTypes: PetalConfig['colorType'][] = ['blush', 'rose', 'creamy', 'petal-light'];
  
  return Array.from({ length: count }, (_, i) => {
    // Deterministic pseudo-random distribution based on seed index
    const seed = (i * 9301 + 49297) % 233280;
    const rnd1 = seed / 233280;
    const rnd2 = ((seed * 9301 + 49297) % 233280) / 233280;
    const rnd3 = ((rnd2 * 233280 + 13849) % 233280) / 233280;
    
    return {
      id: i,
      leftPercent: Math.round((rnd1 * 96 + 2) * 10) / 10,
      size: Math.round(14 + rnd2 * 22), // 14px to 36px
      durationSec: Math.round((12 + rnd3 * 16) * 10) / 10, // 12s to 28s
      delaySec: Math.round((i * 0.7 + rnd1 * 2) * 10) / 10,
      driftX: Math.round((rnd2 - 0.5) * 80),
      rotateDeg: Math.round(rnd3 * 360),
      opacity: Math.round((0.55 + rnd1 * 0.4) * 100) / 100,
      colorType: colorTypes[i % colorTypes.length],
    };
  });
}

export function calculateMilestoneNumbers(monthsTogether: number = 4) {
  const estimatedDays = monthsTogether * 30.5; // ~122 days for 4 months
  const estimatedHours = Math.round(estimatedDays * 24);
  const estimatedMinutes = estimatedHours * 60;
  
  return {
    months: monthsTogether,
    days: Math.round(estimatedDays),
    hours: estimatedHours,
    minutes: estimatedMinutes,
  };
}

export interface FallingFlower {
  id: number;
  leftPercent: number;
  size: number;
  durationSec: number;
  delaySec: number;
  rotateStart: number;
  rotateEnd: number;
  swayAmount: number;
  type: 'lily-bloom' | 'lily-petal' | 'lily-bud';
  opacity: number;
}

export function generateFallingFlowers(count: number = 28): FallingFlower[] {
  const types: FallingFlower['type'][] = ['lily-bloom', 'lily-petal', 'lily-petal', 'lily-bud'];

  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 7919 + 65537) % 31337;
    const r1 = (seed % 1000) / 1000;
    const r2 = ((seed * 31 + 17) % 1000) / 1000;
    const r3 = ((seed * 53 + 41) % 1000) / 1000;

    return {
      id: i,
      leftPercent: Math.round((r1 * 94 + 3) * 10) / 10,
      size: Math.round(28 + r2 * 36), // 28px to 64px for visible lilies
      durationSec: Math.round((9 + r3 * 8) * 10) / 10, // 9s to 17s for slow graceful falling
      delaySec: Math.round((r2 * 4) * 10) / 10,
      rotateStart: Math.round(r1 * 180 - 90),
      rotateEnd: Math.round(r3 * 360 + 180),
      swayAmount: Math.round((r2 - 0.5) * 120),
      type: types[i % types.length],
      opacity: Math.round((0.65 + r1 * 0.35) * 100) / 100,
    };
  });
}

export function formatSlideIndex(index: number, total: number): string {
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  return `${pad(index + 1)} / ${pad(Math.max(total, 4))}`;
}

const STORAGE_KEY = 'veronica_mohamed_anniversary_slides_v3';

export function getStoredSlides<T>(fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (!item) return fallback;
    const parsed = JSON.parse(item);
    return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveStoredSlides<T>(slides: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slides));
  } catch {
    // ignore quota errors
  }
}

export function clearStoredSlides(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export interface CanopyLilyItem {
  id: number;
  leftPercent: number;
  topPercent: number;
  size: number;
  rotateDeg: number;
  delaySec: number;
  durationSec: number;
  swayX: number;
  scale: number;
  zIndex: number;
  variant: 'bloom' | 'stem';
}

export function generateCanopyLilies(cols = 11, rows = 10): CanopyLilyItem[] {
  const items: CanopyLilyItem[] = [];
  let id = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seed = ((r * cols + c) * 3571 + 104729) % 233280;
      const rnd1 = (seed % 1000) / 1000;
      const rnd2 = ((seed * 31 + 47) % 1000) / 1000;
      const rnd3 = ((seed * 89 + 13) % 1000) / 1000;

      const leftBase = (c / Math.max(1, cols - 1)) * 100;
      const topBase = (r / Math.max(1, rows - 1)) * 100;
      const leftJitter = (rnd1 - 0.5) * (100 / cols) * 0.9;
      const topJitter = (rnd2 - 0.5) * (100 / rows) * 0.9;

      items.push({
        id: id++,
        leftPercent: Math.max(-8, Math.min(108, leftBase + leftJitter)),
        topPercent: Math.max(-8, Math.min(108, topBase + topJitter)),
        size: Math.round(135 + rnd1 * 95), // 135px to 230px large dense flowers
        rotateDeg: Math.round((rnd2 - 0.5) * 80),
        delaySec: Math.round(rnd3 * 0.3 * 100) / 100,
        durationSec: Math.round((2.3 + rnd1 * 0.9) * 10) / 10,
        swayX: Math.round((rnd2 - 0.5) * 90),
        scale: Math.round((0.95 + rnd3 * 0.35) * 100) / 100,
        zIndex: Math.round(10 + rnd1 * 30),
        variant: rnd3 > 0.78 ? 'stem' : 'bloom',
      });
    }
  }
  return items;
}


