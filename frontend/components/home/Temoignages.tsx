import { Quote } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import type { Temoignage } from '@/lib/types';

interface TemoignagesProps {
  temoignages: Temoignage[];
}

export default function Temoignages({ temoignages }: TemoignagesProps) {
  if (temoignages.length === 0) return null;

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Témoignages"
          title="Ce que disent nos partenaires"
          align="center"
        />

        <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {temoignages.map((t) => (
            <StaggerItem key={t.id}>
              <Card className="h-full">
                <Quote className="h-8 w-8 text-secondary" aria-hidden="true" />
                <p className="mt-4 leading-relaxed text-text/80">&laquo; {t.contenu} &raquo;</p>
                <p className="mt-6 font-semibold text-primary-dark">{t.auteur}</p>
                <p className="text-sm text-text/60">
                  {[t.fonction, t.structure].filter(Boolean).join(', ')}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
