'use client';
import type { CSSProperties } from 'react';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
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
        <span className="eyebrow">
          {t(
            c(
              'PRODUCTO → SISTEMA → ARQUITECTURA → PRODUCTO',
              'PRODUCT → SYSTEM → ARCHITECTURE → PRODUCT',
            ),
          )}
        </span>
        <p>
          {t(
            c(
              'Arquitectura integral: la resiliencia del producto proviene de la cohesión entre interfaces reactivas, servicios desacoplados y persistencia transaccional.',
              'Integral architecture: product resilience stems from cohesion between reactive interfaces, decoupled services, and transactional persistence.',
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
            <span className="reassembly-title">{t(uiCopy(title))}</span>
            <small>{t(uiCopy(detail))}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
