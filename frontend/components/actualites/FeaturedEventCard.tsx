import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';
import CmsImage from '@/components/ui/CmsImage';
import { CATEGORIE_STYLES, STATUT_STYLES, formatDateRange, getStatut } from '@/lib/actualites';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Actualite } from '@/lib/types';

interface FeaturedEventCardProps {
  actualite: Actualite;
}

export default function FeaturedEventCard({ actualite }: FeaturedEventCardProps) {
  const statut = getStatut(actualite.date_debut, actualite.date_fin);
  const imageUrl = getStrapiImageURL(actualite.image, 'large');

  return (
    <div className="grid overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-2">
      <div className="relative">
        <CmsImage
          src={imageUrl}
          alt={actualite.titre}
          label={actualite.titre}
          ratio="4/3"
          rounded="rounded-none"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${CATEGORIE_STYLES[actualite.categorie]}`}
          >
            {actualite.categorie}
          </span>
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${STATUT_STYLES[statut]}`}>
            {statut}
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center p-8">
        <p className="text-sm font-medium text-text/60">
          {formatDateRange(actualite.date_debut, actualite.date_fin)} · {actualite.lieu}
        </p>
        <h3 className="mt-3 font-serif text-2xl font-bold text-primary-dark">{actualite.titre}</h3>
        <p className="mt-4 leading-relaxed text-text/75">{actualite.resume}</p>

        {actualite.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {actualite.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full bg-neutral px-3 py-1 text-xs font-medium text-text/60"
              >
                {tag.libelle}
              </span>
            ))}
          </div>
        )}

        {actualite.places_disponibles !== null && (
          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-sm">
            <span className="flex items-center gap-2 font-medium text-text/60">
              <Users className="h-4 w-4" aria-hidden="true" />
              Places disponibles
            </span>
            <span className="font-bold text-primary-dark">{actualite.places_disponibles}</span>
          </div>
        )}

        <Link
          href={`/actualites/${actualite.slug}`}
          className="mt-6 inline-flex items-center justify-center gap-2 self-start rounded-lg bg-primary-dark px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary hover:shadow-lg"
        >
          Voir l&apos;événement
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
