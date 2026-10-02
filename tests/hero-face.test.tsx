import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import HeroFace from '../components/portfolio/hero-face';
import { PreferencesProvider } from '../components/portfolio/preferences';
import { createFaceAudio } from '../lib/hero-face-audio';

let intersect: IntersectionObserverCallback;
const disconnect = vi.fn();
const parameter = () => ({
  setValueAtTime: vi.fn(),
  exponentialRampToValueAtTime: vi.fn(),
});
const oscillatorNode = () => ({
  type: '',
  frequency: parameter(),
  start: vi.fn(),
  stop: vi.fn(),
  connect: vi.fn(),
  disconnect: vi.fn(),
  onended: null as (() => void) | null,
});
const gainNode = () => ({
  gain: parameter(),
  connect: vi.fn(),
  disconnect: vi.fn(),
});
function installAudio(initialState = 'running') {
  const contexts: MockAudio[] = [];
  class MockAudio {
    state = initialState;
    currentTime = 0;
    destination = {};
    oscillators: ReturnType<typeof oscillatorNode>[] = [];
    gains: ReturnType<typeof gainNode>[] = [];
    constructor() {
      contexts.push(this);
    }
    resume = vi.fn(async () => {
      this.state = 'running';
    });
    close = vi.fn(async () => {
      this.state = 'closed';
    });
    createOscillator() {
      const oscillator = oscillatorNode();
      this.oscillators.push(oscillator);
      return oscillator;
    }
    createGain() {
      const gain = gainNode();
      this.gains.push(gain);
      return gain;
    }
  }
  vi.stubGlobal('AudioContext', MockAudio);
  return { contexts, MockAudio };
}
function renderFace() {
  const result = render(
    <PreferencesProvider>
      <HeroFace />
    </PreferencesProvider>,
  );
  return {
    ...result,
    face: screen.getByRole('button', {
      name: /Rostro interactivo|Interactive face/,
    }),
    figure: result.container.querySelector('figure')!,
  };
}
const show = (visible = true) =>
  act(() =>
    intersect(
      [{ isIntersecting: visible } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
const tap = async (element: HTMLElement) => {
  await act(async () => {
    fireEvent.click(element);
  });
};
const advance = async (ms: number) => {
  await act(async () => {
    vi.advanceTimersByTime(ms);
  });
};

beforeEach(() => {
  installAudio();
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  );
  vi.stubGlobal(
    'IntersectionObserver',
    class {
      constructor(callback: IntersectionObserverCallback) {
        intersect = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
});
afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('Interactive hero face', () => {
  it('has keyboard reactions and separate eyelid masks without deforming the eyeballs', async () => {
    const user = userEvent.setup();
    const { face, figure } = renderFace();
    expect(face.getAttribute('aria-label')).toBe(
      'Rostro interactivo: cambiar el gesto',
    );
    expect(figure.querySelectorAll('clipPath .face-aperture').length).toBe(2);
    expect(figure.querySelectorAll('.face-eye > g[clip-path]').length).toBe(2);
    expect(figure.querySelectorAll('.face-lid').length).toBe(2);
    await user.tab();
    await user.keyboard('{Enter}');
    expect(figure.dataset.expression).toBe('wink');
    await user.keyboard(' ');
    expect(figure.dataset.expression).toBe('surprised');
    await user.click(face);
    expect(figure.dataset.expression).toBe('happy');
    expect(screen.getByRole('status').textContent).toBe(
      'Qué gusto verte por aquí.',
    );
  });

  it('bounds cursor tracking and releases RAF, timers and audio on unmount', async () => {
    vi.useFakeTimers();
    const { contexts } = installAudio();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation((callback) =>
      window.setTimeout(() => callback(performance.now()), 16),
    );
    vi.spyOn(window, 'cancelAnimationFrame').mockImplementation(clearTimeout);
    const { face, figure, unmount } = renderFace();
    vi.spyOn(face, 'getBoundingClientRect').mockReturnValue({
      left: 0,
      top: 0,
      width: 480,
      height: 440,
    } as DOMRect);
    show();
    fireEvent.pointerMove(window, { clientX: 2000, clientY: 2000 });
    await advance(1000);
    const x = parseFloat(face.style.getPropertyValue('--look-x'));
    expect(x).toBeGreaterThan(12);
    expect(x).toBeLessThanOrEqual(13);
    await tap(face);
    await advance(1100);
    expect(figure.dataset.expression).toBe('rest');
    await tap(face);
    unmount();
    expect(disconnect).toHaveBeenCalled();
    expect(contexts[0].close).toHaveBeenCalledOnce();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('plays reaction audio by default on user gesture', async () => {
    const { contexts } = installAudio();
    const { face, unmount } = renderFace();
    show();
    expect(contexts).toHaveLength(0);
    await tap(face);
    expect(contexts).toHaveLength(1);
    expect(contexts[0].oscillators.length).toBeGreaterThan(0);
    unmount();
  });

  it.each(['paused', 'reduced'])(
    'resets discrete gestures even when motion is %s',
    async (preference) => {
      vi.useFakeTimers();
      const raf = vi.spyOn(window, 'requestAnimationFrame');
      if (preference === 'paused')
        localStorage.setItem('luis-portfolio-motion', 'paused');
      else
        vi.spyOn(window, 'matchMedia').mockImplementation(
          (query) =>
            ({
              matches: query === '(prefers-reduced-motion: reduce)',
              addEventListener: vi.fn(),
              removeEventListener: vi.fn(),
            }) as unknown as MediaQueryList,
        );
      const { face, figure } = renderFace();
      show();
      expect(figure.dataset.playing).toBe('false');
      await tap(face);
      expect(figure.dataset.expression).toBe('wink');
      await advance(1100);
      expect(figure.dataset.expression).toBe('rest');
      expect(raf).not.toHaveBeenCalled();
    },
  );

  it('does not lose expression expiry when motion is paused and resumed mid-reaction', async () => {
    vi.useFakeTimers();
    const { face, figure } = renderFace();
    show();
    await tap(face);
    await advance(300);
    localStorage.setItem('luis-portfolio-motion', 'paused');
    fireEvent(window, new Event('portfolio-preference-change'));
    expect(figure.dataset.playing).toBe('false');
    await advance(300);
    localStorage.setItem('luis-portfolio-motion', 'playing');
    fireEvent(window, new Event('portfolio-preference-change'));
    await advance(500);
    expect(figure.dataset.playing).toBe('true');
    expect(figure.dataset.expression).toBe('rest');
  });

  it.each(['offscreen', 'hidden'])(
    'immediately clears interrupted reactions when %s',
    async (reason) => {
      vi.useFakeTimers();
      const { face, figure } = renderFace();
      show();
      await tap(face);
      if (reason === 'offscreen') show(false);
      else {
        vi.spyOn(document, 'hidden', 'get').mockReturnValue(true);
        fireEvent(document, new Event('visibilitychange'));
      }
      expect(figure.dataset.playing).toBe('false');
      expect(figure.dataset.expression).toBe('rest');
      expect(face.style.getPropertyValue('--look-x')).toBe('0px');
      await advance(2200);
      expect(figure.dataset.expression).toBe('rest');
    },
  );

  it('replaces an earlier expiry when reactions are triggered rapidly', async () => {
    vi.useFakeTimers();
    const { face, figure } = renderFace();
    show();
    await tap(face);
    await advance(800);
    await tap(face);
    await advance(300);
    expect(figure.dataset.expression).toBe('surprised');
    await advance(1200);
    expect(figure.dataset.expression).toBe('rest');
  });

  it('localizes the interaction and caption', () => {
    localStorage.setItem('portfolio-locale', 'en');
    const { face } = renderFace();
    expect(face.getAttribute('aria-label')).toBe(
      'Interactive face: change expression',
    );
    expect(screen.getByText('A little code. A lot of curiosity.')).toBeTruthy();
  });
});

describe('Reaction audio lifecycle', () => {
  it('resumes suspended contexts and uses brief low-gain envelopes', async () => {
    const { contexts } = installAudio('suspended');
    const audio = createFaceAudio();
    expect(await audio.play('surprised')).toBe('played');
    expect(contexts[0].resume).toHaveBeenCalledOnce();
    expect(
      contexts[0].gains[0].gain.exponentialRampToValueAtTime,
    ).toHaveBeenCalledWith(0.035, 0.012);
    contexts[0].oscillators[0].onended?.();
    expect(contexts[0].gains[0].disconnect).toHaveBeenCalled();
    audio.dispose();
  });

  it('does not play a delayed resume after being stopped or disposed', async () => {
    const { contexts, MockAudio } = installAudio('suspended');
    let resume!: () => void;
    class DelayedAudio extends MockAudio {
      resume = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resume = () => {
              this.state = 'running';
              resolve();
            };
          }),
      );
    }
    vi.stubGlobal('AudioContext', DelayedAudio);
    const audio = createFaceAudio();
    const pending = audio.play('wink');
    audio.stop();
    resume();
    expect(await pending).toBe('cancelled');
    expect(contexts[0].oscillators).toHaveLength(0);
    audio.dispose();
    expect(await audio.play('happy')).toBe('cancelled');
  });

  it('absorbs rejected resume and close operations without breaking the page', async () => {
    const { MockAudio } = installAudio('suspended');
    class BlockedAudio extends MockAudio {
      resume = vi.fn(async () => {
        throw new Error('Audio blocked');
      });
      close = vi.fn(async () => {
        throw new Error('Already closed');
      });
    }
    vi.stubGlobal('AudioContext', BlockedAudio);
    const audio = createFaceAudio();
    expect(await audio.play('happy')).toBe('unavailable');
    audio.dispose();
  });
});
