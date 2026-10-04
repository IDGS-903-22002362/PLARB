import type { SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * Modern technical browser/viewport glyph for Web engineering
 */
export function WebGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-web ${className}`}
      aria-hidden="true"
      {...props}
    >
      <rect x="1.5" y="2.5" width="13" height="11" rx="2" />
      <line x1="1.5" y1="5.5" x2="14.5" y2="5.5" />
      <circle cx="3.8" cy="4" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="5.5" cy="4" r="0.6" fill="currentColor" stroke="none" />
      <line x1="5.5" y1="8" x2="10.5" y2="8" />
      <line x1="5.5" y1="10.5" x2="8.5" y2="10.5" />
    </svg>
  );
}

/**
 * Modern bezel-less smartphone glyph for Mobile engineering
 */
export function MobileGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-mobile ${className}`}
      aria-hidden="true"
      {...props}
    >
      <rect x="3.5" y="1.5" width="9" height="13" rx="2.2" />
      {/* Dynamic island / speaker dot */}
      <line x1="6.8" y1="3.2" x2="9.2" y2="3.2" strokeWidth="1.2" />
      {/* Home swipe indicator */}
      <line x1="6.5" y1="12.5" x2="9.5" y2="12.5" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Modular distributed server/services glyph for Backend engineering
 */
export function BackendGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-backend ${className}`}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="12" height="4.2" rx="1.2" />
      <rect x="2" y="9.8" width="12" height="4.2" rx="1.2" />
      <circle cx="4.5" cy="4.1" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="11.9" r="0.6" fill="currentColor" stroke="none" />
      <path d="M8 6.2v3.6" strokeDasharray="1.2 1.2" />
    </svg>
  );
}

/**
 * Edge cloud and distributed infrastructure glyph
 */
export function CloudGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-cloud ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M4.5 12.5h7.2a2.8 2.8 0 0 0 .5-5.55 3.8 3.8 0 0 0-7.3-1.15A2.7 2.7 0 0 0 4.5 12.5z" />
    </svg>
  );
}

/**
 * Authentic minimal Apple icon for App Store links
 */
export function AppleStoreGlyph({ size = 14, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 170 170"
      fill="currentColor"
      className={`tech-icon tech-icon-apple ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.67-7.81-11.96-14.34-6.3-9.68-11.19-20.65-14.67-32.92-3.48-12.27-5.22-23.77-5.22-34.5 0-14.07 3.52-25.79 10.56-35.16 7.04-9.37 15.82-14.15 26.33-14.34 5.37 0 11.12 1.48 17.27 4.43 6.15 2.95 10.15 4.49 12 4.62 1.34 0 5.43-1.63 12.28-4.88 6.84-3.25 12.82-4.66 17.94-4.22 13.62.9 24.32 5.86 32.1 14.88-11.96 7.23-17.83 17.07-17.62 29.53.22 9.87 4.04 18.06 11.46 24.58 7.42 6.51 16.14 10.37 26.16 11.58-2.3 7.07-5.22 14.73-8.76 22.97zM119.22 31.84c0-7.39 2.65-14.54 7.95-21.46 5.3-6.92 11.89-11.08 19.78-12.49.22 1.12.33 2.13.33 3.03 0 7.39-2.73 14.67-8.2 21.84-5.46 7.18-12.16 11.33-20.09 12.47-.45-1.12-.67-2.12-.67-3.39z" />
    </svg>
  );
}

/**
 * Authentic minimal Google Play vector glyph for Play Store links
 */
