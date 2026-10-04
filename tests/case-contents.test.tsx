import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import CaseStudy from '../components/portfolio/case-study';
import { SiteShell } from '../components/portfolio/shell';
import { studies } from '../lib/projects';

vi.mock('../components/portfolio/project-ascii-background', () => ({ default: () => null }));
vi.mock('../components/portfolio/system-reassembly', () => ({ default: () => null }));

afterEach(() => {
  window.history.replaceState({}, '', '/');
  vi.unstubAllGlobals();
});

function renderCase() {
  return render(
    <SiteShell>
      <CaseStudy project={studies[1]} next={studies[2]} />
    </SiteShell>,
  );
}

describe('Case contents navigation', () => {
  it('identifies the section from a deep link and browser history', () => {
    window.history.replaceState({}, '', '/projects/la-guarida#decisiones');
    renderCase();
    const contents = within(screen.getByRole('navigation', { name: 'Contenido del caso' }));
    expect(contents.getByRole('link', { name: 'Decisiones' }).getAttribute('aria-current')).toBe('location');
    act(() => {
      window.history.replaceState({}, '', '#resultados');
      window.dispatchEvent(new HashChangeEvent('hashchange'));
    });
    expect(contents.getByRole('link', { name: 'Resultados' }).getAttribute('aria-current')).toBe('location');
    expect(contents.getByRole('link', { name: 'Decisiones' }).hasAttribute('aria-current')).toBe(false);
  });

  it('marks keyboard-activated anchors immediately while retaining native links', async () => {
    renderCase();
    const link = within(screen.getByRole('navigation', { name: 'Contenido del caso' })).getByRole('link', { name: 'Arquitectura' });
    link.focus();
    await userEvent.keyboard('{Enter}');
    expect(link.getAttribute('aria-current')).toBe('location');
    expect(link.getAttribute('href')).toBe('#arquitectura');
  });

  it('updates the reading location when scrolling and disconnects its observer', () => {
    const observers: { callback: IntersectionObserverCallback; targets: Element[]; disconnect: ReturnType<typeof vi.fn> }[] = [];
    vi.stubGlobal('IntersectionObserver', class {
      targets: Element[] = [];
      disconnect = vi.fn();
      constructor(public callback: IntersectionObserverCallback) { observers.push(this); }
      observe(element: Element) { this.targets.push(element); }
      unobserve() {}
    });
    const view = renderCase();
    const observer = observers.find((entry) => entry.targets.some((target) => target.id === 'contexto'));
    expect(observer).toBeTruthy();
    const section = document.getElementById('implementacion')!;
    act(() => observer!.callback([
      { target: section, isIntersecting: true, intersectionRatio: 0.5, boundingClientRect: new DOMRect(0, 160, 100, 100), intersectionRect: new DOMRect(0, 160, 100, 100), rootBounds: null, time: 0 },
    ], {} as IntersectionObserver));
    expect(within(screen.getByRole('navigation', { name: 'Contenido del caso' })).getByRole('link', { name: 'Implementación' }).getAttribute('aria-current')).toBe('location');
    view.unmount();
    expect(observer!.disconnect).toHaveBeenCalled();
  });
});
