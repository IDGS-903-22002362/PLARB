export const profile = {
  name: 'Luis Alberto Rosas Bocanegra',
  brand: 'luisrosas',
  title: 'Ingeniero en Desarrollo y Gestión de Software',
  email: 'ingluisrosascontacto@gmail.com',
  phone: '+52 477 353 8866',
  phoneHref: 'tel:+524773538866',
  cv: '/Luis-Alberto-Rosas-CV.pdf',
  github: '',
  linkedin: '',
};

export type Project = {
  id: string;
  number: string;
  title: string;
  category: string;
  short: string;
  stack: string[];
  challenge: string;
  solution: string;
  decisions: { title: string; text: string }[];
  outcome: string;
  repositories: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    id: 'tienda',
    number: '01',
    title: 'La Guarida · Tienda oficial',
    category: 'E-COMMERCE · FULL STACK',
    short:
      'E-commerce oficial de Club León: catálogo por talla, checkout con Stripe y Aplazo, reservas de inventario y administración de pedidos.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'Firebase', 'Stripe'],
    challenge:
      'Conectar la experiencia de compra de los aficionados con una operación comercial real: variantes y tallas, disponibilidad, promociones, pagos y seguimiento de pedidos.',
    solution:
      'Una tienda con catálogo y personalización, checkout con Stripe e integración Aplazo, entrega a domicilio o recogida, y herramientas administrativas para operar productos e inventario.',
    decisions: [
      {
        title: 'Pagos idempotentes y validación de importes',
        text: 'Intentos de pago e idempotencia para manejar reintentos. El backend recalcula importes y procesa eventos del proveedor antes de finalizar la orden.',
      },
      {
        title: 'Inventario consistente',
        text: 'Reservas de existencias durante el checkout y manejo de concurrencia para coordinar la disponibilidad con la creación y confirmación de pedidos.',
      },
      {
        title: 'Probador virtual y asistente administrativo',
        text: 'Probador virtual con consentimiento y eliminación de imágenes, además de un asistente administrativo con tablas, indicadores y gráficas.',
      },
    ],
    outcome:
      'La Guarida está disponible en tiendalaguarida.com. Permite comprar artículos oficiales, elegir entrega o recogida y consultar pedidos; la administración conecta catálogo, pagos e inventario.',
    repositories: ['TiendaFrontCL', 'BackendCL'],
    links: [
      { label: 'Visitar La Guarida', href: 'https://tiendalaguarida.com/' },
    ],
  },
  {
    id: 'concesiones',
    number: '02',
    title: 'Punto de venta de concesiones',
    category: 'PUNTO DE VENTA · SISTEMAS DE OPERACIÓN',
    short:
      'Ventas por concesión, productos y combos, descuentos, control de existencias, cortes por conteo y pedidos VIP.',
    stack: ['Next.js', 'React', 'Express', 'Firebase', 'Zod'],
    challenge:
      'Organizar el flujo de trabajo de distintas concesiones, desde la venta y el inventario hasta el corte, con reglas de negocio compartidas y datos consistentes.',
    solution:
      'Un punto de venta con operación por concesión, combos y descuentos, inventarios, cortes por conteo e integración de lealtad. La API VIP conecta pedidos con Stripe Checkout.',
    decisions: [
      {
        title: 'Módulos de ventas, inventario y cortes',
        text: 'Separación de ventas, inventarios y cortes para representar las necesidades de la operación y mantener responsabilidades claras.',
      },
      {
        title: 'Pedidos VIP e inventario compartido',
        text: 'La API VIP reutiliza el inventario del punto de venta. La confirmación de pagos se procesa mediante webhooks con firma de Stripe.',
      },
      {
        title: 'Contratos y validación',
        text: 'TypeScript, validación Zod y una API Express. Pruebas con Jest y Supertest en backend, y pruebas para los cortes en frontend.',
      },
    ],
    outcome:
      'El personal de concesiones registra ventas, consulta existencias y realiza cortes en el mismo sistema. La API VIP comparte el inventario del POS y confirma pagos mediante webhooks de Stripe.',
    repositories: ['PuntoVentaConcesion', 'PuntoVentaConcesionBackend'],
    links: [],
  },
  {
    id: 'app',
    number: '03',
    title: 'Club León FC · App oficial',
    category: 'APP MÓVIL · IOS & ANDROID',
    short:
      'App Flutter para iOS y Android con calendario masculino y femenil, Fiera Racha, notificaciones y acceso a La Guarida.',
    stack: ['Flutter', 'Dart', 'Firebase', 'Swift', 'Kotlin'],
    challenge:
      'Llevar la experiencia del club a iOS y Android, conectar contenido y comercio, y hacer que la interacción siga siendo útil desde la pantalla de inicio del teléfono.',
    solution:
      'Una app Flutter con calendario masculino y femenil, racha diaria, notificaciones con enlaces directos y acceso a la tienda mediante una sesión WebView.',
    decisions: [
      {
        title: 'Flutter con widgets Swift y Kotlin',
        text: 'Una base compartida en Dart, complementada con widgets de Fiera Racha en Swift/WidgetKit y Kotlin/RemoteViews.',
      },
      {
        title: 'Notificaciones con deep links',
        text: 'Notificaciones push con deep links a productos, pedidos y carrito, y un enlace específico desde el widget hacia la racha.',
      },
      {
        title: 'Caché de calendario y sincronización de widgets',
        text: 'Caché del calendario y protección frente a respuestas tardías. Sincronización de la racha entre Flutter y los widgets del sistema.',
      },
    ],
    outcome:
      'La app oficial se distribuye en App Store y Google Play. El proyecto incorpora calendario, tienda y notificaciones, además de widgets de Fiera Racha para la pantalla de inicio.',
    repositories: ['FrontClubLeon', 'BackendCL'],
    links: [
      {
        label: 'App Store',
        href: 'https://apps.apple.com/mx/app/club-le%C3%B3n-fc/id6770619269',
      },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=mx.clubleon.oficial&hl=es_MX',
      },
    ],
  },
];

