import AnimatedSection from '@/components/ui/AnimatedSection';

interface TimelineEntry {
  annee: string;
  titre: string;
  description: string;
}

const ENTRIES: TimelineEntry[] = [
  {
    annee: '1998',
    titre: 'Création du cabinet',
    description: "INTERFORMCI est fondé à Abidjan Cocody Riviéra pour accompagner le développement des organisations et entreprises.",
  },
  {
    annee: '1999',
    titre: 'Agrément FDFP',
    description:
      'Le cabinet obtient l’agrément FDFP N° 05/99/JPM/PH/NAV du 29.11.99, fondement de son activité de formation professionnelle continue.',
  },
  {
    annee: '2002',
    titre: 'Agrément FIRCA',
    description: "INTERFORMCI est agréé par le FIRCA, élargissant son intervention aux projets agricoles.",
  },
  {
    annee: '2023',
    titre: 'Réseau GERME',
    description:
      "INTERFORMCI rejoint le Réseau GERME (Gérer Mieux son Entreprise), renforçant son offre de formation à l'entrepreneuriat et à la gestion d'entreprise.",
  },
  {
    annee: '2026',
    titre: 'Agrément Agence Emploi Jeune',
    description:
      "INTERFORMCI obtient l'agrément de l'Agence Emploi Jeune, confortant son rôle dans l'insertion professionnelle des jeunes.",
  },
  {
    annee: "Aujourd'hui",
    titre: 'Un cabinet de référence',
    description:
      "Plus de 28 ans d'expérience, 6 agréments et partenariats, et un catalogue de plus de 40 domaines de formation.",
  },
];

export default function Timeline() {
  return (
    <div className="relative mx-auto max-w-3xl">
      <div
        className="absolute left-4 top-0 h-full w-0.5 bg-secondary-light sm:left-1/2 sm:-translate-x-1/2"
        aria-hidden="true"
      />
      <ol className="space-y-12">
        {ENTRIES.map((entry, index) => (
          <li key={entry.annee} className="relative pl-12 sm:pl-0">
            <AnimatedSection
              direction={index % 2 === 0 ? 'left' : 'right'}
              className={`sm:flex sm:items-center sm:gap-8 ${
                index % 2 === 1 ? 'sm:flex-row-reverse' : ''
              }`}
            >
              <div
                className="absolute left-2 top-1 h-5 w-5 rounded-full border-4 border-secondary bg-white sm:left-1/2 sm:-translate-x-1/2"
                aria-hidden="true"
              />
              <div className="sm:w-1/2" />
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:w-1/2">
                <span className="font-serif text-2xl font-bold text-secondary">{entry.annee}</span>
                <h3 className="mt-1 text-lg font-bold text-primary-dark">{entry.titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text/75">{entry.description}</p>
              </div>
            </AnimatedSection>
          </li>
        ))}
      </ol>
    </div>
  );
}
