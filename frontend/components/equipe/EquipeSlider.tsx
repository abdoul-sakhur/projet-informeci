'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, User } from 'lucide-react';
import CmsImage from '@/components/ui/CmsImage';
import { getStrapiImageURL } from '@/lib/strapi';
import type { MembreEquipe } from '@/lib/types';

interface EquipeSliderProps {
  membres: MembreEquipe[];
}

export default function EquipeSlider({ membres }: EquipeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('[data-card]') as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {membres.map((membre) => (
          <div
            key={membre.id}
            data-card
            className="w-64 shrink-0 snap-start overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 sm:w-72"
          >
            <CmsImage
              src={getStrapiImageURL(membre.photo, 'medium')}
              alt={membre.nom}
              label={`Portrait — ${membre.nom}`}
              ratio="3/4"
              rounded="rounded-none"
            />
            <div className="p-5">
              <h3 className="font-serif text-lg font-bold text-primary-dark">{membre.nom}</h3>
              <p className="mt-1 text-sm font-medium text-secondary">{membre.poste}</p>
              {membre.departement && (
                <p className="mt-1 text-xs uppercase tracking-wide text-text/50">
                  {membre.departement}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {membres.length > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-dark shadow-sm ring-1 ring-black/5 transition-colors hover:bg-secondary-light hover:text-secondary"
            aria-label="Membres précédents"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary-dark shadow-sm ring-1 ring-black/5 transition-colors hover:bg-secondary-light hover:text-secondary"
            aria-label="Membres suivants"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {membres.length === 0 && (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center ring-1 ring-black/5">
          <User className="h-10 w-10 text-gray-300" aria-hidden="true" />
          <p className="text-sm text-text/60">L&apos;équipe sera bientôt présentée ici.</p>
        </div>
      )}
    </div>
  );
}
