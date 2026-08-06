'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function CountUp({ value, suffix = '', duration = 1.6, className = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) return;

    let start: number | null = null;
    let frame: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value, duration, shouldReduceMotion]);

  const displayValue = shouldReduceMotion ? value : display;

  return (
    <span ref={ref} className={className}>
      {displayValue}
      {suffix}
    </span>
  );
}
