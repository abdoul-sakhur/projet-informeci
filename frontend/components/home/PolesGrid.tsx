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

const HREFS: Record<string, string> = {
  'Études, appui & accompagnement de projets de développement': '/services/etudes-et-projets',
  'Formation professionnelle continue & renforcement des capacités': '/services/formation-continue',
  'Intérim & mise à disposition de personnel': '/services/interim',
  'Location de salles': '/services/location-de-salles',
};

const GRADIENTS: Record<string, string> = {
  'Études, appui & accompagnement de projets de développement': 'from-primary to-primary-dark',
  'Formation professionnelle continue & renforcement des capacités': 'from-secondary to-emerald-800',
  'Intérim & mise à disposition de personnel': 'from-amber-500 to-orange-600',
  'Location de salles': 'from-primary to-secondary',
};

interface PolesGridProps {
  poles: ServicePole[];
}

export default function PolesGrid({ poles }: PolesGridProps) {
  return (
    <section className="bg-neutral py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Nos services"
          title="Une expertise au service de vos organisations et de vos projets"
          align="center"
          description="INTERFORMCI propose des solutions adaptées aux besoins des entreprises, institutions, projets de développement, ONG, coopératives et organisations professionnelles."
        />

        <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {poles.map((pole) => {
            const Icon = ICONS[pole.icone] ?? LineChart;
            const href = HREFS[pole.titre] ?? '/services';
            const gradient = GRADIENTS[pole.titre] ?? 'from-primary to-primary-dark';
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
