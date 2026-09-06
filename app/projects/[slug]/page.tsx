import { notFound } from 'next/navigation';
import { studies } from '@/lib/projects';
import { projectMetadata, studySchema } from '@/lib/metadata';
import CaseStudy from '@/components/portfolio/case-study';
import { SiteShell } from '@/components/portfolio/shell';
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return studies.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = studies.find((item) => item.slug === slug);
  return project
    ? projectMetadata(project)
    : { title: 'Caso no encontrado | Luis Rosas' };
}
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const index = studies.findIndex((project) => project.slug === slug);
  if (index < 0) notFound();
  const project = studies[index];
  const next = studies[(index + 1) % studies.length];
  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(studySchema(project)).replace(/</g, '\\u003c'),
        }}
      />
      <CaseStudy project={project} next={next} />
    </SiteShell>
  );
}
