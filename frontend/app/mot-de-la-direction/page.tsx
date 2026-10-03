import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import CmsImage from '@/components/ui/CmsImage';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { getInfosCabinet, getStrapiImageURL } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Mot de la direction',
  description: 'Le mot de la gérante-associée du Cabinet INTERFORMCI.',
  alternates: { canonical: '/mot-de-la-direction' },
};

export default async function MotDeLaDirectionPage() {
  const infos = await getInfosCabinet();

  return (
    <>
      <PageHeader
        eyebrow="Cabinet"
        title="Mot de la direction"
        description="Le mot de la gérante-associée du Cabinet INTERFORMCI."
      />

      {infos?.direction_message && (
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-20 sm:py-28">
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(240px,320px)_1fr] lg:items-start">
              <AnimatedSection direction="left">
                <CmsImage
                  src={getStrapiImageURL(infos.direction_photo, 'small')}
                  alt={infos.direction_nom ?? 'Direction INTERFORMCI'}
                  label="Portrait — Direction"
                  ratio="3/4"
                />
                <div className="mt-4">
                  <p className="font-serif text-lg font-bold text-white">{infos.direction_nom}</p>
                  {infos.direction_titre && (
                    <p className="text-sm text-white/70">{infos.direction_titre}</p>
                  )}
                </div>
              </AnimatedSection>
              <AnimatedSection direction="right" delay={0.1}>
                <SectionTitle
                  eyebrow="Le mot de la direction"
                  title="Mot de la gérante-associée"
                  light
                />
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/85">
                  {infos.direction_message.split('\n\n').map((paragraphe, index) => (
                    <p key={index}>{paragraphe}</p>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
