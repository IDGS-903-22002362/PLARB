import { describe, it, expect, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../app/page';
import { SiteShell } from '../components/portfolio/shell';
vi.mock('../components/portfolio/system-scene', () => ({
  default: () => <div />,
}));
describe('Portfolio journeys', () => {
  it('marks the section from the initial hash as active', () => {
    const previousUrl = window.location.href;
    window.history.replaceState({}, '', '/#sobre-mi');
    const view = render(<Portfolio />);

    expect(
      screen
        .getByRole('link', { name: 'Sobre mí' })
        .getAttribute('aria-current'),
    ).toBe('true');

    view.unmount();
    window.history.replaceState({}, '', previousUrl);
  });

  it('updates the active section from the latest intersection event', () => {
    const callbacks: IntersectionObserverCallback[] = [];
    const PreviousObserver = globalThis.IntersectionObserver;
    class TestIntersectionObserver {
      root = null;
      rootMargin = '';
      thresholds = [];
      constructor(callback: IntersectionObserverCallback) {
        callbacks.push(callback);
      }
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    }
    vi.stubGlobal('IntersectionObserver', TestIntersectionObserver);
    const view = render(<Portfolio />);
    const projects = document.getElementById('proyectos')!;
    const experience = document.getElementById('experiencia')!;
    const entry = (
      target: Element,
      ratio: number,
      top: number,
    ): IntersectionObserverEntry =>
      ({
        target,
        isIntersecting: true,
        intersectionRatio: ratio,
        boundingClientRect: {
          top,
          bottom: top + 500,
          height: 500,
          width: 100,
          left: 0,
          right: 100,
          x: 0,
          y: top,
          toJSON: () => ({}),
        },
        intersectionRect: {} as DOMRectReadOnly,
        rootBounds: null,
        time: 0,
      }) as IntersectionObserverEntry;

    act(() => {
      callbacks[0]?.([entry(projects, 0.8, 120)], {} as IntersectionObserver);
    });
    expect(
      screen
        .getByRole('link', { name: 'Proyectos' })
        .getAttribute('aria-current'),
    ).toBe('true');

    act(() => {
      callbacks[0]?.([entry(experience, 0.9, 100)], {} as IntersectionObserver);
    });
    expect(
      screen
        .getByRole('link', { name: 'Experiencia' })
        .getAttribute('aria-current'),
    ).toBe('true');
    expect(
      screen
        .getByRole('link', { name: 'Proyectos' })
        .hasAttribute('aria-current'),
    ).toBe(false);

    view.unmount();
    vi.stubGlobal('IntersectionObserver', PreviousObserver);
  });

  it('does not mark a section active on project routes', () => {
    render(
      <SiteShell>
        <main />
      </SiteShell>,
    );

    for (const link of within(
      screen.getByRole('navigation', { name: 'Navegación principal' }),
    ).getAllByRole('link')) {
      expect(link.hasAttribute('aria-current')).toBe(false);
    }
  });

  it('preserves actual contacts and the original PDF', () => {
    render(<Portfolio />);
    expect(
      screen
        .getByRole('link', { name: /ingluisrosascontacto@gmail.com/ })
        .getAttribute('href'),
    ).toBe('mailto:ingluisrosascontacto@gmail.com');
    expect(
      screen.getByRole('link', { name: /477 353 8866/ }).getAttribute('href'),
    ).toBe('tel:+524773538866');
    const cv = screen.getAllByRole('link', { name: /Descargar CV/ })[0];
    expect(cv.getAttribute('href')).toBe('/Luis-Alberto-Rosas-CV.pdf');
    expect(cv.hasAttribute('download')).toBe(true);
  });
  it('links shareable cases in the requested order', () => {
    render(<Portfolio />);
    expect(
      screen
        .getAllByRole('link', { name: /Ver caso:/ })
        .slice(0, 4)
        .map((a) => a.getAttribute('href')),
    ).toEqual([
      '/projects/club-leon-app',
      '/projects/la-guarida',
      '/projects/pos-concesiones',
      '/projects/commerce-iot',
    ]);
  });
  it('uses official destinations with safe new tabs', () => {
    render(<Portfolio />);
    for (const [name, url] of [
      ['La Guarida', 'https://tiendalaguarida.com/'],
      [
        'App Store',
        'https://apps.apple.com/mx/app/club-le%C3%B3n-fc/id6770619269',
      ],
      [
        'Google Play',
        'https://play.google.com/store/apps/details?id=mx.clubleon.oficial&hl=es_MX',
      ],
      [
        'Servicio Palcos',
        'https://foodmarket.clubleon.mx/servicio-palcos/inicio/',
      ],
    ]) {
      const a = screen.getAllByRole('link', { name })[0];
      expect(a.getAttribute('href')).toBe(url);
      expect(a.getAttribute('target')).toBe('_blank');
      expect(a.getAttribute('rel')).toContain('noopener');
      expect(a.closest('button')).toBeNull();
    }
  });
  it('translates and persists the selected language', async () => {
    render(<Portfolio />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Switch to English' }),
    );
    expect(
      screen.getAllByRole('link', { name: 'Download CV' }).length,
    ).toBeGreaterThan(0);
    expect(localStorage.getItem('portfolio-locale')).toBe('en');
  });
  it('restores a manual theme and returns to system theme', async () => {
    localStorage.setItem('portfolio-theme', 'dark');
    render(<Portfolio />);
    await userEvent.click(screen.getByRole('button', { name: /Tema: oscuro/ }));
    expect(document.documentElement.dataset.theme).toBe('light');
    expect(localStorage.getItem('portfolio-theme')).toBe('light');
    await userEvent.click(screen.getByRole('button', { name: /Tema: claro/ }));
    expect(localStorage.getItem('portfolio-theme')).toBe('system');
  });
  it('persists motion pause', async () => {
    render(<Portfolio />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Pausar animaciones' }),
    );
    expect(localStorage.getItem('luis-portfolio-motion')).toBe('paused');
  });
  it('exposes Experience in navigation and four La Guarida decisions', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    expect(
      screen.getByRole('navigation', { name: 'Navegación principal' })
        .textContent,
    ).toContain('Experiencia');
    expect(screen.getByRole('tab', { name: /IA aplicada/ })).toBeTruthy();
    expect(screen.getAllByRole('tab')).toHaveLength(4);
    await user.click(screen.getByRole('tab', { name: /IA aplicada/ }));
    expect(
      screen.getByRole('heading', {
        name: 'La IA interpreta; el backend conserva la evidencia.',
      }),
    ).toBeTruthy();
    expect(screen.getByText(/decision intelligence/i)).toBeTruthy();
  });
  it('keeps the hero readable when motion is paused', async () => {
    render(<Portfolio />);
    await userEvent.click(
      screen.getByRole('button', { name: 'Pausar animaciones' }),
    );
    expect(
      screen.getByRole('heading', { level: 1, name: /Hola.*Beto/i }),
    ).toBeTruthy();
    expect(document.documentElement.dataset.motion).toBe('paused');
  });
  it('closes mobile navigation on Escape and selection', async () => {
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.keyboard('{Escape}');
    expect(
      screen.queryByRole('navigation', { name: 'Navegación móvil' }),
    ).toBeNull();
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    await user.click(
      within(
        screen.getByRole('navigation', { name: 'Navegación móvil' }),
      ).getByRole('link', { name: 'Proyectos' }),
    );
    expect(
      screen.queryByRole('navigation', { name: 'Navegación móvil' }),
    ).toBeNull();
  });
});
