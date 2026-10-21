import React from 'react';
import { Heart, ArrowUp } from 'lucide-react';

export const AnniversaryFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-rose-200/50 py-12 px-4 sm:px-8 mt-12 bg-white/30 backdrop-blur-xs">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-900 font-serif text-lg font-medium">
            <span>Veronica &amp; Mohamed</span>
            <span className="text-rose-400">•</span>
            <span className="italic">4 Months &amp; A Lifetime More</span>
          </div>
          <p className="text-xs text-stone-500 font-sans mt-1">
            &ldquo;You have my whole heart—today and for all the months to come.&rdquo;
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={scrollToTop}
            type="button"
            aria-label="Back to top"
            className="w-10 h-10 rounded-full bg-white hover:bg-stone-50 border border-rose-200/80 text-stone-600 hover:text-stone-900 shadow-xs flex items-center justify-center transition-all cursor-pointer hover:shadow-md"
            title="Return to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
