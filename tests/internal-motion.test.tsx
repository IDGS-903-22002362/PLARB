import { afterEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectVisual from '../components/portfolio/project-visual';
import TransitionLink from '../components/portfolio/transition-link';
import { PreferencesProvider } from '../components/portfolio/preferences';

const originalScrollTo = Object.getOwnPropertyDescriptor(
  HTMLElement.prototype,
  'scrollTo',
);
const originalViewTransition = Object.getOwnPropertyDescriptor(
  document,
  'startViewTransition',
);
afterEach(() => {
  vi.restoreAllMocks();
  if (originalScrollTo)
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', originalScrollTo);
  else Reflect.deleteProperty(HTMLElement.prototype, 'scrollTo');
  if (originalViewTransition)
    Object.defineProperty(
      document,
      'startViewTransition',
      originalViewTransition,
    );
  else Reflect.deleteProperty(document, 'startViewTransition');
});

describe('Internal navigation motion', () => {
  it('keeps the active gallery thumbnail immediately visible for keyboard navigation', async () => {
    const scrollTo = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', {
      configurable: true,
      value: scrollTo,
    });
    const user = userEvent.setup();
    render(
      <PreferencesProvider>
        <ProjectVisual kind="app" expanded />
      </PreferencesProvider>,
    );
    scrollTo.mockClear();
    screen.getByRole('button', { name: 'Vista siguiente' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(scrollTo).toHaveBeenLastCalledWith(
      expect.objectContaining({ behavior: 'instant' }),
    );
    expect(
      screen.getByRole('button', { name: /^2\./ }).getAttribute('aria-pressed'),
    ).toBe('true');
  });

  it('does not animate keyboard activation of internal route links', () => {
    const startViewTransition = vi.fn();
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      value: startViewTransition,
    });
    document.documentElement.dataset.motion = 'playing';
    render(
      <TransitionLink internal href="/projects/la-guarida">
        Siguiente caso
      </TransitionLink>,
    );
    fireEvent.click(screen.getByRole('link'), { detail: 0 });
    expect(startViewTransition).not.toHaveBeenCalled();
  });
});
