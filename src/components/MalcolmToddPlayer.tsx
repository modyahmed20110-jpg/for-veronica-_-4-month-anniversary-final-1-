import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music2, Disc, Sparkles, Upload, ExternalLink } from 'lucide-react';

interface MalcolmToddPlayerProps {
  autoPlayTrigger?: boolean;
}

export const MalcolmToddPlayer: React.FC<MalcolmToddPlayerProps> = ({ autoPlayTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [useLocalAudio, setUseLocalAudio] = useState<boolean>(false);
  const [customAudioSrc, setCustomAudioSrc] = useState<string | null>(null);
  const [customTrackName, setCustomTrackName] = useState<string>('Earrings — Malcolm Todd');
  const [showPlayerModal, setShowPlayerModal] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // YouTube embed URL for Malcolm Todd - Earrings (Video ID: a4tdS3IB294)
  const youtubeVideoId = 'a4tdS3IB294';

  useEffect(() => {
    if (autoPlayTrigger && !isPlaying) {
      handlePlay();
    }
  }, [autoPlayTrigger]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (customAudioSrc && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else {
      // Stream Malcolm Todd - Earrings directly
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=1&enablejsapi=1&loop=1&playlist=${youtubeVideoId}`;
      }
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube-nocookie.com/embed/${youtubeVideoId}?autoplay=0&enablejsapi=1`;
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setCustomAudioSrc(url);
    setCustomTrackName(file.name.replace(/\.[^/.]+$/, ''));
    setUseLocalAudio(true);
    setIsPlaying(true);

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  };

  return (
    <div className="relative inline-flex items-center gap-2">
      {/* Hidden background audio elements */}
      {customAudioSrc && (
        <audio
          ref={audioRef}
          src={customAudioSrc}
          loop
          onEnded={() => setIsPlaying(false)}
        />
      )}

      {/* Hidden iframe player for Earrings by Malcolm Todd */}
      <div className="hidden pointer-events-none" aria-hidden="true">
        <iframe
          ref={iframeRef}
          title="Malcolm Todd - Earrings Player"
          width="10"
          height="10"
          src={`https://www.youtube-nocookie.com/embed/${youtubeVideoId}?enablejsapi=1`}
          allow="autoplay; encrypted-media"
        />
      </div>

      {/* Main Top Bar Music Button */}
      <button
        onClick={handleToggle}
        type="button"
        aria-label={isPlaying ? 'Pause Earrings by Malcolm Todd' : 'Play Earrings by Malcolm Todd'}
        className={`group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2 rounded-full transition-all duration-300 shadow-sm border ${
          isPlaying
            ? 'bg-rose-500 text-white border-rose-400 shadow-rose-300/40 shadow-md ring-2 ring-rose-300/50'
            : 'bg-white/80 hover:bg-white text-stone-700 hover:text-stone-900 border-rose-200/60 backdrop-blur-md'
        }`}
      >
        {/* Animated disc or note */}
        <span className="relative flex h-4 w-4 items-center justify-center">
          <Disc
            className={`w-4 h-4 ${
              isPlaying ? 'animate-spin text-white' : 'text-rose-500 group-hover:scale-110'
            } transition-transform`}
            style={{ animationDuration: '3s' }}
          />
        </span>

        <div className="text-left flex flex-col">
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide leading-tight line-clamp-1">
            {isPlaying ? 'Playing "Earrings"' : 'Play "Earrings"'}
          </span>
          <span className="text-[9px] opacity-75 font-sans leading-tight">
            Malcolm Todd
          </span>
        </div>

        <span className="border-l border-current/20 pl-1.5 opacity-90">
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
        </span>
      </button>

      {/* Music Details / Options Popover */}
      <div className="relative">
        <button
          onClick={() => setShowPlayerModal(!showPlayerModal)}
          type="button"
          aria-label="Audio player options and lyrics"
          className="p-2 rounded-full bg-white/70 hover:bg-white text-stone-600 hover:text-stone-900 border border-rose-200/60 backdrop-blur-md transition-all shadow-xs"
          title="Track details & volume"
        >
          {volume === 0 || isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-stone-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
          )}
        </button>

        {showPlayerModal && (
          <div className="absolute right-0 top-full mt-2 w-72 p-4 rounded-2xl glass-panel shadow-2xl z-50 flex flex-col gap-3 text-stone-800">
            {/* Track Info */}
            <div className="flex items-center gap-3 pb-3 border-b border-rose-200/50">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-xs">
                <Music2 className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-semibold font-sans text-stone-900 truncate">
                  Earrings
                </h4>
                <p className="text-[11px] text-rose-700 font-medium">Malcolm Todd</p>
                <p className="text-[10px] text-stone-400 italic">Sweet Boy</p>
              </div>
            </div>

            {/* Song Quote */}
            <div className="p-2.5 rounded-xl bg-rose-50/80 border border-rose-100 text-[11px] font-serif italic text-rose-900 text-center">
              &ldquo;You look so good with your earrings on...&rdquo;
            </div>

            {/* Volume slider */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[11px] text-stone-600 font-medium">
                <span>Volume</span>
                <span>{Math.round(volume * 100)}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Earrings music volume"
                className="w-full accent-rose-500 h-1.5 bg-rose-200/50 rounded-lg cursor-pointer"
              />
            </div>

            {/* Upload Custom Audio File Option */}
            <div className="pt-2 border-t border-rose-100/70 flex flex-col gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                type="button"
                className="w-full py-1.5 px-3 rounded-lg bg-white/80 hover:bg-white border border-rose-200/80 text-[11px] text-stone-600 font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <Upload className="w-3 h-3 text-rose-500" />
                <span>Upload custom MP3 audio</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <a
                href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-stone-400 hover:text-rose-600 text-center inline-flex items-center justify-center gap-1 transition-colors"
              >
                <span>Listen to Malcolm Todd on YouTube</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
