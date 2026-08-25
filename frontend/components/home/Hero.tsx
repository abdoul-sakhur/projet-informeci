'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export interface HeroSlideData {
  titre: string;
  sousTitre: string | null;
  imageUrl: string | null;
}

interface HeroProps {
  slides: HeroSlideData[];
}

const AUTOPLAY_MS = 6500;

export default function Hero({ slides }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);
  const shouldReduceMotion = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const goTo = useCallback(
    (next: number) => {
      if (count === 0) return;
      setIndex(((next % count) + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (count <= 1 || paused || shouldReduceMotion) return;
    const timer = setInterval(() => goTo(index + 1), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [count, paused, shouldReduceMotion, index, goTo]);

  const slide = slides[index];

  return (
    <section
      ref={ref}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative flex min-h-screen items-center overflow-hidden bg-primary-dark"
    >
      <AnimatePresence mode="sync">
        {slide?.imageUrl && (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 1 }}
            style={{ y }}
            className="absolute inset-0"
            aria-hidden="true"
          >
            <Image
              src={slide.imageUrl}
              alt=""
              fill
              priority={index === 0}
              unoptimized
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        aria-hidden="true"
      >
        <svg className="h-full w-full" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </motion.div>

      <div
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 text-center sm:px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 inline-block rounded-full bg-black/25 px-4 py-1.5 text-sm font-semibold text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm"
        >
          Depuis 1998 — Agréé FDFP &amp; FIRCA
        </motion.span>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <h1 className="text-4xl font-bold leading-tight text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.7)] sm:text-5xl lg:text-6xl">
              {slide?.titre}
            </h1>
            {slide?.sousTitre && (
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.7)]">
                {slide.sousTitre}
              </p>
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="/services/formation-continue" variant="secondary">
            Découvrir nos formations
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="outline">
            Nous contacter
          </Button>
        </motion.div>

        {count > 1 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-black/40"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((s, i) => (
                <button
                  key={s.titre + i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Aller à la diapositive ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-black/25 text-white shadow-md ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-black/40"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
