import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Portfolio from '../app/page';
import NotFound from '../app/not-found';
import CaseStudy from '../components/portfolio/case-study';
import ProjectVisual from '../components/portfolio/project-visual';
import { PreferencesProvider } from '../components/portfolio/preferences';
import { SiteShell } from '../components/portfolio/shell';
import { studies } from '../lib/projects';
import { projectMedia } from '../lib/project-media';
import { navigateWithTransition } from '../lib/view-transition';
vi.mock('../components/portfolio/system-scene', () => ({
  default: () => <div />,
}));
afterEach(() => {
  window.history.replaceState({}, '', '/');
  vi.restoreAllMocks();
});

function webpDimensions(file: string) {
  const bytes = readFileSync(resolve('public', file.slice(1)));
  const format = new TextDecoder().decode(bytes.subarray(12, 16));
  const uint = (offset: number, count: number) =>
    Array.from(bytes.subarray(offset, offset + count)).reduce(
      (value, byte, index) => value + byte * 2 ** (index * 8),
      0,
    );
  if (format === 'VP8X') return [uint(24, 3) + 1, uint(27, 3) + 1];
  if (format === 'VP8 ') return [uint(26, 2) & 0x3fff, uint(28, 2) & 0x3fff];
  if (format === 'VP8L') {
    const value = uint(21, 4);
    return [(value & 0x3fff) + 1, ((value >>> 14) & 0x3fff) + 1];
  }
  throw new Error(`Unexpected WebP encoding: ${format}`);
}

describe('Responsive evidence and localization regressions', () => {
  it('matches every optimized capture to its encoded dimensions, with no duplicate files', () => {
    const media = Object.values(projectMedia).flat();
    expect(new Set(media.map((item) => item.src)).size).toBe(media.length);
    for (const item of media)
      expect([item.width, item.height], item.src).toEqual(
        webpDimensions(item.src),
      );
  });
  it('frames the IoT cover as actual desktop and mobile evidence', () => {
    const { container } = render(
      <PreferencesProvider>
        <ProjectVisual kind="iot" />
      </PreferencesProvider>,
    );
    expect(
      container.querySelector('.mixed-composition .portrait-cover'),
    ).not.toBeNull();
    expect(
      container.querySelector('.mixed-composition .landscape-cover'),
    ).not.toBeNull();
  });
  it('navigates the lightbox exactly one capture per arrow key and restores focus', async () => {
    const user = userEvent.setup();
    render(
      <PreferencesProvider>
        <ProjectVisual kind="app" expanded />
      </PreferencesProvider>,
    );
    const trigger = screen.getByRole('button', { name: 'Ampliar vista' });
    await user.click(trigger);
    await user.keyboard('{ArrowRight}');
    expect(
      within(screen.getByRole('dialog')).getByRole('img', {
        name: projectMedia.app[1].caption.es,
      }),
    ).toBeTruthy();
    await user.keyboard('{End}');
    expect(
      within(screen.getByRole('dialog')).getByRole('img', {
        name: projectMedia.app.at(-1)!.caption.es,
      }),
    ).toBeTruthy();
    await user.keyboard('{Escape}');
    expect(document.activeElement).toBe(trigger);
  });
  it('switches editorial, architectural, sequence, category and metadata text together', async () => {
    const user = userEvent.setup();
    window.history.replaceState({}, '', '/projects/la-guarida');
    render(
      <SiteShell>
        <CaseStudy project={studies[1]} next={studies[2]} />
      </SiteShell>,
    );
    expect(screen.getByText('DEL PRODUCTO A LA ARQUITECTURA')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /Inventario Reservas por variante/ }),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(screen.getByText('FROM PRODUCT TO ARCHITECTURE')).toBeTruthy();
    expect(
      screen.getByRole('button', { name: /Inventory Variant reservations/ }),
    ).toBeTruthy();
    expect(document.title).toContain('La Guarida — Case study');
    expect(
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute('content'),
    ).toBe(studies[1].summary.en);
    expect(document.documentElement.lang).toBe('en');
    await user.click(screen.getByRole('button', { name: 'Cambiar a español' }));
    expect(document.title).toContain('Caso de estudio');
    expect(screen.getByText('DEL PRODUCTO A LA ARQUITECTURA')).toBeTruthy();
  });
  it('translates the not-found route in both directions', async () => {
    const user = userEvent.setup();
    render(<NotFound />);
    expect(
      screen.getByRole('heading', { name: 'Este proyecto no está aquí.' }),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Switch to English' }));
    expect(
      screen.getByRole('heading', { name: 'This project is not here.' }),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Back to work' })).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Cambiar a español' }));
    expect(
      screen.getByRole('heading', { name: 'Este proyecto no está aquí.' }),
    ).toBeTruthy();
  });
  it('provides a faithful English caption track when video is selected in English', async () => {
    localStorage.setItem('portfolio-locale', 'en');
    const user = userEvent.setup();
    const { container } = render(
      <PreferencesProvider>
        <ProjectVisual kind="pos" expanded />
      </PreferencesProvider>,
    );
    await user.click(
      screen.getByRole('button', { name: /16\. Central Palcos/ }),
    );
    const track = container.querySelector('track[srclang="en"]');
    expect(track?.hasAttribute('default')).toBe(true);
    expect(
      readFileSync(resolve('public/projects/media/pos-demo.en.vtt'), 'utf8'),
    ).toContain('POS terminal operation demonstration.');
  });
  it('focuses the mobile menu, confines keyboard focus and releases scrolling on desktop', async () => {
    let resize: (() => void) | undefined;
    const desktop = {
      matches: false,
      addEventListener: (_: string, listener: () => void) => {
        resize = listener;
      },
      removeEventListener: vi.fn(),
    };
    const fallback = (query: string) => ({
      matches: query === '(prefers-color-scheme: dark)' ? false : false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.spyOn(window, 'matchMedia').mockImplementation((query) =>
      query === '(min-width: 901px)'
        ? (desktop as unknown as MediaQueryList)
        : (fallback(query) as unknown as MediaQueryList),
    );
    const user = userEvent.setup();
    render(<Portfolio />);
    await user.click(screen.getByRole('button', { name: 'Abrir menú' }));
    const navigation = screen.getByRole('navigation', {
      name: 'Navegación móvil',
    });
    expect(document.activeElement).toBe(
      within(navigation).getByRole('link', { name: 'Proyectos' }),
    );
    const last = within(navigation).getByRole('link', { name: 'Contacto' });
    act(() => last.focus());
    await user.keyboard('{Tab}');
    expect(document.activeElement?.classList.contains('wordmark')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');
    act(() => {
      desktop.matches = true;
      resize?.();
    });
    expect(
      screen.queryByRole('navigation', { name: 'Navegación móvil' }),
    ).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.getElementById('contenido')?.inert).not.toBe(true);
  });
  it('does not run shared-element navigation while motion is paused', () => {
    const start = vi.fn();
    const go = vi.fn();
    const original = Object.getOwnPropertyDescriptor(
      document,
      'startViewTransition',
    )?.value;
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: start,
    });
    document.documentElement.dataset.motion = 'paused';
    navigateWithTransition(go);
    expect(go).toHaveBeenCalledOnce();
    expect(start).not.toHaveBeenCalled();
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: original,
    });
  });
});
