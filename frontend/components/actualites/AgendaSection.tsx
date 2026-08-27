'use client';

import { useMemo, useState } from 'react';
import { CalendarX } from 'lucide-react';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { getStatut, type StatutEvenement } from '@/lib/actualites';
import EventCard from './EventCard';
import FeaturedEventCard from './FeaturedEventCard';
import type { Actualite } from '@/lib/types';

interface AgendaSectionProps {
  actualites: Actualite[];
}

const FILTRES: { label: string; statut: StatutEvenement | 'Tous' }[] = [
  { label: 'Tous', statut: 'Tous' },
  { label: 'En cours', statut: 'En cours' },
  { label: 'À venir', statut: 'À venir' },
  { label: 'Passés', statut: 'Passé' },
];

const PAGE_SIZE = 6;

export default function AgendaSection({ actualites }: AgendaSectionProps) {
  const [filtre, setFiltre] = useState<StatutEvenement | 'Tous'>('Tous');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const featured = actualites.find((a) => a.a_la_une) ?? null;

  const filtres = useMemo(
    () => actualites.filter((a) => a.id !== featured?.id),
    [actualites, featured]
  );

  const filtered = useMemo(
    () => (filtre === 'Tous' ? filtres : filtres.filter((a) => getStatut(a.date_debut, a.date_fin) === filtre)),
    [filtres, filtre]
  );

  const visible = filtered.slice(0, visibleCount);

  if (actualites.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-20 text-center ring-1 ring-black/5">
        <CalendarX className="h-10 w-10 text-gray-300" aria-hidden="true" />
        <p className="text-sm text-text/60">Aucun événement pour le moment — revenez bientôt.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTRES.map((f) => (
          <button
            key={f.label}
            type="button"
            onClick={() => {
              setFiltre(f.statut);
              setVisibleCount(PAGE_SIZE);
            }}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              filtre === f.statut
                ? 'bg-primary-dark text-white'
                : 'bg-white text-text/70 ring-1 ring-black/10 hover:bg-neutral'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {featured && filtre === 'Tous' && (
        <div className="mb-10">
          <FeaturedEventCard actualite={featured} />
        </div>
      )}

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center ring-1 ring-black/5">
          <CalendarX className="h-10 w-10 text-gray-300" aria-hidden="true" />
          <p className="text-sm text-text/60">Aucun événement dans cette catégorie.</p>
        </div>
      ) : (
        <StaggerGrid className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((actualite) => (
            <StaggerItem key={actualite.id}>
              <EventCard actualite={actualite} />
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}

      {visibleCount < filtered.length && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
            className="rounded-lg border-2 border-primary-dark px-6 py-3 font-semibold text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
          >
            Charger plus d&apos;événements
          </button>
        </div>
      )}
    </div>
  );
}
