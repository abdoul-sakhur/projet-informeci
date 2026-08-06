import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import AutresPoles from '@/components/services/AutresPoles';
import { getDomaines } from '@/lib/strapi';
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Études, appui & accompagnement de projets à Abidjan',
  description:
    "Plus de 25 domaines d'intervention en études, formation, appui technique et accompagnement de projets de développement.",
  alternates: { canonical: '/services/etudes-et-projets' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Accueil', path: '/' },
  { name: 'Nos services', path: '/services' },
  { name: 'Études & projets', path: '/services/etudes-et-projets' },
]);

const serviceJsonLd = buildServiceJsonLd(
  'Études, appui et accompagnement de projets de développement',
  "Structuration d'OPA, suivi-évaluation, diagnostics organisationnels, business plans et plus de 25 autres domaines d'intervention."
);

export default async function EtudesEtProjetsPage() {
  const domaines = await getDomaines();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <PageHeader
        eyebrow="Études, appui & accompagnement de projets"
        title="Développement des organisations et projets"
        description="Structuration d'OPA, suivi-évaluation, diagnostics organisationnels, business plans et bien plus."
      />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos services', href: '/services' },
          { label: 'Études & projets' },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Nos domaines d'intervention"
            title="Un accompagnement complet pour vos projets de développement"
            align="center"
          />

          <StaggerGrid className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {domaines.map((domaine) => (
              <StaggerItem key={domaine.id}>
                <div className="flex h-full items-start gap-3 rounded-xl bg-neutral p-5 ring-1 ring-black/5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span className="text-sm font-medium leading-relaxed text-text/85">
                    {domaine.nom}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <AutresPoles current="/services/etudes-et-projets" />
    </>
  );
}
