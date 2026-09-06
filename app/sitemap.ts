import type { MetadataRoute } from 'next';
import { studies } from '@/lib/projects';
import { siteOrigin } from '@/lib/metadata';
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteOrigin },
    ...studies.map((project) => ({
      url: `${siteOrigin}/projects/${project.slug}`,
    })),
  ];
}
