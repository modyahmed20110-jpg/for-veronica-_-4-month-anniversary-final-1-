import React, { useState } from 'react';
import { Heart, Sparkles, Star, Calendar, Clock, Smile, ShieldCheck } from 'lucide-react';
import { MILESTONES } from '../data/anniversaryData';

const LOVE_REASONS = [
  "The quiet comfort of our late-night calls, staying on the line until you fall asleep peacefully.",
  "How making you laugh, and just being completely silly together when we play, instantly turns my whole day around.",
  "All those moments when we play together, where hours slip by like minutes and everything just feels easy and fun.",
  "The genuine warmth in your voice, especially when we talk things out and remind each other why we care so much.",
  "The sweet, thoughtful ways you express love, from the little things you say to every written letter we’ve ever shared.",
  "The simple fact that four months in, hearing your voice and spending time with you is still the absolute best part of my day.",
];

export const MilestonesSection: React.FC = () => {
  const [revealedReasonIndex, setRevealedReasonIndex] = useState<number>(0);
  const [isRevealed, setIsRevealed] = useState<boolean>(true);

  const handleDrawReason = () => {
    setIsRevealed(false);
    setTimeout(() => {
      setRevealedReasonIndex((prev) => (prev + 1) % LOVE_REASONS.length);
      setIsRevealed(true);
    }, 220);
  };

  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Calendar className="w-5 h-5 text-rose-500" />;
      case 1:
        return <Clock className="w-5 h-5 text-rose-500" />;
      case 2:
        return <Smile className="w-5 h-5 text-rose-500" />;
      default:
        return <Heart className="w-5 h-5 fill-rose-400 text-rose-400" />;
    }
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
      {/* 4-Month Milestones Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {MILESTONES.map((m, idx) => (
          <div
            key={idx}
            className="paper-diy-card rounded-2xl p-4 sm:p-6 text-center flex flex-col items-center justify-center transition-all hover:scale-[1.02] hover:shadow-lg border border-amber-200/80 relative overflow-hidden"
          >
            {/* Scrapbook pin tape */}
            <div className={`h-2.5 w-12 absolute -top-1 rounded-xs pointer-events-none transform ${idx % 2 === 0 ? 'washi-tape-pink -rotate-2' : 'washi-tape-kraft rotate-2'}`} />
            
            <div className="w-10 h-10 rounded-full bg-rose-100/80 flex items-center justify-center mb-3 mt-1 shadow-2xs">
              {getIcon(idx)}
            </div>
            <span className="font-display text-2xl sm:text-3xl font-light text-stone-800">
              {m.value}
            </span>
            <span className="text-xs sm:text-sm font-medium text-rose-950 font-serif italic mt-1">
              {m.label}
            </span>
            <span className="text-[11px] text-stone-400 mt-0.5">
              {m.note}
            </span>
          </div>
        ))}
      </div>

      {/* Interactive Note Reveal: "A Reason I Love You" */}
      <div className="max-w-2xl mx-auto paper-diy-card rounded-3xl p-6 sm:p-8 text-center border border-amber-200/80 shadow-md relative">
        <div className="washi-tape-kraft absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-28 rounded-xs transform -rotate-1 pointer-events-none" />
        <div className="flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-rose-600 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Little Things That Mean Everything</span>
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-light text-stone-800">
          A Reason I Love You, Veronica
        </h3>

        <div className="my-6 min-h-[90px] flex items-center justify-center p-4 rounded-2xl bg-white/60 border border-rose-100 shadow-inner">
          <p
            className={`font-serif italic text-lg sm:text-xl text-stone-700 transition-opacity duration-200 ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          >
            &ldquo;{LOVE_REASONS[revealedReasonIndex]}&rdquo;
          </p>
        </div>

        <button
          onClick={handleDrawReason}
          type="button"
          aria-label="Draw another reason I love you"
          className="px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs sm:text-sm font-medium border border-rose-200/80 shadow-xs hover:shadow-sm transition-all cursor-pointer inline-flex items-center gap-2"
        >
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Tap to Reveal Another Reason (#{revealedReasonIndex + 1} of {LOVE_REASONS.length})</span>
        </button>
      </div>
    </section>
  );
};
