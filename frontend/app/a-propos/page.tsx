import type { Metadata } from 'next';
import {
  ArrowRight,
  BadgeCheck,
  Building,
  Compass,
  Ear,
  Eye,
  HandHeart,
  Scale,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  Users2,
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import CmsImage from '@/components/ui/CmsImage';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import Timeline from '@/components/about/Timeline';
import { getCardGradient } from '@/lib/cardGradients';
import { getInfosCabinet, getSalles, getStrapiImageURL } from '@/lib/strapi';

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

const VALEURS = [
  {
    icon: Scale,
    titre: 'Rigueur',
    texte: 'Nous accordons une importance particulière à la qualité des analyses, des livrables et des prestations réalisées.',
  },
  {
    icon: BadgeCheck,
    titre: 'Professionnalisme',
    texte: 'Nous nous engageons à respecter les exigences convenues avec nos clients et partenaires.',
  },
  {
    icon: Ear,
    titre: 'Écoute',
    texte: 'Nous partons de la compréhension du besoin réel du client afin de proposer une réponse adaptée à son contexte.',
  },
  {
    icon: ShieldCheck,
    titre: 'Intégrité',
    texte: 'Nous veillons à conduire nos missions avec transparence, responsabilité et respect des engagements.',
  },
  {
    icon: TrendingUp,
    titre: 'Orientation résultats',
    texte: 'Nous privilégions des solutions pratiques, applicables et utiles à la performance des organisations.',
  },
];

const DOMAINES_EXPERTISE = [
  {
    titre: 'Études & développement',
    items: [
      'Études socio-économiques',
      'Études de marché',
      'Études sectorielles et de filières',
      'Diagnostics organisationnels',
      'Études de faisabilité',
      'Évaluation de projets',
      'Suivi-évaluation',
      'Collecte et analyse de données',
    ],
  },
  {
    titre: 'Accompagnement des organisations',
    items: [
      'Structuration des organisations professionnelles',
      'Accompagnement des coopératives et OPA',
      'Appui institutionnel et organisationnel',
      'Élaboration de plans de développement',
      'Business plans',
      'Appui-conseil',
    ],
  },
  {
    titre: 'Formation & développement des compétences',
    items: [
      'Formation professionnelle continue',
      'Renforcement des capacités',
      'Formation des managers',
      'Formation technique',
      'Formation bureautique et informatique',
      'Formation en gestion et administration',
      'Formation en ressources humaines',
    ],
  },
  {
    titre: 'Ressources humaines',
    items: [
      'Identification de profils',
      'Recrutement',
      'Sélection',
      'Mise à disposition de personnel',
      'Gestion administrative du personnel mis à disposition',
      'Renfort temporaire des équipes',
    ],
  },
];

const RESEAU_EXPERTS_DOMAINES = [
  'Agriculture et développement rural',
  'Socio-économie',
  'Suivi-évaluation',
  'Environnement',
  'Genre et inclusion',
  'Formation',
  'Ressources humaines',
  'Gestion',
  'Informatique',
  'Études de marché',
  'Chaînes de valeur',
  'Organisation des producteurs',
];

export default async function AProposPage() {
  const [infos, salles] = await Promise.all([getInfosCabinet(), getSalles()]);

  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Un cabinet ivoirien de référence depuis 1998"
        description="Formation, Études, Appui technique et Conseil au service des organisations et entreprises."
      >
        <Button href="/services" variant="secondary">
          Découvrir nos services
        </Button>
        <Button href="/contact" variant="outline">
          Nous contacter
        </Button>
      </PageHeader>

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
            <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-dark">
              Notre intervention s&apos;articule autour de quatre principaux pôles
            </p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text/80">
              {[
                'Études & accompagnement de projets',
                'Formation professionnelle continue & renforcement des capacités',
                'Mise à disposition de personnel',
                'Location de salles équipées',
              ].map((pole) => (
                <li key={pole} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {pole}
                </li>
              ))}
            </ul>
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

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <AnimatedSection direction="left">
            <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-primary-dark">Notre mission</h3>
              <p className="mt-3 leading-relaxed text-text/80">
                Mettre notre expertise et nos ressources au service de la performance et du
                développement durable des organisations.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/75">
                {[
                  'Produire des études fiables et directement exploitables',
                  'Accompagner la conception et la mise en œuvre des projets',
                  'Contribuer au développement des compétences professionnelles',
                  "Faciliter l'accès à des ressources humaines adaptées aux besoins des organisations",
                  'Proposer des espaces professionnels fonctionnels',
                  'Mobiliser les compétences nécessaires à la réalisation de missions spécifiques',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <div className="h-full rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                <Eye className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-primary-dark">Notre vision</h3>
              <p className="mt-3 leading-relaxed text-text/80">
                Être un partenaire de référence pour les organisations qui souhaitent développer
                leurs compétences, structurer leurs projets et améliorer leurs performances.
              </p>
              <p className="mt-4 leading-relaxed text-text/80">
                INTERFORMCI ambitionne de consolider son positionnement comme cabinet ivoirien de
                référence dans les études, la formation professionnelle, l&apos;accompagnement de
                projets et les services aux organisations, en s&apos;appuyant sur l&apos;expertise
                de ses équipes et de son réseau de consultants.
              </p>
            </div>
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
                <p className="mt-6 text-sm leading-relaxed text-white/85">
                  {infos.direction_message.split('\n\n')[0]}
                </p>
                <div className="mt-6">
                  <Button href="/mot-de-la-direction" variant="outline">
                    Lire la suite
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Button>
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
            {OBJECTIFS.map((obj, i) => (
              <StaggerItem key={obj.texte}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-2xl bg-gradient-to-br ${getCardGradient(i)} p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                  <div
                    className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                    <obj.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="relative mt-4 text-sm leading-relaxed text-white/90">{obj.texte}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui guide notre conduite" align="center" />
          <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {VALEURS.map((valeur) => (
              <StaggerItem key={valeur.titre}>
                <div className="h-full rounded-2xl bg-neutral p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                    <valeur.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-serif text-base font-bold text-primary-dark">
                    {valeur.titre}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text/75">{valeur.texte}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Nos domaines d'expertise"
            title="Une expertise couvrant l'ensemble du cycle de vos projets"
            align="center"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {DOMAINES_EXPERTISE.map((domaine) => (
              <div key={domaine.titre} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-black/5">
                <h3 className="font-serif text-lg font-bold text-primary-dark">{domaine.titre}</h3>
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text/75">
                  {domaine.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Notre réseau d'experts"
            title="Une équipe permanente et un réseau d'experts"
            align="center"
            description="INTERFORMCI s'appuie sur une équipe permanente et sur un réseau de consultants et experts spécialisés mobilisés en fonction des besoins des missions. Cette organisation nous permet de réunir, selon les projets, des compétences dans des domaines tels que :"
          />
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {RESEAU_EXPERTS_DOMAINES.map((domaine) => (
              <span
                key={domaine}
                className="rounded-full bg-secondary-light px-4 py-1.5 text-sm font-medium text-secondary"
              >
                {domaine}
              </span>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl leading-relaxed text-text/80">
            Pour chaque intervention, nous constituons une équipe correspondant aux exigences
            techniques, au contexte et aux objectifs de la mission.
          </p>
          <div className="mt-6">
            <Button href="/equipe" variant="ghost">
              Découvrir notre équipe
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-neutral py-20 sm:py-28">
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
            description="Basé à Cocody Riviera 6 Abatta, INTERFORMCI dispose de locaux adaptés à ses activités de conseil, de formation et d'accompagnement."
          />
          <AnimatedSection className="mt-10">
            <CmsImage
              src={getStrapiImageURL(infos?.photo_bureaux, 'large')}
              alt="Façade du siège INTERFORMCI"
              label="Photo façade / bureaux INTERFORMCI"
              ratio="16/9"
            />
          </AnimatedSection>
          <div className="mt-8 text-center">
            <p className="text-sm text-text/70">
              {infos?.siege ?? 'Cocody Riviera 6 Abatta, Lot 87, Îlot 09 — Abidjan, Côte d’Ivoire'}
            </p>
            <div className="mt-4">
              <Button href="/services/location-de-salles" variant="ghost">
                Voir nos salles
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary-dark to-primary py-20 sm:py-24">
        <AnimatedSection className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Vous recherchez un partenaire pour votre prochain projet ?
          </h2>
          <p className="mt-4 text-lg text-white/80">
            Étude, accompagnement, formation, ressources humaines ou espace professionnel :
            INTERFORMCI vous accompagne dans la définition et la mise en œuvre de votre besoin.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/contact" variant="secondary">
              Parler de votre projet
            </Button>
            <Button href="/devis" variant="outline">
              Demander un devis
            </Button>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
