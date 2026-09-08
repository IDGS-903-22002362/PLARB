'use client';
import type { CSSProperties } from 'react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
const layers = [
  ['PRODUCT', 'INTERFACE'],
  ['SYSTEM', 'SERVICES'],
  ['ARCHITECTURE', 'DATA'],
];
export default function SystemReassembly() {
  const { t } = usePreferences();
  return (
    <section
      className="system-reassembly shell"
      aria-label={t(c('Cierre del sistema', 'System closing'))}
    >
      <div className="reassembly-copy">
        <span className="eyebrow">PRODUCT → SYSTEM → ARCHITECTURE → PRODUCT</span>
        <p>
          {t(
            c(
              'El mismo sistema vuelve a unirse: interfaz, servicios y datos. El producto es la recomposición, no la capa de arriba.',
              'The same system comes back together: interface, services and data. The product is the recomposition, not the top layer.',
            ),
          )}
        </p>
      </div>
      <div className="reassembly-stack" aria-hidden="true">
        {layers.map(([title, detail], index) => (
          <div
            className="reassembly-layer"
            key={title}
            style={{ '--layer': index } as CSSProperties}
          >
            <span className="reassembly-index">0{index + 1}</span>
            <span className="reassembly-title">{title}</span>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
