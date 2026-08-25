import Image from 'next/image';
import { Landmark } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { getPartenaireAcronyme, getPartenaireLogo } from '@/lib/partenaireLogos';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Partenaire } from '@/lib/types';

interface PartenairesBandProps {
  partenaires: Partenaire[];
}

function LogoTile({ partenaire }: { partenaire: Partenaire }) {
  const remoteLogo = getStrapiImageURL(partenaire.logo, 'small');
  const logo = remoteLogo || getPartenaireLogo(partenaire.nom);
  const acronyme = getPartenaireAcronyme(partenaire.nom);

  return (
    <div className="flex h-24 w-40 shrink-0 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
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
      </div>

      <div className="relative mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee flex w-max gap-6">
          {[...partenaires, ...partenaires].map((p, i) => (
            <LogoTile key={`${p.id}-${i}`} partenaire={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
