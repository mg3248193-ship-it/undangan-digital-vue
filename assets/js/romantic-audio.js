// Romantic Wedding Audio Engine using Web Audio API + MP3 fallback
// Generates soft, warm, romantic acoustic piano arpeggios (Canon in D inspired)
export class RomanticAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timerId = null;
    this.currentStep = 0;
    this.audioElement = null; // for custom mp3
    this.isMuted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Canon in D / Romantic Wedding Chord Progression (Frequencies in Hz)
  // D - A - Bm - F#m - G - D - G - A
  playNote(freq, startTime, duration = 1.8, volume = 0.12) {
    if (!this.ctx || this.isMuted) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft warm tone with lowpass filter
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, startTime);
      filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Acoustic envelope: quick attack, gentle natural decay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch (e) {
      console.warn('Audio note error:', e);
    }
  }

  startMelody() {
    if (!this.ctx) this.init();
    if (!this.ctx) return;
    this.isPlaying = true;

    // Beautiful romantic arpeggio notes (D major / Pentatonic romantic notes)
    const chords = [
      // D Major
      [293.66, 369.99, 440.0, 587.33],
      // A Major
      [220.0, 277.18, 329.63, 440.0],
      // B Minor
      [246.94, 293.66, 369.99, 493.88],
      // F# Minor
      [185.0, 220.0, 277.18, 369.99],
      // G Major
      [196.0, 246.94, 293.66, 392.0],
      // D Major
      [220.0, 293.66, 369.99, 440.0],
      // G Major
      [196.0, 246.94, 293.66, 493.88],
      // A Major
      [220.0, 277.18, 329.63, 554.37]
    ];

    let chordIndex = 0;
    let arpeggioStep = 0;

    const tick = () => {
      if (!this.isPlaying) return;

      const currentChord = chords[chordIndex];
      const noteFreq = currentChord[arpeggioStep % currentChord.length];
      const now = this.ctx.currentTime;

      // Play bass root on chord change
      if (arpeggioStep === 0) {
        this.playNote(currentChord[0] / 2, now, 2.8, 0.14);
      }

      // Play soft arpeggio note
      this.playNote(noteFreq, now, 1.4, 0.08);

      // Add soft high shimmer sparkle on alternating beats
      if (arpeggioStep === 2) {
        this.playNote(noteFreq * 2, now + 0.15, 1.0, 0.03);
      }

      arpeggioStep++;
      if (arpeggioStep >= 4) {
        arpeggioStep = 0;
        chordIndex = (chordIndex + 1) % chords.length;
      }

      this.timerId = setTimeout(tick, 520);
    };

    tick();
  }

  stopMelody() {
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stopMelody();
    } else {
      this.startMelody();
    }
    return this.isPlaying;
  }
}
