'use client';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { SiteShell } from '@/components/portfolio/shell';
import { usePreferences } from '@/components/portfolio/preferences';
import { c } from '@/lib/projects';
function MissingProject() {
  const { t } = usePreferences();
  return (
    <main id="contenido" className="shell section not-found-page">
      <span className="not-found-code">404</span>
      <div className="not-found-content">
      <span className="eyebrow">LUIS ROSAS</span>
      <h1 className="not-found-title">
        {t(c('Este proyecto no está aquí.', 'This project is not here.'))}
      </h1>
      <p>
        {t(
          c(
            'Consulta los casos de estudio disponibles en el portafolio.',
            'Explore the case studies available in the portfolio.',
          ),
        )}
      </p>
      <Link href="/#proyectos" className="button primary">
        {t(c('Volver a proyectos', 'Back to work'))}
        <ArrowUpRight size={18} aria-hidden="true" />
      </Link>
      </div>
    </main>
  );
}
export default function NotFound() {
  return (
    <SiteShell>
      <MissingProject />
    </SiteShell>
  );
}
