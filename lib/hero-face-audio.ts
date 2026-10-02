export type FaceReaction = 'wink' | 'surprised' | 'happy';
type AudioResult = 'played' | 'unavailable' | 'cancelled';

/** Small synthesized gestures. No audio resources or context exist before play(). */
export function createFaceAudio() {
  let context: AudioContext | null = null;
  let generation = 0;
  let disposed = false;
  const voices = new Set<{ oscillator: OscillatorNode; gain: GainNode }>();
  const stop = () => {
    generation++;
    for (const voice of voices) {
      voice.oscillator.onended = null;
      try {
        voice.oscillator.stop();
      } catch {
        /* Already ended. */
      }
      voice.oscillator.disconnect();
      voice.gain.disconnect();
    }
    voices.clear();
  };
  return {
    stop,
    async play(reaction: FaceReaction): Promise<AudioResult> {
      if (disposed) return 'cancelled';
      stop();
      const current = generation;
      try {
        if (!context) {
          const Audio = window.AudioContext;
          if (!Audio) return 'unavailable';
          context = new Audio();
        }
        if (context.state === 'suspended') await context.resume();
        if (disposed || generation !== current) return 'cancelled';
        if (context.state !== 'running') return 'unavailable';
        const notes =
          reaction === 'wink'
            ? [
                [740, 1110, 0, 0.13],
                [1110, 880, 0.08, 0.12],
              ]
            : reaction === 'surprised'
              ? [[370, 830, 0, 0.25]]
              : [
                  [523.25, 523.25, 0, 0.16],
                  [659.25, 659.25, 0.08, 0.16],
                  [783.99, 783.99, 0.16, 0.2],
                ];
        for (const [from, to, delay, duration] of notes) {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const voice = { oscillator, gain };
          voices.add(voice);
          const start = context.currentTime + delay;
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(from, start);
          oscillator.frequency.exponentialRampToValueAtTime(
            to,
            start + duration * 0.8,
          );
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.035, start + 0.012);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.onended = () => {
            oscillator.disconnect();
            gain.disconnect();
            voices.delete(voice);
          };
          oscillator.start(start);
          oscillator.stop(start + duration + 0.02);
        }
        return 'played';
      } catch {
        stop();
        return 'unavailable';
      }
    },
    dispose() {
      disposed = true;
      stop();
      if (context && context.state !== 'closed') {
        try {
          void context.close().catch(() => {});
        } catch {
          /* Audio is optional. */
        }
      }
      context = null;
    },
  };
}
