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
        <span className="eyebrow">
          {t(
            c(
              'CONTACTO / DISPONIBILIDAD',
              'CONTACT / AVAILABILITY',
            ),
          )}
        </span>
        <h2>
          {t(
            c('Construyamos software resiliente y escalable.', 'Let’s build resilient and scalable software.'),
          )}
        </h2>
        <p>
          {t(
            c(
              'Disponible para roles y proyectos en ingeniería full stack, móvil y arquitecturas de datos en producción.',
              'Open to full-stack, mobile, and production data architecture roles and projects.',
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
