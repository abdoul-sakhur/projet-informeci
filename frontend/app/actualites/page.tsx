import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import ActualitesHero from '@/components/actualites/ActualitesHero';
import AgendaSection from '@/components/actualites/AgendaSection';
import ProchainsEvenements from '@/components/actualites/ProchainsEvenements';
import NewsletterBand from '@/components/actualites/NewsletterBand';
import { getActualites } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Actualités',
  description:
    "Formations, ateliers, webinaires et événements INTERFORMCI : consultez l'agenda et les prochaines dates.",
  alternates: { canonical: '/actualites' },
};

export default async function ActualitesPage() {
  const actualites = await getActualites();
  const featured = actualites.find((a) => a.a_la_une) ?? null;

  return (
    <>
      {featured ? (
        <ActualitesHero actualite={featured} />
      ) : (
        <PageHeader
          eyebrow="Actualités & événements"
          title="L'agenda INTERFORMCI"
          description="Formations, ateliers, webinaires et rencontres à venir ou déjà organisés par le cabinet."
        />
      )}

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Actualités & événements"
            title="Agenda de la formation"
          />
          <div className="mt-10">
            <AgendaSection actualites={actualites} />
          </div>
        </div>
      </section>

      <ProchainsEvenements actualites={actualites} />
      <NewsletterBand />
    </>
  );
}
