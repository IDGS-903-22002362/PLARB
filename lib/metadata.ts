import type { Metadata } from 'next';
import { profile } from './portfolio-data';
import type { Study } from './projects';
// Intentionally local. Configure a real origin only when deployment is requested.
export const siteOrigin = 'http://localhost:4317';
export function projectOgImage(project: Study) {
  return `/social/${project.slug}.png`;
}
export function projectMetadata(project: Study): Metadata {
  const titleEs = `${project.title} — Caso de estudio | Luis Rosas`;
  const titleEn = `${project.title} — Case study | Luis Rosas`;
  const url = `${siteOrigin}/projects/${project.slug}`;
  const image = {
    url: `${siteOrigin}${projectOgImage(project)}`,
    width: 1536,
    height: 1024,
    alt: `${project.title} — Luis Alberto Rosas`,
  };
  return {
    title: titleEs,
    description: `${project.summary.es} ${project.summary.en}`,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: titleEs,
      description: project.summary.es,
      url,
      locale: 'es_MX',
      alternateLocale: ['en_US'],
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: titleEn,
      description: project.summary.en,
      images: [image.url],
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
