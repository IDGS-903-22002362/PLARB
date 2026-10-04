'use client';

import { useEffect, useState } from 'react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';

const sections = [
  ['contexto', c('Contexto', 'Context')],
  ['arquitectura', c('Arquitectura', 'Architecture')],
  ['decisiones', c('Decisiones', 'Decisions')],
  ['implementacion', c('Implementación', 'Implementation')],
  ['resultados', c('Resultados', 'Results')],
] as const;

export default function CaseContents() {
  const { t } = usePreferences();
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.slice(1);
      setActive(sections.some(([id]) => id === hash) ? hash : null);
    };
    syncHash();
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
      else {
        const context = document.getElementById('contexto');
        if (context && context.getBoundingClientRect().top > window.innerHeight) setActive(null);
      }
    }, { rootMargin: '-150px 0px -45% 0px', threshold: 0 });
    sections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    window.addEventListener('hashchange', syncHash);
    window.addEventListener('popstate', syncHash);
    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', syncHash);
      window.removeEventListener('popstate', syncHash);
    };
  }, []);

  return (
    <nav className="case-toc" aria-label={t(c('Contenido del caso', 'Case contents'))}>
      {sections.map(([id, label]) => (
        <a
          href={`#${id}`}
          key={id}
          aria-current={active === id ? 'location' : undefined}
          onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            setActive(id);
            // Keyboard navigation follows the reader immediately, without a scroll animation.
            if (event.detail === 0) {
              event.preventDefault();
              window.history.pushState({}, '', `#${id}`);
              const section = document.getElementById(id);
              if (section) {
                section.tabIndex = -1;
                section.focus({ preventScroll: true });
                section.scrollIntoView({ behavior: 'instant', block: 'start' });
              }
            }
          }}
        >
          {t(label)}
        </a>
      ))}
    </nav>
  );
}
