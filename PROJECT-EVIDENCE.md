# Evidencia editorial y recursos

Revisión: 5 de septiembre de 2026. Las rutas siguientes son relativas a los repositorios del workspace Club León. La condición de producción de app, tienda y concesiones procede de la confirmación del propietario. Las capacidades se contrastaron mediante CodeGraph y lecturas puntuales; no se ejecutaron operaciones contra servicios de producción.

## Identidad y formación

Fuente: Luis_Alberto_Rosas_CV (6).pdf, entregado por el propietario, leído y renderizado localmente.

- Luis Alberto Rosas Bocanegra.
- ingluisrosascontacto@gmail.com; +52 477 353 8866.
- Universidad Tecnológica de León: TSU Desarrollo de Software Multiplataforma 2022–2024; Ingeniería en Desarrollo y Gestión de Software 2024–2025.
- Inglés B2/TOEFL y francés B2/DELF.
- Scrum Developer Certified, TestingProgram, octubre 2023.
- Redes CCNA, Cisco NetAcad, septiembre–diciembre 2022. No se presenta como examen profesional CCNA aprobado.

El PDF de public es una copia exacta del original. El QR no proporcionó un perfil verificable de GitHub/LinkedIn, por lo que no se infirieron handles.

## Club León FC

- FrontClubLeon/lib/src/providers/calendar_provider.dart:98–173: caché por división/club y descarte de respuestas antiguas mediante requestId.
- FrontClubLeon/lib/src/services/app_lifecycle_coordinator.dart:47–71: actualización al volver a primer plano con conectividad.
- FrontClubLeon/lib/src/services/racha_home_widget_service.dart:52–117: sincronización desde Flutter.
- FrontClubLeon/ios/RachaHomeWidget/RachaHomeWidget.swift:436: WidgetKit.
- FrontClubLeon/android/app/src/main/kotlin/mx/clubleon/oficial/RachaHomeWidgetProvider.kt:12: RemoteViews.
- Exploración del repositorio: notificaciones con destinos de producto/pedidos/carrito y acceso a tienda mediante WebView.

Límite: no se afirma funcionamiento completo sin conexión. Swift/Kotlin se atribuyen a integraciones nativas, no a toda la aplicación.

## Backend de lealtad

- BackendCL/functions/src/modules/loyalty/services/loyalty-engine.service.ts:579–835: saldo, movimiento e idempotencia en la misma transacción; hash del contenido y deduplicación externa.
- Mismo archivo:486–546 y repositories/ledger.repository.ts:74–90: reversión compensatoria y actualización del original.
- functions/tests/loyalty.concurrency.test.ts: existen escenarios de concurrencia, no ejecutados en esta revisión.
- scripts/activate-loyalty-flags.ts: habilitación por fases.

Límite: no se usa “ledger inmutable”, porque se modifican metadatos del movimiento original. El código demuestra capacidades; no certifica qué flags están habilitados actualmente en producción.

## La Guarida

- TiendaFrontCL/package.json y STACK.md: Next.js, React, TypeScript y Tailwind.
- BackendCL/functions/src/services/pago.service.ts:1930–1965,2375–2442: firma Stripe, eventos repetidos y comprobación de importes.
- services/payments/payment-event-processing.service.ts:205–229: importe/moneda en Aplazo.
- services/inventory-reservation.service.ts:147–282,384,899,1025: disponibilidad por variante, reserva, confirmación, liberación y caducidad.
- services/checkout/checkout-pricing.service.ts:90–157: cálculo en servidor y rechazo de cupón si hay productos con oferta.
- functions/tests/inventory.reservations.concurrent.test.ts: última unidad, carrito atómico, webhook duplicado y caducidad. Es evidencia de cobertura existente, no de tráfico real ni de ejecución actual.

Límites: no se afirma procesamiento exactly-once ni se convierte el tamaño de una prueba simulada en una métrica de producción. Las consecuencias y compromisos explicados en los casos son razonamiento técnico sobre la implementación.

