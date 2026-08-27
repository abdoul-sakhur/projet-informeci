import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { CATEGORIE_STYLES, formatDateRange, getStatut } from '@/lib/actualites';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Actualite } from '@/lib/types';

interface ProchainsEvenementsProps {
  actualites: Actualite[];
}

export default function ProchainsEvenements({ actualites }: ProchainsEvenementsProps) {
  const prochains = actualites
    .filter((a) => getStatut(a.date_debut, a.date_fin) !== 'Passé')
    .sort((a, b) => new Date(a.date_debut).getTime() - new Date(b.date_debut).getTime())
    .slice(0, 5);

  if (prochains.length === 0) return null;

  return (
    <section className="bg-primary-dark py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Calendrier"
          title="Prochains événements"
          light
        />

        <ul className="mt-12 divide-y divide-white/10">
          {prochains.map((actualite) => {
            const thumbUrl = getStrapiImageURL(actualite.image, 'thumbnail');
            return (
              <li key={actualite.id}>
                <Link
                  href={`/actualites/${actualite.slug}`}
                  className="group flex items-center gap-4 py-5 transition-colors hover:bg-white/5 sm:gap-6"
                >
                  <span className="hidden w-32 shrink-0 text-sm text-white/60 sm:block">
                    {formatDateRange(actualite.date_debut, actualite.date_fin)}
                  </span>
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <span
                      className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${CATEGORIE_STYLES[actualite.categorie]}`}
                    >
                      {actualite.categorie}
                    </span>
                    <h3 className="mt-1 truncate font-serif text-base font-bold text-white sm:text-lg">
                      {actualite.titre}
                    </h3>
                    <p className="text-sm text-white/60">{actualite.lieu}</p>
                  </div>
                  {thumbUrl && (
                    <div className="relative hidden h-14 w-20 shrink-0 overflow-hidden rounded-lg sm:block">
                      <Image src={thumbUrl} alt="" fill unoptimized className="object-cover" sizes="80px" />
                    </div>
                  )}
                  <ArrowRight
                    className="h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
