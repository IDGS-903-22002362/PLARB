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
    let disposed = false;
    let revert: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.fromTo(
            element,
            { '--separation': 0 },
            {
              '--separation': 1,
              ease: 'none',
              scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 25%',
                scrub: 0.5,
              },
            },
          );
        }, element);
        revert = () => context.revert();
      })
      .catch(() => {
        if (!disposed) element.style.setProperty('--separation', '1');
      });
    return () => {
      disposed = true;
      revert?.();
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
