import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import AutresPoles from '@/components/services/AutresPoles';
import { getFormationCategories } from '@/lib/strapi';
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Formation professionnelle continue à Abidjan',
  description:
    "Plus de 40 domaines de formation continue : bureautique, droit, langues, GRH, sécurité, commerce, transport, informatique et réseau GERME.",
  alternates: { canonical: '/services/formation-continue' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Accueil', path: '/' },
  { name: 'Nos services', path: '/services' },
  { name: 'Formation continue', path: '/services/formation-continue' },
]);

const serviceJsonLd = buildServiceJsonLd(
  'Formation professionnelle continue',
  'Plus de 40 domaines de formation continue : bureautique, droit, langues, GRH, sécurité, commerce, transport, informatique et réseau GERME.'
);

export default async function FormationContinuePage() {
  const categories = await getFormationCategories();

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
        eyebrow="Formation professionnelle continue"
        title="Renforcement des capacités & développement des compétences"
        description="Un catalogue de plus de 40 domaines de formation, dispensés par des experts consultants qualifiés."
      />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos services', href: '/services' },
          { label: 'Formation continue' },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Nos catégories de formation"
            title="Un catalogue complet pour tous vos besoins"
            align="center"
          />

          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <StaggerItem key={cat.id}>
                <Card className="h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                    <BookOpen className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-primary-dark">
                    {cat.nom}
                  </h3>
                  <ul className="mt-4 space-y-2">
                    {cat.formations.map((f) => (
                      <li key={f.id} className="text-sm leading-relaxed text-text/75">
                        &bull; {f.nom}
                      </li>
                    ))}
                  </ul>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <AutresPoles current="/services/formation-continue" />
    </>
  );
}
