import Link from 'next/link';
import { SiteShell } from '@/components/portfolio/shell';
export default function NotFound() {
  return (
    <SiteShell>
      <main id="contenido" className="shell section">
        <span className="eyebrow">404 / LUIS ROSAS</span>
        <h1 className="not-found-title">Este proyecto no está aquí.</h1>
        <p>Consulta los casos de estudio disponibles en el portafolio.</p>
        <Link href="/#proyectos" className="button primary">
          Volver a proyectos
        </Link>
      </main>
    </SiteShell>
  );
}