export function GooglePlayGlyph({ size = 14, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={`tech-icon tech-icon-play ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M3.6 1.8c-.3.3-.4.8-.4 1.4v17.6c0 .6.1 1.1.4 1.4l9.4-9.4L3.6 1.8zm11.2 8.3L12.3 7.6 4.9 2.5c.3-.1.7-.1 1.1.1l11.4 6.5-2.6 1zm0 3.8l2.6 1-11.4 6.5c-.4.2-.8.2-1.1.1l7.4-5.1 2.5-2.5zm1.5-1.5l2.8 1.6c.9.5.9 1.4 0 1.9l-2.8 1.6-2.1-2.1 2.1-3z" />
    </svg>
  );
}

/**
 * Precision store / commerce web glyph
 */
export function StoreFrontGlyph({ size = 14, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-store ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M2 5.5L3.5 2h9L14 5.5v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-8z" />
      <path d="M2 5.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5" />
      <path d="M6 14v-4h4v4" />
    </svg>
  );
}

/**
 * Authentic hospitality / VIP sparkle glyph for Servicio Palcos link
 */
export function PalcosGlyph({ size = 13, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      className={`tech-icon tech-icon-palcos ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M8 1.2c.2 1.8 1.6 3.2 3.4 3.4-1.8.2-3.2 1.6-3.4 3.4-.2-1.8-1.6-3.2-3.4-3.4 1.8-.2 3.2-1.6 3.4-3.4zM12.5 9.5c.1 1 .9 1.8 1.9 1.9-1 .1-1.8.9-1.9 1.9-.1-1-.9-1.8-1.9-1.9 1-.1 1.8-.9 1.9-1.9z" />
    </svg>
  );
}

/**
 * Precision diagonal external link arrow
 */
export function TechArrowUpRight({ size = 15, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-arrow tech-arrow-up-right ${className}`}
      aria-hidden="true"
      {...props}
    >
      <line x1="4.5" y1="11.5" x2="11.5" y2="4.5" />
      <polyline points="5.5 4.5 11.5 4.5 11.5 10.5" />
    </svg>
  );
}

/**
 * Precision downward hero CTA arrow
 */
export function TechArrowDown({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-arrow tech-arrow-down ${className}`}
      aria-hidden="true"
      {...props}
    >
      <line x1="8" y1="2.5" x2="8" y2="13.5" />
      <polyline points="4 9.5 8 13.5 12 9.5" />
    </svg>
  );
}

/**
 * Bespoke document download glyph for CV Link
 */
export function DocDownloadGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon tech-icon-cv ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M9.5 2H4a1.5 1.5 0 0 0-1.5 1.5v9A1.5 1.5 0 0 0 4 14h8a1.5 1.5 0 0 0 1.5-1.5V6L9.5 2z" />
      <polyline points="9.5 2 9.5 6 13.5 6" />
      <line x1="8" y1="8.5" x2="8" y2="12" />
      <polyline points="6.2 10.5 8 12.2 9.8 10.5" />
    </svg>
  );
}

/**
 * Modern tactile scroll cue indicator with animated glide
 */
export function ScrollCueGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <span className={`scroll-cue-wrapper ${className}`} aria-hidden="true">
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scroll-cue-pill"
        {...props}
      >
        <rect x="4" y="2" width="8" height="12" rx="4" />
        <circle className="scroll-cue-dot" cx="8" cy="5.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="scroll-cue-chevron"
      >
        <polyline points="1.5 1.5 5 4.5 8.5 1.5" />
      </svg>
    </span>
  );
}

/**
 * Architecture node glyphs
 */
export function ServerApiGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2.5" width="12" height="4.5" rx="1" />
      <rect x="2" y="9" width="12" height="4.5" rx="1" />
      <circle cx="4.5" cy="4.8" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="4.5" cy="11.3" r="0.6" fill="currentColor" stroke="none" />
      <line x1="8" y1="4.8" x2="11.5" y2="4.8" />
      <line x1="8" y1="11.3" x2="11.5" y2="11.3" />
    </svg>
  );
}

export function PaymentGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <rect x="1.5" y="3" width="13" height="10" rx="2" />
      <line x1="1.5" y1="6.5" x2="14.5" y2="6.5" />
      <rect x="3.5" y="9.5" width="3" height="1.5" rx="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function StockLedgerGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M8 1.5l5.5 3v7l-5.5 3-5.5-3v-7z" />
      <line x1="8" y1="1.5" x2="8" y2="14.5" />
      <polyline points="2.5 4.5 8 7.5 13.5 4.5" />
    </svg>
  );
}

export function WebhookGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <circle cx="8" cy="8" r="2.2" />
      <path d="M4 4l2.5 2.5" />
      <path d="M12 4l-2.5 2.5" />
      <path d="M8 10.5v3" />
      <circle cx="4" cy="4" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="4" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="8" cy="13.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function OrdersGlyph({ size = 16, className = '', ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`tech-icon ${className}`}
      aria-hidden="true"
      {...props}
    >
      <path d="M4 2.5h8a1.5 1.5 0 0 1 1.5 1.5v9.5L8 11.5 2.5 13.5V4A1.5 1.5 0 0 1 4 2.5z" />
      <line x1="5.5" y1="5.5" x2="10.5" y2="5.5" />
      <line x1="5.5" y1="8" x2="8.5" y2="8" />
    </svg>
  );
}
