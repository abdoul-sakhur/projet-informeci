import Link from 'next/link';
import {
  ArrowRight,
  Briefcase,
  Building2,
  GraduationCap,
  LineChart,
  type LucideIcon,
} from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import type { ServicePole } from '@/lib/types';

const ICONS: Record<string, LucideIcon> = {
  'line-chart': LineChart,
  'graduation-cap': GraduationCap,
  'building-2': Building2,
  briefcase: Briefcase,
};

const SLUGS: Record<number, string> = {
  1: '/services/etudes-et-projets',
  2: '/services/formation-continue',
  3: '/services/location-de-salles',
  4: '/services/interim',
};

const GRADIENTS: Record<number, string> = {
  1: 'from-primary to-primary-dark',
  2: 'from-secondary to-emerald-800',
  3: 'from-primary to-secondary',
  4: 'from-amber-500 to-orange-600',
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
          title="Une seule exigence : la qualité"
          align="center"
          description="Études & accompagnement de projets, formation professionnelle continue, location de salles équipées et mise à disposition de personnel."
        />

        <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {poles.map((pole) => {
            const Icon = ICONS[pole.icone] ?? LineChart;
            const href = SLUGS[pole.ordre] ?? '/services';
            const gradient = GRADIENTS[pole.ordre] ?? GRADIENTS[1];
            return (
              <StaggerItem key={pole.id}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl font-bold text-white">{pole.titre}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/85">{pole.description}</p>
                  <Link
                    href={href}
                    className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:underline"
                  >
                    En savoir plus
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>

                  <svg
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full text-white/10"
                    viewBox="0 0 200 40"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0,20 C50,40 150,0 200,20 L200,40 L0,40 Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGrid>
      </div>
    </section>
  );
}
