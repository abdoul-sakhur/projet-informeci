import type { Metadata } from 'next';
import Image from 'next/image';
import { Award } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import ReferencesGrid from '@/components/references/ReferencesGrid';
import { getPartenaireLogo } from '@/lib/partenaireLogos';
import { getPartenaires, getReferenceProjets, getStrapiImageURL } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Références',
  description:
    "Agréments, partenariats institutionnels et projets réalisés par INTERFORMCI : FDFP, FIRCA, APEX-CI, FDPCC, ANADER, Réseau GERME.",
  alternates: { canonical: '/references' },
};

export default async function ReferencesPage() {
  const [partenaires, references] = await Promise.all([
    getPartenaires(),
    getReferenceProjets(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Références"
        title="Agréments, partenariats & réalisations"
        description="Une expertise reconnue par les institutions ivoiriennes et un historique de projets menés avec rigueur."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Agréments & partenariats"
            title="Des institutions qui nous font confiance"
            align="center"
          />

          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {partenaires.map((p) => {
              const remoteLogo = getStrapiImageURL(p.logo, 'small');
              const logo = remoteLogo || getPartenaireLogo(p.nom);
              return (
                <StaggerItem key={p.id}>
                  <Card className="h-full">
                    {logo ? (
                      <div className="relative h-12 w-32">
                        <Image
                          src={logo}
                          alt=""
                          fill
                          unoptimized={Boolean(remoteLogo)}
                          className="object-contain object-left"
                          sizes="128px"
                        />
                      </div>
                    ) : (
                      <Award className="h-8 w-8 text-secondary" aria-hidden="true" />
                    )}
                    <h3 className="mt-4 font-serif text-base font-bold text-primary-dark">
                      {p.nom}
                    </h3>
                    {p.numero_agrement && (
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                        {p.numero_agrement}
                      </p>
                    )}
                    {p.description && (
                      <p className="mt-3 text-sm leading-relaxed text-text/75">{p.description}</p>
                    )}
                  </Card>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Projets réalisés"
            title="Quelques exemples de réalisations"
            align="center"
          />

          <ReferencesGrid references={references} />
        </div>
      </section>
    </>
  );
}
