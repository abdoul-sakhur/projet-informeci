import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import PolesGrid from '@/components/home/PolesGrid';
import { getServicePoles } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Nos services à Abidjan',
  description:
    "Découvrez les trois pôles d'activité d'INTERFORMCI : études et projets de développement, formation professionnelle continue et location de salles.",
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const poles = await getServicePoles();

  return (
    <>
      <PageHeader
        eyebrow="Nos services"
        title="Trois pôles d'expertise à votre service"
        description="Études & accompagnement de projets, formation professionnelle continue et location de salles équipées."
      />
      <PolesGrid poles={poles} />
    </>
  );
}
