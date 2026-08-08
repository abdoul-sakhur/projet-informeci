import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import DevisForm from '@/components/contact/DevisForm';

export const metadata: Metadata = {
  title: 'Demande de devis',
  description:
    "Demandez un devis gratuit à INTERFORMCI pour vos besoins en formation, étude, location de salles ou mise à disposition de personnel.",
  alternates: { canonical: '/devis' },
};

export default function DevisPage() {
  return (
    <>
      <PageHeader
        eyebrow="Demande de devis"
        title="Obtenez un devis personnalisé"
        description="Décrivez votre besoin, notre équipe vous répond avec une proposition adaptée."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <DevisForm />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
