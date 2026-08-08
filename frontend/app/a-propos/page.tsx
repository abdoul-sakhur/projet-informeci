import type { Metadata } from 'next';
import { Target, Users2, Sprout, HandHeart, Building } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import CmsImage from '@/components/ui/CmsImage';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import Timeline from '@/components/about/Timeline';
import { getExperts, getInfosCabinet, getSalles, getStrapiImageURL } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    "Découvrez INTERFORMCI, cabinet ivoirien de Formation, Études et Conseils créé en 1998, agréé FDFP et FIRCA.",
  alternates: { canonical: '/a-propos' },
};

const OBJECTIFS = [
  {
    icon: Users2,
    texte:
      'Appuyer les associations, coopératives et PME/PMI en organisation, formation, suivi et encadrement technique, gestion.',
  },
  {
    icon: HandHeart,
    texte: 'Appuyer la lutte contre la pauvreté en milieu rural et urbain.',
  },
  {
    icon: Sprout,
    texte:
      "Contribuer au développement des coopératives et de l'économie coopérative / organisations professionnelles agricoles.",
  },
  {
    icon: Target,
    texte: "Aider à l'insertion sociale des jeunes déscolarisés.",
  },
  {
    icon: Building,
    texte: 'Contribuer à la création et la dynamisation de structures professionnelles.',
  },
];

export default async function AProposPage() {
  const [infos, experts, salles] = await Promise.all([
    getInfosCabinet(),
    getExperts(),
    getSalles(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Un cabinet ivoirien de référence depuis 1998"
        description="Formation, Études, Appui technique et Conseil au service des organisations et entreprises."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection direction="left">
            <SectionTitle eyebrow="Présentation" title="Notre histoire, notre mission" />
            <p className="mt-6 leading-relaxed text-text/80">
              Créé en 1998 et agréé en novembre 1999 par le FDFP, le Cabinet INTERFORMCI est une
              structure qui contribue au développement des organisations et entreprises.
              INTERFORMCI est agréé par le FIRCA depuis 2002.
            </p>
            <p className="mt-4 leading-relaxed text-text/80">
              Raison sociale : International Formation Côte d&apos;Ivoire (INTERFORMCI), SARL.
              Nos activités couvrent la formation, les études, l&apos;appui technique et le
              conseil, au service des associations, coopératives, PME/PMI et institutions
              ivoiriennes.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <CmsImage
              src={getStrapiImageURL(infos?.photo_bureaux, 'medium')}
              alt="Façade / bureaux INTERFORMCI"
              label="Photo façade / bureaux INTERFORMCI"
              ratio="4/3"
            />
          </AnimatedSection>
        </div>
      </section>

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

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Notre parcours" title="Une histoire de plus de 28 ans" align="center" />
          <div className="mt-14">
            <Timeline />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nos objectifs" title="Ce qui guide notre action" align="center" />
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OBJECTIFS.map((obj) => (
              <StaggerItem key={obj.texte}>
                <Card className="h-full">
                  <obj.icon className="h-8 w-8 text-secondary" aria-hidden="true" />
                  <p className="mt-4 text-sm leading-relaxed text-text/80">{obj.texte}</p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Ressources humaines"
            title="Une équipe pluridisciplinaire d'experts"
            align="center"
            description="Permanents et consultants diplômés d'universités et grandes écoles ivoiriennes, américaines, canadiennes et françaises."
          />
          <StaggerGrid className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {experts.map((expert) => (
              <StaggerItem key={expert.id}>
                <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
                  <CmsImage
                    src={getStrapiImageURL(expert.photo, 'small')}
                    alt={expert.titre}
                    label={`Portrait — ${expert.titre}`}
                    ratio="3/4"
                    rounded="rounded-none"
                  />
                  <div className="p-6">
                    <h3 className="font-serif text-lg font-bold text-primary-dark">{expert.titre}</h3>
                    {expert.description && (
                      <p className="mt-2 text-sm leading-relaxed text-text/75">{expert.description}</p>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Infrastructures & équipements"
            title="Des espaces adaptés à vos événements"
            align="center"
            description="2 salles polyvalentes de 10 à 30 places, équipées de vidéoprojecteurs et tableaux mobiles."
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {salles.map((salle, index) => (
              <AnimatedSection
                key={salle.id}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index % 2 === 0 ? 0 : 0.1}
              >
                <CmsImage
                  src={getStrapiImageURL(salle.photo, 'medium')}
                  alt={salle.nom}
                  label={`Photo ${salle.nom}`}
                  ratio="4/3"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre siège"
            title="Retrouvez-nous à Cocody Riviéra 6 Abatta"
            align="center"
          />
          <AnimatedSection className="mt-10">
            <CmsImage
              src={getStrapiImageURL(infos?.photo_bureaux, 'large')}
              alt="Façade du siège INTERFORMCI"
              label="Photo façade / bureaux INTERFORMCI"
              ratio="16/9"
            />
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
