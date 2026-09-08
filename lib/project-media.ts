import type { Copy, Study } from './projects';

export type ProjectMedia = {
  src: string;
  thumbnail: string;
  width: number;
  height: number;
  section: 'general' | 'admin';
  featured?: boolean;
  caption: Copy;
  video?: string;
};

/** Complete supplied project media, optimized locally without changing originals. */
export const projectMedia: Record<Study['kind'], ProjectMedia[]> = {
  app: [
    {
      src: '/projects/media/app-general-01.webp',
      thumbnail: '/projects/media/app-general-01-thumb.webp',
      width: 1080,
      height: 2400,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 1',
        en: 'Club León · mobile experience · view 1',
      },
    },
    {
      src: '/projects/media/app-general-02.webp',
      thumbnail: '/projects/media/app-general-02-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 2',
        en: 'Club León · mobile experience · view 2',
      },
    },
    {
      src: '/projects/media/app-general-03.webp',
      thumbnail: '/projects/media/app-general-03-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 3',
        en: 'Club León · mobile experience · view 3',
      },
    },
    {
      src: '/projects/media/app-general-04.webp',
      thumbnail: '/projects/media/app-general-04-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 4',
        en: 'Club León · mobile experience · view 4',
      },
    },
    {
      src: '/projects/media/app-general-05.webp',
      thumbnail: '/projects/media/app-general-05-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 5',
        en: 'Club León · mobile experience · view 5',
      },
    },
    {
      src: '/projects/media/app-general-06.webp',
      thumbnail: '/projects/media/app-general-06-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 6',
        en: 'Club León · mobile experience · view 6',
      },
    },
    {
      src: '/projects/media/app-general-07.webp',
      thumbnail: '/projects/media/app-general-07-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 7',
        en: 'Club León · mobile experience · view 7',
      },
    },
    {
      src: '/projects/media/app-general-08.webp',
      thumbnail: '/projects/media/app-general-08-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 8',
        en: 'Club León · mobile experience · view 8',
      },
    },
    {
      src: '/projects/media/app-general-09.webp',
      thumbnail: '/projects/media/app-general-09-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 9',
        en: 'Club León · mobile experience · view 9',
      },
    },
    {
      src: '/projects/media/app-general-10.webp',
      thumbnail: '/projects/media/app-general-10-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 10',
        en: 'Club León · mobile experience · view 10',
      },
    },
    {
      src: '/projects/media/app-general-11.webp',
      thumbnail: '/projects/media/app-general-11-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 11',
        en: 'Club León · mobile experience · view 11',
      },
    },
    {
      src: '/projects/media/app-general-12.webp',
      thumbnail: '/projects/media/app-general-12-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 12',
        en: 'Club León · mobile experience · view 12',
      },
    },
    {
      src: '/projects/media/app-general-13.webp',
      featured: true,
      thumbnail: '/projects/media/app-general-13-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 13',
        en: 'Club León · mobile experience · view 13',
      },
    },
    {
      src: '/projects/media/app-general-14.webp',
      featured: true,
      thumbnail: '/projects/media/app-general-14-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 14',
        en: 'Club León · mobile experience · view 14',
      },
    },
    {
      src: '/projects/media/app-general-15.webp',
      thumbnail: '/projects/media/app-general-15-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 15',
        en: 'Club León · mobile experience · view 15',
      },
    },
    {
      src: '/projects/media/app-general-16.webp',
      thumbnail: '/projects/media/app-general-16-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 16',
        en: 'Club León · mobile experience · view 16',
      },
    },
    {
      src: '/projects/media/app-general-17.webp',
      thumbnail: '/projects/media/app-general-17-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 17',
        en: 'Club León · mobile experience · view 17',
      },
    },
    {
      src: '/projects/media/app-general-18.webp',
      thumbnail: '/projects/media/app-general-18-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Club León · experiencia móvil · vista 18',
        en: 'Club León · mobile experience · view 18',
      },
    },
  ],
  store: [
    {
      src: '/projects/media/store-general-01.webp',
      featured: true,
      thumbnail: '/projects/media/store-general-01-thumb.webp',
      width: 1907,
      height: 1047,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 1',
        en: 'La Guarida · public storefront · view 1',
      },
    },
    {
      src: '/projects/media/store-general-02.webp',
      featured: true,
      thumbnail: '/projects/media/store-general-02-thumb.webp',
      width: 1917,
      height: 1041,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 2',
        en: 'La Guarida · public storefront · view 2',
      },
    },
    {
      src: '/projects/media/store-general-03.webp',
      thumbnail: '/projects/media/store-general-03-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 3',
        en: 'La Guarida · public storefront · view 3',
      },
    },
    {
      src: '/projects/media/store-general-04.webp',
      thumbnail: '/projects/media/store-general-04-thumb.webp',
      width: 1917,
      height: 1047,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 4',
        en: 'La Guarida · public storefront · view 4',
      },
    },
    {
      src: '/projects/media/store-general-05.webp',
      thumbnail: '/projects/media/store-general-05-thumb.webp',
      width: 1917,
      height: 1042,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 5',
        en: 'La Guarida · public storefront · view 5',
      },
    },
    {
      src: '/projects/media/store-general-06.webp',
      thumbnail: '/projects/media/store-general-06-thumb.webp',
      width: 1917,
      height: 1038,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 6',
        en: 'La Guarida · public storefront · view 6',
      },
    },
    {
      src: '/projects/media/store-general-07.webp',
      thumbnail: '/projects/media/store-general-07-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 7',
        en: 'La Guarida · public storefront · view 7',
      },
    },
    {
      src: '/projects/media/store-general-08.webp',
      thumbnail: '/projects/media/store-general-08-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 8',
        en: 'La Guarida · public storefront · view 8',
      },
    },
    {
      src: '/projects/media/store-general-09.webp',
      thumbnail: '/projects/media/store-general-09-thumb.webp',
      width: 1897,
      height: 1037,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 9',
        en: 'La Guarida · public storefront · view 9',
      },
    },
    {
      src: '/projects/media/store-general-10.webp',
      thumbnail: '/projects/media/store-general-10-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'general',
      caption: {
        es: 'La Guarida · tienda pública · vista 10',
        en: 'La Guarida · public storefront · view 10',
      },
    },
    {
      src: '/projects/media/store-admin-01.webp',
      thumbnail: '/projects/media/store-admin-01-thumb.webp',
      width: 1917,
      height: 1032,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 1',
        en: 'La Guarida · administration · view 1',
      },
    },
    {
      src: '/projects/media/store-admin-02.webp',
      thumbnail: '/projects/media/store-admin-02-thumb.webp',
      width: 1917,
      height: 1032,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 2',
        en: 'La Guarida · administration · view 2',
      },
    },
    {
      src: '/projects/media/store-admin-03.webp',
      thumbnail: '/projects/media/store-admin-03-thumb.webp',
      width: 1916,
      height: 1032,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 3',
        en: 'La Guarida · administration · view 3',
      },
    },
    {
      src: '/projects/media/store-admin-04.webp',
      thumbnail: '/projects/media/store-admin-04-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 4',
        en: 'La Guarida · administration · view 4',
      },
    },
    {
      src: '/projects/media/store-admin-05.webp',
      thumbnail: '/projects/media/store-admin-05-thumb.webp',
      width: 1917,
      height: 1042,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 5',
        en: 'La Guarida · administration · view 5',
      },
    },
    {
      src: '/projects/media/store-admin-06.webp',
      thumbnail: '/projects/media/store-admin-06-thumb.webp',
      width: 1917,
      height: 1035,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 6',
        en: 'La Guarida · administration · view 6',
      },
    },
    {
      src: '/projects/media/store-admin-07.webp',
      thumbnail: '/projects/media/store-admin-07-thumb.webp',
      width: 1917,
      height: 1037,
      section: 'admin',
      caption: {
        es: 'La Guarida · administración · vista 7',
        en: 'La Guarida · administration · view 7',
      },
    },
  ],
  pos: [
    {
      src: '/projects/media/pos-general-01.webp',
      featured: true,
      thumbnail: '/projects/media/pos-general-01-thumb.webp',
      width: 427,
      height: 928,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 1',
        en: 'Suites · ordering experience · view 1',
      },
    },
    {
      src: '/projects/media/pos-general-02.webp',
      featured: true,
      thumbnail: '/projects/media/pos-general-02-thumb.webp',
      width: 422,
      height: 932,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 2',
        en: 'Suites · ordering experience · view 2',
      },
    },
    {
      src: '/projects/media/pos-general-03.webp',
      thumbnail: '/projects/media/pos-general-03-thumb.webp',
      width: 425,
      height: 927,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 3',
        en: 'Suites · ordering experience · view 3',
      },
    },
    {
      src: '/projects/media/pos-general-04.webp',
      thumbnail: '/projects/media/pos-general-04-thumb.webp',
      width: 427,
      height: 931,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 4',
        en: 'Suites · ordering experience · view 4',
      },
    },
    {
      src: '/projects/media/pos-general-05.webp',
      thumbnail: '/projects/media/pos-general-05-thumb.webp',
      width: 428,
      height: 932,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 5',
        en: 'Suites · ordering experience · view 5',
      },
    },
    {
      src: '/projects/media/pos-general-06.webp',
      thumbnail: '/projects/media/pos-general-06-thumb.webp',
      width: 423,
      height: 930,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 6',
        en: 'Suites · ordering experience · view 6',
      },
    },
    {
      src: '/projects/media/pos-general-07.webp',
      thumbnail: '/projects/media/pos-general-07-thumb.webp',
      width: 427,
      height: 928,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 7',
        en: 'Suites · ordering experience · view 7',
      },
    },
    {
      src: '/projects/media/pos-general-08.webp',
      thumbnail: '/projects/media/pos-general-08-thumb.webp',
      width: 430,
      height: 930,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 8',
        en: 'Suites · ordering experience · view 8',
      },
    },
    {
      src: '/projects/media/pos-general-09.webp',
      thumbnail: '/projects/media/pos-general-09-thumb.webp',
      width: 427,
      height: 932,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 9',
        en: 'Suites · ordering experience · view 9',
      },
    },
    {
      src: '/projects/media/pos-general-10.webp',
      thumbnail: '/projects/media/pos-general-10-thumb.webp',
      width: 427,
      height: 932,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 10',
        en: 'Suites · ordering experience · view 10',
      },
    },
    {
      src: '/projects/media/pos-general-11.webp',
      thumbnail: '/projects/media/pos-general-11-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Palcos · experiencia de compra · vista 11',
        en: 'Suites · ordering experience · view 11',
      },
    },
    {
      src: '/projects/media/pos-admin-01.webp',
      thumbnail: '/projects/media/pos-admin-01-thumb.webp',
      width: 720,
      height: 1440,
      section: 'admin',
      caption: {
        es: 'Central Palcos · operación · vista 1',
        en: 'Central Palcos · operations · view 1',
      },
    },
    {
      src: '/projects/media/pos-admin-02.webp',
      thumbnail: '/projects/media/pos-admin-02-thumb.webp',
      width: 720,
      height: 1440,
      section: 'admin',
      caption: {
        es: 'Central Palcos · operación · vista 2',
        en: 'Central Palcos · operations · view 2',
      },
    },
    {
      src: '/projects/media/pos-admin-03.webp',
      thumbnail: '/projects/media/pos-admin-03-thumb.webp',
      width: 720,
      height: 1440,
      section: 'admin',
      caption: {
        es: 'Central Palcos · operación · vista 3',
        en: 'Central Palcos · operations · view 3',
      },
    },
    {
      src: '/projects/media/pos-admin-04.webp',
      thumbnail: '/projects/media/pos-admin-04-thumb.webp',
      width: 720,
      height: 1440,
      section: 'admin',
      caption: {
        es: 'Central Palcos · operación · vista 4',
        en: 'Central Palcos · operations · view 4',
      },
    },
    {
      src: '/projects/media/pos-demo.webp',
      thumbnail: '/projects/media/pos-demo-thumb.webp',
      width: 464,
      height: 832,
      section: 'admin',
      video: '/projects/media/pos-demo.mp4',
      caption: {
        es: 'Central Palcos · demostración completa en terminal',
        en: 'Central Palcos · full terminal demonstration',
      },
    },
  ],
  iot: [
    {
      src: '/projects/media/iot-general-01.webp',
      thumbnail: '/projects/media/iot-general-01-thumb.webp',
      width: 1919,
      height: 1000,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 1',
        en: 'Smart irrigation · connected product · view 1',
      },
    },
    {
      src: '/projects/media/iot-general-02.webp',
      featured: true,
      thumbnail: '/projects/media/iot-general-02-thumb.webp',
      width: 1918,
      height: 1006,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 2',
        en: 'Smart irrigation · connected product · view 2',
      },
    },
    {
      src: '/projects/media/iot-general-03.webp',
      thumbnail: '/projects/media/iot-general-03-thumb.webp',
      width: 1918,
      height: 1005,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 3',
        en: 'Smart irrigation · connected product · view 3',
      },
    },
    {
      src: '/projects/media/iot-general-04.webp',
      thumbnail: '/projects/media/iot-general-04-thumb.webp',
      width: 1919,
      height: 1006,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 4',
        en: 'Smart irrigation · connected product · view 4',
      },
    },
    {
      src: '/projects/media/iot-general-05.webp',
      thumbnail: '/projects/media/iot-general-05-thumb.webp',
      width: 1919,
      height: 1004,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 5',
        en: 'Smart irrigation · connected product · view 5',
      },
    },
    {
      src: '/projects/media/iot-general-06.webp',
      featured: true,
      thumbnail: '/projects/media/iot-general-06-thumb.webp',
      width: 1916,
      height: 1007,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 6',
        en: 'Smart irrigation · connected product · view 6',
      },
    },
    {
      src: '/projects/media/iot-general-07.webp',
      thumbnail: '/projects/media/iot-general-07-thumb.webp',
      width: 1897,
      height: 1009,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 7',
        en: 'Smart irrigation · connected product · view 7',
      },
    },
    {
      src: '/projects/media/iot-general-08.webp',
      thumbnail: '/projects/media/iot-general-08-thumb.webp',
      width: 1919,
      height: 1007,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 8',
        en: 'Smart irrigation · connected product · view 8',
      },
    },
    {
      src: '/projects/media/iot-general-09.webp',
      thumbnail: '/projects/media/iot-general-09-thumb.webp',
      width: 1916,
      height: 1004,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 9',
        en: 'Smart irrigation · connected product · view 9',
      },
    },
    {
      src: '/projects/media/iot-general-10.webp',
      thumbnail: '/projects/media/iot-general-10-thumb.webp',
      width: 1896,
      height: 1007,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 10',
        en: 'Smart irrigation · connected product · view 10',
      },
    },
    {
      src: '/projects/media/iot-general-11.webp',
      thumbnail: '/projects/media/iot-general-11-thumb.webp',
      width: 1600,
      height: 720,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 11',
        en: 'Smart irrigation · connected product · view 11',
      },
    },
    {
      src: '/projects/media/iot-general-12.webp',
      thumbnail: '/projects/media/iot-general-12-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 12',
        en: 'Smart irrigation · connected product · view 12',
      },
    },
    {
      src: '/projects/media/iot-general-13.webp',
      thumbnail: '/projects/media/iot-general-13-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 13',
        en: 'Smart irrigation · connected product · view 13',
      },
    },
    {
      src: '/projects/media/iot-general-14.webp',
      thumbnail: '/projects/media/iot-general-14-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 14',
        en: 'Smart irrigation · connected product · view 14',
      },
    },
    {
      src: '/projects/media/iot-general-15.webp',
      thumbnail: '/projects/media/iot-general-15-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 15',
        en: 'Smart irrigation · connected product · view 15',
      },
    },
    {
      src: '/projects/media/iot-general-16.webp',
      thumbnail: '/projects/media/iot-general-16-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 16',
        en: 'Smart irrigation · connected product · view 16',
      },
    },
    {
      src: '/projects/media/iot-general-17.webp',
      thumbnail: '/projects/media/iot-general-17-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 17',
        en: 'Smart irrigation · connected product · view 17',
      },
    },
    {
      src: '/projects/media/iot-general-18.webp',
      thumbnail: '/projects/media/iot-general-18-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 18',
        en: 'Smart irrigation · connected product · view 18',
      },
    },
    {
      src: '/projects/media/iot-general-19.webp',
      thumbnail: '/projects/media/iot-general-19-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 19',
        en: 'Smart irrigation · connected product · view 19',
      },
    },
    {
      src: '/projects/media/iot-general-20.webp',
      thumbnail: '/projects/media/iot-general-20-thumb.webp',
      width: 720,
      height: 1600,
      section: 'general',
      caption: {
        es: 'Riego inteligente · producto conectado · vista 20',
        en: 'Smart irrigation · connected product · view 20',
      },
    },
  ],
};
