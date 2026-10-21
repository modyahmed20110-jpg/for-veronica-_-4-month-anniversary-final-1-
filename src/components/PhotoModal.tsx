import React from 'react';
import { X, Heart } from 'lucide-react';
import { MemorySlide } from '../data/anniversaryData';

interface PhotoModalProps {
  slide: MemorySlide | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ slide, onClose }) => {
  if (!slide) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged memory photo"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/75 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-white p-4 sm:p-6 rounded-2xl shadow-2xl polaroid-frame transform transition-transform"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          aria-label="Close enlarged photo"
          className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-stone-800 text-white flex items-center justify-center hover:bg-stone-900 transition-colors shadow-lg cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Polaroid frame */}
        <div className="bg-[#fcfaf7] border border-stone-200/70 p-3 sm:p-4 rounded-xl shadow-inner">
          <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-stone-100 shadow-xs">
            <img
              src={slide.image}
              alt={slide.altText}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="pt-4 pb-2 px-2 flex items-center justify-between">
            <div>
              <p className="font-script text-2xl text-stone-700 tracking-wide">
                {slide.polaroidCaption}
              </p>
              <p className="text-xs text-stone-400 font-sans mt-0.5">
                {slide.dateTag} • Four Months of Veronica
              </p>
            </div>
            <span className="flex items-center gap-1 text-xs text-rose-500 font-serif italic">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
              <span>{slide.indexFormatted}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
