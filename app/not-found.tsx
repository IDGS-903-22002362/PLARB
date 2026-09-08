'use client';
import Link from 'next/link';
import { SiteShell } from '@/components/portfolio/shell';
import { usePreferences } from '@/components/portfolio/preferences';
import { c } from '@/lib/projects';
function MissingProject() {
  const { t } = usePreferences();
  return (
    <main id="contenido" className="shell section">
      <span className="eyebrow">404 / LUIS ROSAS</span>
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
      </Link>
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
