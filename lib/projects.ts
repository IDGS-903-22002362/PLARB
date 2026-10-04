export type Locale = 'es' | 'en';
export type Copy = { es: string; en: string };
export const c = (es: string, en: string): Copy => ({ es, en });
export type Decision = {
  title: Copy;
  problem: Copy;
  decision: Copy;
  reason: Copy;
  tradeoff: Copy;
  outcome: Copy;
};
export type SystemNode = {
  id: string;
  title: string;
  label: Copy;
  detail: Copy;
  x: number;
  y: number;
};
export type Scope = {
  product: Copy;
  team: Copy;
  mine: Copy;
  connected: Copy;
};
export type Study = {
  slug: string;
  number: string;
  title: string;
  subtitle: Copy;
  category: string;
  kind: 'app' | 'store' | 'pos' | 'iot';
  status: Copy;
  role: Copy;
  period: Copy;
  summary: Copy;
  context: Copy;
  problem: Copy;
  contribution: Copy;
  systems: Copy;
  scope: Scope;
  requirements: Copy[];
  stack: string[];
  links: { label: string; href: string }[];
  nodes: SystemNode[];
  edges: [string, string][];
  architecture: Copy;
  decisions: Decision[];
  implementation: Copy[];
  security: Copy;
  results: Copy[];
  lessons: Copy;
};
const node = (
  id: string,
  title: string,
  label: Copy,
  detail: Copy,
  x: number,
  y: number,
): SystemNode => ({ id, title, label, detail, x, y });
export const publicLinks = {
  store: 'https://tiendalaguarida.com/',
  apple: 'https://apps.apple.com/mx/app/club-le%C3%B3n-fc/id6770619269',
  android:
    'https://play.google.com/store/apps/details?id=mx.clubleon.oficial&hl=es_MX',
  palcos: 'https://foodmarket.clubleon.mx/servicio-palcos/inicio/',
};
export const studies: Study[] = [
  {
    slug: 'club-leon-app',
    number: '01',
    title: 'Club León FC',
    kind: 'app',
    subtitle: c(
      'Aplicación móvil oficial con servicios nativos y sincronización de datos.',
      'Official mobile application with native services and data synchronization.',
    ),
    category: 'MOBILE / NATIVE INTEGRATIONS',
    status: c('App publicada', 'Published app'),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c(
      'Ingeniería móvil e integración de servicios',
      'Mobile engineering & service integration',
    ),
    summary: c(
      'App de producción en Flutter para iOS y Android: calendarios en tiempo real, widgets nativos en Swift y Kotlin, push notifications y enlace transaccional a La Guarida.',
      'Production Flutter app for iOS and Android: real-time match calendars, native Swift and Kotlin widgets, push notifications, and transactional deep linking to La Guarida.',
    ),
    context: c(
      'Canal móvil oficial de Club León para consulta de calendarios deportivos, seguimiento de rachas y acceso a la tienda oficial, consolidando múltiples fuentes de datos bajo una arquitectura unificada.',
      'Official mobile channel for Club León match schedules, streak tracking, and official store access, consolidating multiple data sources under a unified architecture.',
    ),
    problem: c(
      'Condiciones de carrera al filtrar categorías de partidos, desalineación en el enrutamiento profundo de push notifications y persistencia bidireccional entre Flutter y el ciclo de vida de widgets nativos.',
      'Race conditions during team category filtering, deep-link routing desynchronization from push notifications, and bidirectional persistence between Flutter and native OS widget lifecycles.',
    ),
    contribution: c(
      'Arquitectura de la app en Flutter y manejo de estado reactivo. Implementación de deep links con Firebase Cloud Messaging y desarrollo de widgets nativos con Swift (WidgetKit) y Kotlin (RemoteViews).',
      'Engineered Flutter architecture and reactive state management. Implemented deep-linking via Firebase Cloud Messaging and developed native widgets with Swift (WidgetKit) and Kotlin (RemoteViews).',
    ),
    systems: c(
      'App Flutter, widgets nativos Swift/Kotlin, backend Firebase y storefront La Guarida.',
      'Flutter app, native Swift/Kotlin widgets, Firebase backend, and La Guarida storefront.',
    ),
    scope: {
      product: c(
        'Aplicación oficial para iOS y Android: calendarios multiequipo, racha diaria, notificaciones transaccionales y deep linking hacia la tienda.',
        'Official iOS and Android app: multi-team calendars, daily streak gamification, transactional notifications, and store deep linking.',
      ),
      team: c(
        'Desarrollo colaborativo en el ecosistema digital del club. El diseño de identidad visual y la administración de contenidos son gestionados por otras áreas del club.',
        'Collaborative engineering in the club’s digital ecosystem. Visual identity design and content operations are managed by separate club divisions.',
      ),
      mine: c(
        'Arquitectura de la app en Flutter/Dart, gestión de estado con Providers, resolución determinista de deep links y extensiones nativas en Swift (iOS) y Kotlin (Android).',
        'Flutter/Dart app architecture, state management with Providers, deterministic deep-link resolution, and native extensions in Swift (iOS) and Kotlin (Android).',
      ),
      connected: c(
        'La Guarida opera como plataforma de comercio externa. Las APIs deportivas y de notificaciones se consumen desacopladas del cliente móvil.',
        'La Guarida operates as an external e-commerce platform. Sports APIs and notification services are consumed decoupled from the mobile client.',
      ),
    },
    requirements: [
      c(
        'Aislamiento de estado y caché independiente para calendarios masculino y femenil.',
        'State isolation and independent caching for men’s and women’s calendars.',
      ),
      c(
        'Estrategia stale-while-revalidate para consulta de datos sin bloqueo de interfaz.',
        'Stale-while-revalidate caching strategy to query data without UI blocking.',
      ),
      c(
        'Manejo determinista de rutas desde push notifications y widgets nativos.',
        'Deterministic route handling from push notifications and native widgets.',
      ),
    ],
    stack: [
      'Flutter',
      'Dart',
      'Firebase',
      'Swift / WidgetKit',
      'Kotlin / RemoteViews',
    ],
    links: [
      { label: 'App Store', href: publicLinks.apple },
      { label: 'Google Play', href: publicLinks.android },
    ],
    architecture: c(
      'Arquitectura en capas: presentación desacoplada mediante Providers, capa de servicios HTTP con serialización tipada y puente nativo de datos para WidgetKit y RemoteViews.',
      'Layered architecture: presentation decoupled via Providers, HTTP service layer with typed serialization, and native platform channels for WidgetKit and RemoteViews.',
    ),
    nodes: [
      node(
        'app',
        'Flutter',
        c('Aplicación Flutter', 'Flutter Application'),
        c(
          'Capa de presentación multiplataforma para iOS y Android con ruteo declarativo.',
          'Cross-platform presentation layer for iOS and Android with declarative routing.',
        ),
        50,
        13,
      ),
      node(
        'state',
        'Providers',
        c('Estado y Caché', 'State and Cache'),
        c(
          'Gestores de estado con versionado por requestId para prevenir sobreescrituras por respuestas tardías.',
          'State managers with requestId versioning to prevent stale out-of-order response overwrites.',
        ),
        26,
        43,
      ),
      node(
        'native',
        'Swift · Kotlin',
        c('Widgets Nativos', 'Native Widgets'),
        c(
          'Módulos en Swift y Kotlin con sincronización de estado local para pantallas de inicio.',
          'Swift and Kotlin native modules with local state sync for home screen widgets.',
        ),
        74,
        43,
      ),
      node(
        'content',
        'APIs',
        c('APIs de Calendario', 'Calendar APIs'),
        c(
          'Consumo de calendarios deportivos con persistencia local y recuperación ante fallos de red.',
          'Sports calendar endpoints with local persistence and offline recovery fallback.',
        ),
        17,
        77,
      ),
      node(
        'firebase',
        'Firebase',
        c('Auth y Notificaciones', 'Auth and Notifications'),
        c(
          'Sesión de usuario y ruteo dinámico hacia vistas internas mediante payloads de FCM.',
          'User session and dynamic internal view routing driven by FCM payloads.',
        ),
        50,
        77,
      ),
      node(
        'store',
        'La Guarida',
        c('Enlace Tienda', 'Store Link'),
        c(
          'Enlace profundo y transferencia de contexto de sesión hacia la plataforma web de La Guarida.',
          'Deep linking and session context pass-through to La Guarida web platform.',
        ),
        83,
        77,
      ),
    ],
    edges: [
      ['app', 'state'],
      ['app', 'native'],
      ['state', 'content'],
      ['state', 'firebase'],
      ['app', 'store'],
    ],
    decisions: [
      {
        title: c(
          'Aislamiento de peticiones y control de concurrencia en calendarios.',
          'Request isolation and concurrency control in calendars.',
        ),
        problem: c(
          'Peticiones de red lentas completadas en desorden al alternar rápidamente entre divisiones masculina y femenil.',
          'Slow out-of-order network responses when toggling rapidly between men’s and women’s divisions.',
        ),
        decision: c(
          'Segmentar la caché en memoria por división e invalidar respuestas entrantes cuyo requestId no coincida con la selección activa.',
          'Partition in-memory cache by division and discard incoming responses whose requestId does not match the active selection.',
        ),
        reason: c(
          'El estado de la vista debe depender exclusivamente de la intención activa del usuario y no de la latencia de red.',
          'View state must strictly reflect the user’s active intent rather than variable network latency.',
        ),
        tradeoff: c(
          'Mantenimiento de particiones de caché independientes y descarte de respuestas desactualizadas.',
          'Requires maintaining separated cache partitions and discarding stale responses.',
        ),
        outcome: c(
          'Eliminación total de vistas cruzadas de calendarios y renderizado inmediato desde caché.',
          'Zero cross-team fixture view contamination and instant cached UI rendering.',
        ),
      },
      {
        title: c(
          'Núcleo compartido en Flutter y extensiones nativas por plataforma.',
          'Shared Flutter core with platform-specific native extensions.',
        ),
        problem: c(
          'Exponer la métrica de racha del usuario en la pantalla de inicio del sistema operativo sin ejecutar Flutter en background.',
          'Display user streak metrics on the OS home screen without running Flutter in the background.',
        ),
        decision: c(
          'Implementar serialización ligera con home_widget conectando con WidgetKit (Swift) y RemoteViews (Kotlin).',
          'Implement lightweight serialization via home_widget interfacing with WidgetKit (Swift) and RemoteViews (Kotlin).',
        ),
        reason: c(
          'Los widgets del sistema operativo imponen restricciones estrictas de memoria y ciclo de vida ajenas al framework.',
          'OS widgets operate under strict memory and lifecycle constraints outside the cross-platform runtime.',
        ),
        tradeoff: c(
          'Mantenimiento dual de bases de código nativas y manejo explícito de canales de plataforma.',
          'Dual maintenance of native codebases and explicit platform channel management.',
        ),
        outcome: c(
          'Actualización eficiente del widget nativo y restauración directa del deep link hacia la app.',
          'Efficient native widget updates with direct deep-link restoration into the app.',
        ),
      },
    ],
    implementation: [
      c(
        'Proveedores de estado reactivo con estrategia de invalidación por identificador de transacción.',
        'Reactive state providers with transaction identifier invalidation strategies.',
      ),
      c(
        'Enrutamiento declarativo para deep links originados en notificaciones push y widgets nativos.',
        'Declarative routing for deep links originated from push notifications and native widgets.',
      ),
      c(
        'Integración de widgets de sistema con Swift/WidgetKit en iOS y Kotlin/RemoteViews en Android.',
        'System widget integration with Swift/WidgetKit on iOS and Kotlin/RemoteViews on Android.',
      ),
    ],
    security: c(
      'Validación de tokens de autenticación en endpoints de usuario, control de expiración de sesión y sanitización de payloads de deep links.',
      'Auth token verification on user endpoints, session expiration handling, and deep-link payload sanitization.',
    ),
    results: [
      c(
        'Aplicación en producción disponible en iOS App Store y Google Play Store.',
        'Production app live on iOS App Store and Google Play Store.',
      ),
      c(
        'Manejo de estado resiliente ante desconexión y latencia variable de red.',
        'Resilient state handling under network disconnection and variable latency.',
      ),
      c(
        'Widgets nativos funcionales integrados con el sistema operativo de cada plataforma.',
        'Functional native widgets fully integrated with each platform’s operating system.',
      ),
    ],
    lessons: c(
      'La portabilidad multiplataforma no reemplaza la arquitectura nativa. Delimitar fronteras claras entre la UI compartida y los servicios nativos previene cuellos de botella en producción.',
      'Cross-platform portability does not replace native architecture. Clear boundaries between shared UI and OS-level services prevent production bottlenecks.',
    ),
  },
  {
    slug: 'la-guarida',
    number: '02',
    title: 'La Guarida',
    kind: 'store',
    category: 'COMMERCE / PAYMENTS / INVENTORY / APPLIED AI',
    subtitle: c(
      'E-commerce de alta concurrencia: reservas transaccionales, pagos e IA acotada.',
      'High-concurrency e-commerce: transactional reservations, payments, and bounded AI.',
    ),
    status: c('En producción', 'In production'),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c('Ingeniería de software full stack', 'Full-stack software engineering'),
    summary: c(
      'Storefront y backend oficial de Club León: catálogo multivariante, checkout transaccional con Stripe y Aplazo, reservas de stock atómicas y flujos de IA acotados por guardrails.',
      'Official Club León storefront and backend: multi-variant catalog, transactional checkout via Stripe and Aplazo, atomic stock reservations, and guardrail-bounded AI workflows.',
    ),
    context: c(
      'Plataforma e-commerce sujeta a picos de tráfico durante partidos. Requiere consistencia estricta en inventario, cálculo determinista de promociones e integración de herramientas asistidas por IA sin delegarles autoridad transaccional.',
      'E-commerce platform subject to matchday traffic spikes. Demands strict inventory consistency, deterministic promotion calculation, and AI-assisted tooling without transactional delegation.',
    ),
    problem: c(
      'Riesgo de sobreventa por checkouts concurrentes, procesamiento asíncrono o duplicado de webhooks de pago y posibles alucinaciones de modelos de lenguaje en precios o inventario.',
      'Overselling risk from concurrent checkouts, asynchronous or duplicated payment webhook deliveries, and potential LLM hallucinations in pricing or inventory state.',
    ),
    contribution: c(
      'Arquitectura y desarrollo del frontend en Next.js/React y APIs en Express/Node.js. Lógica transaccional de reservas, webhooks idempotentes para Stripe/Aplazo y superficies de IA con Gemini y Vertex AI protegidas por esquemas Zod.',
      'Architected and developed Next.js/React frontend and Express/Node.js APIs. Engineered transactional reservations, idempotent Stripe/Aplazo webhooks, and Zod-guarded AI surfaces with Gemini and Vertex AI.',
    ),
    systems: c(
      'Storefront Next.js, API REST en Express, webhooks de Stripe/Aplazo, Firestore transaccional y pipelines de IA en Vertex/Gemini.',
      'Next.js storefront, Express REST API, Stripe/Aplazo webhooks, transactional Firestore, and Vertex/Gemini AI pipelines.',
    ),
    scope: {
      product: c(
        'Plataforma integral de comercio electrónico: catálogo por tallas, carrito reactivo, cálculo de checkout, gestión de órdenes, inventario y módulos de IA aplicada.',
        'End-to-end e-commerce platform: size-based catalog, reactive cart, checkout calculation, order management, inventory, and applied AI modules.',
      ),
      team: c(
        'Responsabilidad sobre la arquitectura de software y el backend transaccional. La logística de almacén y las campañas comerciales son operadas por el área comercial del club.',
        'Ownership over software architecture and transactional backend. Physical warehouse logistics and marketing campaigns are managed by the club’s commercial team.',
      ),
      mine: c(
        'Diseño de contratos de API, reservas atómicas, validación criptográfica de pagos y arquitectura de tres módulos de IA: asistente conversacional, probador virtual y analítica administrativa.',
        'Designed API contracts, atomic reservations, cryptographic payment verification, and three AI modules: shopping assistant, virtual try-on, and admin analytics.',
      ),
      connected: c(
        'Pasarelas de Stripe y Aplazo confirman pagos externamente. Los modelos de IA generan interpretaciones y embeddings sin acceso directo a mutaciones de base de datos.',
        'Stripe and Aplazo gateways verify charges externally. AI models produce interpretations and embeddings without direct database mutation access.',
      ),
    },
    requirements: [
      c(
        'Cálculo determinista de importes, impuestos y promociones exclusivamente en el servidor.',
        'Deterministic calculation of totals, taxes, and discounts executed strictly server-side.',
      ),
      c(
        'Bloqueo transaccional de existencias mediante reservas temporales con expiración automática.',
        'Transactional stock locks using temporary reservations with automated expiration.',
      ),
      c(
        'Manejo idempotente de webhooks de pasarelas de pago con tolerancia a reintentos y orden tardío.',
        'Idempotent payment webhook handling resilient to retries and out-of-order delivery.',
      ),
      c(
        'Aislamiento de modelos de IA con esquemas de validación Zod y sin autorización para finalizar transacciones.',
        'AI model isolation with Zod schema validation and zero authority to finalize transactions.',
      ),
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js / Express',
      'Firebase',
      'Stripe',
      'Aplazo',
      'Zod',
      'Gemini',
      'Vertex AI',
      'Firebase Storage',
    ],
    links: [{ label: 'La Guarida', href: publicLinks.store }],
    architecture: c(
      'Flujo transaccional orquestado: el frontend solicita checkout; el backend calcula precios y crea reservas atómicas en Firestore. Webhooks firmados avanzan la máquina de estados de la orden y consolidan o liberan existencias. Los modelos Gemini y Vertex operan desacoplados como pipelines de consulta sin privilegios de escritura.',
      'Orchestrated transactional flow: frontend requests checkout; backend computes pricing and creates atomic Firestore reservations. Signed webhooks drive the order state machine to confirm or release inventory. Gemini and Vertex operate as decoupled query pipelines without write privileges.',
    ),
    nodes: [
      node(
        'web',
        'Next.js',
        c('Catálogo + checkout', 'Catalog + checkout'),
        c(
          'Frontend Next.js con validación de formularios, estados reactivos y experiencia de compra fluida.',
          'Next.js frontend with client-side form validation, reactive state, and streamlined checkout.',
        ),
        22,
        15,
      ),
      node(
        'api',
        'Express API',
        c('Reglas de negocio', 'Business rules'),
        c(
          'API Express con validación Zod, autenticación de endpoints y cálculo server-side de órdenes.',
          'Express API with Zod schema validation, endpoint auth, and server-side order calculation.',
        ),
        22,
        50,
      ),
      node(
        'pay',
        'Stripe · Aplazo',
        c('Pagos', 'Payments'),
        c(
          'Integración con Stripe y Aplazo para cobro directo y diferido con validación criptográfica.',
          'Stripe and Aplazo integrations for direct and installment payments with cryptographic validation.',
        ),
        78,
        50,
      ),
      node(
        'stock',
        'Inventory',
        c('Reservas por variante', 'Variant reservations'),
        c(
          'Transacciones atómicas para reservar, consolidar, liberar y expirar existencias por SKU.',
          'Atomic transactions to reserve, commit, release, and expire stock per SKU.',
        ),
        16,
        85,
      ),
      node(
        'orders',
        'Orders',
        c('Estados de orden', 'Order states'),
        c(
          'Máquina de estados finitos que vincula pagos validados con reservas de inventario.',
          'Finite state machine linking validated payments to active inventory reservations.',
        ),
        50,
        85,
      ),
      node(
        'events',
        'Webhooks',
        c('Validación + reintentos', 'Validation + retries'),
        c(
          'Comprueba importes mediante firmas criptográficas y deduplica eventos mediante identificadores únicos.',
          'Checks amounts via cryptographic signatures and deduplicates events using unique event IDs.',
        ),
        84,
        85,
      ),
      node(
        'ai',
        'Gemini · Vertex',
        c('IA aplicada', 'Applied AI'),
        c(
          'Asistente de compra, probador virtual y analítica administrativa. El modelo interpreta datos estructurados; no confirma pagos ni altera existencias.',
          'Shopping assistant, virtual try-on, and admin analytics. The model interprets structured data; it does not confirm payments or alter inventory.',
        ),
        78,
        15,
      ),
    ],
    edges: [
      ['web', 'api'],
      ['api', 'pay'],
      ['api', 'stock'],
      ['api', 'orders'],
      ['api', 'ai'],
      ['pay', 'events'],
      ['events', 'orders'],
    ],
    decisions: [
      {
        title: c(
          'Reservas atómicas para mitigar condiciones de carrera en inventario.',
          'Atomic reservations to eliminate inventory race conditions.',
        ),
        problem: c(
          'Múltiples clientes finalizando simultáneamente la compra sobre el último SKU disponible.',
          'Multiple concurrent checkouts attempting to purchase the last available SKU unit.',
        ),
        decision: c(
          'Verificar existencias y emitir reservas temporales dentro de transacciones atómicas de base de datos con TTL explícito.',
          'Check stock and issue temporary reservations within atomic database transactions under an explicit TTL.',
        ),
        reason: c(
          'La validación en cliente o lecturas no transaccionales permiten sobreventas bajo concurrencia elevada.',
          'Client-side checks or non-transactional reads fail to prevent overselling under high concurrency.',
        ),
        tradeoff: c(
          'Bloqueo temporal de existencias que reduce la disponibilidad aparente hasta la confirmación o expiración.',
          'Temporary stock lock reducing visible availability until payment confirmation or timeout.',
        ),
        outcome: c(
          'Cero sobreventas mediante estados deterministas: reservado, consolidado, liberado y expirado.',
          'Zero overselling incidents via deterministic states: reserved, committed, released, and expired.',
        ),
      },
      {
        title: c(
          'La IA interpreta; el backend conserva la evidencia.',
          'AI interprets; the backend preserves the evidence.',
        ),
        problem: c(
          'Los modelos generativos sufren alucinaciones, inventan métricas o pueden autorizar transacciones indebidamente si no se acotan.',
          'Generative models hallucinate, fabricate metrics, or improperly approve transactions if not strictly isolated.',
        ),
        decision: c(
          'Tres superficies aisladas: asistente de compra con tools de solo lectura; probador virtual en Vertex AI con borrado programado; y analítica administrativa con Gemini protegida por decision intelligence con esquemas de validación Zod y reconciliación de datos en el backend.',
          'Three isolated surfaces: read-only shopping assistant; Vertex AI virtual try-on with scheduled deletion; and Gemini administrative analytics powered by decision intelligence with Zod validation schemas and backend data reconciliation.',
        ),
        reason: c(
          'El cálculo de balances, disponibilidad y autorizaciones pertenece al backend determinista. El LLM opera exclusivamente como capa semántica y de consulta.',
          'Balance calculations, availability, and authorizations belong to deterministic backends. The LLM acts solely as a semantic interpretation layer.',
        ),
        tradeoff: c(
          'Mayor complejidad en serialización y reconciliación; consultas sin soporte de datos son rechazadas explícitamente.',
          'Higher serialization and reconciliation overhead; queries lacking structured data backing are explicitly rejected.',
        ),
        outcome: c(
          'Asistente con contexto de catálogo actualizado, probador virtual asíncrono y módulo admin con decision intelligence respaldado al 100% por evidencia del backend.',
          'Shopping assistant with fresh catalog context, asynchronous virtual try-on, and admin module with decision intelligence 100% backed by backend evidence.',
        ),
      },
      {
        title: c(
          'Máquina de estados idempotente basada en webhooks criptográficos.',
          'Idempotent state machine driven by cryptographic webhooks.',
        ),
        problem: c(
          'Peticiones HTTP de retorno en el navegador son vulnerables a manipulación y no garantizan cobro efectivo.',
          'Browser redirect queries are spoofable and do not guarantee confirmed payment.',
        ),
        decision: c(
          'Transicionar la orden a pagada únicamente tras verificar la firma criptográfica del webhook y comparar el importe pagado con el snapshot de la orden.',
          'Advance order state to paid only upon cryptographic webhook signature verification and exact amount reconciliation against the order snapshot.',
        ),
        reason: c(
          'El backend centraliza la verdad contractual del pago y aísla la lógica ante reintentos de red del proveedor.',
          'The backend retains single-source-of-truth payment contracts and shields logic against gateway network retries.',
        ),
        tradeoff: c(
          'Requiere gestión asíncrona de estados pendientes en el frontend mientras se confirma el webhook.',
          'Demands asynchronous pending-state management in the frontend while webhook confirmation settles.',
        ),
        outcome: c(
          'Deduplicación automática de webhooks repetidos y rechazo inmediato ante discrepancias de importe.',
          'Automatic deduplication of retried webhooks and instant rejection of mismatched amounts.',
        ),
      },
      {
        title: c(
          'Motor determinista de promociones y cupones en el servidor.',
          'Deterministic server-side promotion and coupon engine.',
        ),
        problem: c(
          'Inconsistencias de totales entre el carrito web, la orden interna y la pasarela externa al combinar descuentos.',
          'Total amount drift across web cart, internal order, and external payment gateway when combining promotions.',
        ),
        decision: c(
          'Centralizar el cálculo de precios en un servicio único que rechaza acumulaciones no permitidas (ej. cupones sobre rebajas).',
          'Centralize all price calculations in a single domain service that disallows unauthorized stacking (e.g. coupons over discounted items).',
        ),
        reason: c(
          'Delegar lógica de precios al cliente expone la pasarela a manipulación de parámetros y diferencias de redondeo.',
          'Client-side pricing logic exposes checkout to payload tampering and floating-point drift.',
        ),
        tradeoff: c(
          'Validaciones continuas contra la API al modificar ítems o aplicar códigos en el carrito.',
          'Continuous round-trips to the API when updating line items or applying voucher codes.',
        ),
        outcome: c(
          'Consistencia absoluta de precios en el 100% de las transacciones procesadas.',
          '100% price consistency across all processed checkout transactions.',
        ),
      },
    ],
    implementation: [
      c(
        'Storefront SSR/SSG en Next.js con catálogo por variantes, carrito reactivo y checkout multi-método.',
        'Next.js SSR/SSG storefront featuring variant catalogs, reactive cart, and multi-method checkout.',
      ),
      c(
        'Microservicios en Express para reservas de stock, cálculo determinista y orquestación de pagos.',
        'Express microservices handling inventory reservation, deterministic pricing, and payment orchestration.',
      ),
      c(
        'Panel administrativo para monitoreo de órdenes, conciliación de inventario y configuración de promociones.',
        'Administrative panel for order monitoring, inventory reconciliation, and promotion management.',
      ),
      c(
        'Pipelines de IA aplicada con Gemini y Vertex AI: asistente conversacional, probador virtual y analítica administrativa con guardrails.',
        'Applied AI pipelines with Gemini and Vertex AI: shopping assistant, virtual try-on, and guarded admin analytics.',
      ),
    ],
    security: c(
      'Validación rigurosa de esquemas con Zod en todas las entradas, autenticación de sesión con Firebase Auth, verificación de firmas criptográficas de Stripe/Aplazo y pruebas unitarias de concurrencia y webhooks duplicados.',
      'Strict Zod schema validation across all inputs, session auth via Firebase Auth, cryptographic Stripe/Aplazo signature verification, and unit tests covering concurrency and duplicate webhooks.',
    ),
    results: [
      c(
        'Tienda oficial en producción en tiendalaguarida.com.',
        'Official store in production at tiendalaguarida.com.',
      ),
      c(
        'Cero discrepancias contables en órdenes y pagos procesados.',
        'Zero accounting discrepancies across processed orders and payments.',
      ),
      c(
        'Manejo resiliente de eventos de pago tardíos, fallidos o duplicados.',
        'Resilient handling of delayed, failed, or duplicated payment events.',
      ),
      c(
        'Tres superficies de IA en producción respaldadas estrictamente por evidencia del backend.',
        'Three production AI surfaces strictly backed by backend verification.',
      ),
    ],
    lessons: c(
      'La resiliencia en e-commerce reside en los flujos de fallo: reintentos de red, transacciones concurrentes y cancelaciones. La integración de IA exige la misma disciplina: el modelo interpreta, pero la verdad de negocio permanece en el backend determinista.',
      'E-commerce resilience is defined by failure paths: network retries, concurrent writes, and cancellations. AI integration demands equal rigor: models interpret, but business truth stays in the deterministic backend.',
    ),
  },
  {
    slug: 'pos-concesiones',
    number: '03',
    title: 'POS · Concesiones',
    kind: 'pos',
    category: 'OPERATIONS / FULL STACK',
    subtitle: c(
      'Punto de venta y control operativo en tiempo real para concesiones.',
      'Real-time point of sale and operational control for concessions.',
    ),
    status: c(
      'Sistema interno · En producción',
      'Internal system · In production',
    ),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c('Ingeniería de software full stack', 'Full-stack software engineering'),
    summary: c(
      'Sistema POS para operaciones de concesiones: transacciones de venta de alta velocidad, gestión de existencias, conciliación de caja por arqueo y canal de pedidos online para palcos.',
      'Concessions POS system: high-velocity sales transactions, stock management, cash reconciliation by count, and online box seat ordering.',
    ),
    context: c(
      'Operación de estadio sujeta a alta concurrencia durante partidos. Exige registro instantáneo de ventas, control de existencias por concesión y despacho de pedidos VIP para palcos sincronizados con el inventario central.',
      'Stadium operations subject to high concurrency during matchdays. Demands sub-second transaction recording, per-concession inventory control, and VIP box orders synced with central inventory.',
    ),
    problem: c(
      'Evitar sobreventa cuando pedidos online de palcos y ventas en mostrador compiten por existencias compartidas, y garantizar que pagos tardíos no confirmen reservas expiradas.',
      'Preventing overselling when online VIP orders and counter sales compete for shared stock, ensuring late payments do not confirm expired reservations.',
    ),
    contribution: c(
      'Desarrollo full stack con Next.js, React, Node.js y Firebase. Implementación de módulos de ventas, inventario, arqueos de caja, reportes operativos y canal web para palcos con pasarela Stripe.',
      'Full-stack development with Next.js, React, Node.js, and Firebase. Implemented sales, inventory, cash audits, operational reports, and VIP web channel with Stripe gateway.',
    ),
    systems: c(
      'Terminal web POS, API REST con RBAC, motor de inventario, conciliación de caja y canal de pedidos VIP.',
      'POS web terminal, RBAC REST API, inventory engine, cash reconciliation, and VIP ordering channel.',
    ),
    scope: {
      product: c(
        'Sistema POS interno para concesiones del estadio: terminal de venta, catálogo de combos, conciliación de caja y servicio web para palcos.',
        'Internal stadium POS system: sales terminal, combo catalog, cash closing reconciliation, and web box service.',
      ),
      team: c(
        'Desarrollo del software operativo. La operación en terminales y el manejo físico de efectivo son realizados por el personal de concesiones.',
        'Software engineering ownership. In-terminal sales operation and physical cash handling are carried out by concessions staff.',
      ),
      mine: c(
        'Arquitectura de datos, lógica de ventas, control de inventario por concesión, arqueos de caja y módulo de pedidos VIP con Stripe.',
        'Data architecture, sales logic, per-concession inventory control, cash audits, and Stripe VIP ordering module.',
      ),
      connected: c(
        'Stripe procesa pagos de pedidos VIP; la API del POS valida la reserva antes de admitir la orden a preparación.',
        'Stripe processes VIP online charges; the POS API validates active reservations before queuing orders for fulfillment.',
      ),
    },
    requirements: [
      c(
        'Control de acceso basado en roles (RBAC) para segregar ventas, inventario y cortes de caja.',
        'Role-based access control (RBAC) segregating sales, inventory, and cash closing.',
      ),
      c(
        'Sincronización transaccional entre ventas y deducciones inmediatas de inventario.',
        'Transactional synchronization between terminal sales and immediate stock deductions.',
      ),
      c(
        'Conciliación determinista entre pagos de Stripe en palcos y reservas activas en cocina.',
        'Deterministic reconciliation between Stripe box payments and active fulfillment reservations.',
      ),
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Express',
      'Firebase',
      'Zod',
      'Stripe',
    ],
    links: [{ label: 'Servicio Palcos', href: publicLinks.palcos }],
    architecture: c(
      'Arquitectura desacoplada: terminal web optimizada para baja latencia en mostrador; APIs en Express que gobiernan el acceso y las transacciones; módulo de palcos con reserva temporal y webhooks de confirmación con pasarela externa.',
      'Decoupled architecture: low-latency POS web terminal for fast counter operations; Express APIs governing RBAC and transactions; box seat ordering module with temporary locks and gateway webhooks.',
    ),
    nodes: [
      node(
        'pos',
        'POS Web',
        c('Operación', 'Operations'),
        c(
          'Interfaz de cobro rápido con soporte para combos, modificadores y cálculo automático de cambio.',
          'High-speed counter interface supporting combos, modifiers, and instant cash change calculation.',
        ),
        50,
        13,
      ),
      node(
        'api',
        'Express',
        c('API + roles', 'API + roles'),
        c(
          'Validación de permisos, endpoints de control y orquestación de operaciones de negocio.',
          'Permission enforcement, operational endpoints, and transactional business logic orchestration.',
        ),
        26,
        43,
      ),
      node(
        'vip',
        'VIP',
        c('Pedidos online', 'Online orders'),
        c(
          'Módulo de compra web para palcos conectado al stock central de concesiones con checkout Stripe.',
          'Web ordering module for stadium boxes synced with concessions inventory via Stripe checkout.',
        ),
        74,
        43,
      ),
      node(
        'stock',
        'Inventory',
        c('Existencias', 'Stock'),
        c(
          'Deducción atómica de existencias y combos por venta realizada.',
          'Atomic deduction of stock and combo items upon finalized sales.',
        ),
        17,
        77,
      ),
      node(
        'sales',
        'Sales',
        c('Ventas', 'Sales'),
        c(
          'Registro inmutable de transacciones con soporte para múltiples métodos de pago.',
          'Immutable transaction ledger supporting cash, card, and split payment methods.',
        ),
        50,
        77,
      ),
      node(
        'cash',
        'Cash closing',
        c('Cortes', 'Reconciliation'),
        c(
          'Arqueo ciego de caja, cálculo de discrepancias y exportación de reportes operativos en PDF.',
          'Blind cash audit, discrepancy calculation, and operational PDF report generation.',
        ),
        83,
        77,
      ),
    ],
    edges: [
      ['pos', 'api'],
      ['vip', 'api'],
      ['api', 'stock'],
      ['api', 'sales'],
      ['sales', 'cash'],
    ],
    decisions: [
      {
        title: c(
          'Segregación estricta de responsabilidades operativas mediante RBAC.',
          'Strict operational segregation of duties via RBAC.',
        ),
        problem: c(
          'Riesgo de fraude o inconsistencias contables si los cajeros poseen permisos para modificar existencias o cerrar cortes.',
          'Fraud and bookkeeping inconsistency risks if cashiers can modify inventory or finalize cash reconciliations.',
        ),
        decision: c(
          'Segregar la plataforma en módulos independientes (Ventas, Inventario, Cortes) validados por tokens JWT con claims de rol en la API.',
          'Segregate the platform into independent modules (Sales, Inventory, Reconciliation) enforced by role claims on JWTs in the API.',
        ),
        reason: c(
          'La seguridad operativa no debe descansar en deshabilitar botones en el frontend, sino en contratos de backend.',
          'Operational security cannot rely on client-side button hiding; it must be enforced by backend contracts.',
        ),
        tradeoff: c(
          'Mayor cantidad de endpoints y flujos de autenticación diferenciados.',
          'Increased endpoint count and differentiated authentication flows.',
        ),
        outcome: c(
          'Auditoría clara de cada operación por usuario sin solapamiento de permisos.',
          'Clean per-user audit logs with zero unauthorized privilege crossover.',
        ),
      },
      {
        title: c(
          'Validación de reservas activas en pedidos online antes de despacho.',
          'Active reservation validation on online orders prior to fulfillment.',
        ),
        problem: c(
          'Recepción de webhook de pago cuando el inventario ya se agotó por ventas físicas en el mostrador.',
          'Payment webhook arrival after on-site counter sales have exhausted physical inventory.',
        ),
        decision: c(
          'Verificar el estado de la reserva dentro de una transacción al recibir el evento de Stripe; si expiró, marcar para reembolso automático.',
          'Verify reservation status in an atomic transaction upon receiving the Stripe event; if expired, flag for automated refund.',
        ),
        reason: c(
          'Un cobro confirmado no debe forzar la creación de stock inexistente ni desajustar el inventario físico.',
          'A confirmed payment must never manufacture non-existent inventory or throw off physical stock.',
        ),
        tradeoff: c(
          'Implementación de flujos de devolución y estados de excepción en la orden.',
          'Requires implementing refund workflows and explicit exception states on orders.',
        ),
        outcome: c(
          'Consistencia absoluta entre stock físico y pedidos despachados.',
          'Absolute consistency between physical inventory and dispatched orders.',
        ),
      },
    ],
    implementation: [
      c(
        'Terminal web responsiva optimizada para ingreso rápido de pedidos y combos.',
        'Responsive web terminal optimized for high-speed order and combo entry.',
      ),
      c(
        'Módulo de arqueo de caja con conciliación ciega y generación de balances en PDF.',
        'Cash audit module with blind reconciliation and operational PDF balance generation.',
      ),
      c(
        'Canal web de pedidos para palcos con pagos Stripe y vinculación de stock.',
        'Web ordering channel for stadium boxes with Stripe payments and live stock linking.',
      ),
    ],
    security: c(
      'Autenticación mediante JWT, validación Zod en endpoints de mutación, webhooks firmados de Stripe y protección contra doble cobro en pedidos online.',
      'JWT authentication, Zod validation on mutation endpoints, signed Stripe webhooks, and double-charge protection on online orders.',
    ),
    results: [
      c(
        'Sistema en producción utilizado en la operación de concesiones del Estadio León.',
        'Production system operating concessions at Estadio León.',
      ),
      c(
        'Integración transparente entre ventas presenciales y canal de pedidos online.',
        'Seamless synchronization between on-site sales and online box ordering.',
      ),
      c(
        'Control auditado de flujo de caja e inventario por evento.',
        'Audited cash flow and inventory tracking per match event.',
      ),
    ],
    lessons: c(
      'En sistemas operativos de alta velocidad, la arquitectura debe diseñar primero los casos de excepción: qué ocurre cuando el stock se agota durante el pago o la red parpadea en el mostrador.',
      'In high-velocity operational systems, architecture must prioritize failure scenarios: stock exhaustion mid-checkout or connectivity flickers at the counter.',
    ),
  },
  {
    slug: 'commerce-iot',
    number: '04',
    title: 'Commerce & IoT',
    kind: 'iot',
    category: 'SYSTEMS INTEGRATION / 2025',
    subtitle: c(
      'Plataforma e-commerce .NET y telemetría móvil IoT en Android.',
      '.NET e-commerce platform and Android IoT mobile telemetry.',
    ),
    status: c('Proyecto previo · 2025', 'Previous project · 2025'),
    period: c('2025 · Proyecto del CV', '2025 · CV project'),
    role: c('Ingeniería de software full stack y móvil', 'Full-stack & mobile software engineering'),
    summary: c(
      'Arquitectura de e-commerce con backend .NET Core, persistencia en SQL Server y frontend Angular, junto a app nativa en Kotlin para telemetría y control de actuadores vía Firebase.',
      'E-commerce architecture with .NET Core backend, SQL Server persistence, and Angular frontend, paired with a native Kotlin app for telemetry and actuator control via Firebase.',
    ),
    context: c(
      'Integración de comercio B2C y monitoreo de dispositivos de campo: catálogo de productos, gestión de compras y supervisión remota de parámetros agrícolas.',
      'Integration of B2C commerce and field device monitoring: product catalog, purchase lifecycle, and remote agricultural parameter supervision.',
    ),
    problem: c(
      'Coordinar requerimientos relacionales estructurados para transacciones comerciales con sincronización en tiempo real de baja latencia para eventos de sensores IoT.',
      'Coordinating structured relational requirements for commercial transactions with low-latency real-time sync for IoT sensor events.',
    ),
    contribution: c(
      'Diseño de APIs REST en .NET Core con Entity Framework y autenticación JWT; desarrollo de SPA en Angular y construcción de app Android en Kotlin conectada a Firebase Realtime Database.',
      'Engineered .NET Core REST APIs with Entity Framework and JWT authentication; developed Angular SPA and built the native Kotlin Android app interfacing with Firebase Realtime Database.',
    ),
    systems: c(
      'Storefront Angular, API .NET con SQL Server, y app Android en Kotlin integrada con Firebase.',
      'Angular storefront, .NET API with SQL Server, and Kotlin Android app integrated with Firebase.',
    ),
    scope: {
      product: c(
        'Plataforma web de comercio y aplicativo móvil para supervisión de riego automatizado y alertas.',
        'Web commerce platform and mobile application for automated irrigation monitoring and alerts.',
      ),
      team: c(
        'Desarrollo del stack técnico documentado en el CV, cubriendo la capa de servicios backend, clientes web y móvil.',
        'Development of the technical stack documented in the CV, covering backend service layers, web, and mobile clients.',
      ),
      mine: c(
        'Implementación de catálogo, carrito y órdenes en .NET/Angular, y desarrollo de la app Kotlin con telemetría en tiempo real.',
        'Implemented catalog, cart, and orders in .NET/Angular, and built the Kotlin app with real-time telemetry.',
      ),
      connected: c(
        'El subsistema de comercio opera sobre SQL Server; el subsistema IoT consume eventos y telemetría vía Firebase.',
        'The commerce subsystem runs on SQL Server; the IoT subsystem processes telemetry events via Firebase.',
      ),
    },
    requirements: [
      c(
        'Arquitectura de e-commerce con catálogo, carrito, órdenes y panel administrativo.',
        'E-commerce architecture featuring catalog, cart, orders, and administrative dashboard.',
      ),
      c(
        'Persistencia relacional mediante Entity Framework Core con autenticación JWT.',
        'Relational persistence via Entity Framework Core with JWT authentication.',
      ),
      c(
        'Recepción de telemetría de sensores y despacho de comandos de control en Android.',
        'Sensor telemetry ingestion and actuator control dispatch on Android.',
      ),
    ],
    stack: [
      'C# / .NET',
      'Entity Framework',
      'SQL Server',
      'Angular',
      'Kotlin',
      'Firebase',
    ],
    links: [],
    architecture: c(
      'Arquitectura políglota desacoplada por dominio: capa transaccional relacional en .NET/SQL Server para operaciones de venta, y capa orientada a eventos en Firebase para la telemetría del cliente móvil Android.',
      'Polyglot decoupled architecture: relational transactional layer in .NET/SQL Server for commerce, and event-driven layer in Firebase for mobile IoT telemetry.',
    ),
    nodes: [
      node(
        'web',
        'Angular',
        c('Storefront Angular', 'Angular Storefront'),
        c(
          'SPA estructurada en módulos con servicios reactivos para navegación y compra.',
          'Modular SPA with reactive services for product browsing and checkout.',
        ),
        26,
        13,
      ),
      node(
        'mobile',
        'Kotlin',
        c('App Android (Kotlin)', 'Android App (Kotlin)'),
        c(
          'Aplicación nativa con interfaz de monitoreo de variables de campo y control de actuadores.',
          'Native app with monitoring dashboards for field variables and actuator control.',
        ),
        74,
        13,
      ),
      node(
        'api',
        '.NET / EF',
        c('API .NET Core', '.NET Core API'),
        c(
          'Endpoints RESTful protegidos por JWT con validación de modelos y reglas de negocio.',
          'JWT-protected RESTful endpoints with model validation and business logic.',
        ),
        26,
        43,
      ),
      node(
        'firebase',
        'Firebase',
        c('Firebase Sync', 'Firebase Sync'),
        c(
          'Canal de eventos en tiempo real para transmisión de telemetría y estados de sensores.',
          'Real-time event stream for telemetry broadcasting and sensor status sync.',
        ),
        74,
        43,
      ),
      node(
        'sql',
        'SQL Server',
        c('Base Relacional', 'Relational DB'),
        c(
          'Esquema en SQL Server con migraciones EF Core para usuarios, productos y órdenes.',
          'SQL Server schema with EF Core migrations for users, products, and orders.',
        ),
        26,
        77,
      ),
      node(
        'iot',
        'IoT',
        c('Telemetría y Actuadores', 'Telemetry & Actuators'),
        c(
          'Representación de actuadores de riego y sensores de humedad y temperatura.',
          'Representation of irrigation actuators and temperature/humidity sensors.',
        ),
        74,
        77,
      ),
    ],
    edges: [
      ['web', 'api'],
      ['api', 'sql'],
      ['mobile', 'firebase'],
      ['firebase', 'iot'],
    ],
    decisions: [
      {
        title: c(
          'Separación de persistencia según el dominio operativo.',
          'Persistence segregation tailored to operational domains.',
        ),
        problem: c(
          'Diferencias estructurales entre transacciones ACID de e-commerce y flujos de telemetría en tiempo real.',
          'Structural mismatch between ACID e-commerce transactions and real-time telemetry streams.',
        ),
        decision: c(
          'Aislar el dominio comercial en SQL Server/.NET y el dominio de telemetría móvil en Firebase/Kotlin.',
          'Isolate commercial domain in SQL Server/.NET and mobile telemetry in Firebase/Kotlin.',
        ),
        reason: c(
          'Evitar sobrecargar el motor relacional con escrituras de alta frecuencia de sensores manteniendo rigor contable en ventas.',
          'Prevents overloading relational storage with high-frequency sensor writes while preserving accounting rigor in sales.',
        ),
        tradeoff: c(
          'Manejo de dos tecnologías de base de datos y modelos de datos independientes.',
          'Managing two distinct database paradigms and independent data models.',
        ),
        outcome: c(
          'Rendimiento optimizado en ambos dominios sin comprometer consistencia transaccional.',
          'Optimized performance across both domains without sacrificing transactional integrity.',
        ),
      },
    ],
    implementation: [
      c(
        'Módulos de catálogo, checkout y gestión de órdenes con Angular y .NET.',
        'Catalog, checkout, and order management modules with Angular and .NET.',
      ),
      c(
        'API REST con Entity Framework, SQL Server y control de acceso basado en JWT.',
        'REST API with Entity Framework, SQL Server, and JWT access control.',
      ),
      c(
        'App Android nativa en Kotlin con lectura de telemetría y disparadores de alerta.',
        'Native Android app in Kotlin with telemetry streaming and threshold-based alert triggers.',
      ),
    ],
    security: c(
      'Autenticación mediante tokens JWT, hashing seguro de contraseñas y reglas de seguridad en Firebase para restringir el acceso a telemetría de dispositivos.',
      'JWT token authentication, secure password hashing, and Firebase security rules restricting access to device telemetry.',
    ),
    results: [
      c(
        'Integración exitosa de plataformas web, backend relacional y aplicación móvil.',
        'Successful integration of web frontend, relational backend, and mobile application.',
      ),
      c(
        'Dominio comprobado en arquitecturas políglotas y desarrollo nativo en Kotlin.',
        'Demonstrated proficiency in polyglot architectures and native Kotlin development.',
      ),
    ],
    lessons: c(
      'Elegir la tecnología adecuada para cada carga de trabajo simplifica el diseño: persistencia relacional para transacciones financieras y canales reactivos en tiempo real para telemetría.',
      'Aligning technology to workload requirements simplifies design: relational persistence for financial transactions and real-time reactive streams for telemetry.',
    ),
  },
];

export const technologyGroups = [
  {
    title: c('Lenguajes', 'Languages'),
    items: [
      'C#',
      'Java',
      'Kotlin',
      'JavaScript',
      'TypeScript',
      'Python',
      'Dart',
    ],
  },
  {
    title: c('Interfaces', 'Interfaces'),
    items: ['React / Next.js', 'Angular / RxJS', 'Flutter', 'Tailwind CSS'],
  },
  {
    title: c('Backend y datos', 'Backend & data'),
    items: [
      'Node.js / Express',
      '.NET / EF',
      'Flask / SQLAlchemy',
      'SQL Server',
      'MySQL',
      'MongoDB',
      'Firebase',
      'Gemini',
      'Vertex AI',
    ],
  },
  {
    title: c('Herramientas y método', 'Tools & method'),
    items: [
      'Git / GitHub',
      'GitHub Actions',
      'Postman',
      'Scrum',
      'CI/CD básico',
    ],
  },
];
