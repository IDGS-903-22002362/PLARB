'use client';

import { useEffect, useMemo, useRef } from 'react';
import AsciiRipple, { type AsciiRippleHandle } from '@/components/ascii-ripple';
import { usePreferences } from './preferences';
import type { Study } from '@/lib/projects';

interface ProjectAsciiBackgroundProps {
  project?: Study;
}

export default function ProjectAsciiBackground({
  project,
}: ProjectAsciiBackgroundProps) {
  const { theme, dark, paused } = usePreferences();
  const rippleRef = useRef<AsciiRippleHandle>(null);

  const isDark = theme === 'dark' || (theme === 'system' && dark);

  useEffect(() => {
    if (paused) {
      rippleRef.current?.calm();
    }
  }, [paused]);

  const text = useMemo(() => {
    if (!project) {
      return 'LUIS ROSAS · SOFTWARE ENGINEER · CLUB LEÓN FC · LA GUARIDA · POS CONCESIONES · COMMERCE & IOT · FULL STACK · REACT · NEXT.JS · TYPESCRIPT · FLUTTER · DART · FIREBASE · NODE.JS · EXPRESS · SYSTEM ARCHITECTURE · IDEMPOTENT TRANSACTIONS · INVENTORY RESERVATIONS · APPLIED AI · ';
    }
    const stack = project.stack.join(' · ').toUpperCase();
    const title = project.title.toUpperCase();
    const category = project.category.toUpperCase();
    const summary = `${project.summary.es} ${project.summary.en}`.toUpperCase();
    return `${title} · ${category} · ${stack} · ${summary} · LUIS ROSAS · INGENIERO DE SOFTWARE · ${project.architecture.es.toUpperCase()} · `;
  }, [project]);

  return (
    <div className="project-ascii-background" aria-hidden="true">
      <AsciiRipple
        ref={rippleRef}
        text={text}
        textColor={isDark ? '#475569' : '#94a3b8'}
        rippleColor={isDark ? '#72a7ff' : '#1e5aaa'}
        troughColor={isDark ? '#4c8dff' : '#2a6bc8'}
        textOpacity={isDark ? 0.16 : 0.2}
        fontSize={15}
        lineHeight={1.25}
        speed={0.65}
        damping={0.03}
        viscosity={0.3}
        dropStrength={1.2}
        dropRadius={28}
        dragStrength={0.35}
        dragRadius={18}
        rain={paused ? 0 : 0.9}
        rainStrength={0.55}
        edges="absorb"
        refraction={3}
        scramble={0.9}
        vignette={0.45}
        interactive={!paused}
        globalPointer={!paused}
        className="h-full w-full"
      />
    </div>
  );
}
