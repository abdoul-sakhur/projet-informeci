import Image from 'next/image';
import { Landmark } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { estUnAgrementPrincipal, getPartenaireAcronyme, getPartenaireLogo } from '@/lib/partenaireLogos';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Partenaire } from '@/lib/types';

interface PartenairesBandProps {
  partenaires: Partenaire[];
}

function LogoTile({ partenaire, showNumero }: { partenaire: Partenaire; showNumero?: boolean }) {
  const remoteLogo = getStrapiImageURL(partenaire.logo, 'small');
  const logo = remoteLogo || getPartenaireLogo(partenaire.nom);
  const acronyme = getPartenaireAcronyme(partenaire.nom);

  return (
    <div className="flex shrink-0 flex-col items-center gap-2">
      <div className="flex h-24 w-40 items-center justify-center rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5">
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
      {showNumero && (
        <p className="flex min-h-[28px] max-w-[160px] items-start justify-center text-center text-[11px] font-semibold uppercase tracking-wide text-secondary">
          {partenaire.numero_agrement}
        </p>
      )}
    </div>
  );
}

export default function PartenairesBand({ partenaires }: PartenairesBandProps) {
  const agrements = partenaires.filter((p) => estUnAgrementPrincipal(p.nom));
  const autresPartenaires = partenaires.filter((p) => !estUnAgrementPrincipal(p.nom));

  return (
    <section className="bg-neutral py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Agréments & partenariats"
          title="Une expertise reconnue par nos partenaires institutionnels"
          align="center"
        />
      </div>

      {agrements.length > 0 && (
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-text/50">
            Agréments
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-center gap-6">
            {agrements.map((p) => (
              <LogoTile key={p.id} partenaire={p} showNumero />
            ))}
          </div>
        </div>
      )}

      {autresPartenaires.length > 0 && (
        <div className="mt-10">
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-text/50">
            Partenaires et institutions accompagnés
          </p>
          <div className="relative mt-4 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
            <div className="animate-marquee flex w-max gap-6">
              {[...autresPartenaires, ...autresPartenaires].map((p, i) => (
                <LogoTile key={`${p.id}-${i}`} partenaire={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
