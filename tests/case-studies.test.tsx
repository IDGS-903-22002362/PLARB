import { describe, it, expect } from 'vitest';
import { render, screen, within, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CaseStudy from '../components/portfolio/case-study';
import { SiteShell } from '../components/portfolio/shell';
import { studies } from '../lib/projects';
import { projectMetadata, siteOrigin, studySchema } from '../lib/metadata';
describe('Case studies', () => {
  it.each(studies)(
    '$slug renders a complete case and the next project',
    (project) => {
      const index = studies.indexOf(project);
      const next = studies[(index + 1) % studies.length];
      render(
        <SiteShell>
          <CaseStudy project={project} next={next} />
        </SiteShell>,
      );
      expect(
        screen.getByRole('heading', { level: 1, name: project.title }),
      ).toBeTruthy();
      for (const a of within(
        screen.getByRole('navigation', { name: 'Contenido del caso' }),
      ).getAllByRole('link')) {
        expect(
          document.querySelector(
            new URL(a.getAttribute('href')!, 'http://localhost').hash,
          ),
        ).not.toBeNull();
      }
      expect(
        screen
          .getByRole('link', {
            name: new RegExp('SIGUIENTE CASO.*' + next.number),
          })
          .getAttribute('href'),
      ).toBe('/projects/' + next.slug);
      const metadata = projectMetadata(project);
      expect(metadata.alternates?.canonical).toBe(
        siteOrigin + '/projects/' + project.slug,
      );
      expect(studySchema(project).creator['@id']).toBe(siteOrigin + '/#person');
    },
  );
  it('updates architecture detail by keyboard activation', async () => {
    const user = userEvent.setup();
    render(
      <SiteShell>
        <CaseStudy project={studies[1]} next={studies[2]} />
      </SiteShell>,
    );
    const node = screen.getByRole('button', { name: /Webhooks/ });
    await act(async () => node.focus());
    await user.keyboard('{Enter}');
    expect(node.getAttribute('aria-pressed')).toBe('true');
    const panel = document.getElementById(node.getAttribute('aria-controls')!);
    expect(panel?.textContent).toContain('Comprueba importes');
  });
  it('translates case content and navigation together', async () => {
    render(
      <SiteShell>
        <CaseStudy project={studies[0]} next={studies[1]} />
      </SiteShell>,
    );
    await userEvent.click(
      screen.getByRole('button', { name: 'Switch to English' }),
    );
    expect(
      screen.getByRole('heading', { name: 'The problem and my contribution.' }),
    ).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Back to work' })).toBeTruthy();
    expect(document.documentElement.lang).toBe('en');
  });
});
