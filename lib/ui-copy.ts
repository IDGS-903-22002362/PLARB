import { c, type Copy } from './projects';

/** Shared editorial labels; product names and technology names remain unchanged. */
const labels: Record<string, Copy> = {
  'SOFTWARE ENGINEER': c('INGENIERO DE SOFTWARE', 'SOFTWARE ENGINEER'),
  'MOBILE / NATIVE INTEGRATIONS': c(
    'MÓVIL / INTEGRACIONES NATIVAS',
    'MOBILE / NATIVE INTEGRATIONS',
  ),
  'COMMERCE / PAYMENTS / INVENTORY / APPLIED AI': c(
    'COMERCIO / PAGOS / INVENTARIO / IA APLICADA',
    'COMMERCE / PAYMENTS / INVENTORY / APPLIED AI',
  ),
  'OPERATIONS / FULL STACK': c(
    'OPERACIÓN / FULL STACK',
    'OPERATIONS / FULL STACK',
  ),
  'SYSTEMS INTEGRATION / 2025': c(
    'INTEGRACIÓN DE SISTEMAS / 2025',
    'SYSTEMS INTEGRATION / 2025',
  ),
  'ENGINEERING APPROACH': c('CRITERIO DE INGENIERÍA', 'ENGINEERING APPROACH'),
  'SELECTED WORK': c('PROYECTOS SELECCIONADOS', 'SELECTED WORK'),
  'ENGINEERING CAPABILITIES': c(
    'CAPACIDADES DE INGENIERÍA',
    'ENGINEERING CAPABILITIES',
  ),
  EXPERIENCE: c('EXPERIENCIA', 'EXPERIENCE'),
  TECHNOLOGIES: c('TECNOLOGÍAS', 'TECHNOLOGIES'),
  'OVERVIEW / CONTEXT': c('PANORAMA / CONTEXTO', 'OVERVIEW / CONTEXT'),
  'SYSTEM ARCHITECTURE': c('ARQUITECTURA DEL SISTEMA', 'SYSTEM ARCHITECTURE'),
  'ENGINEERING CHALLENGES': c('RETOS DE INGENIERÍA', 'ENGINEERING CHALLENGES'),
  IMPLEMENTATION: c('IMPLEMENTACIÓN', 'IMPLEMENTATION'),
  'RESULTS / LESSONS': c('RESULTADOS / APRENDIZAJES', 'RESULTS / LESSONS'),
  Inventory: c('Inventario', 'Inventory'),
  Orders: c('Pedidos', 'Orders'),
  Sales: c('Ventas', 'Sales'),
  'Cash closing': c('Corte de caja', 'Cash closing'),
  Frontend: c('Interfaz web', 'Frontend'),
  Mobile: c('Móvil', 'Mobile'),
  Cloud: c('Nube', 'Cloud'),
  MOBILE: c('MÓVIL', 'MOBILE'),
  CLOUD: c('NUBE', 'CLOUD'),
  'WEB / MOBILE': c('WEB / MÓVIL', 'WEB / MOBILE'),
  'API / SERVICES': c('API / SERVICIOS', 'API / SERVICES'),
  'DATA / CLOUD': c('DATOS / NUBE', 'DATA / CLOUD'),
  PRODUCT: c('PRODUCTO', 'PRODUCT'),
  SYSTEM: c('SISTEMA', 'SYSTEM'),
  ARCHITECTURE: c('ARQUITECTURA', 'ARCHITECTURE'),
  INTERFACE: c('INTERFAZ', 'INTERFACE'),
  SERVICES: c('SERVICIOS', 'SERVICES'),
  DATA: c('DATOS', 'DATA'),
  APP: c('APP', 'APP'),
  STATE: c('ESTADO', 'STATE'),
  NATIVE: c('NATIVO', 'NATIVE'),
  NOTIFY: c('AVISOS', 'NOTIFY'),
  'Providers / cache': c('Providers / caché', 'Providers / cache'),
  Destinations: c('Destinos', 'Destinations'),
  PAYMENTS: c('PAGOS', 'PAYMENTS'),
  ORDERS: c('PEDIDOS', 'ORDERS'),
  INVENTORY: c('INVENTARIO', 'INVENTORY'),
  'State transitions': c('Transiciones de estado', 'State transitions'),
  Reservations: c('Reservas', 'Reservations'),
  'Full stack / Mobile': c('Full stack / Móvil', 'Full stack / Mobile'),
  'POS · Concesiones': c('POS · Concesiones', 'POS · Concessions'),
};
export function uiCopy(label: string): Copy {
  return labels[label] ?? c(label, label);
}
