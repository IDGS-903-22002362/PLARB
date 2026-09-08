'use client';
import {
  createContext,
  useContext,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import { c, studies, type Copy, type Locale } from '@/lib/projects';
import { usePathname } from 'next/navigation';
import { uiCopy } from '@/lib/ui-copy';
import { profile } from '@/lib/portfolio-data';
type Theme = 'system' | 'dark' | 'light';
type Snapshot = {
  locale: Locale;
  theme: Theme;
  paused: boolean;
  dark: boolean;
};
type Preferences = Snapshot & {
  t: (copy: Copy) => string;
  setLocale: (locale: Locale) => void;
  cycleTheme: () => void;
  toggleMotion: () => void;
};
const Context = createContext<Preferences | null>(null);
const memory: Record<string, string> = {};
const read = (key: string) => {
  try {
    return localStorage.getItem(key);
  } catch {
    return memory[key] ?? null;
  }
};
function write(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    memory[key] = value;
  }
  window.dispatchEvent(new Event('portfolio-preference-change'));
}
const serverSnapshot = JSON.stringify({
  locale: 'es',
  theme: 'system',
  paused: true,
  dark: true,
});
function getSnapshot() {
  const selected = read('portfolio-theme');
  return JSON.stringify({
    locale: read('portfolio-locale') === 'en' ? 'en' : 'es',
    theme: selected === 'dark' || selected === 'light' ? selected : 'system',
    paused:
      read('luis-portfolio-motion') === 'paused' ||
      matchMedia('(prefers-reduced-motion: reduce)').matches,
    dark: matchMedia('(prefers-color-scheme: dark)').matches,
  });
}
function subscribe(listener: () => void) {
  const dark = matchMedia('(prefers-color-scheme: dark)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  window.addEventListener('storage', listener);
  window.addEventListener('portfolio-preference-change', listener);
  dark.addEventListener('change', listener);
  reduced.addEventListener('change', listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener('portfolio-preference-change', listener);
    dark.removeEventListener('change', listener);
    reduced.removeEventListener('change', listener);
  };
}
export function PreferencesProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const raw = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => serverSnapshot,
  );
  const snapshot: Snapshot = JSON.parse(raw);
  const { locale, theme, paused, dark } = snapshot;
  useEffect(() => {
    document.documentElement.dataset.theme =
      theme === 'system' ? (dark ? 'dark' : 'light') : theme;
  }, [theme, dark]);
  useEffect(() => {
    const syncMetadata = () => {
      document.documentElement.lang = locale;
      const project = studies.find(
        (study) => pathname === '/projects/' + study.slug,
      );
      const title = project
        ? uiCopy(project.title)[locale] +
          c(' — Caso de estudio | Luis Rosas', ' — Case study | Luis Rosas')[
            locale
          ]
        : profile.name +
          c(' — Ingeniero de software', ' — Software Engineer')[locale];
      const description =
        project?.summary[locale] ??
        c(
          'Desarrollo web, móvil y backend. App oficial de Club León, La Guarida y POS de concesiones.',
          'Web, mobile and backend development. Club León’s official app, La Guarida and concessions POS.',
        )[locale];
      document.title = title;
      let meta = document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    };
    syncMetadata();
    window.addEventListener('popstate', syncMetadata);
    return () => window.removeEventListener('popstate', syncMetadata);
  }, [locale, pathname]);
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'playing';
  }, [paused]);
  return (
    <Context.Provider
      value={{
        ...snapshot,
        t: (copy) => copy[locale],
        setLocale: (value) => write('portfolio-locale', value),
        cycleTheme: () =>
          write(
            'portfolio-theme',
            theme === 'system' ? 'dark' : theme === 'dark' ? 'light' : 'system',
          ),
        toggleMotion: () =>
          write('luis-portfolio-motion', paused ? 'playing' : 'paused'),
      }}
    >
      {children}
    </Context.Provider>
  );
}
export function usePreferences() {
  const context = useContext(Context);
  if (!context) throw new Error('Portfolio preferences provider is required.');
  return context;
}
