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
  const menuRef = useRef<HTMLButtonElement>(null);
  const prefix = home ? '' : '/';
  const links = [
    { href: `${prefix}#proyectos`, label: c('Proyectos', 'Work') },
    { href: `${prefix}#ingenieria`, label: c('Ingeniería', 'Engineering') },
    { href: `${prefix}#sobre-mi`, label: c('Sobre mí', 'About') },
    { href: `${prefix}#contacto`, label: c('Contacto', 'Contact') },
  ];
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  const themeNames = {
    system: c('sistema', 'system'),
    dark: c('oscuro', 'dark'),
    light: c('claro', 'light'),
  };
  return (
    <header className="site-header">
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
            <a key={link.href} href={link.href}>
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
        <nav
          className="mobile-navigation"
          id="mobile-navigation"
          aria-label={t(c('Navegación móvil', 'Mobile navigation'))}
        >
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              {t(link.label)}
              <ArrowUpRight size={19} />
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
function Frame({ children, home }: { children: ReactNode; home: boolean }) {
  const { t } = usePreferences();
  const progressRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let pending = 0;
    const update = () => {
      pending = 0;
      const total = document.documentElement.scrollHeight - innerHeight;
      if (progressRef.current)
        progressRef.current.style.transform = `scaleX(${total > 0 ? scrollY / total : 0})`;
    };
    const scroll = () => {
      if (!pending) pending = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', scroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', scroll);
      cancelAnimationFrame(pending);
    };
  }, []);
  return (
    <div className="portfolio" id="inicio">
      <a className="skip-link" href="#contenido">
        {t(c('Saltar al contenido', 'Skip to content'))}
      </a>
      <div className="reading-progress" ref={progressRef} aria-hidden="true" />
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
