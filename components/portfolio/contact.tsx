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
        <h2>{t(c('Hablemos de software.', 'Let’s talk software.'))}</h2>
        <p>
          {t(
            c(
              'Interfaces, servicios y aplicaciones que necesitan trabajar juntos.',
              'Interfaces, services and applications that need to work together.',
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
