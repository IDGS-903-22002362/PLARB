'use client';
import { useEffect, type RefObject } from 'react';
import { usePreferences } from './preferences';

/** Progressive enhancement: the server-rendered page is always readable. */
export function usePortfolioMotion(scope: RefObject<HTMLDivElement | null>) {
  const { paused } = usePreferences();
  useEffect(() => {
    if (paused || !scope.current) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
      .then(([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !scope.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          const headlines = scope.current!.querySelectorAll(
            '.hero-role, .hero-copy h1, .case-hero h1',
          );
          if (headlines.length)
            gsap.from(headlines, {
              yPercent: 110,
              duration: 0.95,
              stagger: 0.08,
              ease: 'power4.out',
              clearProps: 'transform',
            });
          const meta = scope.current!.querySelectorAll(
            '.hero-description, .hero-actions, .case-subtitle, .case-summary, .case-meta',
          );
          if (meta.length)
            gsap.from(meta, {
              opacity: 0,
              duration: 0.28,
              stagger: 0.04,
              ease: 'power2.out',
              clearProps: 'opacity',
            });
          scope
            .current!.querySelectorAll<HTMLElement>('.project-media-cover')
            .forEach((cover) => {
              gsap.from(cover, {
                clipPath: 'inset(12% 8% 12% 8%)',
                duration: 1.05,
                ease: 'power3.out',
                clearProps: 'clip-path',
                scrollTrigger: { trigger: cover, start: 'top 90%', once: true },
              });
            });
          scope
            .current!.querySelectorAll<HTMLElement>('.architecture, .graph-edges')
            .forEach((diagram) => {
              gsap.from(diagram, {
                opacity: 0.35,
                duration: 0.7,
                ease: 'power2.out',
                clearProps: 'opacity',
                scrollTrigger: {
                  trigger: diagram,
                  start: 'top 85%',
                  once: true,
                },
              });
            });
          gsap.fromTo(
            '.reading-progress',
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: { start: 0, end: 'max', scrub: 0.2 },
            },
          );
          ScrollTrigger.refresh();
        }, scope);
        revert = () => context.revert();
      })
      .catch(() => {
        /* Motion is optional; never hide content on import failure. */
      });
    return () => {
      disposed = true;
      revert?.();
    };
  }, [paused, scope]);
}
