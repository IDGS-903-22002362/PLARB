import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProjectVisual from '../components/portfolio/project-visual';
import { PreferencesProvider } from '../components/portfolio/preferences';
import { projectMedia } from '../lib/project-media';

function Gallery({ kind = 'app' }: { kind?: keyof typeof projectMedia }) {
  return (
    <PreferencesProvider>
      <ProjectVisual kind={kind} expanded />
    </PreferencesProvider>
  );
}

describe('Curated project evidence', () => {
  it('includes the complete supplied image set and only groups admin alongside general', () => {
    expect(projectMedia.app).toHaveLength(18);
    expect(projectMedia.store).toHaveLength(17);
    expect(projectMedia.pos).toHaveLength(16);
    expect(projectMedia.iot).toHaveLength(20);
    expect(new Set(projectMedia.app.map((item) => item.section))).toEqual(
      new Set(['general']),
    );
    expect(new Set(projectMedia.iot.map((item) => item.section))).toEqual(
      new Set(['general']),
    );
    expect(new Set(projectMedia.store.map((item) => item.section))).toEqual(
      new Set(['general', 'admin']),
    );
    expect(new Set(projectMedia.pos.map((item) => item.section))).toEqual(
      new Set(['general', 'admin']),
    );
    expect(
      Object.values(projectMedia)
        .flat()
        .filter((item) => item.video),
    ).toHaveLength(1);
  });
  it('marks two intentional cover views per project instead of using the first upload', () => {
    for (const items of Object.values(projectMedia)) {
      const covers = items.filter((item) => item.featured);
      expect(covers).toHaveLength(2);
      expect(covers.every((item) => !item.video)).toBe(true);
    }
    expect(projectMedia.app[0].featured).toBeUndefined();
    expect(projectMedia.app[12].featured).toBe(true);
    expect(projectMedia.app[13].featured).toBe(true);
  });
  it('uses existing optimized local assets with dimensions and bilingual captions', () => {
    for (const items of Object.values(projectMedia)) {
      expect(items.length).toBeGreaterThan(1);
      for (const item of items) {
        for (const file of [
          item.src,
          item.thumbnail,
          ...(item.video ? [item.video] : []),
        ]) {
          expect(file.startsWith('/projects/media/')).toBe(true);
          expect(existsSync(resolve('public', file.slice(1)))).toBe(true);
        }
        expect(item.width).toBeGreaterThan(0);
        expect(item.height).toBeGreaterThan(0);
        expect(item.caption.es.length).toBeGreaterThan(10);
        expect(item.caption.en.length).toBeGreaterThan(10);
      }
    }
  });
  it('keeps covers static, lightweight and accessible', () => {
    const { container } = render(
      <PreferencesProvider>
        <ProjectVisual kind="pos" />
      </PreferencesProvider>,
    );
    expect(container.querySelector('video')).toBeNull();
    expect(screen.getAllByRole('img')).toHaveLength(2);
    const images = screen.getAllByRole('img');
    expect(images[0].getAttribute('loading')).toBe('eager');
    expect(images[1].getAttribute('loading')).toBe('lazy');
  });
  it('selects views and wraps navigation without hiding the selected capture', async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    await user.click(screen.getByRole('button', { name: 'Vista siguiente' }));
    expect(
      screen.getByRole('img', { name: projectMedia.app[1].caption.es }),
    ).toBeTruthy();
    await user.click(screen.getByRole('button', { name: 'Vista anterior' }));
    await user.click(screen.getByRole('button', { name: 'Vista anterior' }));
    const last = projectMedia.app.length - 1;
    expect(
      screen
        .getByRole('button', {
          name: `${last + 1}. ${projectMedia.app[last].caption.es}`,
        })
        .getAttribute('aria-pressed'),
    ).toBe('true');
  });
  it('opens the accessible enlargement and returns focus after Escape', async () => {
    const user = userEvent.setup();
    render(<Gallery />);
    const trigger = screen.getByRole('button', { name: 'Ampliar vista' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog');
    expect(
      within(dialog).getByRole('img', { name: projectMedia.app[0].caption.es }),
    ).toBeTruthy();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(document.activeElement).toBe(trigger);
  });
  it('loads the complete video only on selection, with controls and no autoplay', async () => {
    const user = userEvent.setup();
    const { container } = render(<Gallery kind="pos" />);
    expect(container.querySelector('video')).toBeNull();
    const index = projectMedia.pos.findIndex((item) => item.video);
    const item = projectMedia.pos[index];
    await user.click(
      screen.getByRole('button', { name: `${index + 1}. ${item.caption.es}` }),
    );
    const video = container.querySelector('video')!;
    expect(video.controls).toBe(true);
    expect(video.autoplay).toBe(false);
    expect(video.preload).toBe('none');
    expect(video.getAttribute('poster')).toBe(item.src);
  });
  it('uses translated gallery labels and captions', () => {
    localStorage.setItem('portfolio-locale', 'en');
    render(<Gallery kind="store" />);
    expect(
      screen.getByRole('region', { name: 'Project gallery' }),
    ).toBeTruthy();
    expect(
      screen.getByRole('img', { name: projectMedia.store[0].caption.en }),
    ).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Enlarge view' })).toBeTruthy();
  });
});
