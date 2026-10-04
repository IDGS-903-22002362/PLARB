'use client';
import { useState, useId } from 'react';
import { Box } from 'lucide-react';
import { c, type Study } from '@/lib/projects';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
import {
  TechArrowUpRight,
  WebGlyph,
  MobileGlyph,
  ServerApiGlyph,
  PaymentGlyph,
  StockLedgerGlyph,
  WebhookGlyph,
  OrdersGlyph,
} from './custom-icons';
import { ThinkingOrbWrapper } from './thinking-orb-wrapper';

function NodeIcon({ id, active }: { id: string; active: boolean }) {
  if (id === 'ai') {
    return (
      <ThinkingOrbWrapper
        size={20}
        state={active ? 'composing' : 'searching'}
        color="#39d0c8"
        className="node-orb"
      />
    );
  }
  if (id === 'web') return <WebGlyph size={17} aria-hidden="true" />;
  if (id === 'app' || id === 'native') return <MobileGlyph size={17} aria-hidden="true" />;
  if (id === 'api' || id === 'firebase') return <ServerApiGlyph size={17} aria-hidden="true" />;
  if (id === 'pay') return <PaymentGlyph size={17} aria-hidden="true" />;
  if (id === 'stock' || id === 'state') return <StockLedgerGlyph size={17} aria-hidden="true" />;
  if (id === 'events') return <WebhookGlyph size={17} aria-hidden="true" />;
  if (id === 'orders') return <OrdersGlyph size={17} aria-hidden="true" />;
  return <Box size={17} aria-hidden="true" />;
}

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
          <TechArrowUpRight size={14} aria-hidden="true" />
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
            className={`graph-node ${node.id === active ? 'active' : ''} ${related.has(node.id) ? 'connected' : ''} ${node.id === 'ai' ? 'graph-node-ai' : ''}`}
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            aria-pressed={node.id === active}
            aria-controls={`${uid}-detail`}
            aria-label={`${t(uiCopy(node.title))} ${t(node.label)}`}
            onMouseEnter={() => setActive(node.id)}
            onFocus={() => setActive(node.id)}
            onClick={() => setActive(node.id)}
          >
            <NodeIcon id={node.id} active={node.id === active} />
            <strong>{t(uiCopy(node.title))}</strong>
            <span>{t(node.label)}</span>
          </button>
        ))}
      </div>
      <div className="graph-detail" id={`${uid}-detail`} aria-live="polite">
        <span className="node-indicator-wrap" aria-hidden="true">
          {selected.id === 'ai' ? (
            <ThinkingOrbWrapper size={20} state="composing" color="#39d0c8" />
          ) : (
            <span className="node-indicator" />
          )}
        </span>
        <div>
          <strong>{t(uiCopy(selected.title))}</strong>
          <p>{t(selected.detail)}</p>
        </div>
      </div>
    </div>
  );
}
