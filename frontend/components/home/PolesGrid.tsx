import Link from 'next/link';
import { ArrowRight, Building2, GraduationCap, LineChart, type LucideIcon } from 'lucide-react';
import Card from '@/components/ui/Card';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import type { ServicePole } from '@/lib/types';

const ICONS: Record<string, LucideIcon> = {
  'line-chart': LineChart,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
};

const SLUGS: Record<number, string> = {
  1: '/services/etudes-et-projets',
  2: '/services/formation-continue',
  3: '/services/location-de-salles',
};

interface PolesGridProps {
  poles: ServicePole[];
}

export default function PolesGrid({ poles }: PolesGridProps) {
  return (
    <section className="bg-neutral py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nos pôles d'activité"
          title="Trois pôles, une seule exigence : la qualité"
          align="center"
          description="Études & accompagnement de projets, formation professionnelle continue et location de salles équipées."
        />

        <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {poles.map((pole) => {
            const Icon = ICONS[pole.icone] ?? LineChart;
            const href = SLUGS[pole.ordre] ?? '/services';
            return (
              <StaggerItem key={pole.id}>
                <Card className="h-full">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold text-primary-dark">
                    {pole.titre}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text/75">{pole.description}</p>
                  <Link
                    href={href}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-secondary hover:underline"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </Card>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
