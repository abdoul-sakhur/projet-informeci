'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ImageOff, X } from 'lucide-react';
import { getStrapiImageURL } from '@/lib/strapi';
import type { StrapiMedia } from '@/lib/types';

interface PhotoGalleryProps {
  photos: StrapiMedia[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [index, setIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const close = useCallback(() => setIndex(null), []);
  const goTo = useCallback(
    (next: number) => setIndex(((next % photos.length) + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (index === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') goTo(index - 1);
      if (event.key === 'ArrowRight') goTo(index + 1);
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [index, close, goTo]);

  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center ring-1 ring-black/5">
        <ImageOff className="h-10 w-10 text-gray-300" aria-hidden="true" />
        <p className="text-sm text-text/60">La galerie sera bientôt alimentée.</p>
      </div>
    );
  }

  const selected = index !== null ? photos[index] : null;

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((photo, i) => {
          const thumbUrl = getStrapiImageURL(photo, 'small');
          return (
            <button
              key={photo.id}
              type="button"
              onClick={() => setIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-neutral ring-1 ring-black/5"
              aria-label={`Agrandir la photo ${i + 1}`}
            >
              {thumbUrl && (
                <Image
                  src={thumbUrl}
                  alt={photo.alternativeText || ''}
                  fill
                  unoptimized
                  sizes="200px"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
              )}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
          >
            <div
              className="absolute inset-0 bg-primary-dark/90 backdrop-blur-sm"
              onClick={close}
              aria-hidden="true"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo((index ?? 0) - 1)}
                  aria-label="Photo précédente"
                  className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-8"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo((index ?? 0) + 1)}
                  aria-label="Photo suivante"
                  className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-8"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden="true" />
                </button>
              </>
            )}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Photo agrandie"
              className="relative h-[80vh] w-full max-w-4xl"
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            >
              <Image
                src={getStrapiImageURL(selected, 'large') ?? ''}
                alt={selected.alternativeText || ''}
                fill
                unoptimized
                sizes="90vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
