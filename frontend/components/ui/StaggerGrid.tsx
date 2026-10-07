'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

interface StaggerGridProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGrid({ children, className = '', staggerDelay = 0.12 }: StaggerGridProps) {
  const shouldReduceMotion = useReducedMotion();
  const pathname = usePathname();

  const container: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : staggerDelay },
    },
  };

  return (
    // See AnimatedSection.tsx — keyed by route so Next.js's Router Cache
    // can't leave this stuck on a stale, already-fired-or-never-fired
    // IntersectionObserver when the page is revisited via client-side nav.
    <motion.div
      key={pathname}
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  const item: Variants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}
