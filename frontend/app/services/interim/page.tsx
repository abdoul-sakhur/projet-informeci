import type { Metadata } from 'next';
import { ClipboardCheck, Handshake, UserCheck, Users2 } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import AutresPoles from '@/components/services/AutresPoles';
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Intérim & mise à disposition de personnel à Abidjan',
  description:
    "INTERFORMCI met à disposition des entreprises du personnel qualifié, dans le cadre d'une prestation de sous-traitance, à Abidjan.",
  alternates: { canonical: '/services/interim' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Accueil', path: '/' },
  { name: 'Nos services', path: '/services' },
  { name: 'Intérim & personnel', path: '/services/interim' },
]);

const serviceJsonLd = buildServiceJsonLd(
  'Intérim et mise à disposition de personnel',
  "Mise à disposition de personnel qualifié pour le compte d'entreprises clientes, dans le cadre d'une prestation de sous-traitance."
);

const ETAPES = [
  {
    icon: ClipboardCheck,
    titre: 'Expression du besoin',
    description: "Votre entreprise nous transmet le profil et la mission du personnel recherché.",
  },
  {
    icon: Users2,
    titre: 'Sélection du personnel',
    description: 'INTERFORMCI identifie et propose des profils adaptés à votre besoin.',
  },
  {
    icon: Handshake,
    titre: 'Mise à disposition',
    description: 'Le personnel est mis à votre disposition dans le cadre d’une prestation de sous-traitance.',
  },
  {
    icon: UserCheck,
    titre: 'Suivi',
    description: "INTERFORMCI reste l'interlocuteur de référence tout au long de la prestation.",
  },
];

export default function InterimPage() {
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
        eyebrow="Intérim & mise à disposition de personnel"
        title="Du personnel qualifié pour votre entreprise"
        description="INTERFORMCI fournit du personnel en sous-traitance pour le compte d'autres entreprises."
      />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos services', href: '/services' },
          { label: 'Intérim & personnel' },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre offre"
            title="Une mise à disposition de personnel en toute confiance"
            align="center"
          />
          <p className="mx-auto mt-6 max-w-2xl text-text/80">
            Fort de son expertise en gestion des ressources humaines et en formation, INTERFORMCI
            met à la disposition des entreprises du personnel qualifié, dans le cadre d&apos;une
            prestation de sous-traitance. Cette offre permet à nos entreprises clientes de
            renforcer leurs équipes rapidement, sans alourdir leur gestion administrative.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button href="/devis">Demander un devis</Button>
            <Button href="/contact" variant="ghost">
              Nous contacter
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Comment ça marche"
            title="Une démarche simple, en 4 étapes"
            align="center"
          />
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((etape, index) => (
              <StaggerItem key={etape.titre}>
                <Card className="h-full">
                  <span className="font-serif text-sm font-bold text-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="mt-3 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                    <etape.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-lg font-bold text-primary-dark">
                    {etape.titre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/75">{etape.description}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary-dark">
            Besoin de renforcer vos équipes ?
          </h2>
          <p className="mt-3 text-text/75">
            Parlez-nous de votre besoin, nous vous accompagnons dans la mise à disposition de
            personnel adapté à votre activité.
          </p>
          <div className="mt-6">
            <Button href="/devis">Demander un devis</Button>
          </div>
        </div>
      </AnimatedSection>

      <AutresPoles current="/services/interim" />
    </>
  );
}
