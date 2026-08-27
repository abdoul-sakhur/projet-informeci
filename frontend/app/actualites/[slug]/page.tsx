import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Users } from 'lucide-react';
import { CATEGORIE_STYLES, STATUT_STYLES, formatDateRange, getStatut } from '@/lib/actualites';
import { getActualiteBySlug, getStrapiImageURL } from '@/lib/strapi';

interface ActualitePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ActualitePageProps): Promise<Metadata> {
  const { slug } = await params;
  const actualite = await getActualiteBySlug(slug);
  if (!actualite) return {};

  return {
    title: actualite.titre,
    description: actualite.resume,
    alternates: { canonical: `/actualites/${actualite.slug}` },
  };
}

export default async function ActualitePage({ params }: ActualitePageProps) {
  const { slug } = await params;
  const actualite = await getActualiteBySlug(slug);
  if (!actualite) notFound();

  const statut = getStatut(actualite.date_debut, actualite.date_fin);
  const imageUrl = getStrapiImageURL(actualite.image, 'large');

  return (
    <>
      <section className="relative overflow-hidden bg-primary-dark pb-16 pt-36 sm:pb-20 sm:pt-40">
        {imageUrl && (
          <div className="absolute inset-0" aria-hidden="true">
            <Image src={imageUrl} alt="" fill unoptimized sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/70 to-primary-dark/40" />
          </div>
        )}

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/actualites"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour aux actualités
          </Link>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${CATEGORIE_STYLES[actualite.categorie]}`}
            >
              {actualite.categorie}
            </span>
            <span className={`inline-block rounded-full px-4 py-1.5 text-xs font-bold ${STATUT_STYLES[statut]}`}>
              {statut}
            </span>
          </div>

          <h1 className="mt-5 text-3xl font-bold leading-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-4xl lg:text-5xl">
            {actualite.titre}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-white/85">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" aria-hidden="true" />
              {formatDateRange(actualite.date_debut, actualite.date_fin)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {actualite.lieu}
            </span>
            {actualite.places_disponibles !== null && (
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" aria-hidden="true" />
                {actualite.places_disponibles} places disponibles
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg font-medium leading-relaxed text-primary-dark">{actualite.resume}</p>

          {actualite.description && (
            <div className="mt-6 whitespace-pre-line leading-relaxed text-text/80">
              {actualite.description}
            </div>
          )}

          {actualite.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
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

          <div className="mt-10 flex flex-wrap gap-4 border-t border-gray-100 pt-8">
            {actualite.lien_externe && (
              <a
                href={actualite.lien_externe}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-secondary px-6 py-3 font-semibold text-white shadow-md transition-all hover:brightness-110 hover:shadow-lg"
              >
                Voir le programme complet
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-dark px-6 py-3 font-semibold text-primary-dark transition-colors hover:bg-primary-dark hover:text-white"
            >
              Nous contacter à ce sujet
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
