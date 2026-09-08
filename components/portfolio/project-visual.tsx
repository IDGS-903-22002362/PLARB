'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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
  const { t, paused } = usePreferences();
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const player = video.current;
    if (!player) return;
    const stop = () => {
      if (!player.paused) player.pause();
    };
    const onVisibility = () => {
      if (document.hidden) stop();
    };
    if (paused) stop();
    document.addEventListener('visibilitychange', onVisibility);
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) stop();
    });
    observer.observe(player);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [paused]);
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
      />
      <a href={item.video}>
        {t(c('Abrir demostración en video', 'Open video demonstration'))}
      </a>
    </video>
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
  const coverItems = items.filter((media) => media.featured).slice(0, 2);
  const coverPrimary = coverItems[0] ?? items[0];
  const coverSecondary = coverItems[1] ?? items[1] ?? items[0];
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const item = items[selected] ?? items[0];
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
  const showSections = sections.length > 1;
  const change = (offset: number) =>
    setSelected((value) => (value + offset + items.length) % items.length);
  useEffect(() => {
    if (paused || !expanded || !stage.current) return;
    let disposed = false;
    let revert: (() => void) | undefined;
    void import('gsap')
      .then(({ gsap }) => {
        if (disposed || !stage.current) return;
        const context = gsap.context(() => {
          gsap.from(stage.current, {
            y: 9,
            duration: 0.32,
            ease: 'power2.out',
            clearProps: 'transform',
          });
        });
        revert = () => context.revert();
      })
      .catch(() => {});
    return () => {
      disposed = true;
      revert?.();
    };
  }, [selected, paused, expanded]);

  if (!expanded)
    return (
      <figure
        className={`product-visual project-media-cover media-${kind}`}
        style={{ viewTransitionName: `project-${kind}` }}
      >
        <div
          className={`cover-composition ${coverPrimary.width < coverPrimary.height ? 'portrait-composition' : 'landscape-composition'}`}
        >
          <div className="cover-primary">
            <MediaImage item={coverPrimary} eager />
          </div>
          <div className="cover-secondary">
            <MediaImage item={coverSecondary} />
          </div>
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
      <div
        className={`gallery-stage ${item.width < item.height ? 'portrait-stage' : ''}`}
        ref={stage}
      >
        {!open && <MediaPlayer item={item} key={item.src} />}
      </div>
      <div className="gallery-caption">
        <p aria-live="polite" aria-atomic="true">
          {t(item.caption)}
        </p>
        <div className="gallery-controls">
          <button
            className="icon-button"
            type="button"
            onClick={() => change(-1)}
            aria-label={t(c('Vista anterior', 'Previous view'))}
          >
            <ArrowLeft size={18} />
          </button>
          <button
            className="icon-button"
            type="button"
            onClick={() => change(1)}
            aria-label={t(c('Vista siguiente', 'Next view'))}
          >
            <ArrowRight size={18} />
          </button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="icon-button"
              aria-label={t(c('Ampliar vista', 'Enlarge view'))}
            >
              <Expand size={18} />
            </DialogTrigger>
            <DialogContent className="media-lightbox" showCloseButton={false}>
              <DialogTitle>{t(item.caption)}</DialogTitle>
              <DialogDescription className="sr-only">
                {t(
                  c(
                    'Captura del proyecto. Pulsa Escape para cerrar.',
                    'Project capture. Press Escape to close.',
                  ),
                )}
              </DialogDescription>
              <DialogClose
                className="icon-button lightbox-close"
                aria-label={t(c('Cerrar vista', 'Close view'))}
              >
                <X size={20} />
              </DialogClose>
              <div className="lightbox-stage">
                <MediaPlayer item={item} />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div
        className={`gallery-thumbnails ${showSections ? 'has-sections' : ''}`}
        aria-label={t(c('Seleccionar una vista', 'Select a view'))}
      >
        {(showSections
          ? sections
          : [
              {
                section: items[0].section,
                entries: items.map((media, index) => ({ media, index })),
              },
            ]
        ).map((group) => (
          <div className="gallery-thumb-group" key={group.section}>
            {showSections && (
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
                  aria-pressed={selected === index}
                  aria-label={`${index + 1}. ${t(media.caption)}`}
                  onClick={() => setSelected(index)}
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
