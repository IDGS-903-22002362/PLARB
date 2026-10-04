'use client';
import Link from 'next/link';
import TransitionLink from './transition-link';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { c, type Copy, type Study } from '@/lib/projects';
import { TechArrowUpRight } from './custom-icons';
import { ThinkingOrbWrapper } from './thinking-orb-wrapper';
import { usePreferences } from './preferences';
import { uiCopy } from '@/lib/ui-copy';
import { ExternalLink } from './shell';
import Architecture from './architecture';
import ProjectVisual from './project-visual';
import CommerceSequence from './commerce-sequence';
import MobileSequence from './mobile-sequence';
import { Contact } from './contact';
import SystemReassembly from './system-reassembly';
import ProjectAsciiBackground from './project-ascii-background';
import CaseContents from './case-contents';
function Heading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: Copy;
}) {
  const { t } = usePreferences();
  return (
    <div className="case-section-heading">
      <span className="eyebrow">
        {index} / {t(uiCopy(label))}
      </span>
      <h2>{t(title)}</h2>
    </div>
  );
}
function LoyaltyNote() {
  const { t } = usePreferences();
  return (
    <aside className="loyalty-section">
      <span className="eyebrow">
        {t(c('BACKEND CONECTADO / LEALTAD', 'CONNECTED BACKEND / LOYALTY'))}
      </span>
      <h3>
        {t(
          c(
            'Puntos con historial y control de reintentos.',
            'Points with history and retry control.',
          ),
        )}
      </h3>
      <p>
        {t(
          c(
            'El motor de lealtad del ecosistema registra saldo, movimiento e idempotencia en una misma transacción. Una petición repetida se compara con la operación original; una reversión genera un movimiento compensatorio enlazado.',
            'The ecosystem’s loyalty engine records balance, movement and idempotency in one transaction. Repeated requests are compared with their original operation; reversals create linked compensating movements.',
          ),
        )}
      </p>
      <div
        className="ledger-flow"
        aria-label={t(c('Flujo de lealtad', 'Loyalty flow'))}
      >
        <span>{t(c('Acumulación', 'Earn'))}</span>
        <ArrowRight />
        <span>{t(c('Saldo + historial', 'Balance + history'))}</span>
        <ArrowRight />
        <span>{t(c('Canje / reversión', 'Redeem / reverse'))}</span>
      </div>
      <p>
        {t(
          c(
            'Las transacciones de reversión preservan identificadores correlativos hacia la operación original para trazabilidad contable. Los contratos de acumulación, canje y reversión se ejecutan de manera atómica en el backend.',
            'Reversal transactions preserve correlation identifiers back to the original operation for auditability. Earning, redemption, and reversal contracts are atomically executed on the backend.',
          ),
        )}
      </p>
    </aside>
  );
}
export default function CaseStudy({
  project,
  next,
}: {
  project: Study;
  next: Study;
}) {
  const { t } = usePreferences();
  return (
    <main id="contenido" className="case-study-page">
      <div className="shell">
        <section className="case-hero">
          <ProjectAsciiBackground project={project} />
          <Link className="case-back" href="/#proyectos">
            <ArrowLeft size={16} />
            {t(c('Volver a proyectos', 'Back to work'))}
          </Link>
          <div className="case-hero-line">
            <span className="eyebrow">
              {t(c('CASO DE ESTUDIO', 'CASE STUDY'))} / {project.number} /{' '}
              {t(uiCopy(project.category))}
            </span>
            <span
              className={`status ${project.kind === 'iot' ? 'historical' : ''}`}
            >
              <i />
              {t(project.status)}
            </span>
          </div>
          <div className="case-hero-content">
            <h1>{t(uiCopy(project.title))}</h1>
            <p className="case-subtitle">{t(project.subtitle)}</p>
            <p className="case-summary">{t(project.summary)}</p>
          </div>
          <dl className="case-meta">
            <div>
              <dt>{t(c('Mi participación', 'My contribution'))}</dt>
              <dd>{t(project.role)}</dd>
            </div>
            <div>
              <dt>{t(c('Contexto del proyecto', 'Project context'))}</dt>
              <dd>{t(project.period)}</dd>
            </div>
            <div>
              <dt>{t(c('Producto', 'Product'))}</dt>
              <dd>
                {project.links.length ? (
                  <div className="live-links">
                    {project.links.map((link) => (
                      <ExternalLink href={link.href} key={link.href}>
                        {link.label}
                      </ExternalLink>
                    ))}
                  </div>
                ) : (
                  t(
                    project.kind === 'pos'
                      ? c(
                          'Herramienta interna de Club León',
                          'Internal Club León tool',
                        )
                      : c(
                          'Proyecto documentado en el CV',
                          'Project documented in the CV',
                        ),
                  )
                )}
              </dd>
            </div>
          </dl>
        </section>
        <CaseContents />
        <div
          className="case-hero-visual"
          style={{ viewTransitionName: `project-${project.kind}` }}
        >
          <ProjectVisual kind={project.kind} expanded />
        </div>
        <section className="case-section" id="contexto">
          <Heading
            index="01"
            label="OVERVIEW / CONTEXT"
            title={c(
              'El problema y mi participación.',
              'The problem and my contribution.',
            )}
          />
          <div className="case-prose-grid">
            <div>
              <h3>{t(c('Contexto', 'Context'))}</h3>
              <p>{t(project.context)}</p>
              <h3 className="prose-subheading">
                {t(c('Problema', 'Problem'))}
              </h3>
              <p>{t(project.problem)}</p>
            </div>
            <div>
              <h3>{t(c('Mi trabajo', 'My work'))}</h3>
              <p>{t(project.contribution)}</p>
              <ul className="requirements-list">
                {project.requirements.map((requirement) => (
                  <li key={requirement.en}>
                    <Check size={17} />
                    {t(requirement)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="scope-grid">
            {(
              [
                [c('Producto', 'Product'), project.scope.product],
                [c('Equipo y límites', 'Team and limits'), project.scope.team],
                [
                  c('Mi implementación', 'My implementation'),
                  project.scope.mine,
                ],
                [
                  c('Sistemas conectados', 'Connected systems'),
                  project.scope.connected,
                ],
              ] as const
            ).map(([label, text]) => (
              <article key={label.en}>
                <h3>{t(label)}</h3>
                <p>{t(text)}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="case-section" id="arquitectura">
          <Heading
            index="02"
            label="SYSTEM ARCHITECTURE"
            title={c('Arquitectura y flujo de datos.', 'Architecture and data flow.')}
          />
          {project.kind === 'store' && <CommerceSequence />}
          {project.kind === 'app' && <MobileSequence />}
          <div className="case-architecture">
            <Architecture project={project} />
            <p>{t(project.architecture)}</p>
          </div>
          {project.kind === 'app' && <LoyaltyNote />}
        </section>
        <section className="case-section" id="decisiones">
          <Heading
            index="03"
            label="ENGINEERING CHALLENGES"
            title={c(
              'Retos de ingeniería y decisiones técnicas.',
              'Engineering challenges and technical trade-offs.',
            )}
          />
          <div className="challenge-grid">
            {project.decisions.map((decision, index) => (
              <article className="challenge" key={decision.title.en}>
                <div className="challenge-intro">
                  <span className="eyebrow">
                    {t(c('DECISIÓN DE INGENIERÍA', 'ENGINEERING DECISION'))} / 0
                    {index + 1}
                  </span>
                  <h3>{t(decision.title)}</h3>
                  <p>{t(decision.problem)}</p>
                </div>
                <div className="challenge-body">
                  <dl>
                    {[
                      [c('Decisión', 'Decision'), decision.decision],
                      [c('Por qué', 'Why'), decision.reason],
                      [c('Compromiso', 'Trade-off'), decision.tradeoff],
                    ].map(([label, text]) => (
                      <div key={label.en}>
                        <dt>{t(label)}</dt>
                        <dd>{t(text)}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="challenge-outcome">
                    <Check size={18} />
                    <p>{t(decision.outcome)}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="case-section" id="implementacion">
          <Heading
            index="04"
            label="IMPLEMENTATION"
            title={c('Implementación y confiabilidad.', 'Implementation and reliability.')}
          />
          <div className="tags">
            {project.stack.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="implementation-steps">
            {project.implementation.map((step, index) => (
              <div key={step.en}>
                <span>0{index + 1}</span>
                <p>{t(step)}</p>
              </div>
            ))}
          </div>
          <div className="reliability">
            <h3>
              <ShieldCheck size={20} />
              {t(c('Seguridad y confiabilidad', 'Security and reliability'))}
              <ThinkingOrbWrapper
                size={20}
                state="solving"
                color="#39d0c8"
                className="reliability-orb"
              />
            </h3>
            <p>{t(project.security)}</p>
          </div>
        </section>
        <section className="case-section" id="resultados">
          <Heading
            index="05"
            label="RESULTS / LESSONS"
            title={c('Impacto del sistema y lecciones aprendidas.', 'System impact and lessons learned.')}
          />
          <div className="case-results">
            <ul className="result-list">
              {project.results.map((result) => (
                <li key={result.en}>
                  <Check size={19} />
                  {t(result)}
                </li>
              ))}
            </ul>
            <div>
              <h3>{t(c('Aprendizaje', 'Lessons learned'))}</h3>
              <p>{t(project.lessons)}</p>
            </div>
          </div>
        </section>
        <TransitionLink
          internal
          className="next-project"
          href={`/projects/${next.slug}`}
        >
          <div>
            <span className="eyebrow">
              {t(c('SIGUIENTE CASO', 'NEXT CASE'))} / {next.number}
            </span>
            <h2>{t(uiCopy(next.title))}</h2>
          </div>
          <TechArrowUpRight size={22} aria-hidden="true" />
        </TransitionLink>
      </div>
      <Contact />
      <SystemReassembly />
    </main>
  );
}