## POS de concesiones

- PuntoVentaConcesion: Next.js/React/TypeScript, ventas, productos, combos, cortes por conteo y PDF.
- PuntoVentaConcesionBackend/functions/src/services/vip/vip.service.ts:1014–1099,1236–1268,1296–1333: evento firmado, importes y moneda, estados terminales, reservas y cierre de inventario. REFUND_REQUIRED cuando una reserva deja de ser utilizable.

El sistema interno de Club León no se confunde con el POS Flask/MySQL de 2024 del CV.

## Proyectos previos del CV

2024: POS con Flask, MySQL/SQLAlchemy, Tailwind/Flowbite. Ventas, inventario, cortes, roles, transacciones ORM y reportes CSV/PDF.

2025: comercio con .NET/EF, SQL Server y Angular; Android/Kotlin para riego, telemetría y alertas con Firebase. APIs JWT. El diagrama es funcional y está basado en el CV. No se infiere un protocolo IoT, modelo de dispositivo, métrica o despliegue.

## Enlaces públicos

- Tienda: https://tiendalaguarida.com/
- App Store: https://apps.apple.com/mx/app/club-le%C3%B3n-fc/id6770619269
- Google Play: https://play.google.com/store/apps/details?id=mx.clubleon.oficial&hl=es_MX

Los enlaces fueron proporcionados por el propietario. Se corrigió exclusivamente la coma final y el escape accidental del enlace de Google Play. La tienda y Google Play se inspeccionaron públicamente. La herramienta web no abrió App Store; se conserva el enlace suministrado sin afirmar comprobación visual de esa ficha.

## Imágenes

- jersey-campaign.webp: TiendaFrontCL/public/herobanner/fondonuevajersey.webp. Se identifica como composición con campaña oficial.
- leon-crest.png: TiendaFrontCL/public/images/leon-crest.png.
- app-home.webp, app-calendar.webp, app-rewards.webp: recursos observados en la ficha oficial de Google Play y exportados mediante pageAssets del navegador. Inspeccionados visualmente: inicio, calendario y bonus diario de Fiera Racha. Se conservan como composiciones oficiales completas, sin fabricar pantallas.
- POS e IoT: mapas funcionales construidos con HTML/SVG, identificados como diagramas.

Fuentes CDN de las capturas (versiones observadas):
https://play-lh.googleusercontent.com/OwkTILVnEf8ZNcyMf3ApZTc0Xpq4LOF1XyHeA32MtaVVAln_IUYafudGpd9to0pDhpqIZtmjVRqNqXlSN8-fZg=w1052-h592-rw
https://play-lh.googleusercontent.com/BnMGIXbLXqRQDYje45YmH5CyUpghu62WpL0QuZZxI2X8Gj4c7f2KNT_ljrD8b1Ml70tH5EUI5iOF3w-PgilC7F8=w1052-h592-rw
https://play-lh.googleusercontent.com/A0oixHJsZeGF_kXUGogH3BAYREBbMeN5aN0WawKXpBoIbWn17j7WIn4hpkrjOEhgPMsWveZs9V03e_VEQr3CYg=w1052-h592-rw

Marcas y campañas pertenecen a sus titulares. No se copiaron credenciales, registros de clientes ni datos operativos internos.

## Imagen social generada

Archivo: public/social-preview.png, 1733 × 907. Herramienta integrada imagegen. Inspeccionada antes de integrarla. Prompt:

Create ONE polished landscape editorial OpenGraph card, approximately 1.91:1. Deep navy #07111F. Left: precise white sans-serif typography with strong hierarchy, exact text “Luis Alberto Rosas”, “SOFTWARE ENGINEER”, “Web • Mobile • Cloud”. Right: restrained isometric software layers and connected square nodes, blue #4C8DFF and cyan #39D0C8, dimensional lighting and soft shadows. Generous safe margins, sophisticated editorial product design, crisp contrast. No additional text, logos, watermark, portrait, code, hacker imagery, excessive glow or clutter.
