import React, { useState, useEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ZoomIn,
  Sparkles,
  Quote,
} from 'lucide-react';
import { MEMORY_SLIDES, MemorySlide } from '../data/anniversaryData';
import {
  getNextIndex,
  getPrevIndex,
  calculateProgressPercent,
} from '../utils/anniversaryLogic';
import { PhotoModal } from './PhotoModal';

export const PhotoQuoteCarousel: React.FC = () => {
  const slides = MEMORY_SLIDES;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [modalSlide, setModalSlide] = useState<MemorySlide | null>(null);
  const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');

  const currentSlide = slides[currentIndex] || slides[0];
  const progressPercent = calculateProgressPercent(currentIndex, slides.length);

  const handleNext = useCallback(() => {
    setSlideDirection('next');
    setCurrentIndex((prev) => getNextIndex(prev, slides.length));
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setSlideDirection('prev');
    setCurrentIndex((prev) => getPrevIndex(prev, slides.length));
  }, [slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Auto-play timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  // Stack calculation for the polaroid stack
  const nextSlide1 = slides[(currentIndex + 1) % slides.length];
  const nextSlide2 = slides[(currentIndex + 2) % slides.length];

  return (
    <section
      id="memories-section"
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24"
      aria-label="Photo & Quote Memories"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <h2 className="font-display text-3xl sm:text-5xl font-light text-stone-800 tracking-tight">
          Four Months In Four Moments
        </h2>
        <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2">
          Flip through the quiet memories that make my world softer every day.
        </p>
      </div>

      {/* Main Two-Column Grid: Left Paper DIY Card + Right Polaroid Stack */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Paper DIY Crumbled Card */}
        <div className="lg:col-span-6 w-full">
          <div
            className="paper-diy-card rounded-3xl p-6 sm:p-10 transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
            role="region"
            aria-live="polite"
            aria-label={`Memory quote ${currentSlide.indexFormatted}`}
          >
            {/* Scrapbook Washi Tape on top left corner */}
            <div className="washi-tape-pink absolute -top-3 left-8 h-5 w-24 rounded-xs transform -rotate-2 z-20 pointer-events-none" />

            {/* Stamp date & Step badge */}
            <div className="flex items-center justify-between pb-4 border-b border-rose-100/80 mb-6">
              <span className="stamp-border px-3 py-1 text-xs font-mono font-medium text-rose-800 tracking-wider uppercase">
                {currentSlide.dateTag}
              </span>
              <span className="font-serif italic text-sm text-stone-400 font-medium">
                {currentSlide.indexFormatted}
              </span>
            </div>

            {/* Chapter Header */}
            <div className="mb-4">
              <span className="text-xs font-sans tracking-widest text-rose-600 uppercase font-semibold">
                Chapter {currentSlide.stepNumber}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-stone-900 font-light mt-1">
                {currentSlide.chapterTitle}
              </h3>
            </div>

            {/* The Featured Quote with decorative quotation mark */}
            <div className="relative my-6 pl-6 sm:pl-8 border-l-2 border-rose-300">
              <Quote className="w-8 h-8 text-rose-200/80 absolute -top-3 -left-3 fill-rose-100 -z-10" />
              <blockquote className="font-serif italic text-xl sm:text-2xl text-stone-800 leading-snug">
                &ldquo;{currentSlide.quote}&rdquo;
              </blockquote>
            </div>

            {/* Story Details */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans font-light mb-8">
              {currentSlide.details}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-[11px] text-stone-400 mb-1.5 font-sans">
                <span>Journey</span>
                <span>{progressPercent}% Complete</span>
              </div>
              <div className="w-full bg-rose-100/60 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Bottom Controls: Navigation Arrows & Dots */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  type="button"
                  aria-label="Previous quote and photo slide"
                  className="w-11 h-11 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200/80 shadow-xs hover:shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  type="button"
                  aria-label="Next quote and photo slide"
                  className="w-11 h-11 rounded-full bg-stone-800 hover:bg-stone-900 text-white shadow-sm hover:shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs text-stone-500 font-sans ml-2">
                  Photo {currentIndex + 1} of {slides.length}
                </span>
              </div>

              {/* Slide Dot Indicators */}
              <div className="flex items-center gap-1.5" role="tablist" aria-label="Slide indicators">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`Jump to slide ${idx + 1}`}
                    onClick={() => {
                      setSlideDirection(idx > currentIndex ? 'next' : 'prev');
                      setCurrentIndex(idx);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'w-6 bg-rose-500'
                        : 'w-2 bg-stone-300 hover:bg-rose-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Polaroid-Style Photo Stack */}
        <div className="lg:col-span-6 w-full flex flex-col items-center justify-center py-6 sm:py-8">
          <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/5] flex items-center justify-center select-none">
            {/* Background Layer 2 (Bottom card in stack) */}
            <div
              className="absolute inset-0 bg-[#fdfbf7] p-4 rounded-2xl polaroid-frame transform rotate-[6deg] scale-95 opacity-50 pointer-events-none transition-all duration-500 border border-stone-200/50"
              style={{ zIndex: 1 }}
            >
              <div className="aspect-square w-full rounded-xl bg-stone-200/60 overflow-hidden">
                <img
                  src={nextSlide2.image}
                  alt=""
                  className="w-full h-full object-cover filter blur-[0.5px] grayscale-[20%]"
                />
              </div>
              <div className="pt-4 text-center">
                <span className="font-script text-lg text-stone-400">
                  {nextSlide2.polaroidCaption}
                </span>
              </div>
            </div>

            {/* Background Layer 1 (Middle card in stack) */}
            <div
              className="absolute inset-0 bg-[#fefcf9] p-4 rounded-2xl polaroid-frame transform -rotate-[3.5deg] scale-[0.98] opacity-75 pointer-events-none transition-all duration-500 border border-stone-200/70"
              style={{ zIndex: 2 }}
            >
              <div className="aspect-square w-full rounded-xl bg-stone-200 overflow-hidden">
                <img
                  src={nextSlide1.image}
                  alt=""
                  className="w-full h-full object-cover filter blur-[0.3px]"
                />
              </div>
              <div className="pt-4 text-center">
                <span className="font-script text-xl text-stone-500">
                  {nextSlide1.polaroidCaption}
                </span>
              </div>
            </div>

            {/* Foreground Active Polaroid Card */}
            <div
              key={currentSlide.id}
              onClick={handleNext}
              className="relative w-full bg-[#fffefc] p-4 sm:p-5 rounded-2xl polaroid-frame shadow-2xl transition-all duration-500 transform hover:scale-[1.02] cursor-pointer border border-stone-200/80 group"
              style={{
                zIndex: 10,
                transform: `rotate(${currentSlide.rotationDegree}deg)`,
              }}
            >
              {/* Decorative Lily Tape / Pin at top center */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-rose-100/90 border border-rose-200/80 shadow-xs rounded-sm transform -rotate-1 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <span className="text-[10px] uppercase font-sans tracking-widest text-rose-700 font-medium">
                  {currentSlide.dateTag.split('•')[0]}
                </span>
              </div>

              {/* Photo Viewport */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 shadow-inner group">
                <img
                  src={currentSlide.image}
                  alt={currentSlide.altText}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-stone-800 text-xs font-medium shadow-md backdrop-blur-xs flex items-center gap-1.5">
                    <span>Click for next photo</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Zoom button on bottom right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setModalSlide(currentSlide);
                  }}
                  type="button"
                  aria-label="Enlarge polaroid photo"
                  className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 shadow-md backdrop-blur-xs transition-transform active:scale-90"
                  title="View full resolution"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Authentic Polaroid Lower White Margin with handwritten script */}
              <div className="pt-4 pb-2 px-1 flex items-center justify-between">
                <div>
                  <p className="font-script text-2xl sm:text-3xl text-stone-800 tracking-wide font-normal">
                    {currentSlide.polaroidCaption}
                  </p>
                  <p className="text-[11px] text-stone-400 font-sans mt-0.5">
                    {currentSlide.dateTag} • Click to flip
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-base font-semibold text-rose-500">
                    {currentSlide.indexFormatted}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stack Navigation Hints */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              type="button"
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-600 text-xs font-medium border border-rose-200/60 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              type="button"
              className="px-4 py-2 rounded-full bg-white/80 hover:bg-white text-stone-600 text-xs font-medium border border-rose-200/60 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-rose-500" />
                  <span>Pause Slideshow</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-rose-500" />
                  <span>Auto-Play</span>
                </>
              )}
            </button>
            <button
              onClick={handleNext}
              type="button"
              className="px-4 py-2 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-medium border border-rose-200/80 shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Full screen modal when user clicks zoom */}
      <PhotoModal slide={modalSlide} onClose={() => setModalSlide(null)} />
    </section>
  );
};
