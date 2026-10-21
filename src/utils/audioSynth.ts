/**
 * Romantic Ambient Audio Synthesizer using Web Audio API.
 * Plays a soft, calming piano/chime lullaby progression in F Major/C Major.
 * Generates natural gentle harmonics with zero external network audio files.
 */

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private volume = 0.4;
  private masterGain: GainNode | null = null;
  private noteIndex = 0;

  // Romantic progression frequencies (C4, E4, F4, G4, A4, C5, D5, E5, F5, G5)
  private melodyNotes = [
    { freq: 349.23, duration: 1.8 }, // F4
    { freq: 440.0, duration: 1.5 },  // A4
    { freq: 523.25, duration: 2.2 }, // C5
    { freq: 440.0, duration: 1.4 },  // A4
    { freq: 392.0, duration: 1.8 },  // G4
    { freq: 329.63, duration: 1.5 }, // E4
    { freq: 523.25, duration: 2.4 }, // C5
    { freq: 293.66, duration: 1.8 }, // D4
    { freq: 349.23, duration: 1.5 }, // F4
    { freq: 440.0, duration: 2.0 },  // A4
    { freq: 587.33, duration: 2.6 }, // D5
    { freq: 523.25, duration: 3.0 }, // C5
  ];

  private chords = [
    [174.61, 261.63, 349.23, 440.0], // Fmaj7
    [130.81, 196.00, 261.63, 329.63], // C
    [146.83, 220.00, 293.66, 349.23], // Dm7
    [116.54, 174.61, 233.08, 349.23], // Bb
  ];

  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume() {
    return this.volume;
  }

  public play() {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;
    this.isPlaying = true;
    this.scheduleNextPhrase();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private playTone(freq: number, duration: number, isBass = false) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle warm sine + soft triangle
    osc.type = isBass ? 'sine' : 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Warm filter for acoustic chime / felt piano warmth
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(isBass ? 450 : 1200, this.ctx.currentTime);

    // Gentle bell-like acoustic attack & decay
    const now = this.ctx.currentTime;
    const peakGain = isBass ? 0.08 : 0.12;
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(peakGain, now + 0.08);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  }

  private scheduleNextPhrase() {
    if (!this.isPlaying || !this.ctx) return;

    // Play melody note
    const currentNote = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
    this.playTone(currentNote.freq, currentNote.duration, false);

    // Play soft chord on root note steps
    if (this.noteIndex % 3 === 0) {
      const chord = this.chords[this.chordIndex % this.chords.length];
      chord.forEach((f) => this.playTone(f, 3.2, true));
      this.chordIndex++;
    }

    this.noteIndex++;
    const nextIntervalMs = Math.max(900, currentNote.duration * 680);

    this.timer = window.setTimeout(() => {
      this.scheduleNextPhrase();
    }, nextIntervalMs);
  }
}

export const romanticAudio = new RomanticAudioPlayer();
