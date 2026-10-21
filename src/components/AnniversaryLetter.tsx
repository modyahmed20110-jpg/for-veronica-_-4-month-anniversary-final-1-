import React, { useState, useEffect, useRef } from 'react';
import { Heart, Copy, Check, Printer, Sparkles, Flower2 } from 'lucide-react';
import { ANNIVERSARY_LETTER } from '../data/anniversaryData';

export const AnniversaryLetter: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [heartCount, setHeartCount] = useState<number>(4);
  const [flyingHearts, setFlyingHearts] = useState<{ id: number; left: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCopyLetter = () => {
    const fullText = `${ANNIVERSARY_LETTER.recipient}\n\n${ANNIVERSARY_LETTER.p1}\n\n${ANNIVERSARY_LETTER.p2}\n\n${ANNIVERSARY_LETTER.p3}\n\n${ANNIVERSARY_LETTER.signOff}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleSendHeart = () => {
    setHeartCount((prev) => prev + 1);
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 80 + 10,
    };
    setFlyingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section
      ref={sectionRef}
      id="letter-section"
      className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24"
      aria-label="Anniversary Letter Section"
    >
      {/* Floating hearts generated on reaction */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        {flyingHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute bottom-10 text-rose-500 animate-[bounce_1.8s_ease-out_forwards]"
            style={{
              left: `${heart.left}%`,
              transform: 'translateY(-80vh)',
              transition: 'transform 2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 2s',
            }}
          >
            <span className="text-3xl select-none filter drop-shadow">❤️</span>
          </div>
        ))}
      </div>

      {/* Section Subheading */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100/70 border border-rose-200/60 text-rose-800 text-xs font-medium mb-3">
          <Flower2 className="w-3.5 h-3.5 text-rose-500" />
          <span>Section 3 • Words From The Heart</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-light text-stone-800 tracking-tight">
          A Letter For Veronica
        </h2>
        <p className="font-serif italic text-stone-600 mt-2 text-base">
          Written with all my heart, to remind you how cherished you are.
        </p>
      </div>

      {/* Realistic Textured Paper Note Card */}
      <div
        className={`paper-texture rounded-2xl sm:rounded-3xl p-8 sm:p-14 sm:px-16 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0 shadow-2xl' : 'opacity-0 translate-y-12'
        } border border-amber-200/80 relative`}
      >
        {/* DIY Washi Tape on top corners */}
        <div className="washi-tape-pink absolute -top-3 left-8 sm:left-12 h-5 w-24 sm:w-28 rounded-xs transform -rotate-3 z-10 pointer-events-none" />
        <div className="washi-tape-kraft absolute -top-3 right-8 sm:right-12 h-5 w-24 sm:w-28 rounded-xs transform rotate-2 z-10 pointer-events-none" />

        {/* Vintage Top Ribbon / Wax Seal Monogram */}
        <div className="flex flex-col items-center justify-center pb-6 sm:pb-8 border-b border-amber-900/10">
          <div
            onClick={handleSendHeart}
            title="Click to send love"
            className="group relative cursor-pointer flex flex-col items-center"
          >
            {/* Wax seal circle */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-rose-700 via-rose-800 to-rose-950 text-amber-100 flex items-center justify-center shadow-lg border-2 border-rose-600/70 transform group-hover:scale-105 transition-all">
              <span className="font-serif italic text-2xl sm:text-3xl font-bold tracking-tight select-none">
                {ANNIVERSARY_LETTER.monogram}
              </span>
            </div>
            {/* Wax drip accent */}
            <div className="w-8 h-2 bg-rose-800/80 rounded-b-full -mt-0.5 filter blur-[0.3px]" />

            <span className="text-[11px] font-sans text-rose-800/70 mt-2 tracking-wider uppercase font-medium flex items-center gap-1 group-hover:text-rose-900">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>Tap seal to send hearts ({heartCount})</span>
            </span>
          </div>

          <div className="mt-3 text-xs uppercase tracking-widest font-sans text-stone-500">
            {ANNIVERSARY_LETTER.date}
          </div>
        </div>

        {/* Letter Body - Clean, elegant typography with exact copy */}
        <article className="py-8 sm:py-10 space-y-6 text-stone-800 font-serif text-lg sm:text-xl md:text-[21px] leading-[1.8] font-light tracking-wide">
          {/* Salutation */}
          <h3 className="font-display text-2xl sm:text-3xl text-stone-900 font-normal italic mb-6">
            {ANNIVERSARY_LETTER.recipient}
          </h3>

          {/* Paragraph 1 */}
          <p className="indent-4 sm:indent-8 text-stone-800">
            {ANNIVERSARY_LETTER.p1}
          </p>

          {/* Paragraph 2 */}
          <p className="indent-4 sm:indent-8 text-stone-800">
            {ANNIVERSARY_LETTER.p2}
          </p>

          {/* Paragraph 3 */}
          <p className="indent-4 sm:indent-8 text-stone-800">
            {ANNIVERSARY_LETTER.p3}
          </p>

          {/* Sign-off */}
          <div className="pt-6 sm:pt-8 flex flex-col items-end text-right">
            <p className="font-display italic text-2xl sm:text-3xl text-rose-900 font-normal">
              {ANNIVERSARY_LETTER.signOff}
            </p>
            <p className="font-script text-3xl sm:text-4xl text-stone-700 mt-2 select-none">
              Forever Yours
            </p>
          </div>
        </article>

        {/* Paper Footer with Interactive Actions */}
        <div className="pt-6 sm:pt-8 border-t border-amber-900/10 flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-stone-500">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
            <span>Preserved with timeless love</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy button */}
            <button
              onClick={handleCopyLetter}
              type="button"
              aria-label="Copy letter text"
              className="px-3.5 py-2 rounded-full bg-stone-100/80 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Letter</span>
                </>
              )}
            </button>

            {/* Print button */}
            <button
              onClick={handlePrint}
              type="button"
              aria-label="Print or save letter as PDF"
              className="px-3.5 py-2 rounded-full bg-stone-100/80 hover:bg-white text-stone-700 hover:text-stone-900 border border-stone-200 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer active:scale-95"
            >
              <Printer className="w-3.5 h-3.5 text-stone-500" />
              <span>Print Letter</span>
            </button>

            {/* Heart button */}
            <button
              onClick={handleSendHeart}
              type="button"
              aria-label="Send love reaction"
              className="px-3.5 py-2 rounded-full bg-rose-500 hover:bg-rose-600 text-white font-medium transition-all flex items-center gap-1.5 shadow-xs cursor-pointer active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-white text-white" />
              <span>Send Heart</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
