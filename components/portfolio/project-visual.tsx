'use client';
import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { ArrowLeft, ArrowRight, Expand, Play, X } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { c, type Study } from '@/lib/projects';
import { projectMedia, type ProjectMedia } from '@/lib/project-media';
import { usePreferences } from './preferences';

function MediaImage({
  item,
  thumbnail = false,
  eager = false,
}: {
  item: ProjectMedia;
  thumbnail?: boolean;
  eager?: boolean;
}) {
  const { t } = usePreferences();
  return (
    <Image
      unoptimized
      src={thumbnail ? item.thumbnail : item.src}
      alt={thumbnail ? '' : t(item.caption)}
      width={item.width}
      height={item.height}
      loading={eager ? 'eager' : 'lazy'}
      priority={eager}
      decoding="async"
    />
  );
}

function MediaPlayer({ item }: { item: ProjectMedia }) {
  const { t, locale, paused } = usePreferences();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const stop = () => {
      if (!player.paused) player.pause();
    };
    const visibility = () => {
      if (document.hidden) stop();
    };
    if (paused) stop();
    document.addEventListener('visibilitychange', visibility);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    observer.observe(player);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [paused]);
  useEffect(() => {
    const tracks = video.current?.textTracks;
    if (tracks)
      for (const track of Array.from(tracks))
        track.mode = track.language === locale ? 'showing' : 'disabled';
  }, [locale]);
  if (!item.video) return <MediaImage item={item} />;
  return (
    <video
      ref={video}
      controls
      playsInline
      preload="none"
      poster={item.src}
      width={item.width}
      height={item.height}
      aria-label={t(item.caption)}
    >
      <source src={item.video} type="video/mp4" />
      <track
        kind="captions"
        src="/projects/media/pos-demo.vtt"
        srcLang="es"
        label="Español"
        default={locale === 'es'}
      />
      <track
        kind="captions"
        src="/projects/media/pos-demo.en.vtt"
        srcLang="en"
        label="English"
        default={locale === 'en'}
      />
      <a href={item.video}>
        {t(c('Abrir demostración en video', 'Open video demonstration'))}
      </a>
    </video>
  );
}

/** Motion only transforms the current capture; interrupted transitions never hide evidence. */
function MediaStage({
  item,
  direction,
  lightbox = false,
}: {
  item: ProjectMedia;
  direction: number;
  lightbox?: boolean;
}) {
  const { paused, t } = usePreferences();
  const media = useRef<HTMLDivElement>(null);
  const portrait = item.width < item.height;
  useEffect(() => {
    if (paused || !media.current) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void import('gsap')
      .then(({ gsap }) => {
        if (disposed || !media.current) return;
        const context = gsap.context(() => {
          gsap.from(media.current, {
            x: direction * 32,
            scale: 0.97,
            rotationY: direction * 3,
            duration: 0.48,
            ease: 'power3.out',
            clearProps: 'transform',
          });
        }, media);
        revert = () => context.revert();
      })
      .catch(() => {});
    return () => {
      disposed = true;
      revert?.();
    };
  }, [item.src, direction, paused]);
  return (
    <div
      className={`${lightbox ? 'lightbox-stage' : 'gallery-stage'} ${portrait ? 'portrait-stage' : 'landscape-stage'}`}
    >
      {!lightbox && (
        <span className="gallery-format">
          {portrait
            ? t(c('Pantalla móvil', 'Mobile screen'))
            : t(c('Vista de escritorio', 'Desktop view'))}
          <span>
            {item.width} × {item.height}
          </span>
        </span>
      )}
      <div
        className="gallery-media"
        ref={media}
        style={{ '--media-ratio': item.width / item.height } as CSSProperties}
      >
        <MediaPlayer item={item} key={item.src} />
      </div>
    </div>
  );
}

