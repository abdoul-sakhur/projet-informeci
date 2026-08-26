import Image from 'next/image';
import { User } from 'lucide-react';
import { getStrapiImageURL } from '@/lib/strapi';
import type { MembreEquipe } from '@/lib/types';

interface EquipeGridProps {
  membres: MembreEquipe[];
}

export default function EquipeGrid({ membres }: EquipeGridProps) {
  if (membres.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center ring-1 ring-black/5">
        <User className="h-10 w-10 text-gray-300" aria-hidden="true" />
        <p className="text-sm text-text/60">L&apos;équipe sera bientôt présentée ici.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 sm:justify-start">
      {membres.map((membre) => {
        const photoUrl = getStrapiImageURL(membre.photo, 'medium');
        return (
          <div key={membre.id} className="w-40 text-center sm:w-48">
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-gray-100 ring-1 ring-black/5 sm:h-44 sm:w-44">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={membre.nom}
                  fill
                  unoptimized
                  sizes="176px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-14 w-14 text-gray-300" aria-hidden="true" />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-primary-dark">{membre.nom}</h3>
            <p className="mt-0.5 text-xs leading-snug text-text/60">{membre.poste}</p>
          </div>
        );
      })}
    </div>
  );
}
