import type { Metadata } from 'next';
import {
  CalendarClock,
  ClipboardCheck,
  Handshake,
  Presentation,
  UserCheck,
  Users,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SectionTitle from '@/components/ui/SectionTitle';
import CmsImage from '@/components/ui/CmsImage';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Card from '@/components/ui/Card';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import AutresPoles from '@/components/services/AutresPoles';
import Button from '@/components/ui/Button';
import { getSalles, getStrapiImageURL } from '@/lib/strapi';
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from '@/lib/jsonld';

export const metadata: Metadata = {
  title: 'Location de salles de formation à Abidjan',
  description:
    "2 salles polyvalentes de 10 à 30 places, équipées de vidéoprojecteurs et tableaux mobiles, pour vos réunions, formations et séminaires à Abidjan.",
  alternates: { canonical: '/services/location-de-salles' },
};

const breadcrumbJsonLd = buildBreadcrumbJsonLd([
  { name: 'Accueil', path: '/' },
  { name: 'Nos services', path: '/services' },
  { name: 'Location de salles', path: '/services/location-de-salles' },
]);

const serviceJsonLd = buildServiceJsonLd(
  'Location de salles de formation',
  '2 salles polyvalentes de 10 à 30 places, équipées de vidéoprojecteurs et tableaux mobiles, pour réunions, formations et séminaires.'
);

const EVENEMENTS = [
  { icon: Users, label: 'Réunions professionnelles' },
  { icon: Presentation, label: 'Sessions de formation' },
  { icon: ClipboardCheck, label: 'Ateliers de travail' },
  { icon: CalendarClock, label: 'Séminaires' },
  { icon: Handshake, label: 'Conférences' },
  { icon: Users, label: 'Assemblées générales' },
  { icon: UserCheck, label: 'Recrutements et tests écrits' },
  { icon: Handshake, label: 'Rencontres associatives' },
  { icon: UserCheck, label: 'Coaching' },
  { icon: Presentation, label: 'Présentations de projets' },
  { icon: ClipboardCheck, label: "Conseils d'administration" },
];

export default async function LocationDeSallesPage() {
  const salles = await getSalles();

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
        eyebrow="Location de salles"
        title="Des espaces équipés pour vos événements"
        description="2 salles polyvalentes de 10 à 30 places, avec vidéoprojecteurs et tableaux mobiles, au cœur de Cocody Riviéra."
      />
      <Breadcrumb
        items={[
          { label: 'Accueil', href: '/' },
          { label: 'Nos services', href: '/services' },
          { label: 'Location de salles' },
        ]}
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2">
            {salles.map((salle, index) => (
              <AnimatedSection
                key={salle.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index % 2 === 0 ? 0 : 0.1}
              >
                <CmsImage
                  src={getStrapiImageURL(salle.photo, 'medium')}
                  alt={salle.nom}
                  label={`Photo ${salle.nom}${salle.capacite ? ` (${salle.capacite})` : ''}`}
                  ratio="4/3"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Types d'événements accueillis"
            title="Une salle adaptée à chaque occasion"
            align="center"
          />

          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EVENEMENTS.map((item) => (
              <StaggerItem key={item.label}>
                <Card className="flex h-full items-center gap-4 !p-6">
                  <item.icon className="h-6 w-6 shrink-0 text-secondary" aria-hidden="true" />
                  <span className="font-medium text-text/85">{item.label}</span>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <AnimatedSection className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-2xl font-bold text-primary-dark">
            Une salle disponible pour votre événement ?
          </h2>
          <p className="mt-3 text-text/75">
            Indiquez-nous vos dates et vos besoins, nous vous répondons avec un devis rapide.
          </p>
          <div className="mt-6">
            <Button href="/devis">Demander un devis</Button>
          </div>
        </div>
      </AnimatedSection>

      <AutresPoles current="/services/location-de-salles" />
    </>
  );
}
