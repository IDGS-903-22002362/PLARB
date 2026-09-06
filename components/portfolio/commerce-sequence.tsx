'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
export default function CommerceSequence() {
  const { paused, t } = usePreferences();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (paused) {
      element.style.setProperty('--separation', '1');
      return;
    }
    let frame = 0;
    let visible = false;
    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight * 0.8 - rect.top) / (innerHeight * 0.55)),
      );
      element.style.setProperty('--separation', progress.toFixed(3));
    };
    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries.some((entry) => entry.isIntersecting);
      schedule();
    });
    observer.observe(element);
    window.addEventListener('scroll', schedule, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      cancelAnimationFrame(frame);
    };
  }, [paused]);
  return (
    <figure className="commerce-sequence">
      <span className="eyebrow">FROM PRODUCT TO ARCHITECTURE</span>
      <div className="commerce-stages" ref={ref}>
        {[
          ['FRONTEND', 'Next.js / React'],
          ['API', 'Express / Zod'],
          ['PAYMENTS', 'Stripe / Aplazo'],
          ['ORDERS', 'State transitions'],
          ['INVENTORY', 'Reservations'],
        ].map(([label, detail], index) => (
          <div
            className="commerce-plane"
            key={label}
            style={{ '--layer': index } as CSSProperties}
          >
            <span>{label}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
      <figcaption className="commerce-caption">
        {t(
          c(
            'Del checkout visible a las capas que validan, reservan y confirman.',
            'From the visible checkout to the layers that validate, reserve and confirm.',
          ),
        )}
      </figcaption>
    </figure>
  );
}
