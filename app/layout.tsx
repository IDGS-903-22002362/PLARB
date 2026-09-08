import type { Metadata } from 'next';
import '@fontsource-variable/dm-sans';
import '@fontsource-variable/space-grotesk';
import './globals.css';
import './portfolio.css';
import './responsive.css';
import './project-media.css';
import { profile } from '@/lib/portfolio-data';
import { personSchema, siteOrigin } from '@/lib/metadata';

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: `${profile.name} — Software Engineer`,
  description:
    'Luis Alberto Rosas Bocanegra. Software Engineer. App oficial de Club León, La Guarida —incluido el uso de IA acotada por el backend— y el POS de concesiones. React, Flutter, Node.js y Firebase.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  alternates: { canonical: siteOrigin },
  openGraph: {
    type: 'website',
    title: 'Luis Alberto Rosas — Software Engineer',
    description:
      'App Club León, La Guarida y POS de concesiones. Desarrollo web, móvil y backend.',
    url: siteOrigin,
    siteName: 'Luis Rosas · Software Engineer',
    locale: 'es_MX',
    images: [
      {
        url: '/social-preview.png',
        width: 1733,
        height: 907,
        alt: 'Luis Alberto Rosas — Software Engineer. Web, Mobile, Cloud.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luis Alberto Rosas — Software Engineer',
    description:
      'Desarrollo web, móvil y backend para productos en producción de Club León.',
    images: ['/social-preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var p=localStorage.getItem('portfolio-theme');document.documentElement.dataset.theme=p==='dark'||p==='light'?p:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){}`,
          }}
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personSchema,
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Luis Rosas — Software Engineer',
                url: siteOrigin,
                inLanguage: ['es', 'en'],
                author: { '@id': `${siteOrigin}/#person` },
              },
            ]).replace(/</g, '\\u003c'),
          }}
        />
        {children}
      </body>
    </html>
  );
}