export const expertise = [
  {
    number: '01',
    title: 'Frontend web y desarrollo móvil',
    text: 'React y Next.js para La Guarida y el punto de venta; Flutter y Dart para la app oficial de Club León. Widgets de Fiera Racha en Swift/WidgetKit y Kotlin/RemoteViews.',
    tags: ['React', 'Next.js', 'Flutter', 'Dart'],
    kind: 'interface',
  },
  {
    number: '02',
    title: 'APIs, pagos y control de existencias',
    text: 'APIs con Node.js, Express y TypeScript. Validación con Zod, reservas de stock durante el checkout, idempotencia en pagos y procesamiento de webhooks de Stripe y Aplazo.',
    tags: ['Node.js', 'Express', 'TypeScript', 'Zod'],
    kind: 'backend',
  },
  {
    number: '03',
    title: 'Firebase e integraciones de producto',
    text: 'Firebase Auth, Firestore y Cloud Functions para autenticación, datos y backend. Notificaciones push con deep links, probador virtual y asistente administrativo con IA.',
    tags: ['Firebase', 'Cloud Functions', 'Stripe', 'IA'],
    kind: 'systems',
  },
];

export const education = [
  {
    period: '2024 — 2025',
    title: 'Ingeniería en Desarrollo y Gestión de Software',
    institution: 'Universidad Tecnológica de León',
  },
  {
    period: '2022 — 2024',
    title: 'TSU en Desarrollo de Software Multiplataforma',
    institution: 'Universidad Tecnológica de León',
  },
];

export const previousProjects = [
  {
    year: '2024',
    title: 'Punto de venta web',
    role: 'Desarrollador full stack',
    description:
      'Ventas, inventario y cortes de caja; acceso por roles y transacciones con SQLAlchemy. Reportes diarios, semanales y mensuales con exportación CSV y PDF.',
    stack: ['Python / Flask', 'MySQL', 'SQLAlchemy', 'Tailwind / Flowbite'],
  },
  {
    year: '2025',
    title: 'E-commerce y control de riego IoT',
    role: 'Full stack / Mobile',
    description:
      'Catálogo, carrito, checkout y panel de órdenes. Backend .NET con Entity Framework y JWT, frontend Angular y aplicación Android para controlar riego y recibir telemetría y alertas con Firebase.',
    stack: ['.NET / EF', 'SQL Server', 'Angular', 'Kotlin', 'Firebase'],
  },
];

export const certifications = [
  {
    year: '2023',
    title: 'Scrum Developer Certified',
    detail: 'TestingProgram · 23–27 de octubre',
  },
  {
    year: '2022',
    title: 'Redes CCNA',
    detail: 'Cisco NetAcad · septiembre–diciembre',
  },
];
