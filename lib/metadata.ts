import type { Metadata } from 'next';
import { profile } from './portfolio-data';
import type { Study } from './projects';
// Intentionally local. Configure a real origin only when deployment is requested.
export const siteOrigin = 'http://localhost:4317';
export function projectMetadata(project: Study): Metadata {
  const title = `${project.title} — Caso de estudio | Luis Rosas`;
  const url = `${siteOrigin}/projects/${project.slug}`;
  return {
    title,
    description: project.summary.es,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title,
      description: project.summary.es,
      url,
      locale: 'es_MX',
      images: [
        {
          url: `${siteOrigin}/social-preview.png`,
          width: 1733,
          height: 907,
          alt: 'Luis Alberto Rosas — Software Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: project.summary.es,
      images: [`${siteOrigin}/social-preview.png`],
    },
  };
}
export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${siteOrigin}/#person`,
  name: profile.name,
  jobTitle: 'Software Engineer',
  url: siteOrigin,
  email: profile.email,
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Universidad Tecnológica de León',
  },
  knowsLanguage: ['es', 'en', 'fr'],
};
export function studySchema(project: Study) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary.es,
    url: `${siteOrigin}/projects/${project.slug}`,
    inLanguage: ['es', 'en'],
    creator: { '@id': `${siteOrigin}/#person` },
    about: project.stack,
  };
}
