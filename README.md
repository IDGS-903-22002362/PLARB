# Luis Rosas — Portafolio profesional

Versión local de un portafolio de ingeniería basado en los proyectos de Club León y en el CV proporcionado. No utiliza credenciales ni se conecta a bases de datos de producción.

## Ejecutar

Requiere Node.js >= 22.13.0.

```powershell
npm ci
npm run dev
```

Abrir http://localhost:4317/. El servidor escucha exclusivamente en 127.0.0.1. Para probar el build, detener el servidor de desarrollo y ejecutar:

```powershell
npm run build
npm start
```

## Contenido y rutas

- / — Presentación, productos, capacidades, experiencia, decisiones, stack, formación y contacto.
- /projects/club-leon-app — App oficial: calendarios, caché, widgets y servicios del ecosistema.
- /projects/la-guarida — Tienda: precio en servidor, pagos, reservas concurrentes y promociones.
- /projects/pos-concesiones — Operación de concesiones y conciliación del canal VIP.
- /projects/commerce-iot — Proyecto previo de 2025 documentado en el CV.

Los casos incluyen contexto, problema, participación, requisitos, arquitectura interactiva, decisiones, implementación, seguridad, resultados, stack y aprendizajes. El POS Flask/MySQL de 2024 se presenta por separado en la experiencia; no se mezcla con el POS de Club León.

## Organización

- lib/portfolio-data.ts: perfil y contactos profesionales.
- lib/projects.ts: contenido bilingüe, decisiones, stack y nodos de los casos.
- lib/metadata.ts: metadatos por caso y datos estructurados.
- components/portfolio/: componentes de navegación, preferencias, home, contacto, casos, visuales y arquitectura.
- components/portfolio/system-scene.tsx: carga progresiva y alternativa HTML del 3D.
- components/portfolio/system-scene-engine.ts: geometría Three.js y render bajo demanda.
- app/portfolio.css, projects.css, case-studies.css, responsive.css: tokens, sistema visual y adaptaciones.
- public/Luis-Alberto-Rosas-CV.pdf: copia exacta del PDF entregado por el propietario.
- public/projects/: campañas y capturas oficiales locales.
- public/social-preview.png: imagen OpenGraph generada para esta presentación.

## Decisiones técnicas

Se conserva React, TypeScript, Vinext/Vite y el scaffold de Sites. No se migró framework ni se añadieron dependencias para el rediseño. Lucide es la única familia de iconos. DM Sans y Space Grotesk se sirven localmente.

El 3D representa interfaz, servicios y datos. Three.js se importa cuando la escena se aproxima al viewport. No hay texturas remotas, postprocesamiento ni bucle permanente: solo render al redimensionar o interactuar, con una breve interpolación. DPR limitado a 1.25 en superficies pequeñas y 1.6 en escritorio. Al salir de pantalla, ocultar pestaña o desmontar se suspenden o liberan los recursos. Si falla WebGL se conserva una representación HTML.

El tema sigue el sistema y admite selección manual persistente: sistema → oscuro → claro. ES/EN y pausa de movimiento también persisten. Las preferencias se sincronizan con useSyncExternalStore. La preferencia de movimiento reducido activa una presentación estática; el visitante puede activar movimiento explícitamente. No hay captura de rueda, bloqueo de scroll ni sustitución del desplazamiento nativo.

Los diagramas responden a hover, foco y activación por teclado/touch. La navegación usa enlaces reales y los casos tienen URL propia. Las imágenes incluyen dimensiones y carga diferida. Los assets públicos oficiales se guardaron localmente para no depender de Google Play durante la visualización.

## Comprobación

```powershell
npm run typecheck
npm run lint
npm test
npm run build
```

Ver QA.md para la evidencia de comprobación. El aviso de chunk >500 kB corresponde al motor Three.js cargado de forma diferida; no se oculta ese aviso. No se atribuyen resultados de Lighthouse ni Core Web Vitals de campo a esta versión local.

## Límite local

No se registró ni desplegó un sitio. .openai/hosting.json conserva únicamente bindings nulos. Canonical, OpenGraph y sitemap utilizan localhost:4317. Robots permanece en noindex/nofollow y robots.txt bloquea rastreo. La imagen social está preparada, pero un servicio externo no puede obtener una URL local.

Antes de un despliegue futuro autorizado habría que configurar un dominio real en lib/metadata.ts y revisar la política de indexación. No se realizan esos cambios ahora.

## Información pendiente

No se inventaron perfiles de GitHub/LinkedIn, fechas exactas de contratación, métricas de impacto ni capturas de sistemas internos. Estos datos pueden añadirse cuando el propietario los proporcione. El alcance documental y las fuentes están en PROJECT-EVIDENCE.md.
