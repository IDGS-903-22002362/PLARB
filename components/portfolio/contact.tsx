'use client';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/lib/portfolio-data';
import { c } from '@/lib/projects';
import { usePreferences } from './preferences';
import { CVLink } from './shell';
export function Contact() {
  const { t } = usePreferences();
  return (
    <section className="contact-section shell" id="contacto">
      <div>
        <span className="eyebrow">CONTACT / NEXT CONVERSATION</span>
        <h2>{t(c('Si el sistema tiene que cerrar.', 'If the system has to close.'))}</h2>
        <p>
          {t(
            c(
              'Interfaces, servicios y datos que tienen que coincidir. Si eso es el problema, escribeme.',
              'Interfaces, services and data that have to agree. If that is the problem, write to me.',
            ),
          )}
        </p>
      </div>
      <div className="contact-links">
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={25} />
        </a>
        <div>
          <a href={profile.phoneHref}>{profile.phone}</a>
          <CVLink className="text-link" />
        </div>
      </div>
    </section>
  );
}
