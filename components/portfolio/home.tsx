'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Smartphone,
} from 'lucide-react';
import { c, studies, technologyGroups, type Copy } from '@/lib/projects';
import { profile } from '@/lib/portfolio-data';
import { usePreferences } from './preferences';
import { CVLink, ExternalLink } from './shell';
import ProjectVisual from './project-visual';
import Architecture from './architecture';
import SystemScene from './system-scene';
import { Contact } from './contact';
export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: Copy;
  description?: Copy;
}) {
  const { t } = usePreferences();
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">
          <span className="section-number">{index}</span>
          {label}
        </span>
        <h2>{t(title)}</h2>
      </div>
      {description && <p>{t(description)}</p>}
    </div>
  );
}
const capabilities = [
  {
    icon: Code2,
    title: 'Frontend',
    text: c(
      'Catálogo, checkout y paneles de operación con React y Next.js. Angular en el proyecto de comercio e IoT.',
      'Catalog, checkout and operational panels with React and Next.js. Angular in the commerce and IoT project.',
    ),
    ref: 'La Guarida / POS',
    href: '/projects/la-guarida',
  },
  {
    icon: Braces,
    title: 'Backend',
    text: c(
      'APIs Express, cálculo de precios, reservas de inventario y validación de eventos de pago.',
      'Express APIs, price calculation, inventory reservations and payment event validation.',
    ),
    ref: 'La Guarida',
    href: '/projects/la-guarida',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    text: c(
      'App Flutter con calendarios y notificaciones. Widgets de Fiera Racha en Swift y Kotlin.',
      'Flutter app with calendars and notifications. Fiera Racha widgets in Swift and Kotlin.',
    ),
    ref: 'Club León FC',
    href: '/projects/club-leon-app',
  },
  {
    icon: Database,
    title: c('Datos', 'Data'),
    text: c(
      'Reservas transaccionales en Firebase; SQL Server con Entity Framework y MySQL con SQLAlchemy.',
      'Transactional reservations in Firebase; SQL Server with Entity Framework and MySQL with SQLAlchemy.',
    ),
    ref: 'Commerce & IoT / POS',
    href: '/projects/commerce-iot',
  },
  {
    icon: Cloud,
    title: 'Cloud',
    text: c(
      'Cloud Functions, autenticación Firebase y servicios que conectan tienda, app y operación.',
      'Cloud Functions, Firebase authentication and services connecting store, app and operations.',
    ),
    ref: 'Club León',
    href: '/projects/club-leon-app',
  },
  {
    icon: GitBranch,
    title: c('Entrega', 'Delivery'),
    text: c(
      'Git/GitHub para versionado, GitHub Actions para automatización y Postman para comprobar contratos de APIs.',
      'Git/GitHub for versioning, GitHub Actions for automation and Postman to check API contracts.',
    ),
    ref: c('Herramientas de trabajo', 'Working tools'),
    href: '#stack',
  },
];
function EngineeringApproach() {
  const { t } = usePreferences();
  const [selected, setSelected] = useState(0);
  const decision = studies[1].decisions[selected];
  return (
    <section className="section engineering-section" id="ingenieria">
      <div className="shell">
        <SectionHeading
          index="04"
          label="ENGINEERING APPROACH"
          title={c(
            'Las decisiones detrás del producto.',
            'The decisions behind the product.',
          )}
          description={c(
            'Un checkout se entiende mejor cuando también se explican sus excepciones.',
            'A checkout is better understood when its exceptions are explained too.',
          )}
        />
        <div
          className="decision-tabs"
          role="tablist"
          aria-label={t(c('Decisiones de La Guarida', 'La Guarida decisions'))}
        >
          {[
            c('Inventario concurrente', 'Concurrent inventory'),
            c('Confirmación de pagos', 'Payment confirmation'),
            c('Reglas de precio', 'Pricing rules'),
          ].map((label, index) => (
            <button
              key={label.en}
              role="tab"
              id={`decision-tab-${index}`}
              aria-controls="decision-panel"
              aria-selected={selected === index}
              tabIndex={selected === index ? 0 : -1}
              onClick={() => setSelected(index)}
              onKeyDown={(event) => {
                let next = selected;
                if (event.key === 'ArrowRight') next = (selected + 1) % 3;
                else if (event.key === 'ArrowLeft') next = (selected + 2) % 3;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = 2;
                else return;
                event.preventDefault();
                setSelected(next);
                document.getElementById(`decision-tab-${next}`)?.focus();
              }}
            >
              <span>0{index + 1}</span>
              {t(label)}
            </button>
          ))}
        </div>
        <div className="engineering-grid">
          <Architecture project={studies[1]} />
          <div
            className="decision-panel"
            id="decision-panel"
            role="tabpanel"
            aria-labelledby={`decision-tab-${selected}`}
            tabIndex={0}
          >
            <span className="eyebrow">
              LA GUARIDA / DECISION 0{selected + 1}
            </span>
            <h3>{t(decision.title)}</h3>
            <dl>
              <div>
                <dt>{t(c('Problema', 'Problem'))}</dt>
                <dd>{t(decision.problem)}</dd>
              </div>
              <div>
                <dt>{t(c('Decisión', 'Decision'))}</dt>
                <dd>{t(decision.decision)}</dd>
              </div>
              <div>
                <dt>{t(c('Compromiso', 'Trade-off'))}</dt>
                <dd>{t(decision.tradeoff)}</dd>
              </div>
            </dl>
            <Link className="text-link" href="/projects/la-guarida#decisiones">
              {t(c('Ver razonamiento completo', 'Read the full reasoning'))}
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default function Home() {
  const { t } = usePreferences();
  return (
    <main id="contenido">
      <section className="hero shell">
        <div className="hero-topline">
          <span className="eyebrow">
            <span className="live-dot" />
            LUIS ALBERTO ROSAS BOCANEGRA
          </span>
          <span className="eyebrow hero-location">LEÓN, MÉXICO / 2026</span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-role">SOFTWARE ENGINEER</p>
            <h1>
              {t(c('Software que', 'Software that'))}
              <br />
              <span>{t(c('conecta', 'connects'))}</span>
              <br />
              {t(c('la operación.', 'operations.'))}
            </h1>
            <p className="hero-description">
              {t(
                c(
                  'Desarrollo la app oficial de Club León, La Guarida y el punto de venta de concesiones. De la interfaz a los servicios que sostienen cada producto.',
                  'I develop Club León’s official app, La Guarida and the concessions POS. From the interface to the services behind each product.',
                ),
              )}
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="#proyectos">
                {t(c('Ver proyectos', 'View work'))}
                <ArrowDown size={18} />
              </Link>
              <CVLink />
            </div>
          </div>
          <SystemScene />
        </div>
        <div className="hero-bottom">
          <div className="domain-strip">
            {[
              ['WEB', Code2],
              ['MOBILE', Smartphone],
              ['BACKEND', Braces],
              ['CLOUD', Cloud],
            ].map(([label, Icon]) => {
              const Symbol = Icon as typeof Code2;
              return (
                <span key={String(label)}>
                  <Symbol size={16} />
                  {String(label)}
                </span>
              );
            })}
          </div>
          <Link className="hero-scroll" href="#proyectos">
            <span>SCROLL TO EXPLORE</span>
            <ArrowDown size={16} />
          </Link>
        </div>
      </section>
      <section className="proof-band">
        <div className="shell proof-inner">
          <div className="proof-company">
            <Image
              unoptimized
              src="/projects/leon-crest.png"
              alt="Club León"
              width="40"
              height="48"
            />
            <div>
              <span className="eyebrow">CLUB LEÓN</span>
              <strong>
                {t(c('Software en producción', 'Software in production'))}
              </strong>
            </div>
          </div>
          <p>
            <span>01</span>
            {t(c('App oficial', 'Official app'))}
          </p>
          <p>
            <span>02</span>La Guarida
          </p>
          <p>
            <span>03</span>
            {t(c('Concesiones', 'Concessions'))}
          </p>
          <span className="proof-end">WEB · iOS · ANDROID</span>
        </div>
      </section>
      <section className="section work-section shell" id="proyectos">
        <SectionHeading
          index="01"
          label="SELECTED WORK"
          title={c(
            'Aplicaciones, comercio y operación.',
            'Applications, commerce and operations.',
          )}
          description={c(
            'Tres sistemas de Club León y un proyecto previo de integración. Cada caso muestra mi participación y sus decisiones técnicas.',
            'Three Club León systems and a previous integration project. Each case explains my contribution and its technical decisions.',
          )}
        />
        <div className="selected-projects">
          {studies.map((project) => (
            <article
              key={project.slug}
              className={`work-project work-${project.kind}`}
            >
              <div className="project-copy">
                <div className="project-meta">
                  <span className="project-index">/{project.number}</span>
                  <span className="eyebrow">{project.category}</span>
                </div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{t(project.subtitle)}</p>
                <p>{t(project.summary)}</p>
                <div className="project-role">
                  <span>{t(c('MI PARTICIPACIÓN', 'MY CONTRIBUTION'))}</span>
                  {t(project.role)}
                </div>
                <div className="tags">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <Link
                  className="case-link"
                  href={`/projects/${project.slug}`}
                  aria-label={`${t(c('Ver caso', 'View case'))}: ${project.title}`}
                >
                  {t(c('Explorar caso de estudio', 'Explore case study'))}
                  <ArrowUpRight size={22} />
                </Link>
                <div className="project-published">
                  <span
                    className={`status ${project.kind === 'iot' ? 'historical' : ''}`}
                  >
                    <i />
                    {t(project.status)}
                  </span>
                  <div className="live-links">
                    {project.links.map((link) => (
                      <ExternalLink key={link.href} href={link.href}>
                        {link.label}
                      </ExternalLink>
                    ))}
                  </div>
                </div>
              </div>
              <ProjectVisual kind={project.kind} />
            </article>
          ))}
        </div>
      </section>
      <section className="section capabilities-section shell" id="capacidades">
        <SectionHeading
          index="02"
          label="ENGINEERING CAPABILITIES"
          title={c(
            'Una mirada al sistema completo.',
            'A view of the whole system.',
          )}
        />
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, title, text, ref, href }, i) => (
            <article key={i}>
              <div className="capability-top">
                <Icon size={23} strokeWidth={1.5} />
                <span>0{i + 1}</span>
              </div>
              <h3>{typeof title === 'string' ? title : t(title)}</h3>
              <p>{t(text)}</p>
              <Link href={href}>
                {typeof ref === 'string' ? ref : t(ref)}
                <ArrowUpRight size={15} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="section experience-section shell" id="experiencia">
        <SectionHeading
          index="03"
          label="EXPERIENCE"
          title={c(
            'Experiencia que construye criterio.',
            'Experience that shapes judgment.',
          )}
        />
        <div className="timeline">
          <article>
            <span className="timeline-date">
              {t(c('ACTUALIDAD', 'CURRENT'))}
            </span>
            <div>
              <div className="timeline-title">
                <h3>Club León</h3>
                <span>Full stack / Mobile</span>
              </div>
              <p>
                {t(
                  c(
                    'Desarrollo de productos digitales para la afición y la operación del club. Trabajo sobre interfaces, APIs, pagos, inventario e integraciones móviles.',
                    'Digital product development for supporters and club operations. My work covers interfaces, APIs, payments, inventory and mobile integrations.',
                  ),
                )}
              </p>
              <div className="timeline-links">
                {studies.slice(0, 3).map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.slug}>
                    {project.title}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            </div>
          </article>
          <article>
            <span className="timeline-date">2025</span>
            <div>
              <div className="timeline-title">
                <h3>Commerce & IoT</h3>
                <span>{t(c('Proyecto previo', 'Previous project'))}</span>
              </div>
              <p>
                {t(
                  c(
                    'Comercio con .NET y Angular, más una aplicación Kotlin para riego, telemetría y alertas.',
                    'Commerce with .NET and Angular, plus a Kotlin app for irrigation, telemetry and alerts.',
                  ),
                )}
              </p>
              <Link className="text-link" href="/projects/commerce-iot">
                {t(c('Ver integración', 'View integration'))}
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
          <article>
            <span className="timeline-date">2024</span>
            <div>
              <div className="timeline-title">
                <h3>{t(c('Punto de venta web', 'Web point of sale'))}</h3>
                <span>Full stack</span>
              </div>
              <p>
                {t(
                  c(
                    'Flask, MySQL y SQLAlchemy para ventas, inventario y cortes. Acceso por roles, transacciones ORM y reportes diarios, semanales y mensuales exportables a CSV/PDF.',
                    'Flask, MySQL and SQLAlchemy for sales, inventory and cash reconciliation. Role-based access, ORM transactions and daily, weekly and monthly reports exportable to CSV/PDF.',
                  ),
                )}
              </p>
              <span className="timeline-note">
                {t(
                  c(
                    'Proyecto anterior documentado en el CV',
                    'Previous project documented in the CV',
                  ),
                )}
              </span>
            </div>
          </article>
        </div>
      </section>
      <EngineeringApproach />
      <section className="section stack-section shell" id="stack">
        <SectionHeading
          index="05"
          label="TECHNOLOGIES"
          title={c('Herramientas con contexto.', 'Tools with context.')}
        />
        <div className="stack-groups">
          {technologyGroups.map((group) => (
            <div key={group.title.en}>
              <h3>{t(group.title)}</h3>
              <div>
                {group.items.map((item) => (
                  <span key={item}>
                    {item === 'CI/CD básico' ? t(c(item, 'Basic CI/CD')) : item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="public-work shell">
        <div>
          <span className="eyebrow">PUBLIC WORK</span>
          <h2>
            {t(
              c(
                'Explora los productos publicados.',
                'Explore the published products.',
              ),
            )}
          </h2>
          <p>
            {t(
              c(
                'Los casos presentan arquitectura y decisiones técnicas. Los enlaces abren los productos disponibles al público.',
                'The case studies present architecture and technical decisions. These links open the publicly available products.',
              ),
            )}
          </p>
        </div>
        <div>
          {studies
            .slice(0, 2)
            .flatMap((project) => project.links)
            .map((link) => (
              <ExternalLink key={link.href} href={link.href}>
                {link.label}
              </ExternalLink>
            ))}
          {profile.github && (
            <ExternalLink href={profile.github}>GitHub</ExternalLink>
          )}
        </div>
      </section>
      <section className="section about-section shell" id="sobre-mi">
        <div>
          <span className="eyebrow">
            <span className="section-number">06</span>ABOUT
          </span>
          <h2>
            Luis Alberto
            <br />
            Rosas Bocanegra<span className="blue-period">.</span>
          </h2>
          <p>
            {t(
              c(
                'Ingeniero en Desarrollo y Gestión de Software por la Universidad Tecnológica de León. Mi trabajo reúne desarrollo web, backend y móvil en productos de Club León.',
                'Software Development and Management Engineer from Universidad Tecnológica de León. My work brings web, backend and mobile development together in Club León products.',
              ),
            )}
          </p>
          <CVLink className="text-link" />
        </div>
        <div className="about-facts">
          <div>
            <h3>{t(c('Formación', 'Education'))}</h3>
            <p>
              <span>2024 — 2025</span>
              {t(
                c(
                  'Ingeniería en Desarrollo y Gestión de Software',
                  'Engineering in Software Development & Management',
                ),
              )}
            </p>
            <p>
              <span>2022 — 2024</span>
              {t(
                c(
                  'TSU en Desarrollo de Software Multiplataforma',
                  'Associate degree in Multiplatform Software Development',
                ),
              )}
            </p>
            <small>Universidad Tecnológica de León</small>
          </div>
          <div className="about-secondary">
            <div>
              <h3>{t(c('Idiomas', 'Languages'))}</h3>
              <p>
                {t(c('Inglés B2', 'English B2'))}
                <small>TOEFL</small>
              </p>
              <p>
                {t(c('Francés B2', 'French B2'))}
                <small>DELF</small>
              </p>
            </div>
            <div>
              <h3>
                {t(c('Cursos y certificaciones', 'Courses & certifications'))}
              </h3>
              <p>
                Scrum Developer Certified<small>TestingProgram · 2023</small>
              </p>
              <p>
                Redes CCNA<small>Cisco NetAcad · 2022</small>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
    </main>
  );
}
