'use client';
import { useEffect, useRef, type CSSProperties } from 'react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
export default function CommerceSequence() {
  const { paused, t } = usePreferences();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (paused) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          gsap.from(element.querySelectorAll('.commerce-plane'), {
            transform: 'translateY(8px)',
            opacity: 0.7,
            duration: 0.24,
            stagger: 0.04,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
            scrollTrigger: { trigger: element, start: 'top 85%', once: true },
          });
        }, element);
        revert = () => context.revert();
      })
      .catch(() => {});
    return () => {
      disposed = true;
      revert?.();
    };
  }, [paused]);
  return (
    <figure className="commerce-sequence">
      <span className="eyebrow">
        {t(c('DEL PRODUCTO A LA ARQUITECTURA', 'FROM PRODUCT TO ARCHITECTURE'))}
      </span>
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
            <span>{t(uiCopy(label))}</span>
            <small>{t(uiCopy(detail))}</small>
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
