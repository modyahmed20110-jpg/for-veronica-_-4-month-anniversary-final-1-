import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Pause, Play } from 'lucide-react';
import { romanticAudio } from '../utils/audioSynth';

export const AudioPlayerButton: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.4);
  const [showVolumeMenu, setShowVolumeMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsPlaying(romanticAudio.getIsPlaying());
  }, []);

  const handleToggle = () => {
    const active = romanticAudio.toggle();
    setIsPlaying(active);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    romanticAudio.setVolume(val);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Audio Play/Pause Button */}
      <button
        onClick={handleToggle}
        type="button"
        aria-label={isPlaying ? 'Pause romantic melody' : 'Play romantic melody'}
        className={`group relative flex items-center gap-2.5 px-4 py-2 rounded-full transition-all duration-300 shadow-sm border ${
          isPlaying
            ? 'bg-rose-500/90 text-white border-rose-400/80 shadow-rose-300/40 shadow-md ring-2 ring-rose-300/50'
            : 'bg-white/70 hover:bg-white text-stone-700 hover:text-stone-900 border-rose-200/60 backdrop-blur-md'
        }`}
      >
        <span className="relative flex h-3.5 w-3.5 items-center justify-center">
          {isPlaying ? (
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 bg-white rounded-full h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
              <span className="w-0.5 bg-white rounded-full h-2 animate-[pulse_0.9s_ease-in-out_infinite_0.2s]" />
              <span className="w-0.5 bg-white rounded-full h-3.5 animate-[pulse_0.7s_ease-in-out_infinite_0.4s]" />
            </span>
          ) : (
            <Music className="w-3.5 h-3.5 text-rose-500 group-hover:scale-110 transition-transform" />
          )}
        </span>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Melody Playing' : 'Play Melody'}
        </span>

        <span className="border-l border-current/20 pl-1.5 opacity-80">
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
        </span>
      </button>

      {/* Volume control trigger */}
      <div className="relative">
        <button
          onClick={() => setShowVolumeMenu(!showVolumeMenu)}
          type="button"
          aria-label="Adjust melody volume"
          className="p-2 rounded-full bg-white/70 hover:bg-white text-stone-600 hover:text-stone-900 border border-rose-200/60 backdrop-blur-md transition-all shadow-xs"
        >
          {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-rose-500" />}
        </button>

        {showVolumeMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 p-3 rounded-2xl glass-panel shadow-lg z-50 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium">
              <span>Acoustic Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              className="w-full accent-rose-500 h-1.5 bg-rose-200/50 rounded-lg cursor-pointer"
            />
            <p className="text-[10px] text-stone-400 italic text-center">
              Gentle acoustic piano & chime tones
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
