'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
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
    <Component
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
