export function navigateWithTransition(go: () => void) {
  if (typeof document === 'undefined' || !('startViewTransition' in document)) {
    go();
    return;
  }
  document.startViewTransition(go);
}
