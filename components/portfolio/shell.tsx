'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Menu,
  Monitor,
  Moon,
  Pause,
  Play,
  Sun,
  X,
} from 'lucide-react';
import { profile } from '@/lib/portfolio-data';
import { c } from '@/lib/projects';
import { PreferencesProvider, usePreferences } from './preferences';
import { usePortfolioMotion } from './portfolio-motion';
export function CVLink({
  className = 'button secondary',
}: {
  className?: string;
}) {
  const { t } = usePreferences();
  return (
    <a className={className} href={profile.cv} download>
      {t(c('Descargar CV', 'Download CV'))}
      <Download size={18} aria-hidden="true" />
    </a>
  );
}
export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={17} aria-hidden="true" />
    </a>
  );
}
function Navigation({ home }: { home: boolean }) {
  const { locale, setLocale, theme, cycleTheme, paused, toggleMotion, t } =
    usePreferences();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState('proyectos');
  const menuRef = useRef<HTMLButtonElement>(null);
  const prefix = home ? '' : '/';
  const links = [
    { id: 'proyectos', href: `${prefix}#proyectos`, label: c('Proyectos', 'Work') },
    {
      id: 'experiencia',
      href: `${prefix}#experiencia`,
      label: c('Experiencia', 'Experience'),
    },
    {
      id: 'ingenieria',
      href: `${prefix}#ingenieria`,
      label: c('Ingeniería', 'Engineering'),
    },
    { id: 'sobre-mi', href: `${prefix}#sobre-mi`, label: c('Sobre mí', 'About') },
    { id: 'contacto', href: `${prefix}#contacto`, label: c('Contacto', 'Contact') },
  ];
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!home) return;
    const observed = [
      'proyectos',
      'experiencia',
      'ingenieria',
      'sobre-mi',
      'contacto',
    ]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!observed.length) return;
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          visibility.set(entry.target.id, entry.intersectionRatio);
        const next = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0];
        if (next && next[1] > 0) setActive(next[0]);
      },
      { rootMargin: '-28% 0px -48% 0px', threshold: [0.15, 0.35, 0.6] },
    );
    observed.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [home]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', close);
    };
  }, [open]);
  const themeNames = {
    system: c('sistema', 'system'),
    dark: c('oscuro', 'dark'),
    light: c('claro', 'light'),
  };
  return (
    <header className={`site-header ${compact ? 'header-compact' : ''}`}>
      <div className="header-inner">
        <a
          className="wordmark"
          href={home ? '#inicio' : '/'}
          aria-label={`${profile.name}, ${t(c('inicio', 'home'))}`}
        >
          <span className="brand-symbol" aria-hidden="true">
            lr
          </span>
          <span>
            Luis Rosas<span className="wordmark-role">SOFTWARE ENGINEER</span>
          </span>
        </a>
        <nav
          className="desktop-nav"
          aria-label={t(c('Navegación principal', 'Main navigation'))}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={home && active === link.id ? 'true' : undefined}
            >
              {t(link.label)}
            </a>
          ))}
        </nav>
        <div className="header-controls">
          <button
            className="locale-control"
            onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
            aria-label={
              locale === 'es' ? 'Switch to English' : 'Cambiar a español'
            }
          >
            <span className={locale === 'es' ? 'selected' : ''}>ES</span>
            <span className="locale-divider">/</span>
            <span className={locale === 'en' ? 'selected' : ''}>EN</span>
          </button>
          <button
            className="icon-button"
            aria-label={`${t(c('Tema', 'Theme'))}: ${t(themeNames[theme])}. ${t(c('Cambiar tema', 'Change theme'))}`}
            title={t(
              c(
                'Tema: sistema → oscuro → claro',
                'Theme: system → dark → light',
              ),
            )}
            onClick={cycleTheme}
          >
            {theme === 'system' ? (
              <Monitor size={19} />
            ) : theme === 'dark' ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
          </button>
          <button
            className="icon-button motion-control"
            onClick={toggleMotion}
            aria-pressed={paused}
            aria-label={
              paused
                ? t(c('Activar animaciones', 'Enable animations'))
                : t(c('Pausar animaciones', 'Pause animations'))
            }
          >
            {paused ? <Play size={17} /> : <Pause size={17} />}
          </button>
          <button
            ref={menuRef}
            className="icon-button menu-control"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={
              open
                ? t(c('Cerrar menú', 'Close menu'))
                : t(c('Abrir menú', 'Open menu'))
            }
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="mobile-nav-layer">
          <button
            type="button"
            className="mobile-nav-backdrop"
            aria-label={t(c('Cerrar menú', 'Close menu'))}
            onClick={() => {
              setOpen(false);
              menuRef.current?.focus();
            }}
          />
          <nav
            className="mobile-navigation"
            id="mobile-navigation"
            aria-label={t(c('Navegación móvil', 'Mobile navigation'))}
          >
            <p className="mobile-nav-kicker">
              {t(c('Recorrido', 'Sections'))}
            </p>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={home && active === link.id ? 'true' : undefined}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {t(link.label)}
                <ArrowUpRight size={19} />
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
function Frame({ children, home }: { children: ReactNode; home: boolean }) {
  const { t } = usePreferences();
  const scope = useRef<HTMLDivElement>(null);
  usePortfolioMotion(scope);
  return (
    <div className="portfolio" id="inicio" ref={scope}>
      <a className="skip-link" href="#contenido">
        {t(c('Saltar al contenido', 'Skip to content'))}
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <Navigation home={home} />
      {children}
      <footer className="site-footer shell">
        <a className="footer-brand" href={home ? '#inicio' : '/'}>
          Luis Rosas<span>© 2026</span>
        </a>
        <span>
          {t(
            c(
              'Desarrollo web, móvil y backend.',
              'Web, mobile and backend development.',
            ),
          )}
        </span>
        <a href="#inicio">
          {t(c('Volver arriba', 'Back to top'))}
          <ArrowDown size={16} className="rotate-arrow" />
        </a>
      </footer>
    </div>
  );
}
export function SiteShell({
  children,
  home = false,
}: {
  children: ReactNode;
  home?: boolean;
}) {
  return (
    <PreferencesProvider>
      <Frame home={home}>{children}</Frame>
    </PreferencesProvider>
  );
}
