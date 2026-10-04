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
import {
  TechArrowDown,
  TechArrowUpRight,
  WebGlyph,
  MobileGlyph,
  BackendGlyph,
  CloudGlyph,
  ScrollCueGlyph,
} from './custom-icons';
import { ThinkingOrbWrapper } from './thinking-orb-wrapper';
import type { OrbState } from 'thinking-orbs';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
import { CVLink, ExternalLink } from './shell';
import ProjectVisual from './project-visual';
import Architecture from './architecture';
import HeroFace from './hero-face';
import { Contact } from './contact';
import SystemReassembly from './system-reassembly';
import TransitionLink from './transition-link';
import TextScatter from '@/components/text-scatter';
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
          {t(uiCopy(label))}
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
      'Interfaces SPA/SSR con React y Next.js para checkout, catálogos reactivos y paneles operativos. Consumo modular de servicios REST.',
      'SPA/SSR interfaces with React and Next.js for checkout, reactive catalogs, and operational panels. Modular REST service consumption.',
    ),
    ref: 'La Guarida / POS',
    href: '/projects/la-guarida',
  },
  {
    icon: Braces,
    title: 'Backend',
    text: c(
      'APIs REST en Node.js y Express: cálculo de precios server-side, reservas transaccionales de inventario, webhooks criptográficos y guardrails para LLMs.',
      'REST APIs in Node.js and Express: server-side pricing, transactional inventory reservations, cryptographic webhooks, and LLM guardrails.',
    ),
    ref: 'La Guarida',
    href: '/projects/la-guarida',
  },
  {
    icon: Smartphone,
    title: 'Mobile',
    text: c(
      'Aplicaciones multiplataforma en Flutter/Dart con sincronización de estado. Extensiones nativas de widgets en Swift (WidgetKit) y Kotlin (RemoteViews).',
      'Cross-platform Flutter/Dart apps with state synchronization. Native widget extensions built in Swift (WidgetKit) and Kotlin (RemoteViews).',
    ),
    ref: 'Club León FC',
    href: '/projects/club-leon-app',
  },
  {
    icon: Database,
    title: c('Datos', 'Data'),
    text: c(
      'Modelado transaccional y relacional: Firestore para concurrencia en tiempo real, SQL Server con Entity Framework y MySQL con SQLAlchemy.',
      'Transactional and relational data modeling: Firestore for real-time concurrency, SQL Server with Entity Framework, and MySQL with SQLAlchemy.',
    ),
    ref: 'Commerce & IoT / POS',
    href: '/projects/commerce-iot',
  },
  {
    icon: Cloud,
    title: 'Cloud',
    text: c(
      'Servicios serverless con Firebase Cloud Functions, autenticación OAuth/JWT y mensajería FCM para sincronización de eventos entre plataformas.',
      'Serverless services with Firebase Cloud Functions, OAuth/JWT auth, and FCM messaging for cross-platform event synchronization.',
    ),
    ref: 'Club León',
    href: '/projects/club-leon-app',
  },
  {
    icon: GitBranch,
    title: c('Entrega', 'Delivery'),
    text: c(
      'Integración continua con GitHub Actions, versionado Git estricto y pruebas automatizadas de contratos de API en Postman y Vitest.',
      'CI workflows with GitHub Actions, strict Git versioning, and automated API contract testing via Postman and Vitest.',
    ),
    ref: c('Herramientas de trabajo', 'Working tools'),
    href: '#stack',
  },
];
const engineeringTabs = [
  c('Inventario concurrente', 'Concurrent inventory'),
  c('IA aplicada', 'Applied AI'),
  c('Confirmación de pagos', 'Payment confirmation'),
  c('Reglas de precio', 'Pricing rules'),
];
const tabOrbStates: OrbState[] = [
  'solving',
  'searching',
  'connecting',
  'shaping',
];
function EngineeringApproach() {
  const { t } = usePreferences();
  const [selected, setSelected] = useState(0);
  const decisions = studies[1].decisions;
  const decision = decisions[selected];
  const last = decisions.length - 1;
  return (
    <section className="section engineering-section" id="ingenieria">
      <div className="shell">
        <SectionHeading
          index="04"
          label="ENGINEERING APPROACH"
          title={c(
            'Decisiones de arquitectura y manejo de fallos.',
            'Architectural decisions and failure handling.',
          )}
          description={c(
            'Resolución de concurrencia, idempotencia en pagos y acotamiento determinista de modelos de lenguaje.',
            'Concurrency resolution, payment idempotency, and deterministic guardrails for language models.',
          )}
        />
        <div
          className="decision-tabs"
          role="tablist"
          aria-label={t(c('Decisiones de La Guarida', 'La Guarida decisions'))}
        >
          {engineeringTabs.map((label, index) => (
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
                if (event.key === 'ArrowRight')
                  next = (selected + 1) % decisions.length;
                else if (event.key === 'ArrowLeft')
                  next = (selected + last) % decisions.length;
                else if (event.key === 'Home') next = 0;
                else if (event.key === 'End') next = last;
                else return;
                event.preventDefault();
                setSelected(next);
                document.getElementById(`decision-tab-${next}`)?.focus();
              }}
            >
              <span>0{index + 1}</span>
              <ThinkingOrbWrapper
                size={20}
                state={tabOrbStates[index]}
                color={
                  selected === index
                    ? index === 1
                      ? '#39d0c8'
                      : '#72a7ff'
                    : 'rgba(130, 150, 172, 0.45)'
                }
                className="tab-orb"
              />
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
              LA GUARIDA / {t(c('DECISIÓN', 'DECISION'))} 0{selected + 1}
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
          <span className="eyebrow hero-location">
            <ThinkingOrbWrapper
              size={20}
              state="breathing"
              color="#39d0c8"
              className="hero-orb-live"
            />
            LEÓN, MÉXICO / 2026
          </span>
        </div>
        <div className="hero-grid">
          <div className="hero-copy">
            <h1 className="hero-heading">
              <span className="hero-kicker">
                <TextScatter
                  text={t(c('HOLA, MI NOMBRE ES BETO', 'HELLO, MY NAME IS BETO'))}
                  as="span"
                  className="hero-scatter-kicker"
                  velocity={90}
                />
              </span>
              <span className="hero-headline">
                <TextScatter
                  text={t(c('Yo hago software', 'I make software'))}
                  as="span"
                  className="hero-scatter-headline"
                  velocity={220}
                />
              </span>
            </h1>
            <p className="hero-description">
              <TextScatter
                text={t(
                  c(
                    'Soy ingeniero de software full stack, actualmente uno de los desarrolladores principales de Fuerza Deportiva del Club León.',
                    'I am a full stack software engineer, currently one of the core developers at Fuerza Deportiva del Club León.',
                  ),
                )}
                as="span"
                className="hero-scatter-description"
                velocity={110}
              />
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="#proyectos">
                <span>{t(c('Ver proyectos', 'View work'))}</span>
                <TechArrowDown size={17} aria-hidden="true" />
              </Link>
              <CVLink />
            </div>
          </div>
          <HeroFace />
        </div>
        <div className="hero-bottom">
          <div
            className="domain-strip"
            role="list"
            aria-label={t(c('Especialidades de ingeniería', 'Engineering specialties'))}
          >
            {[
              ['WEB', WebGlyph],
              ['MOBILE', MobileGlyph],
              ['BACKEND', BackendGlyph],
              ['CLOUD', CloudGlyph],
            ].map(([label, Glyph]) => {
              const Symbol = Glyph as typeof WebGlyph;
              return (
                <span
                  key={t(uiCopy(String(label)))}
                  className="domain-badge"
                  role="listitem"
                >
                  <Symbol size={15} aria-hidden="true" />
                  <span>{String(label)}</span>
                </span>
              );
            })}
          </div>
          <Link
            className="hero-scroll"
            href="#proyectos"
            aria-label={t(c('Desliza para explorar proyectos', 'Scroll to explore projects'))}
          >
            <span>{t(c('DESLIZA PARA EXPLORAR', 'SCROLL TO EXPLORE'))}</span>
            <ScrollCueGlyph size={16} />
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
            'Sistemas distribuidos, comercio y plataformas móviles.',
            'Distributed systems, e-commerce, and mobile platforms.',
          )}
          description={c(
            'Tres sistemas en producción para Club León y un proyecto de integración de hardware y servicios. Arquitectura, decisiones y alcance de implementación.',
            'Three production systems for Club León and one hardware-service integration project. Architecture, trade-offs, and implementation scope.',
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
                  <span className="eyebrow">{t(uiCopy(project.category))}</span>
                </div>
                <h3>{t(uiCopy(project.title))}</h3>
                <p className="project-subtitle">{t(project.subtitle)}</p>
                <p>{t(project.summary)}</p>
                <div className="project-role">
                  <span>{t(c('MI PARTICIPACIÓN', 'MY CONTRIBUTION'))}</span>
                  {t(project.role)}
                </div>
                <div className="project-systems">
                  <span>{t(c('SISTEMAS', 'SYSTEMS'))}</span>
                  {t(project.systems)}
                </div>
                <div className="tags">
                  {project.stack.slice(0, 4).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <TransitionLink
                  className="case-link"
                  href={`/projects/${project.slug}`}
                  aria-label={`${t(c('Ver caso', 'View case'))}: ${t(uiCopy(project.title))}`}
                >
                  <span>{t(c('Explorar caso de estudio', 'Explore case study'))}</span>
                  <TechArrowUpRight size={20} className="case-arrow" aria-hidden="true" />
                </TransitionLink>
                <div className="project-published">
                  <div className="project-status-group">
                    <span
                      className={`status ${project.kind === 'iot' ? 'historical' : ''}`}
                    >
                      <i />
                      {t(project.status)}
                    </span>
                    {project.slug === 'la-guarida' && (
                      <span className="project-badge project-badge-ai">
                        <ThinkingOrbWrapper
                          size={20}
                          state="composing"
                          color="#39d0c8"
                        />
                        <span>{t(c('IA acotada', 'Bounded AI'))}</span>
                      </span>
                    )}
                    {project.slug === 'club-leon-app' && (
                      <span className="project-badge project-badge-sync">
                        <ThinkingOrbWrapper
                          size={20}
                          state="connecting"
                          color="#72a7ff"
                        />
                        <span>{t(c('Sync en vivo', 'Live sync'))}</span>
                      </span>
                    )}
                    {project.slug === 'pos-concesiones' && (
                      <span className="project-badge project-badge-ledger">
                        <ThinkingOrbWrapper
                          size={20}
                          state="solving"
                          color="#39d0c8"
                        />
                        <span>{t(c('Ledger offline', 'Offline ledger'))}</span>
                      </span>
                    )}
                  </div>
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
            'Dominio técnico de extremo a extremo.',
            'End-to-end technical scope.',
          )}
        />
        <div className="capability-grid">
          {capabilities.map(({ icon: Icon, title, text, ref, href }, i) => (
            <article key={i}>
              <div className="capability-top">
                <Icon size={23} strokeWidth={1.5} />
                <span>0{i + 1}</span>
              </div>
              <h3>{typeof title === 'string' ? t(uiCopy(title)) : t(title)}</h3>
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
            'Trayectoria técnica y sistemas en producción.',
            'Technical track record and production systems.',
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
                <span>{t(uiCopy('Full stack / Mobile'))}</span>
              </div>
              <p>
                {t(
                  c(
                    'Ingeniería full stack para el ecosistema del club: app móvil en Flutter con extensiones en Swift/Kotlin, storefront y panel POS en Next.js, APIs en Node.js/Express, procesamiento con Stripe/Aplazo e integración determinista de modelos generativos.',
                    'Full stack engineering for the club’s digital ecosystem: Flutter mobile app with Swift/Kotlin native extensions, Next.js storefront and POS panel, Node.js/Express APIs, Stripe/Aplazo transaction processing, and deterministic integration of generative models.',
                  ),
                )}
              </p>
              <div className="timeline-links">
                {studies.slice(0, 3).map((project) => (
                  <Link href={`/projects/${project.slug}`} key={project.slug}>
                    {t(uiCopy(project.title))}
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
                    'Desarrollo de plataforma e-commerce en Angular y backend .NET Core con Entity Framework y SQL Server, junto a una app Android nativa en Kotlin para telemetría y control de actuadores IoT vía Firebase.',
                    'Developed an e-commerce platform with Angular and .NET Core backend using Entity Framework and SQL Server, alongside a native Android app in Kotlin for telemetry and IoT actuator control via Firebase.',
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
                    'Punto de venta desarrollado con Flask, MySQL y SQLAlchemy: transacciones ACID para control de existencias, autorización RBAC y generación de balances de caja y reportes contables en CSV/PDF.',
                    'Web POS built with Flask, MySQL, and SQLAlchemy: ACID transactions for stock management, RBAC authorization, and exportable CSV/PDF cash reconciliation reports.',
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
          title={c('Stack tecnológico y herramientas.', 'Technology stack and tools.')}
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
      <section className="section about-section shell" id="sobre-mi">
        <div>
          <span className="eyebrow">
            <span className="section-number">06</span>
            {t(c('SOBRE MÍ', 'ABOUT'))}
          </span>
          <h2>
            Luis Alberto
            <br />
            Rosas Bocanegra<span className="blue-period">.</span>
          </h2>
          <p>
            {t(
              c(
                'Diseño e implemento software donde la consistencia transaccional y la experiencia de usuario son críticas: inventario concurrente, conciliación de pagos, sincronización offline y ruteo nativo.',
                'I build software where transactional consistency and user experience are critical: concurrent inventory, payment reconciliation, offline synchronization, and native deep linking.',
              ),
            )}
          </p>
          <p>
            {t(
              c(
                'Mi enfoque abarca desde componentes de interfaz hasta servicios de backend: APIs deterministas que calculan y reservan estados, e integraciones de IA acotadas a interpretar datos estructurados sin atribuirse ejecución de cobros ni órdenes.',
                'My scope spans from UI components to backend services: deterministic APIs that compute and reserve state, and AI integrations bounded to interpreting structured data without charge or order authorization.',
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
                {t(c('Redes CCNA', 'CCNA networking'))}
                <small>Cisco NetAcad · 2022</small>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Contact />
      <SystemReassembly />
    </main>
  );
}
