export function useRouter() {
  return { push: (href: string) => href };
}

export function usePathname() {
  return window.location.pathname;
}
