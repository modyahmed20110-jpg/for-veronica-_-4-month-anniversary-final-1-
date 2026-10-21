import React, { useState, useEffect } from 'react';
import { generateCanopyLilies, CanopyLilyItem } from '../utils/anniversaryLogic';
import { PAPER_LILY_BLOOM_PNG, PAPER_LILY_STEM_PNG, USER_LILY_IMG } from '../data/anniversaryData';

interface PaperLilyCanopyDropProps {
  onStartFall?: () => void;
  onComplete?: () => void;
  isInitialCurtain?: boolean;
}

export const PaperLilyCanopyDrop: React.FC<PaperLilyCanopyDropProps> = ({
  onStartFall,
  onComplete,
  isInitialCurtain = true,
}) => {
  const [lilies, setLilies] = useState<CanopyLilyItem[]>([]);
  const [isFalling, setIsFalling] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    // Generate 121 dense lilies covering the whole screen from edge to edge
    setLilies(generateCanopyLilies(11, 11));
  }, []);

  const handleTriggerDrop = () => {
    if (isFalling || isFinished) return;

    setIsFalling(true);
    // Notify parent to start music immediately, without unmounting the animation!
    if (onStartFall) {
      onStartFall();
    }

    // After the fluid falling cascade finishes, call onComplete
    setTimeout(() => {
      setIsFinished(true);
      if (onComplete) {
        onComplete();
      }
    }, 3600);
  };

  if (isFinished) {
    return null;
  }

  return (
    <div
      onClick={handleTriggerDrop}
      role="region"
      aria-label="Screen densely filled with DIY paper lilies covering everything. Click anywhere to make them fall down smoothly."
      className={`fixed inset-0 z-50 overflow-hidden select-none transition-all ${
        isFalling ? 'pointer-events-none' : 'cursor-pointer'
      }`}
      style={{
        backgroundColor: isFalling ? 'transparent' : 'rgba(254, 246, 242, 0.98)',
        transition: 'background-color 1.8s ease-out',
      }}
    >
      {/* Center note tag */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 transition-all duration-500 pointer-events-none ${
          isFalling ? 'opacity-0 scale-90 -translate-y-8' : 'opacity-100 scale-100'
        }`}
      >
        <div className="paper-diy-card px-6 py-4 rounded-2xl shadow-2xl border border-rose-300/80 text-center max-w-xs sm:max-w-md mx-auto backdrop-blur-md">
          <div className="washi-tape-pink absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-24 rounded-xs transform -rotate-1 pointer-events-none" />
          <h2 className="font-display text-2xl sm:text-3xl text-stone-800 font-light tracking-tight">
            Veronica &amp; Mohamed
          </h2>
          <p className="font-serif italic text-sm sm:text-base text-rose-900/80 mt-1">
            Tap anywhere to release the paper lilies
          </p>
          <div className="flex items-center justify-center gap-1.5 mt-2.5 text-rose-500 text-xs font-sans">
            <span className="animate-bounce">🌸</span>
            <span className="tracking-widest uppercase text-[11px] font-semibold text-rose-700">
              Click to reveal our memories
            </span>
            <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
              🌸
            </span>
          </div>
        </div>
      </div>

      {/* Dense blanket of DIY paper craft lilies filling up the entire screen */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {lilies.map((lily) => {
          // Choose appropriate PNG image asset
          const imageSrc =
            lily.variant === 'stem'
              ? PAPER_LILY_STEM_PNG
              : lily.id % 4 === 0
              ? USER_LILY_IMG
              : PAPER_LILY_BLOOM_PNG;

          // CSS variables for GPU-accelerated surge and fall keyframes
          const customStyle: React.CSSProperties & Record<string, any> = {
            left: `${lily.leftPercent}%`,
            top: `${lily.topPercent}%`,
            width: `${lily.size}px`,
            height: `${lily.size}px`,
            zIndex: lily.zIndex,
            filter:
              'drop-shadow(0 8px 16px rgba(150, 80, 90, 0.28)) drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
            '--rot-start': `${lily.rotateDeg}deg`,
            '--scale-start': lily.scale,
            '--sway-x': `${lily.swayX}px`,
            '--fall-duration': `${lily.durationSec}s`,
            '--fall-delay': `${lily.delaySec}s`,
            transform: !isFalling
              ? `translate3d(0, 0, 0) rotate(${lily.rotateDeg}deg) scale(${lily.scale})`
              : undefined,
          };

          return (
            <div
              key={lily.id}
              className={`absolute will-change-transform ${
                isFalling ? 'animate-lily-drop' : ''
              }`}
              style={customStyle}
            >
              <img
                src={imageSrc}
                alt="DIY paper craft lily"
                className="w-full h-full object-contain select-none pointer-events-none"
                style={{
                  filter: 'contrast(1.08) saturate(1.1)',
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
