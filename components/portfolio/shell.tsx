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
import {
  AppleStoreGlyph,
  GooglePlayGlyph,
  StoreFrontGlyph,
  PalcosGlyph,
  DocDownloadGlyph,
  TechArrowUpRight,
} from './custom-icons';
import { c } from '@/lib/projects';
import { uiCopy } from '@/lib/ui-copy';
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
      <DocDownloadGlyph size={18} aria-hidden="true" />
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
  const { t } = usePreferences();
  const isApple =
    (typeof children === 'string' && children.includes('App Store')) ||
    href.includes('apps.apple.com');
  const isPlay =
    (typeof children === 'string' && children.includes('Google Play')) ||
    href.includes('play.google.com');
  const isStore =
    (typeof children === 'string' && children.includes('La Guarida')) ||
    href.includes('tiendalaguarida.com');
  const isPalcos =
    (typeof children === 'string' &&
      (children.includes('Palcos') || children.includes('Food Market'))) ||
    href.includes('foodmarket.clubleon.mx');
  return (
    <a
      title={t(c('Se abre en una pestaña nueva', 'Opens in a new tab'))}
      className={`external-link ${isApple ? 'link-apple' : ''} ${isPlay ? 'link-play' : ''} ${isStore ? 'link-store' : ''} ${isPalcos ? 'link-palcos' : ''}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {isApple && <AppleStoreGlyph size={13} aria-hidden="true" />}
      {isPlay && <GooglePlayGlyph size={13} aria-hidden="true" />}
      {isStore && <StoreFrontGlyph size={13} aria-hidden="true" />}
      {isPalcos && <PalcosGlyph size={13} aria-hidden="true" />}
      {children}
      <TechArrowUpRight size={13} aria-hidden="true" />
    </a>
  );
}
const navigationSectionIds = [
  'proyectos',
  'experiencia',
  'ingenieria',
  'sobre-mi',
  'contacto',
] as const;
function Navigation({ home }: { home: boolean }) {
  const { locale, setLocale, theme, cycleTheme, paused, toggleMotion, t } =
    usePreferences();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const initialSection =
    typeof window !== 'undefined' && home
      ? navigationSectionIds.includes(
          window.location.hash.slice(
            1,
          ) as (typeof navigationSectionIds)[number],
        )
        ? window.location.hash.slice(1)
        : 'proyectos'
      : null;
  const [active, setActive] = useState<string | null>(initialSection);
  const menuRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const prefix = home ? '' : '/';
  const links = [
    {
      id: 'proyectos',
      href: `${prefix}#proyectos`,
      label: c('Proyectos', 'Work'),
    },
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
    {
      id: 'sobre-mi',
      href: `${prefix}#sobre-mi`,
      label: c('Sobre mí', 'About'),
    },
    {
      id: 'contacto',
      href: `${prefix}#contacto`,
      label: c('Contacto', 'Contact'),
    },
  ];
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!home) return;
    const observed = navigationSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!observed.length) return;

    const getHashSection = () => {
      const hash = window.location.hash.slice(1);
      return navigationSectionIds.includes(
        hash as (typeof navigationSectionIds)[number],
      )
        ? hash
        : null;
    };
    const setActiveSection = (id: string | null) => {
      setActive((current) => (current === id ? current : id));
    };
    const getStickyOffset = () => {
      const header = headerRef.current;
      if (!header) return 0;
      const rect = header.getBoundingClientRect();
      return Math.max(rect.bottom, rect.height, 0);
    };
    const syncFromScroll = () => {
      const offset = getStickyOffset();
      const candidates = observed
        .map((section) => ({
          section,
          rect: section.getBoundingClientRect(),
        }))
        .filter(({ rect }) => rect.bottom > offset + 1);
      if (!candidates.length) return;
      const passed = candidates.filter(({ rect }) => rect.top <= offset + 24);
      const current = (passed.length ? passed : candidates).sort((a, b) =>
        passed.length ? b.rect.top - a.rect.top : a.rect.top - b.rect.top,
      )[0];
      if (current) setActiveSection(current.section.id);
    };
    const onLocationChange = () => {
      const section = getHashSection();
      if (section) {
        setActiveSection(section);
      } else if (window.scrollY <= 28) {
        setActiveSection('proyectos');
      } else {
        syncFromScroll();
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Entries are a snapshot of the current intersection event. Do not
        // retain a Map between callbacks: stale ratios can keep old sections
        // active after the user has scrolled past them.
        const offset = getStickyOffset();
        const visible = entries
          .filter(
            (entry) =>
              entry.isIntersecting !== false && entry.intersectionRatio > 0,
          )
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            const aPassed = aTop <= offset + 24;
            const bPassed = bTop <= offset + 24;
            if (aPassed !== bPassed) return aPassed ? -1 : 1;
            if (aPassed && aTop !== bTop) return bTop - aTop;
            return b.intersectionRatio - a.intersectionRatio;
          });
        const next = visible[0];
        if (next) setActiveSection(next.target.id);
      },
      {
        // The top inset keeps the active marker below the sticky header; the
        // lower inset creates a stable reading band instead of flickering at
        // section boundaries.
        rootMargin: `-${Math.ceil(getStickyOffset())}px 0px -52% 0px`,
        threshold: [0.15, 0.35, 0.6],
      },
    );
    observed.forEach((section) => observer.observe(section));
    const onScroll = () => {
      syncFromScroll();
    };
    const onHashChange = () => onLocationChange();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('hashchange', onHashChange);
    window.addEventListener('popstate', onHashChange);
    onLocationChange();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('hashchange', onHashChange);
      window.removeEventListener('popstate', onHashChange);
    };
  }, [home]);
  useEffect(() => {
    if (!open) return;
    const header = headerRef.current;
    const firstLink = header?.querySelector<HTMLAnchorElement>(
      '.mobile-navigation a',
    );
    const background = Array.from(header?.parentElement?.children ?? []).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== header,
    );
    const inertBefore = background.map((element) => element.inert);
    background.forEach((element) => {
      element.inert = true;
    });
    firstLink?.focus();
    const previousOverflow = document.body.style.overflow;
    const desktop = matchMedia('(min-width: 901px)');
    const onDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', onDesktop);
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Tab' && header) {
        const stops = Array.from(
          header.querySelectorAll<HTMLElement>(
            '.wordmark, .header-controls button, .mobile-navigation a',
          ),
        );
        const first = stops[0];
        const last = stops[stops.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
      if (event.key === 'Escape') {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => {
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => {
        element.inert = inertBefore[index];
      });
      desktop.removeEventListener('change', onDesktop);
      window.removeEventListener('keydown', close);
    };
  }, [open]);
  const themeNames = {
    system: c('sistema', 'system'),
    dark: c('oscuro', 'dark'),
    light: c('claro', 'light'),
  };
  return (
    <header
      ref={headerRef}
      className={`site-header ${compact ? 'header-compact' : ''}`}
      role={open ? 'dialog' : undefined}
      aria-modal={open || undefined}
      aria-label={
        open ? t(c('Navegación móvil', 'Mobile navigation')) : undefined
      }
    >
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
            Luis Rosas
            <span className="wordmark-role">
              {t(uiCopy('SOFTWARE ENGINEER'))}
            </span>
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
              onClick={() => {
                if (home) setActive(link.id);
              }}
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
            tabIndex={-1}
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
            <p className="mobile-nav-kicker">{t(c('Recorrido', 'Sections'))}</p>
            {links.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={home && active === link.id ? 'true' : undefined}
                onClick={() => {
                  if (home) setActive(link.id);
                  setOpen(false);
                  menuRef.current?.focus();
                }}
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
  usePortfolioMotion(scope, home);
  return (
    <div className={home ? 'portfolio' : 'portfolio portfolio-internal'} id="inicio" ref={scope}>
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
