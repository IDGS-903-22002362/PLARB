'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { c } from '@/lib/projects';
import { createFaceAudio, type FaceReaction } from '@/lib/hero-face-audio';
import { usePreferences } from './preferences';

const expressions = ['wink', 'surprised', 'happy'] as const;
type Expression = 'rest' | (typeof expressions)[number];
const captions = {
  rest: c(
    'Un poco de código. Mucha curiosidad.',
    'A little code. A lot of curiosity.',
  ),
  wink: c('Nos entendemos.', 'We get each other.'),
  surprised: c('¡Ah, sigues aquí!', 'Oh, you’re still here!'),
  happy: c('Qué gusto verte por aquí.', 'Good to see you here.'),
};

export default function HeroFace() {
  const { t, paused } = usePreferences();
  const id = useId().replace(/:/g, '');
  const face = useRef<HTMLButtonElement>(null);
  const reaction = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audio = useRef<ReturnType<typeof createFaceAudio> | null>(null);
  const count = useRef(0);
  const [expression, setExpression] = useState<Expression>('rest');
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const playing = !paused && visible && foreground;

  // Expression expiry is independent of the continuous motion lifecycle.
  useEffect(() => {
    return () => {
      if (reaction.current) clearTimeout(reaction.current);
      audio.current?.dispose();
      audio.current = null;
    };
  }, []);

  useEffect(() => {
    const element = face.current;
    if (!element) return;
    const resetReaction = () => {
      if (reaction.current) clearTimeout(reaction.current);
      setExpression('rest');
      audio.current?.stop();
    };
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (!entry.isIntersecting) resetReaction();
    });
    const visibility = () => {
      setForeground(!document.hidden);
      if (document.hidden) resetReaction();
    };
    observer.observe(element);
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);

  useEffect(() => {
    const element = face.current;
    if (!element) return;
    let frame = 0;
    let last = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;
    const paint = () => {
      element.style.setProperty('--look-x', `${x * 13}px`);
      element.style.setProperty('--look-y', `${y * 10}px`);
      element.style.setProperty('--head-turn', `${x * 5}deg`);
      element.style.setProperty('--head-nod', `${-y * 4}deg`);
    };
    const tick = (now: number) => {
      const ease = 1 - Math.exp(-Math.min(now - (last || now - 16), 64) / 65);
      last = now;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      paint();
      frame =
        Math.abs(x - targetX) + Math.abs(y - targetY) > 0.002
          ? requestAnimationFrame(tick)
          : 0;
    };
    const animate = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const track = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const bounds = element.getBoundingClientRect();
      targetX = Math.max(
        -1,
        Math.min(
          1,
          (event.clientX - bounds.left - bounds.width / 2) /
            Math.max(bounds.width * 0.7, 1),
        ),
      );
      targetY = Math.max(
        -1,
        Math.min(
          1,
          (event.clientY - bounds.top - bounds.height / 2) /
            Math.max(bounds.height * 0.7, 1),
        ),
      );
      animate();
    };
    const reset = () => {
      targetX = 0;
      targetY = 0;
      animate();
    };
    if (playing) {
      window.addEventListener('pointermove', track, { passive: true });
      document.documentElement.addEventListener('pointerleave', reset);
      window.addEventListener('blur', reset);
    } else paint();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', track);
      document.documentElement.removeEventListener('pointerleave', reset);
      window.removeEventListener('blur', reset);
      x = 0;
      y = 0;
      paint();
    };
  }, [playing]);

  const sound = (next: FaceReaction) => {
    audio.current ??= createFaceAudio();
    void audio.current.play(next);
  };

  const greet = () => {
    if (reaction.current) clearTimeout(reaction.current);
    const next = expressions[count.current++ % expressions.length];
    setExpression(next);
    reaction.current = setTimeout(
      () => setExpression('rest'),
      next === 'wink' ? 950 : next === 'surprised' ? 1400 : 1900,
    );
    sound(next);
  };

  return (
    <figure
      className="hero-face"
      data-playing={playing}
      data-expression={expression}
    >
      <div className="face-intro">
        <span className="face-presence" />
        {t(c('Un lado más humano.', 'A more human side.'))}
      </div>
      <button
        ref={face}
        type="button"
        className="face-stage"
        onClick={greet}
        aria-label={t(
          c(
            'Rostro interactivo: cambiar el gesto',
            'Interactive face: change expression',
          ),
        )}
      >
        <svg
          className="face-art"
          viewBox="0 0 480 440"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id={`${id}-body`} cx="0.3" cy="0.2" r="0.9">
              <stop stopColor="#a8ceff" />
              <stop offset="0.4" stopColor="#5896f5" />
              <stop offset="0.8" stopColor="#245bc3" />
              <stop offset="1" stopColor="#143779" />
            </radialGradient>
            <linearGradient id={`${id}-edge`} x2="0.8" y2="1">
              <stop stopColor="#c4e1ff" />
              <stop offset="0.5" stopColor="#5a91e0" />
              <stop offset="1" stopColor="#17377f" />
            </linearGradient>
            <radialGradient id={`${id}-eye`} cx="0.4" cy="0.35" r="0.7">
              <stop stopColor="#fff" />
              <stop offset="0.65" stopColor="#eef5ff" />
              <stop offset="1" stopColor="#b1c7e6" />
            </radialGradient>
            <radialGradient id={`${id}-shadow`}>
              <stop stopColor="#07111f" stopOpacity="0.3" />
              <stop offset="1" stopColor="#07111f" stopOpacity="0" />
            </radialGradient>
            {[174, 306].map((cx, index) => (
              <clipPath
                key={cx}
                id={`${id}-lid-${index}`}
                clipPathUnits="userSpaceOnUse"
              >
                <ellipse
                  className={`face-aperture face-aperture-${index}`}
                  cx={cx}
                  cy="211"
                  rx="48"
                  ry="56"
                  style={{ transformOrigin: `${cx}px 211px` }}
                />
              </clipPath>
            ))}
          </defs>
          <ellipse
            cx="240"
            cy="397"
            rx="156"
            ry="24"
            fill={`url(#${id}-shadow)`}
          />
          <g className="face-gesture">
            <g className="face-head">
              <rect
                x="63"
                y="180"
                width="44"
                height="83"
                rx="22"
                fill={`url(#${id}-edge)`}
              />
              <rect
                x="373"
                y="180"
                width="44"
                height="83"
                rx="22"
                fill={`url(#${id}-edge)`}
              />
              <rect
                x="83"
                y="57"
                width="314"
                height="318"
                rx="133"
                fill={`url(#${id}-body)`}
                stroke={`url(#${id}-edge)`}
                strokeWidth="2"
              />
              <path
                d="M120 137C137 92 174 74 222 73"
                stroke="#d5eaff"
                strokeOpacity="0.45"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <g className="face-features">
                <g className="face-brow face-brow-left">
                  <path
                    d="M145 151Q167 137 189 147"
                    stroke="#173665"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </g>
                <g className="face-brow face-brow-right">
                  <path
                    d="M291 147Q313 137 335 151"
                    stroke="#173665"
                    strokeWidth="9"
                    strokeLinecap="round"
                  />
                </g>
                {[174, 306].map((cx, index) => (
                  <g className={`face-eye face-eye-${index}`} key={cx}>
                    <g clipPath={`url(#${id}-lid-${index})`}>
                      <ellipse
                        cx={cx}
                        cy="211"
                        rx="48"
                        ry="56"
                        fill="#174584"
                        fillOpacity="0.3"
                      />
                      <ellipse
                        cx={cx}
                        cy="208"
                        rx="44"
                        ry="51"
                        fill={`url(#${id}-eye)`}
                      />
                      <g className="face-pupil">
                        <ellipse
                          cx={cx}
                          cy="211"
                          rx="21"
                          ry="28"
                          fill="#0b2245"
                        />
                        <ellipse
                          cx={cx - 6}
                          cy="201"
                          rx="7"
                          ry="9"
                          fill="white"
                        />
                        <circle cx={cx + 8} cy="223" r="3" fill="#73a5f6" />
                      </g>
                    </g>
                    <path
                      className={`face-lid face-lid-${index}`}
                      d={`M${cx - 39} 209Q${cx} 232 ${cx + 39} 209`}
                      stroke="#173665"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                  </g>
                ))}
                <ellipse
                  cx="132"
                  cy="274"
                  rx="20"
                  ry="9"
                  fill="#b7d4ff"
                  fillOpacity="0.3"
                />
                <ellipse
                  cx="348"
                  cy="274"
                  rx="20"
                  ry="9"
                  fill="#b7d4ff"
                  fillOpacity="0.3"
                />
                <path
                  d="M234 247Q240 256 250 248"
                  stroke="#1f50a3"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  className="face-smile"
                  d="M204 292Q240 324 276 292"
                  stroke="#102b55"
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <g className="face-grin">
                  <path
                    d="M203 286H277C271 328 209 328 203 286Z"
                    fill="#102b55"
                  />
                  <path d="M212 290H268L263 299H217Z" fill="#f0f6ff" />
                </g>
                <ellipse
                  className="face-gasp"
                  cx="240"
                  cy="299"
                  rx="16"
                  ry="22"
                  fill="#102b55"
                />
              </g>
            </g>
          </g>
        </svg>
        <span className="face-touch" aria-hidden="true">
          ↗
        </span>
      </button>
      <figcaption>
        <output className="face-caption">{t(captions[expression])}</output>
      </figcaption>
    </figure>
  );
}
