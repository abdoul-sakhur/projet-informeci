'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, FileCheck2 } from 'lucide-react';
import Card from '@/components/ui/Card';
import Modal from '@/components/ui/Modal';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import { getStrapiImageURL } from '@/lib/strapi';
import type { ReferenceProjet } from '@/lib/types';

interface ReferencesGridProps {
  references: ReferenceProjet[];
}

export default function ReferencesGrid({ references }: ReferencesGridProps) {
  const [selected, setSelected] = useState<ReferenceProjet | null>(null);
  const attestationUrl = getStrapiImageURL(selected?.attestation, 'large');

  return (
    <>
      <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {references.map((ref) => (
          <StaggerItem key={ref.id}>
            <button
              type="button"
              onClick={() => setSelected(ref)}
              className="block w-full text-left"
              aria-haspopup="dialog"
            >
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-xl">
                <div className="flex items-center justify-between">
                  <Briefcase className="h-7 w-7 text-secondary" aria-hidden="true" />
                  {ref.annee && (
                    <span className="rounded-full bg-secondary-light px-3 py-1 text-xs font-semibold text-secondary">
                      {ref.annee}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-serif text-base font-bold text-primary-dark">
                  {ref.titre}
                </h3>
                {ref.client && (
                  <p className="mt-2 text-sm font-medium text-text/60">{ref.client}</p>
                )}
                {ref.description && (
                  <p className="mt-3 text-sm leading-relaxed text-text/75">{ref.description}</p>
                )}
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                  <FileCheck2 className="h-4 w-4" aria-hidden="true" />
                  Voir l&apos;attestation
                </span>
              </Card>
            </button>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <Modal
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected ? `Attestation — ${selected.titre}` : 'Attestation'}
      >
        {attestationUrl ? (
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-neutral">
            <Image
              src={attestationUrl}
              alt={`Attestation de bonne exécution — ${selected?.titre ?? ''}`}
              fill
              unoptimized
              sizes="(min-width: 672px) 640px, 100vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-lg bg-neutral px-6 py-16 text-center">
            <FileCheck2 className="h-10 w-10 text-text/30" aria-hidden="true" />
            <p className="text-sm font-medium text-text/60">
              L&apos;attestation de bonne exécution pour ce projet n&apos;a pas encore été ajoutée.
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}
