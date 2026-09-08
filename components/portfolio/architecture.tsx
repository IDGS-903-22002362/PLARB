'use client';
import { useState, useId } from 'react';
import { Box, ArrowUpRight } from 'lucide-react';
import { c, type Study } from '@/lib/projects';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
export default function Architecture({ project }: { project: Study }) {
  const { t } = usePreferences();
  const [active, setActive] = useState(project.nodes[0].id);
  const uid = useId();
  const selected = project.nodes.find((node) => node.id === active)!;
  const related = new Set([
    active,
    ...project.edges.filter((edge) => edge.includes(active)).flat(),
  ]);
  return (
    <div className="architecture">
      <div className="diagram-top">
        <span className="eyebrow">
          {t(c('MAPA DEL SISTEMA', 'SYSTEM MAP'))} / {project.number}
        </span>
        <span>
          {t(c('Explora los componentes', 'Explore the components'))}
          <ArrowUpRight size={15} />
        </span>
      </div>
      <div
        className={`graph-surface ${project.nodes.length > 6 ? 'graph-dense' : ''}`}
      >
        <svg
          className="graph-edges"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {project.edges.map(([from, to]) => {
            const a = project.nodes.find((n) => n.id === from)!;
            const b = project.nodes.find((n) => n.id === to)!;
            return (
              <path
                key={`${from}-${to}`}
                className={from === active || to === active ? 'active' : ''}
                d={`M ${a.x} ${a.y} V ${(a.y + b.y) / 2} H ${b.x} V ${b.y}`}
              />
            );
          })}
        </svg>
        {project.nodes.map((node) => (
          <button
            key={node.id}
            className={`graph-node ${node.id === active ? 'active' : ''} ${related.has(node.id) ? 'connected' : ''}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            aria-pressed={node.id === active}
            aria-controls={`${uid}-detail`}
            aria-label={`${t(uiCopy(node.title))} ${t(node.label)}`}
            onMouseEnter={() => setActive(node.id)}
            onFocus={() => setActive(node.id)}
            onClick={() => setActive(node.id)}
          >
            <Box size={18} aria-hidden="true" />
            <strong>{t(uiCopy(node.title))}</strong>
            <span>{t(node.label)}</span>
          </button>
        ))}
      </div>
      <div className="graph-detail" id={`${uid}-detail`} aria-live="polite">
        <span className="node-indicator" />
        <div>
          <strong>{t(uiCopy(selected.title))}</strong>
          <p>{t(selected.detail)}</p>
        </div>
      </div>
    </div>
  );
}
