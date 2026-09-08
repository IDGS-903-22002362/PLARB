'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';
import { navigateWithTransition } from '@/lib/view-transition';
export default function TransitionLink({
  href,
  onClick,
  ...props
}: ComponentProps<typeof Link>) {
  const router = useRouter();
  const path = typeof href === 'string' ? href : href.pathname || '/';
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)
      return;
    if (event.button !== 0) return;
    if (path.startsWith('http') || path.startsWith('mailto:')) return;
    event.preventDefault();
    navigateWithTransition(() => router.push(path));
  };
  return <Link href={href} onClick={handle} {...props} />;
}
