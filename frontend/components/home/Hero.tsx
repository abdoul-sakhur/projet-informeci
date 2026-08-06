'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

interface HeroProps {
  titre: string;
  sousTitre: string;
  backgroundImageUrl?: string | null;
}

export default function Hero({ titre, sousTitre, backgroundImageUrl }: HeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 140]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark"
    >
      {backgroundImageUrl && (
        <motion.div style={{ y }} className="absolute inset-0" aria-hidden="true">
          <Image
            src={backgroundImageUrl}
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/85 via-primary/75 to-primary-dark/90" />
        </motion.div>
      )}

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
          className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20"
        >
          Depuis 1998 — Agréé FDFP &amp; FIRCA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl"
        >
          {titre}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/85"
        >
          {sousTitre}
        </motion.p>

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
      </div>
    </section>
  );
}
