export function navigateWithTransition(go: () => void) {
  if (
    typeof document === 'undefined' ||
    !('startViewTransition' in document) ||
    document.documentElement.dataset.motion === 'paused' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    go();
    return;
  }
  document.startViewTransition(go);
}
