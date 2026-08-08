import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import PolesGrid from '@/components/home/PolesGrid';
import { getServicePoles } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Nos services à Abidjan',
  description:
    "Découvrez les pôles d'activité d'INTERFORMCI : études et projets de développement, formation professionnelle continue, location de salles et mise à disposition de personnel.",
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const poles = await getServicePoles();

  return (
    <>
      <PageHeader
        eyebrow="Nos services"
        title="Des pôles d'expertise à votre service"
        description="Études & accompagnement de projets, formation professionnelle continue, location de salles équipées et intérim."
      />
      <PolesGrid poles={poles} />
    </>
  );
}
