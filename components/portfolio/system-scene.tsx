'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Braces, Code2, Database } from 'lucide-react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
import type { SceneController } from './system-scene-engine';
export default function SystemScene() {
  const { paused, t } = usePreferences();
  const container = useRef<HTMLDivElement>(null);
  const controller = useRef<SceneController | null>(null);
  const motion = useRef(!paused);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    motion.current = !paused;
    controller.current?.setMotion(!paused);
  }, [paused]);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    let disposed = false;
    let loading = false;
    let visible = false;
    const load = async () => {
      if (loading) return;
      loading = true;
      try {
        const { createSystemScene } = await import('./system-scene-engine');
        if (disposed) return;
        controller.current = createSystemScene(element, () => setReady(false));
        controller.current.setMotion(motion.current);
        controller.current.setActive(visible && !document.hidden);
        setReady(true);
      } catch {
        if (!disposed) setReady(false);
      }
    };
    const visibility = () =>
      controller.current?.setActive(visible && !document.hidden);
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
        if (visible) void load();
        visibility();
      },
      { rootMargin: '80px' },
    );
    observer.observe(element);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);
  return (
    <figure className={`system-scene ${ready ? 'scene-ready' : ''}`}>
      <div className="scene-heading">
        <span>FIG. 01 / SOFTWARE SYSTEM</span>
        <ArrowUpRight size={17} />
      </div>
      <div className="scene-viewport" ref={container} aria-hidden="true" />
      <div className="scene-fallback" aria-hidden="true">
        {[
          ['WEB / MOBILE', Code2],
          ['API / SERVICES', Braces],
          ['DATA / CLOUD', Database],
        ].map(([name, Icon]) => {
          const Symbol = Icon as typeof Code2;
          return (
            <div className="fallback-layer" key={String(name)}>
              <Symbol size={23} />
              <span>{String(name)}</span>
            </div>
          );
        })}
      </div>
      <div className="scene-label label-interface">
        <span>01</span>
        <div>
          INTERFACE<small>React · Flutter</small>
        </div>
      </div>
      <div className="scene-label label-api">
        <span>02</span>
        <div>
          SERVICES<small>Node.js · APIs</small>
        </div>
      </div>
      <div className="scene-label label-data">
        <span>03</span>
        <div>
          DATA<small>Firebase · SQL</small>
        </div>
      </div>
      <figcaption>
        <span className="scene-caption-dot" />
        {t(
          c(
            'Interfaz, servicios y datos conectados.',
            'Connected interface, services and data.',
          ),
        )}
        <span className="scene-motion-label">
          {paused
            ? t(c('EN PAUSA', 'PAUSED'))
            : t(c('EXPLORA CON EL CURSOR', 'EXPLORE WITH YOUR CURSOR'))}
        </span>
      </figcaption>
    </figure>
  );
}
