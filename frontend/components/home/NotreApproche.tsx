import SectionTitle from '@/components/ui/SectionTitle';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';

const ETAPES = [
  {
    numero: '01',
    titre: 'Comprendre',
    texte: 'Nous analysons votre besoin, vos objectifs, vos contraintes et votre environnement.',
  },
  {
    numero: '02',
    titre: 'Concevoir',
    texte: 'Nous mobilisons les compétences et outils adaptés pour construire une réponse sur mesure.',
  },
  {
    numero: '03',
    titre: 'Mettre en œuvre',
    texte: 'Nos équipes et experts assurent la réalisation des activités dans le respect des exigences convenues.',
  },
  {
    numero: '04',
    titre: 'Accompagner',
    texte: 'Nous favorisons l’appropriation des solutions et accompagnons leur mise en application.',
  },
  {
    numero: '05',
    titre: 'Évaluer',
    texte: 'Nous mesurons les résultats et formulons des recommandations pour améliorer durablement les performances.',
  },
];

export default function NotreApproche() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          eyebrow="Notre approche"
          title="Comprendre. Concevoir. Accompagner. Produire des résultats."
          align="center"
          description="Chaque mission commence par une compréhension précise du besoin et du contexte d’intervention."
        />
        <StaggerGrid className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {ETAPES.map((etape) => (
            <StaggerItem key={etape.numero}>
              <div className="h-full rounded-2xl bg-neutral p-6">
                <span className="font-serif text-3xl font-bold text-secondary">{etape.numero}</span>
                <h3 className="mt-3 font-serif text-base font-bold text-primary-dark">
                  {etape.titre}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text/75">{etape.texte}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}
