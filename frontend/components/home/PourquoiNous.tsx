import { CalendarCheck, Network, Sparkles, Target, Users2 } from 'lucide-react';
import SectionTitle from '@/components/ui/SectionTitle';
import Card from '@/components/ui/Card';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';

const RAISONS = [
  {
    icon: CalendarCheck,
    titre: 'Une expérience construite depuis 1998',
    texte:
      'Depuis plus de 25 ans, INTERFORMCI accompagne des entreprises, institutions, projets de développement, organisations professionnelles et acteurs du secteur agricole.',
  },
  {
    icon: Users2,
    titre: 'Une expertise multidisciplinaire',
    texte:
      'Nos missions mobilisent des consultants et experts issus de différents domaines : développement rural, agriculture, études socio-économiques, suivi-évaluation, formation, ressources humaines, gestion et conseil.',
  },
  {
    icon: Target,
    titre: 'Des solutions adaptées à vos besoins',
    texte:
      'Nous privilégions une approche pratique et personnalisée afin de proposer des solutions adaptées au contexte, aux objectifs et aux contraintes de chaque client.',
  },
  {
    icon: Network,
    titre: 'Un réseau d’experts et de partenaires',
    texte:
      'INTERFORMCI s’appuie sur une équipe permanente et un réseau de consultants spécialisés pouvant être mobilisés selon la nature et l’ampleur des missions.',
  },
  {
    icon: Sparkles,
    titre: 'Une approche orientée résultats',
    texte:
      'Notre intervention vise à produire des résultats directement utilisables par les organisations et les bénéficiaires : études, outils, formations, dispositifs de suivi, recommandations et accompagnement opérationnel.',
  },
];

export default function PourquoiNous() {
  return (
    <section className="bg-neutral py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Pourquoi nous choisir"
          title="Pourquoi choisir INTERFORMCI ?"
          align="center"
        />
        <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RAISONS.map((raison) => (
            <StaggerItem key={raison.titre}>
              <Card className="h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-light text-secondary">
                  <raison.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-primary-dark">
                  {raison.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text/75">{raison.texte}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
