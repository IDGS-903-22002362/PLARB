'use client';

import { useEffect, useState } from 'react';
import { ThinkingOrb, type ThinkingOrbProps, type OrbState, type OrbSize } from 'thinking-orbs';
import { usePreferences } from './preferences';

export interface ThinkingOrbWrapperProps extends Omit<ThinkingOrbProps, 'paused'> {
  state?: OrbState;
  size?: OrbSize;
  color?: string;
  className?: string;
  paused?: boolean;
}

export function ThinkingOrbWrapper({
  state = 'breathing',
  size = 20,
  color,
  className = '',
  paused: manualPaused,
  style,
}: ThinkingOrbWrapperProps) {
  const [mounted, setMounted] = useState(false);
  const { paused: globalPaused, theme } = usePreferences();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPaused = manualPaused !== undefined ? manualPaused : globalPaused;
  const orbTheme = theme === 'system' ? 'auto' : theme;

  if (!mounted) {
    return (
      <span
        className={`orb-placeholder ${className}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color || 'var(--cyan)',
          opacity: 0.35,
          ...style,
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <span
      className={`thinking-orb-container ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        lineHeight: 0,
        ...style,
      }}
      aria-hidden="true"
    >
      <ThinkingOrb
        state={state}
        size={size}
        color={color}
        theme={orbTheme}
        paused={isPaused}
      />
    </span>
  );
}
