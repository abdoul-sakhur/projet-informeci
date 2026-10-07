'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right' | 'none';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  as?: 'div' | 'section';
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 32 },
  left: { x: -32 },
  right: { x: 32 },
  none: {},
};

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  as = 'div',
}: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();
  const Component = motion[as];

  const variants: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, ...offsets[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, delay, ease: 'easeOut' },
    },
  };

  return (
    // Keyed by route: Next.js's client-side Router Cache can reuse an
    // already-rendered instance of this component when a page is revisited
    // (back button, or re-clicking a nav link), leaving it frozen at its
    // "hidden" (opacity: 0) state with no fresh IntersectionObserver to
    // trigger the reveal — permanently invisible for content the user never
    // needs to scroll past. The key forces a clean remount (and a fresh
    // observer, correctly timed after layout) on every route change.
    <Component
      key={pathname}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={variants}
    >
      {children}
    </Component>
  );
}
