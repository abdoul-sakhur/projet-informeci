import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { CATEGORIE_STYLES } from '@/lib/actualites';
import { getStrapiImageURL } from '@/lib/strapi';
import { formatDateRange } from '@/lib/actualites';
import type { Actualite } from '@/lib/types';

interface ActualitesHeroProps {
  actualite: Actualite;
}

export default function ActualitesHero({ actualite }: ActualitesHeroProps) {
  const imageUrl = getStrapiImageURL(actualite.image, 'large');

  return (
    <section className="relative overflow-hidden bg-primary-dark pb-16 pt-36 sm:pb-20 sm:pt-40">
      {imageUrl && (
        <div className="absolute inset-0" aria-hidden="true">
          <Image src={imageUrl} alt="" fill unoptimized sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-primary-dark/40" />
        </div>
      )}

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <span
          className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${CATEGORIE_STYLES[actualite.categorie]}`}
        >
          {actualite.categorie}
        </span>

        <h1 className="mt-5 text-4xl font-bold leading-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-5xl">
          {actualite.titre}
        </h1>

        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]">
          {actualite.resume}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/85">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" aria-hidden="true" />
            {formatDateRange(actualite.date_debut, actualite.date_fin)}
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {actualite.lieu}
          </span>
        </div>

        <Link
          href={`/actualites/${actualite.slug}`}
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg"
        >
          Voir le programme
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
