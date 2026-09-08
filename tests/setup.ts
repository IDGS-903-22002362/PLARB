import { vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
afterEach(() => {
  cleanup();
  localStorage.clear();
});
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
globalThis.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
globalThis.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
  root = null;
  rootMargin = '';
  scrollMargin = '';
  thresholds = [];
};
Element.prototype.scrollIntoView = vi.fn();