export default function ProjectVisual({
  kind,
  expanded = false,
}: {
  kind: Study['kind'];
  expanded?: boolean;
}) {
  const { t, paused } = usePreferences();
  const items = projectMedia[kind];
  const covers = items.filter((media) => media.featured).slice(0, 2);
  const [selection, setSelection] = useState({ index: 0, direction: 1 });
  const [open, setOpen] = useState(false);
  const thumbnails = useRef<HTMLDivElement>(null);
  const selected = selection.index;
  const item = items[selected] ?? items[0];
  const select = (index: number, direction = index >= selected ? 1 : -1) =>
    setSelection({ index: (index + items.length) % items.length, direction });
  const change = (offset: number) =>
    setSelection((current) => ({
      index: (current.index + offset + items.length) % items.length,
      direction: offset,
    }));
  const keyboard = (event: KeyboardEvent<HTMLElement>) => {
    // Keep native playback and thumbnail scrolling shortcuts intact.
    if (
      event.target instanceof Element &&
      event.target.closest('video, .gallery-thumbnails')
    )
      return;
    if (event.key === 'ArrowLeft') {
      event.stopPropagation();
      event.preventDefault();
      change(-1);
    } else if (event.key === 'ArrowRight') {
      event.stopPropagation();
      event.preventDefault();
      change(1);
    } else if (event.key === 'Home') {
      event.stopPropagation();
      event.preventDefault();
      select(0, -1);
    } else if (event.key === 'End') {
      event.stopPropagation();
      event.preventDefault();
      select(items.length - 1, 1);
    }
  };
  useEffect(() => {
    const active = thumbnails.current?.querySelector<HTMLButtonElement>(
      '[aria-pressed="true"]',
    );
    const rail = active?.parentElement;
    if (!active || !rail) return;
    // Scroll only the rail, never the page or a containing section.
    const left =
      active.offsetLeft -
      rail.offsetLeft -
      (rail.clientWidth - active.offsetWidth) / 2;
    if (typeof rail.scrollTo === 'function')
      rail.scrollTo({
        left: Math.max(0, left),
        behavior: paused ? 'instant' : 'smooth',
      });
  }, [selected, paused]);
  const sections = items.reduce<
    Array<{
      section: ProjectMedia['section'];
      entries: Array<{ media: ProjectMedia; index: number }>;
    }>
  >((groups, media, index) => {
    const group = groups.find((entry) => entry.section === media.section);
    if (group) group.entries.push({ media, index });
    else groups.push({ section: media.section, entries: [{ media, index }] });
    return groups;
  }, []);
  const controls = (
    <>
      <button
        className="icon-button"
        type="button"
        onKeyDown={keyboard}
        onClick={() => change(-1)}
        aria-label={t(c('Vista anterior', 'Previous view'))}
      >
        <ArrowLeft size={18} />
      </button>
      <button
        className="icon-button"
        type="button"
        onKeyDown={keyboard}
        onClick={() => change(1)}
        aria-label={t(c('Vista siguiente', 'Next view'))}
      >
        <ArrowRight size={18} />
      </button>
    </>
  );
  if (!expanded)
    return (
      <figure
        className={`product-visual project-media-cover media-${kind}`}
        style={{ viewTransitionName: `project-${kind}` }}
      >
        <div
          className={`cover-composition ${covers.every((media) => media.width < media.height) ? 'portrait-composition' : covers.some((media) => media.width < media.height) ? 'mixed-composition' : 'landscape-composition'}`}
        >
          {covers.map((media, index) => (
            <div
              key={media.src}
              className={`${index === 0 ? 'cover-primary' : 'cover-secondary'} ${media.width < media.height ? 'portrait-cover' : 'landscape-cover'}`}
              style={
                { '--media-ratio': media.width / media.height } as CSSProperties
              }
            >
              <MediaImage item={media} eager={index === 0} />
            </div>
          ))}
        </div>
        <figcaption>
          <span>{t(c('Producto en pantalla', 'Product in focus'))}</span>
          <span>
            {items.length} {t(c('vistas', 'views'))}
          </span>
        </figcaption>
      </figure>
    );
  return (
    <section
      className={`project-gallery gallery-${kind}`}
      aria-label={t(c('Galería del proyecto', 'Project gallery'))}
    >
      <div className="gallery-heading">
        <span>{t(c('Dentro del producto', 'Inside the product'))}</span>
        <span>
          {String(selected + 1).padStart(2, '0')} /{' '}
          {String(items.length).padStart(2, '0')}
        </span>
      </div>
      {!open ? (
        <MediaStage item={item} direction={selection.direction} />
      ) : (
        <div
          className={`gallery-stage ${item.width < item.height ? 'portrait-stage' : 'landscape-stage'}`}
          aria-hidden="true"
        />
      )}
      <div className="gallery-caption">
        <p aria-live="polite" aria-atomic="true">
          {t(item.caption)}
        </p>
        <div className="gallery-controls">
          {controls}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              onKeyDown={keyboard}
              className="icon-button"
              aria-label={t(c('Ampliar vista', 'Enlarge view'))}
            >
              <Expand size={18} />
            </DialogTrigger>
            <DialogContent
              className="media-lightbox"
              showCloseButton={false}
              onKeyDown={keyboard}
            >
              <DialogTitle>{t(item.caption)}</DialogTitle>
              <DialogDescription className="sr-only">
                {t(
                  c(
                    'Captura completa del proyecto. Usa las flechas para navegar y Escape para cerrar.',
                    'Full project capture. Use arrow keys to navigate and Escape to close.',
                  ),
                )}
              </DialogDescription>
              <DialogClose
                className="icon-button lightbox-close"
                aria-label={t(c('Cerrar vista', 'Close view'))}
              >
                <X size={20} />
              </DialogClose>
              <MediaStage
                item={item}
                direction={selection.direction}
                lightbox
              />
              <div className="lightbox-footer">
                <span aria-live="polite">
                  {selected + 1} / {items.length}
                </span>
                <div className="gallery-controls">{controls}</div>
                <a href={item.src} target="_blank" rel="noopener noreferrer">
                  {t(c('Abrir imagen original', 'Open full-size image'))}
                  <span className="sr-only">
                    {t(c(' (nueva pestaña)', ' (new tab)'))}
                  </span>
                </a>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div
        className="gallery-thumbnails"
        ref={thumbnails}
        aria-label={t(c('Seleccionar una vista', 'Select a view'))}
      >
        {sections.map((group) => (
          <div className="gallery-thumb-group" key={group.section}>
            {sections.length > 1 && (
              <span className="gallery-thumb-heading">
                {group.section === 'admin'
                  ? t(c('Administración', 'Admin'))
                  : t(c('General', 'General'))}
              </span>
            )}
            <div className="gallery-thumb-list">
              {group.entries.map(({ media, index }) => (
                <button
                  type="button"
                  key={media.src}
                  className={
                    media.width < media.height
                      ? 'portrait-thumbnail'
                      : 'landscape-thumbnail'
                  }
                  aria-pressed={selected === index}
                  aria-label={`${index + 1}. ${t(media.caption)}`}
                  onClick={() => select(index)}
                >
                  <MediaImage item={media} thumbnail />
                  {media.video && (
                    <Play
                      className="thumbnail-play"
                      size={20}
                      aria-hidden="true"
                    />
                  )}
                  <span>
                    {String(index + 1).padStart(2, '0')}
                    {media.video ? ' / VIDEO' : ''}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
