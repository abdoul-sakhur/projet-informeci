import Link from 'next/link';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import CmsImage from '@/components/ui/CmsImage';
import { CATEGORIE_STYLES, STATUT_STYLES, formatDateRange, getStatut } from '@/lib/actualites';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Actualite } from '@/lib/types';

interface EventCardProps {
  actualite: Actualite;
}

export default function EventCard({ actualite }: EventCardProps) {
  const statut = getStatut(actualite.date_debut, actualite.date_fin);
  const imageUrl = getStrapiImageURL(actualite.image, 'medium');

  return (
    <Link
      href={`/actualites/${actualite.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative">
        <CmsImage
          src={imageUrl}
          alt={actualite.titre}
          label={actualite.titre}
          ratio="4/3"
          rounded="rounded-none"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${CATEGORIE_STYLES[actualite.categorie]}`}
          >
            {actualite.categorie}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${STATUT_STYLES[statut]}`}
          >
            {statut}
          </span>
        </div>
        {actualite.places_disponibles !== null && (
          <span className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white">
            <Users className="h-3 w-3" aria-hidden="true" />
            {actualite.places_disponibles} places
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-xs font-medium text-text/60">
          <span>{formatDateRange(actualite.date_debut, actualite.date_fin)}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {actualite.lieu}
          </span>
        </p>
        <h3 className="mt-2 font-serif text-lg font-bold text-primary-dark">{actualite.titre}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text/70">{actualite.resume}</p>

        {actualite.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {actualite.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-neutral px-2.5 py-1 text-xs font-medium text-text/60"
              >
                {tag.libelle}
              </span>
            ))}
          </div>
        )}

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
          Lire
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
