'use client';
import { useEffect, type RefObject } from 'react';
import { usePreferences } from './preferences';

/** Progressive enhancement: the server-rendered page is always readable. */
export function usePortfolioMotion(
  scope: RefObject<HTMLDivElement | null>,
  home = true,
) {
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
          if (!home) {
            const introduction = scope.current!.querySelectorAll(
              '.case-hero h1, .case-subtitle, .case-summary, .case-meta',
            );
            if (introduction.length)
              gsap.from(introduction, {
                transform: 'translateY(8px)',
                opacity: 0.65,
                duration: 0.24,
                stagger: 0.04,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
              });
            gsap.fromTo(
              '.reading-progress',
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: 'none',
                scrollTrigger: { start: 0, end: 'max', scrub: true },
              },
            );
            return;
          }
          const headlines = scope.current!.querySelectorAll(
            '.hero-role, .hero-copy h1, .case-hero h1',
          );
          if (headlines.length)
            gsap.from(headlines, {
              yPercent: 110,
              duration: 0.65,
              stagger: 0.06,
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
              const planes = cover.querySelectorAll(
                '.cover-primary, .cover-secondary',
              );
              gsap.from(planes, {
                y: (index: number) => (index === 0 ? 28 : 48),
                rotationY: (index: number) => (index === 0 ? -10 : 10),
                duration: 1.15,
                stagger: 0.09,
                ease: 'power3.out',
                clearProps: 'transform',
                scrollTrigger: { trigger: cover, start: 'top 88%', once: true },
              });
            });
          scope
            .current!.querySelectorAll<HTMLElement>(
              '.architecture, .graph-edges',
            )
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
  }, [paused, scope, home]);
}
