import React from 'react';
import { ChevronDown, Heart, Sparkles } from 'lucide-react';
import { MalcolmToddPlayer } from './MalcolmToddPlayer';

interface HeroHeaderProps {
  onScrollToMemories: () => void;
  onScrollToLetter: () => void;
  onReplayLilyCurtain: () => void;
  audioAutoPlayTrigger?: boolean;
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({
  onScrollToMemories,
  onScrollToLetter,
  onReplayLilyCurtain,
  audioAutoPlayTrigger,
}) => {
  return (
    <header className="relative w-full min-h-[92vh] flex flex-col justify-between px-4 sm:px-8 py-6 max-w-7xl mx-auto">
      {/* Top Bar with Branding: Veronica & Mohamed + Malcolm Todd Audio Player */}
      <nav className="w-full flex items-center justify-between z-30 pt-2 pb-4">
        <div className="flex items-center gap-2 text-stone-700">
          <span className="w-8 h-8 rounded-full bg-rose-100/90 flex items-center justify-center text-rose-500 shadow-xs border border-rose-200/60">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
          </span>
          <span className="font-serif italic text-base sm:text-xl font-medium tracking-wide text-stone-800">
            Veronica &amp; Mohamed
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onReplayLilyCurtain}
            type="button"
            aria-label="Make DIY paper lilies fall down smoothly"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fdf6ee] hover:bg-white text-stone-700 hover:text-stone-900 text-xs font-medium border border-amber-200/80 shadow-2xs transition-all cursor-pointer transform hover:-translate-y-0.5"
            title="Drop the paper lilies"
          >
            <span>🌸</span>
            <span>Drop Paper Lilies</span>
          </button>
          <MalcolmToddPlayer autoPlayTrigger={audioAutoPlayTrigger} />
        </div>
      </nav>

      {/* Main Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-8 sm:py-16 max-w-3xl mx-auto z-20">
        {/* Paper DIY Scrapbook Badge with washi tape */}
        <div className="relative inline-flex items-center gap-2 px-5 py-2 rounded-xl paper-diy-card border border-amber-200/80 text-rose-900 text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <div className="washi-tape-pink absolute -top-2 left-1/2 -translate-x-1/2 h-3.5 w-20 rounded-xs transform -rotate-1 pointer-events-none" />
          <Sparkles className="w-3.5 h-3.5 text-rose-500" />
          <span className="font-semibold">Four Months of Us</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="font-serif italic font-semibold">Four Months of Veronica &amp; Mohamed</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-light text-stone-800 leading-[1.15] tracking-tight mb-6">
          For Veronica <span className="text-rose-400 font-light font-serif">|</span>{' '}
          <span className="block mt-2 sm:mt-3 font-serif italic text-3xl sm:text-5xl md:text-6xl text-rose-950 font-normal">
            Four Months of Us
          </span>
        </h1>

        {/* Delicate Lily Floral Separator */}
        <div className="flex items-center justify-center gap-3 w-full my-4 text-rose-300">
          <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-rose-300/80" />
          <span className="text-xl select-none" aria-hidden="true">
            🌸
          </span>
          <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-rose-300/80" />
        </div>

        {/* Romantic Sub-intro */}
        <p className="font-serif italic text-lg sm:text-2xl text-stone-600 font-light max-w-xl mx-auto leading-relaxed mb-8">
          &ldquo;Every day with you is a quiet blessing, a melody made of laughter, warmth, and the promise of a hundred more tomorrows.&rdquo;
        </p>

        {/* Navigation CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={onScrollToMemories}
            type="button"
            className="px-6 py-3 rounded-full bg-stone-800 hover:bg-stone-900 text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Our Memories
          </button>
          <button
            onClick={onScrollToLetter}
            type="button"
            className="px-6 py-3 rounded-full bg-white/80 hover:bg-white text-stone-800 font-medium text-sm tracking-wide border border-rose-200/80 shadow-xs hover:shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Read The Anniversary Letter
          </button>
        </div>
      </div>

      {/* Bottom Subtle Scroll Down Indicator */}
      <div className="w-full flex flex-col items-center justify-center pb-6 z-20">
        <button
          onClick={onScrollToMemories}
          type="button"
          aria-label="Scroll down to memories"
          className="group flex flex-col items-center gap-2 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <span className="text-xs uppercase tracking-widest font-sans font-medium text-stone-400 group-hover:text-stone-600 transition-colors">
            Scroll to begin
          </span>
          <div className="w-8 h-8 rounded-full border border-stone-300/60 group-hover:border-stone-400 flex items-center justify-center transition-all group-hover:translate-y-1">
            <ChevronDown className="w-4 h-4 text-stone-400 group-hover:text-rose-500 animate-bounce transition-colors" />
          </div>
        </button>
      </div>
    </header>
  );
};
