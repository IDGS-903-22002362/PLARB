'use client';
import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Database,
  Droplets,
  Layers3,
  LockKeyhole,
  Radio,
  ShoppingBag,
} from 'lucide-react';
import { c, type Study } from '@/lib/projects';
import { usePreferences } from './preferences';
export default function ProjectVisual({
  kind,
  expanded = false,
}: {
  kind: Study['kind'];
  expanded?: boolean;
}) {
  const { t } = usePreferences();
  if (kind === 'app')
    return (
      <figure
        className={`product-visual app-visual ${expanded ? 'expanded' : ''}`}
      >
        <div className="app-orbit" aria-hidden="true" />
        <div className="app-screens">
          <Image
            unoptimized
            src="/projects/app-home.webp"
            alt={t(
              c(
                'Captura oficial: inicio de Club León FC con noticias y Fiera Racha',
                'Official screenshot: Club León FC home with news and Fiera Racha',
              ),
            )}
            width="333"
            height="592"
            loading="lazy"
            decoding="async"
          />
          <Image
            unoptimized
            src="/projects/app-calendar.webp"
            alt={t(
              c(
                'Captura oficial: calendario masculino y femenil',
                'Official screenshot: men’s and women’s calendar',
              ),
            )}
            width="333"
            height="592"
            loading="lazy"
            decoding="async"
          />
          {expanded && (
            <Image
              unoptimized
              src="/projects/app-rewards.webp"
              alt={t(
                c(
                  'Captura oficial: bonus diario de Fiera Racha',
                  'Official screenshot: Fiera Racha daily bonus',
                ),
              )}
              width="333"
              height="592"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
        <figcaption>
          {t(
            c(
              'Capturas oficiales · Google Play',
              'Official screenshots · Google Play',
            ),
          )}
        </figcaption>
      </figure>
    );
  if (kind === 'store')
    return (
      <figure className="product-visual store-visual">
        <div className="browser-device">
          <div className="browser-bar">
            <span className="browser-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>
              <LockKeyhole size={11} />
              tiendalaguarida.com
            </span>
            <ArrowRight size={12} />
          </div>
          <div className="store-campaign">
            <Image
              unoptimized
              src="/projects/jersey-campaign.webp"
              width="1920"
              height="1080"
              loading="lazy"
              decoding="async"
              alt={t(
                c(
                  'Campaña oficial de camisetas de La Guarida',
                  'Official La Guarida jersey campaign',
                ),
              )}
            />
            <div className="store-brand">
              LA GUARIDA
              <span>
                {t(
                  c('TIENDA OFICIAL · CLUB LEÓN', 'OFFICIAL STORE · CLUB LEÓN'),
                )}
              </span>
            </div>
          </div>
          <div className="store-modules">
            <span>CATALOG</span>
            <span>PAYMENTS</span>
            <span>INVENTORY</span>
          </div>
        </div>
        <div className="store-layer layer-one">
          <Layers3 size={16} />
          API / ORDERS
        </div>
        <div className="store-layer layer-two">
          <Database size={16} />
          INVENTORY / DATA
        </div>
        <figcaption>
          {t(
            c(
              'Composición con campaña oficial de la tienda',
              'Composition using the official store campaign',
            ),
          )}
        </figcaption>
      </figure>
    );
  if (kind === 'pos')
    return (
      <figure className="product-visual pos-visual">
        <div className="operation-top">
          <span>CL / OPERATIONS</span>
          <span className="operation-live">
            <i />
            {t(c('Punto de venta', 'Point of sale'))}
          </span>
        </div>
        <div className="operation-route">
          <div className="operation-main">
            <ShoppingBag size={30} />
            <span>{t(c('Venta', 'Sale'))}</span>
          </div>
          <ArrowRight className="operation-arrow" />
          <div className="operation-main">
            <Database size={30} />
            <span>{t(c('Inventario', 'Inventory'))}</span>
          </div>
        </div>
        <div className="operation-receipt">
          <span>{t(c('REGISTRO DE OPERACIÓN', 'OPERATION RECORD'))}</span>
          {[
            c('Productos y combos', 'Products & combos'),
            c('Disponibilidad por concesión', 'Stock per concession'),
            c('Corte y conciliación', 'Cash reconciliation'),
          ].map((item) => (
            <div key={item.en}>
              {t(item)}
              <Check size={17} />
            </div>
          ))}
        </div>
        <figcaption>
          {t(
            c(
              'Mapa de operación · Sistema interno',
              'Operational map · Internal system',
            ),
          )}
        </figcaption>
      </figure>
    );
  return (
    <figure className="product-visual iot-visual">
      <span className="eyebrow">CONNECTED SYSTEMS / 2025</span>
      <div className="iot-orbit">
        <div className="iot-core">
          <Droplets size={38} />
          <span>IoT</span>
        </div>
        <span className="iot-node node-web">
          WEB<span>Angular / .NET</span>
        </span>
        <span className="iot-node node-cloud">
          <Radio size={20} />
          FIREBASE
        </span>
        <span className="iot-node node-mobile">
          ANDROID<span>Kotlin</span>
        </span>
        <svg viewBox="0 0 400 300" aria-hidden="true">
          <path d="M80 70 L200 150 L320 75 M200 150 L200 270" />
        </svg>
      </div>
      <figcaption>
        {t(
          c(
            'Mapa funcional de comercio y riego conectado',
            'Functional map of commerce and connected irrigation',
          ),
        )}
      </figcaption>
    </figure>
  );
}
