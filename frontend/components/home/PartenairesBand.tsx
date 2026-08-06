import Image from 'next/image';
import { Landmark } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import SectionTitle from '@/components/ui/SectionTitle';
import { getPartenaireAcronyme, getPartenaireLogo } from '@/lib/partenaireLogos';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Partenaire } from '@/lib/types';

interface PartenairesBandProps {
  partenaires: Partenaire[];
}

export default function PartenairesBand({ partenaires }: PartenairesBandProps) {
  return (
    <section className="bg-neutral py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Agréments & partenariats"
          title="Une expertise reconnue par nos partenaires institutionnels"
          align="center"
        />

        <AnimatedSection className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {partenaires.map((p) => {
            const remoteLogo = getStrapiImageURL(p.logo, 'small');
            const logo = remoteLogo || getPartenaireLogo(p.nom);
            const acronyme = getPartenaireAcronyme(p.nom);
            return (
              <div
                key={p.id}
                className="flex h-24 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 grayscale transition-all hover:grayscale-0"
              >
                {logo ? (
                  <div className="relative h-full w-full">
                    <Image
                      src={logo}
                      alt={acronyme}
                      fill
                      unoptimized={Boolean(remoteLogo)}
                      className="object-contain"
                      sizes="150px"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Landmark className="h-5 w-5 text-text/40" aria-hidden="true" />
                    <span className="text-xs font-semibold text-text/60">{acronyme}</span>
                  </div>
                )}
              </div>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
