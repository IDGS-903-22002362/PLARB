import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../app/page';
vi.mock('../components/portfolio/system-scene', () => ({
  default: () => <div />,
}));
describe('Portfolio journeys', () => {
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
