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
};
export const studies: Study[] = [
  {
    slug: 'club-leon-app',
    number: '01',
    title: 'Club León FC',
    kind: 'app',
    subtitle: c(
      'El club, dentro y fuera de la cancha.',
      'The club, on and off the pitch.',
    ),
    category: 'MOBILE / NATIVE INTEGRATIONS',
    status: c('App publicada', 'Published app'),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c(
      'Desarrollo móvil e integración de servicios',
      'Mobile development & service integration',
    ),
    summary: c(
      'La app oficial para iOS y Android. Calendarios, Fiera Racha, notificaciones y acceso a La Guarida en una experiencia Flutter.',
      'The official iOS and Android app. Match calendars, Fiera Racha, notifications and access to La Guarida in a Flutter experience.',
    ),
    context: c(
      'La afición sigue equipos, consulta partidos y compra productos del club desde el teléfono. La aplicación reúne esos recorridos y conecta con servicios existentes de Club León.',
      'Supporters follow teams, check matches and shop on their phones. The app brings these journeys together and connects existing Club León services.',
    ),
    problem: c(
      'Mantener el calendario correcto al cambiar de categoría, abrir el destino de una notificación y llevar la racha diaria a la pantalla de inicio exige coordinar estado, servicios y código nativo.',
      'Keeping the right calendar when switching teams, opening notification destinations and bringing a daily streak to the home screen requires coordinated state, services and native code.',
    ),
    contribution: c(
      'Desarrollo en Flutter y Dart; integración de notificaciones, navegación y tienda. Sincronización de Fiera Racha con widgets implementados en Swift/WidgetKit y Kotlin/RemoteViews.',
      'Flutter and Dart development; notification, navigation and store integration. Fiera Racha synchronization with Swift/WidgetKit and Kotlin/RemoteViews widgets.',
    ),
    requirements: [
      c(
        'Calendarios masculino y femenil con estado independiente.',
        'Independent men’s and women’s calendar state.',
      ),
      c(
        'Conservar contenido previo mientras se actualiza.',
        'Keep previous content visible while refreshing.',
      ),
      c(
        'Abrir rutas concretas desde notificaciones y widgets.',
        'Open specific routes from notifications and widgets.',
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
      'Flutter organiza la interfaz y los proveedores de estado. Los servicios conectan calendario, notificaciones y tienda; los widgets mantienen una integración específica para cada plataforma.',
      'Flutter organizes the interface and state providers. Services connect calendars, notifications and the store; widgets retain a platform-specific implementation.',
    ),
    nodes: [
      node(
        'app',
        'Flutter',
        c('Aplicación', 'Application'),
        c(
          'Interfaz compartida para iOS y Android; navegación entre calendario, racha y tienda.',
          'Shared iOS and Android interface; navigation between calendars, streaks and the store.',
        ),
        50,
        13,
      ),
      node(
        'state',
        'Providers',
        c('Estado + caché', 'State + cache'),
        c(
          'Caché por división y club. Un identificador de petición evita aplicar respuestas antiguas.',
          'Cache per division and club. A request identifier prevents stale responses from being applied.',
        ),
        26,
        43,
      ),
      node(
        'native',
        'Swift · Kotlin',
        c('Widgets nativos', 'Native widgets'),
        c(
          'home_widget sincroniza la racha y enlaza de vuelta a la aplicación.',
          'home_widget synchronizes the streak and links back into the application.',
        ),
        74,
        43,
      ),
      node(
        'content',
        'APIs',
        c('Calendarios', 'Calendars'),
        c(
          'Contenido masculino y femenil con refresco al recuperar conectividad.',
          'Men’s and women’s content refreshed when connectivity is available again.',
        ),
        17,
        77,
      ),
      node(
        'firebase',
        'Firebase',
        c('Auth + mensajes', 'Auth + messages'),
        c(
          'Identidad y notificaciones conectadas con destinos dentro del producto.',
          'Identity and notifications connected to destinations within the product.',
        ),
        50,
        77,
      ),
      node(
        'store',
        'La Guarida',
        c('Tienda integrada', 'Integrated store'),
        c(
          'Acceso web a la tienda con continuidad de sesión desde la aplicación.',
          'Web access to the store with session continuity from the app.',
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
          'Un calendario que respeta la selección.',
          'A calendar that respects the selection.',
        ),
        problem: c(
          'Una petición lenta puede llegar después de cambiar de categoría.',
          'A slow request can arrive after switching categories.',
        ),
        decision: c(
          'Separar caché por división y club; descartar respuestas con un requestId anterior.',
          'Separate cache by division and club; discard responses with an older requestId.',
        ),
        reason: c(
          'La respuesta válida depende de la selección actual, no del orden en que termina la red.',
          'A valid response depends on the current selection, not the order in which network requests finish.',
        ),
        tradeoff: c(
          'Se puede mostrar información anterior mientras llega la actualización.',
          'Previously stored information may be shown while an update arrives.',
        ),
        outcome: c(
          'El estado mantiene el calendario seleccionado y aprovecha contenido persistido.',
          'State preserves the selected calendar and reuses persisted content.',
        ),
      },
      {
        title: c(
          'Flutter donde se comparte. Nativo donde hace falta.',
          'Flutter for shared UI. Native code where needed.',
        ),
        problem: c(
          'La racha debe estar disponible también en la pantalla de inicio.',
          'The streak also needs a presence on the home screen.',
        ),
        decision: c(
          'Sincronizar datos mediante home_widget y construir las superficies nativas de iOS y Android.',
          'Synchronize data with home_widget and build native iOS and Android surfaces.',
        ),
        reason: c(
          'Los widgets tienen ciclos de vida y APIs propios de cada sistema operativo.',
          'Widgets have lifecycles and APIs specific to each operating system.',
        ),
        tradeoff: c(
          'Las integraciones Swift y Kotlin requieren mantenimiento por separado.',
          'Swift and Kotlin integrations require separate maintenance.',
        ),
        outcome: c(
          'El widget muestra la racha y recupera la navegación hacia ella.',
          'The widget displays the streak and restores navigation to it.',
        ),
      },
    ],
    implementation: [
      c(
        'Proveedores de estado y caché persistida para los calendarios.',
        'State providers and persisted calendar cache.',
      ),
      c(
        'Notificaciones con destinos de producto, pedidos y carrito.',
        'Notifications with product, order and cart destinations.',
      ),
      c(
        'Servicio Flutter de sincronización y widgets nativos de Fiera Racha.',
        'Flutter synchronization service and native Fiera Racha widgets.',
      ),
    ],
    security: c(
      'La sesión y las rutas de usuario se integran con autenticación. La estrategia de caché controla respuestas fuera de orden; no se presenta como funcionamiento completo sin conexión.',
      'Session and user routes integrate with authentication. The cache strategy handles out-of-order responses; it is not a claim of full offline operation.',
    ),
    results: [
      c(
        'Aplicación oficial publicada para iOS y Android.',
        'Official application published for iOS and Android.',
      ),
      c(
        'Calendario, racha y tienda conectados en una experiencia móvil.',
        'Calendar, streak and store connected in a mobile experience.',
      ),
      c(
        'Widgets con implementaciones específicas para ambos sistemas.',
        'Widgets with implementations for both operating systems.',
      ),
    ],
    lessons: c(
      'Una base compartida no elimina las diferencias entre plataformas. Delimitar el estado y las integraciones nativas hace explícito qué se comparte y qué se mantiene por separado.',
      'A shared codebase does not eliminate platform differences. Defining state boundaries and native integrations makes shared and separately maintained behavior explicit.',
    ),
  },
  {
    slug: 'la-guarida',
    number: '02',
    title: 'La Guarida',
    kind: 'store',
    category: 'COMMERCE / PAYMENTS / INVENTORY',
    subtitle: c(
      'Del catálogo a una orden confirmada.',
      'From catalog to a confirmed order.',
    ),
    status: c('En producción', 'In production'),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c('Desarrollo full stack', 'Full-stack development'),
    summary: c(
      'La tienda oficial de Club León. Catálogo por talla, checkout con Stripe y Aplazo, reservas de inventario y gestión de pedidos.',
      'Club León’s official store. Size-based catalog, Stripe and Aplazo checkout, inventory reservations and order management.',
    ),
    context: c(
      'Una tienda de mercancía oficial tiene que coordinar variantes, descuentos, disponibilidad, cobro y entrega. La interfaz depende de reglas de negocio que deben mantenerse coherentes en el backend.',
      'An official merchandise store coordinates variants, discounts, availability, payment and delivery. Its interface depends on business rules that must remain consistent in the backend.',
    ),
    problem: c(
      'Dos compras pueden competir por la última talla. Un pago puede confirmarse más tarde o reenviar su evento. El precio y el inventario deben conservar su coherencia durante todo el recorrido.',
      'Two checkouts can compete for the last size. A payment can be confirmed later or resend its event. Pricing and inventory must stay consistent throughout the journey.',
    ),
    contribution: c(
      'Frontend Next.js y TypeScript; APIs Express, lógica de checkout y servicios Firebase. Integración de pagos, reservas por variante y herramientas de administración.',
      'Next.js and TypeScript frontend; Express APIs, checkout logic and Firebase services. Payment integration, variant reservations and administrative tools.',
    ),
    requirements: [
      c(
        'Calcular el importe final en el backend.',
        'Calculate the final amount in the backend.',
      ),
      c(
        'Reservar existencias antes de confirmar una compra.',
        'Reserve stock before confirming a purchase.',
      ),
      c(
        'Procesar reintentos de pago sin repetir efectos.',
        'Process payment retries without repeating effects.',
      ),
    ],
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js / Express',
      'Firebase',
      'Stripe',
      'Zod',
    ],
    links: [{ label: 'La Guarida', href: publicLinks.store }],
    architecture: c(
      'El frontend solicita el checkout. La API calcula el precio y reserva inventario. Los eventos de pago validados llevan la orden a su siguiente estado; el stock se confirma o se libera según el resultado.',
      'The frontend requests checkout. The API calculates pricing and reserves inventory. Validated payment events advance the order; stock is confirmed or released according to the outcome.',
    ),
    nodes: [
      node(
        'web',
        'Next.js',
        c('Catálogo + checkout', 'Catalog + checkout'),
        c(
          'Interfaz de productos, variantes, carrito y opciones de entrega.',
          'Products, variants, cart and delivery options.',
        ),
        50,
        13,
      ),
      node(
        'api',
        'Express API',
        c('Reglas de negocio', 'Business rules'),
        c(
          'Valida entradas y construye el precio y los snapshots del checkout en servidor.',
          'Validates inputs and builds checkout pricing and snapshots on the server.',
        ),
        26,
        43,
      ),
      node(
        'pay',
        'Stripe · Aplazo',
        c('Pagos', 'Payments'),
        c(
          'Los proveedores envían eventos; el backend comprueba firma o validación del proveedor e importes.',
          'Providers send events; the backend checks signatures or provider validation and amounts.',
        ),
        74,
        43,
      ),
      node(
        'stock',
        'Inventory',
        c('Reservas por variante', 'Variant reservations'),
        c(
          'Transacciones para reservar, confirmar, liberar y caducar existencias.',
          'Transactions to reserve, confirm, release and expire stock.',
        ),
        17,
        77,
      ),
      node(
        'orders',
        'Orders',
        c('Estados de orden', 'Order states'),
        c(
          'La orden conserva la relación con el pago y los artículos reservados.',
          'Orders retain their relationship to payment and reserved items.',
        ),
        50,
        77,
      ),
      node(
        'events',
        'Webhooks',
        c('Validación + reintentos', 'Validation + retries'),
        c(
          'Comprueba importes e identifica eventos repetidos antes de aplicar su resultado.',
          'Checks amounts and identifies repeated events before applying their result.',
        ),
        83,
        77,
      ),
    ],
    edges: [
      ['web', 'api'],
      ['api', 'pay'],
      ['api', 'stock'],
      ['api', 'orders'],
      ['pay', 'events'],
      ['events', 'orders'],
    ],
    decisions: [
      {
        title: c(
          'Reservas para proteger la última talla.',
          'Protecting the last available size.',
        ),
        problem: c(
          'Los checkouts concurrentes compiten por una misma variante.',
          'Concurrent checkouts compete for the same variant.',
        ),
        decision: c(
          'Comprobar disponibilidad y crear reservas dentro de una transacción; confirmar o liberar según el pago.',
          'Check availability and create reservations in a transaction; confirm or release according to payment.',
        ),
        reason: c(
          'Una comprobación visual de stock no protege frente a otra compra simultánea.',
          'A stock check in the interface does not protect against a simultaneous purchase.',
        ),
        tradeoff: c(
          'Una reserva temporal reduce la disponibilidad hasta su confirmación o caducidad.',
          'A temporary reservation reduces availability until confirmation or expiry.',
        ),
        outcome: c(
          'El checkout cuenta con estados explícitos de reserva, confirmación, liberación y caducidad.',
          'Checkout has explicit reservation, confirmation, release and expiry states.',
        ),
      },
      {
        title: c(
          'El pago se confirma por un evento validado.',
          'Payment confirmation follows a validated event.',
        ),
        problem: c(
          'Una redirección del navegador no prueba que el importe se haya pagado.',
          'A browser redirect does not prove that the amount was paid.',
        ),
        decision: c(
          'Verificar firma de Stripe, identificar eventos duplicados y comparar el importe con el snapshot interno.',
          'Verify Stripe signatures, identify duplicate events and compare the amount against the internal snapshot.',
        ),
        reason: c(
          'El servidor conserva la referencia que relaciona el cobro con la orden.',
          'The server retains the reference linking a charge to its order.',
        ),
        tradeoff: c(
          'Los estados asíncronos necesitan conciliación y tratamiento de eventos tardíos.',
          'Asynchronous states need reconciliation and handling of late events.',
        ),
        outcome: c(
          'Los importes incompatibles se rechazan y los eventos repetidos tienen una respuesta específica.',
          'Mismatched amounts are rejected and repeated events have a specific response.',
        ),
      },
      {
        title: c(
          'Una regla de precio, también con promociones.',
          'One pricing rule, including promotions.',
        ),
        problem: c(
          'El carrito, el proveedor de pago y la orden necesitan el mismo total.',
          'The cart, payment provider and order need the same total.',
        ),
        decision: c(
          'Calcular artículos y envío en el backend; rechazar cupones si el carrito contiene productos con oferta.',
          'Calculate items and shipping in the backend; reject coupons when the cart contains discounted products.',
        ),
        reason: c(
          'Centralizar la regla evita que cada cliente interprete los descuentos de forma distinta.',
          'A centralized rule prevents clients from interpreting discounts differently.',
        ),
        tradeoff: c(
          'La interfaz debe explicar por qué un cupón no combina con una oferta.',
          'The interface must explain why a coupon cannot be combined with an offer.',
        ),
        outcome: c(
          'El checkout obtiene un cálculo consistente con la política de promociones implementada.',
          'Checkout gets a calculation consistent with the implemented promotion policy.',
        ),
      },
    ],
    implementation: [
      c(
        'Catálogo por variante, carrito y checkout con entrega o recolección.',
        'Variant catalog, cart and checkout with delivery or pickup.',
      ),
      c(
        'Servicios separados para cálculo, reservas, proveedores de pago y finalización de órdenes.',
        'Separate services for pricing, reservations, payment providers and order finalization.',
      ),
      c(
        'Administración de pedidos, recepción de inventario y promociones.',
        'Order management, inventory reception and promotions.',
      ),
    ],
    security: c(
      'Validación Zod, autorización de operaciones y verificación de eventos de pago. Las pruebas existentes cubren concurrencia por última unidad, carrito atómico, webhook duplicado y caducidad de reservas.',
      'Zod validation, operation authorization and payment event verification. Existing tests cover last-unit concurrency, atomic carts, duplicate webhooks and reservation expiry.',
    ),
    results: [
      c(
        'Tienda oficial disponible en tiendalaguarida.com.',
        'Official store available at tiendalaguarida.com.',
      ),
      c(
        'Catálogo, pago, orden e inventario conectados por servicios de backend.',
        'Catalog, payment, order and inventory connected through backend services.',
      ),
      c(
        'Flujos de excepción definidos para reservas y eventos de pago.',
        'Defined exception flows for reservations and payment events.',
      ),
    ],
    lessons: c(
      'El checkout también incluye reintentos, esperas y cancelaciones. Modelar esas transiciones es tan necesario como construir el flujo de compra exitoso.',
      'Checkout includes retries, delays and cancellations. Modeling those transitions is as necessary as building the successful purchase flow.',
    ),
  },
  {
    slug: 'pos-concesiones',
    number: '03',
    title: 'POS · Concesiones',
    kind: 'pos',
    category: 'OPERATIONS / FULL STACK',
    subtitle: c(
      'Ventas, existencias y cortes conectados.',
      'Connected sales, stock and cash reconciliation.',
    ),
    status: c(
      'Sistema interno · En producción',
      'Internal system · In production',
    ),
    period: c('Club León · Actualidad', 'Club León · Current'),
    role: c('Desarrollo full stack', 'Full-stack development'),
    summary: c(
      'Punto de venta para la operación de concesiones: productos y combos, inventario, cortes por conteo y pedidos VIP.',
      'Point of sale for concession operations: products and combos, inventory, count-based cash reconciliation and VIP orders.',
    ),
    context: c(
      'Las concesiones necesitan registrar ventas y conciliar existencias por operación. Los pedidos VIP añaden un canal de compra conectado con el inventario del punto de venta.',
      'Concessions need sales records and stock reconciliation per operation. VIP orders add a purchasing channel connected to point-of-sale inventory.',
    ),
    problem: c(
      'Un pedido online pagado no debe duplicar la venta ni confirmarse cuando su reserva dejó de ser válida.',
      'A paid online order must not duplicate a sale or be confirmed after its reservation becomes invalid.',
    ),
    contribution: c(
      'Interfaces Next.js/React, APIs Express y servicios Firebase para ventas, productos, inventario y cortes. Integración del módulo VIP con pago y estados de pedido.',
      'Next.js/React interfaces, Express APIs and Firebase services for sales, products, inventory and reconciliation. VIP module integration with payment and order states.',
    ),
    requirements: [
      c(
        'Separar acceso por rol y responsabilidad operativa.',
        'Separate access by role and operational responsibility.',
      ),
      c(
        'Relacionar ventas y movimientos de inventario.',
        'Relate sales to inventory movements.',
      ),
      c(
        'Conciliar pagos VIP con reservas vigentes.',
        'Reconcile VIP payments with valid reservations.',
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
    links: [],
    architecture: c(
      'El operador trabaja en el POS; las APIs coordinan venta, inventario y corte. El canal VIP comparte disponibilidad y valida la reserva antes de confirmar el pedido.',
      'Operators work in the POS; APIs coordinate sales, inventory and cash reconciliation. The VIP channel shares availability and validates reservations before confirming orders.',
    ),
    nodes: [
      node(
        'pos',
        'POS Web',
        c('Operación', 'Operations'),
        c(
          'Productos, combos y registro de ventas por concesión.',
          'Products, combos and sales recording per concession.',
        ),
        50,
        13,
      ),
      node(
        'api',
        'Express',
        c('API + roles', 'API + roles'),
        c(
          'Validación y servicios de operación.',
          'Validation and operational services.',
        ),
        26,
        43,
      ),
      node(
        'vip',
        'VIP',
        c('Pedidos online', 'Online orders'),
        c(
          'Pedido, reserva y pago vinculados con la operación del POS.',
          'Orders, reservations and payments linked to POS operations.',
        ),
        74,
        43,
      ),
      node(
        'stock',
        'Inventory',
        c('Existencias', 'Stock'),
        c(
          'Disponibilidad y reservas por inventario.',
          'Availability and reservations per inventory.',
        ),
        17,
        77,
      ),
      node(
        'sales',
        'Sales',
        c('Ventas', 'Sales'),
        c(
          'Registro de ventas y estados terminales para evitar duplicados.',
          'Sales records and terminal states to prevent duplicates.',
        ),
        50,
        77,
      ),
      node(
        'cash',
        'Cash closing',
        c('Cortes', 'Reconciliation'),
        c(
          'Conteo y conciliación de la operación.',
          'Operational counting and reconciliation.',
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
          'Pago recibido no siempre significa pedido despachable.',
          'A received payment does not always mean a dispatchable order.',
        ),
        problem: c(
          'Un pago puede llegar después de que la reserva expire o el inventario se cierre.',
          'A payment may arrive after its reservation expires or inventory closes.',
        ),
        decision: c(
          'Validar importe, moneda, estados y reserva en la transacción de finalización; señalar devolución cuando no puede continuar.',
          'Validate amount, currency, states and reservation in the finalization transaction; flag a refund when it cannot proceed.',
        ),
        reason: c(
          'El cobro debe conciliarse con la disponibilidad operativa real.',
          'The charge must be reconciled against actual operational availability.',
        ),
        tradeoff: c(
          'Es necesario gestionar devoluciones y pagos tardíos además de ventas exitosas.',
          'Refunds and late payments need handling alongside successful sales.',
        ),
        outcome: c(
          'El módulo relaciona pago, pedido e inventario antes de continuar el despacho.',
          'The module relates payment, order and inventory before continuing dispatch.',
        ),
      },
    ],
    implementation: [
      c(
        'Venta de productos y combos con descuentos y control de existencias.',
        'Product and combo sales with discounts and stock control.',
      ),
      c(
        'Cortes por conteo y documentos PDF de operación.',
        'Count-based reconciliation and operational PDF documents.',
      ),
      c(
        'Pedidos VIP con Stripe, reservas y estados explícitos.',
        'VIP orders with Stripe, reservations and explicit states.',
      ),
    ],
    security: c(
      'Acceso por roles, validación de entrada y webhooks firmados. La finalización VIP comprueba estados terminales y disponibilidad antes de aplicar cambios.',
      'Role-based access, input validation and signed webhooks. VIP finalization checks terminal states and availability before applying changes.',
    ),
    results: [
      c(
        'Sistema de concesiones utilizado en producción por Club León.',
        'Concession system used in production by Club León.',
      ),
      c(
        'Ventas, inventario, cortes y pedidos VIP forman parte del mismo flujo operativo.',
        'Sales, inventory, reconciliation and VIP orders belong to the same operational flow.',
      ),
    ],
    lessons: c(
      'Una integración de pago también debe entender el cierre de inventario y la caducidad de reservas: son condiciones del negocio, no detalles de la pantalla.',
      'A payment integration must also understand inventory closing and reservation expiry: these are business conditions, not screen details.',
    ),
  },
  {
    slug: 'commerce-iot',
    number: '04',
    title: 'Commerce & IoT',
    kind: 'iot',
    category: 'SYSTEMS INTEGRATION / 2025',
    subtitle: c(
      'Comercio web y control de riego móvil.',
      'Web commerce and mobile irrigation control.',
    ),
    status: c('Proyecto previo · 2025', 'Previous project · 2025'),
    period: c('2025 · Proyecto del CV', '2025 · CV project'),
    role: c('Desarrollo full stack y móvil', 'Full-stack & mobile development'),
    summary: c(
      'E-commerce con .NET y Angular, junto a una aplicación Android para controlar riego y consultar telemetría y alertas mediante Firebase.',
      'E-commerce with .NET and Angular, alongside an Android application to control irrigation and receive telemetry and alerts through Firebase.',
    ),
    context: c(
      'Proyecto de 2025 que combina comercio electrónico y control móvil de riego. La información disponible procede del CV: describe tecnologías, módulos y responsabilidades.',
      'A 2025 project combining e-commerce and mobile irrigation control. Available information comes from the CV: technologies, modules and responsibilities.',
    ),
    problem: c(
      'Implementar recorridos de compra en web y control de dispositivos en Android, con servicios y almacenamiento adecuados para cada parte.',
      'Implement web purchasing journeys and Android device control with services and storage suited to each part.',
    ),
    contribution: c(
      'Backend .NET con Entity Framework y JWT, frontend Angular, SQL Server y aplicación Kotlin para riego, telemetría y alertas con Firebase.',
      '.NET backend with Entity Framework and JWT, Angular frontend, SQL Server and a Kotlin application for irrigation, telemetry and alerts with Firebase.',
    ),
    requirements: [
      c(
        'Catálogo, carrito, checkout y panel de órdenes.',
        'Catalog, cart, checkout and order administration.',
      ),
      c(
        'APIs autenticadas y persistencia relacional.',
        'Authenticated APIs and relational persistence.',
      ),
      c(
        'Control móvil de riego, telemetría y alertas.',
        'Mobile irrigation control, telemetry and alerts.',
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
      'Mapa funcional basado en el CV. El dominio de comercio usa Angular, .NET y SQL Server. El dominio móvil conecta control de riego, telemetría y alertas mediante Kotlin y Firebase.',
      'Functional map based on the CV. Commerce uses Angular, .NET and SQL Server. The mobile domain connects irrigation control, telemetry and alerts through Kotlin and Firebase.',
    ),
    nodes: [
      node(
        'web',
        'Angular',
        c('Comercio web', 'Web commerce'),
        c(
          'Catálogo, carrito y administración de órdenes.',
          'Catalog, cart and order administration.',
        ),
        26,
        13,
      ),
      node(
        'mobile',
        'Kotlin',
        c('Aplicación Android', 'Android app'),
        c(
          'Control de riego y consulta de información del dispositivo.',
          'Irrigation control and device information.',
        ),
        74,
        13,
      ),
      node(
        'api',
        '.NET / EF',
        c('API + autenticación', 'API + authentication'),
        c(
          'API con JWT y persistencia mediante Entity Framework.',
          'JWT API and persistence through Entity Framework.',
        ),
        26,
        43,
      ),
      node(
        'firebase',
        'Firebase',
        c('Datos móviles', 'Mobile data'),
        c(
          'Integración de telemetría y alertas para la aplicación.',
          'Telemetry and alert integration for the application.',
        ),
        74,
        43,
      ),
      node(
        'sql',
        'SQL Server',
        c('Comercio', 'Commerce'),
        c(
          'Persistencia relacional del sistema de comercio.',
          'Relational persistence for the commerce system.',
        ),
        26,
        77,
      ),
      node(
        'iot',
        'IoT',
        c('Riego + telemetría', 'Irrigation + telemetry'),
        c(
          'Dispositivos de riego conectados con el recorrido móvil.',
          'Irrigation devices connected to the mobile journey.',
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
          'Tecnología según el dominio del sistema.',
          'Technology matched to the system domain.',
        ),
        problem: c(
          'Comercio y telemetría tienen recorridos y datos diferentes.',
          'Commerce and telemetry have different journeys and data.',
        ),
        decision: c(
          'Usar .NET/EF con SQL Server para comercio, y Kotlin con Firebase para la integración móvil.',
          'Use .NET/EF with SQL Server for commerce, and Kotlin with Firebase for mobile integration.',
        ),
        reason: c(
          'La implementación combina persistencia relacional con servicios disponibles para la aplicación Android.',
          'The implementation combines relational persistence with services available to the Android app.',
        ),
        tradeoff: c(
          'Convivir con dos conjuntos de servicios exige delimitar contratos y responsabilidades.',
          'Two service sets require clear contracts and responsibilities.',
        ),
        outcome: c(
          'El proyecto integra web, backend y móvil alrededor de compra y control de riego.',
          'The project integrates web, backend and mobile around purchasing and irrigation control.',
        ),
      },
    ],
    implementation: [
      c(
        'Módulos de catálogo, carrito, checkout y órdenes.',
        'Catalog, cart, checkout and order modules.',
      ),
      c(
        'API .NET con Entity Framework, SQL Server y autenticación JWT.',
        '.NET API with Entity Framework, SQL Server and JWT authentication.',
      ),
      c(
        'Aplicación Android con control de riego, telemetría y alertas.',
        'Android app with irrigation control, telemetry and alerts.',
      ),
    ],
    security: c(
      'El CV documenta autenticación JWT en las APIs. Sin el repositorio o evidencia operativa adicional no se atribuyen políticas específicas de dispositivos, protocolos IoT ni garantías de entrega.',
      'The CV documents JWT authentication in the APIs. Without the repository or additional operational evidence, no specific device policies, IoT protocols or delivery guarantees are attributed.',
    ),
    results: [
      c(
        'Implementación full stack y móvil documentada en el CV de 2025.',
        'Full-stack and mobile implementation documented in the 2025 CV.',
      ),
      c(
        'Experiencia con comercio relacional e integración de dispositivos.',
        'Experience with relational commerce and device integration.',
      ),
    ],
    lessons: c(
      'La integración exige definir qué responsabilidad pertenece a cada servicio. Este caso presenta el alcance documentado; no atribuye métricas de uso ni despliegues no verificados.',
      'Integration requires defining the responsibility of each service. This case presents the documented scope; it does not attribute unverified usage metrics or deployments.',
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
