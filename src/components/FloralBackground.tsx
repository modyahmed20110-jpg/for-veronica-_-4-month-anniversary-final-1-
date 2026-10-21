import React, { useEffect, useState, useCallback } from 'react';
import { generateInitialPetals, PetalConfig } from '../utils/anniversaryLogic';
import { CRUMPLED_PAPER_BG, PAPER_LILY_BLOOM_PNG, PAPER_LILY_STEM_PNG, USER_LILY_IMG } from '../data/anniversaryData';

interface FallingPaperLily {
  id: number;
  startX: number;
  startY: number;
  size: number;
  swayX: number;
  durationSec: number;
  rotateStart: number;
  rotateEnd: number;
  imgSrc: string;
}

export const FloralBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [petals, setPetals] = useState<PetalConfig[]>([]);
  const [clickLilies, setClickLilies] = useState<FallingPaperLily[]>([]);

  useEffect(() => {
    // Generate initial floating craft petals
    setPetals(generateInitialPetals(20));
  }, []);

  const spawnFallingLilies = useCallback((x: number, y: number, count: number = 3) => {
    const images = [PAPER_LILY_BLOOM_PNG, PAPER_LILY_STEM_PNG, USER_LILY_IMG];
    const newItems: FallingPaperLily[] = Array.from({ length: count }, (_, i) => {
      const offsetX = (Math.random() - 0.5) * 120;
      return {
        id: Date.now() + Math.random() + i,
        startX: Math.max(20, Math.min(window.innerWidth - 60, x + offsetX)),
        startY: Math.max(0, y - 40 - Math.random() * 60),
        size: Math.round(50 + Math.random() * 45), // 50px to 95px paper lilies
        swayX: Math.round((Math.random() - 0.5) * 140),
        durationSec: Math.round((2.2 + Math.random() * 1.4) * 10) / 10,
        rotateStart: Math.round(Math.random() * 60 - 30),
        rotateEnd: Math.round(Math.random() * 260 + 100),
        imgSrc: images[i % images.length],
      };
    });

    setClickLilies((prev) => [...prev.slice(-12), ...newItems]);

    setTimeout(() => {
      setClickLilies((prev) => prev.filter((item) => !newItems.some((n) => n.id === item.id)));
    }, 3800);
  }, []);

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest('button') || target.closest('a') || target.closest('input')) {
      return;
    }
    spawnFallingLilies(e.clientX, e.clientY, 3);
  };

  return (
    <div
      onClick={handleScreenClick}
      className="relative min-h-screen w-full overflow-x-hidden text-stone-800"
    >
      {/* Realistic Crumpled Craft Paper Background Layer */}
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center mix-blend-multiply opacity-55 scale-102"
        style={{
          backgroundImage: `url(${CRUMPLED_PAPER_BG})`,
          filter: 'contrast(1.08) brightness(1.02)',
        }}
      />

      {/* Warm Handmade Paper Parchment Wash */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-[#fdf8f4]/85 via-[#faf2ea]/75 to-[#f6eae2]/85" />

      {/* Subtle organic paper creases & fibers */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(180, 140, 110, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Floating Gentle Craft Petals */}
      <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden="true">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="absolute shadow-xs"
            style={{
              left: `${petal.leftPercent}%`,
              top: '-5%',
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              backgroundColor: 'rgba(248, 215, 222, 0.75)',
              border: '1px solid rgba(242, 190, 202, 0.6)',
              borderRadius: '60% 40% 70% 30% / 50% 60% 40% 50%',
              opacity: petal.opacity * 0.9,
              filter: 'drop-shadow(0 2px 4px rgba(180, 120, 130, 0.15))',
              animation: `petalDrift ${petal.durationSec + 4}s cubic-bezier(0.3, 0, 0.2, 1) infinite`,
              animationDelay: `${petal.delaySec}s`,
              transform: `rotate(${petal.rotateDeg}deg)`,
            }}
          />
        ))}

        {/* Dynamic Fluid Falling DIY Paper Lilies triggered on click */}
        {clickLilies.map((fl) => (
          <div
            key={fl.id}
            className="fixed pointer-events-none z-50 will-change-transform"
            style={{
              left: `${fl.startX}px`,
              top: `${fl.startY}px`,
              width: `${fl.size}px`,
              height: `${fl.size}px`,
              filter:
                'drop-shadow(0 6px 12px rgba(160, 90, 100, 0.25)) drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
              animation: `fluidPaperDrop ${fl.durationSec}s cubic-bezier(0.25, 0.1, 0.25, 1) forwards`,
            }}
          >
            <img
              src={fl.imgSrc}
              alt=""
              className="w-full h-full object-contain transform select-none"
              style={{
                transform: `rotate(${fl.rotateStart}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {children}
      </div>

      <style>{`
        @keyframes fluidPaperDrop {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(25px, 45vh, 0) rotate(45deg) scale(1);
            opacity: 0.95;
          }
          100% {
            transform: translate3d(50px, 110vh, 0) rotate(140deg) scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
