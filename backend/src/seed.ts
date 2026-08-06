import type { Core } from '@strapi/strapi';

function slugify(value: string): string {
  const combiningMarks = new RegExp('[' + String.fromCharCode(0x0300) + '-' + String.fromCharCode(0x036f) + ']', 'g');
  return value
    .normalize('NFD')
    .replace(combiningMarks, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

const ETUDES_DOMAINES = [
  "Création et gestion d'OPA",
  "Structuration d'OPA / appui-conseil aux organisations professionnelles agricoles",
  'Suivi-évaluation de projets agricoles',
  'Formation en comptabilité simplifiée',
  'Bonne utilisation des produits phytosanitaires',
  'Animation rurale, appui aux collectivités locales',
  "Protection de l'environnement / écologie",
  'Encadrement des AVEC',
  'Gestion des stocks et approvisionnements',
  "Gestion des systèmes d'irrigation",
  'Alphabétisation',
  'Planification stratégique / management opérationnel',
  'Enquêtes statistiques',
  'Techniques de commercialisation des produits agricoles, techniques culturales, agro-pastorales et d’élevage',
  'Diagnostics organisationnels des OPA et chaînes de valeurs vivrières',
  'Analyse des chaînes de valeurs des filières agricoles',
  'Analyse de politiques agricoles',
  'Création de champs écoles',
  "Assistance technique en gestion d'exploitation agricole",
  'Activités génératrices de revenus',
  "Élaboration de business plans / plans d'affaires / plans de développement",
  'Études de marché',
  "Études d'impact environnemental",
  'Sciences sociales, économiques, environnementales et politiques',
  'Gestion de projets et programmes / suivi-évaluation',
  'Étude et exécution de marchés publics et privés',
];

const FORMATION_CATEGORIES = [
  {
    nom: 'Bureautique',
    ordre: 1,
    formations: [
      { nom: 'Secrétariat bureautique' },
      { nom: 'Secrétariat administratif' },
      { nom: 'Archivage numérique et physique' },
    ],
  },
  {
    nom: 'Droit privé / Droit public',
    ordre: 2,
    formations: [
      { nom: 'Droit administratif' },
      { nom: 'Droit constitutionnel' },
      { nom: 'Droit du travail et législation sociale' },
      { nom: 'Fiscalité et droit des affaires' },
    ],
  },
  {
    nom: 'Langues vivantes',
    ordre: 3,
    formations: [{ nom: 'Langues locales' }, { nom: 'Langues étrangères' }],
  },
  {
    nom: 'Sécurité des biens et des personnes en entreprise',
    ordre: 4,
    formations: [
      { nom: 'Hygiène et sécurité au travail' },
      { nom: 'Hygiène et sécurité environnementale' },
      { nom: 'Hygiène et sécurité alimentaire' },
      { nom: 'Sécurité sur sites industriels' },
    ],
  },
  {
    nom: 'Gestion des ressources humaines (GRH)',
    ordre: 5,
    formations: [
      { nom: 'Optimisation de la fonction RH' },
      { nom: 'Outils de pilotage RH' },
      { nom: 'Évaluation des performances' },
      { nom: 'GPEC' },
      { nom: 'Politique de rémunération' },
      { nom: 'Management et entrepreneuriat' },
    ],
  },
  {
    nom: 'Commerce & gestion',
    ordre: 6,
    formations: [
      { nom: 'Commerce, marketing et vente' },
      { nom: 'Comptabilité et finance' },
      { nom: 'Comptabilité et fiscalité' },
      { nom: 'Banque et finance' },
      { nom: 'Droit des affaires' },
    ],
  },
  {
    nom: 'Transport & logistique',
    ordre: 7,
    formations: [
      { nom: 'Code de la route' },
      { nom: 'Gestion du transit' },
      { nom: 'Gestion des stocks' },
    ],
  },
  {
    nom: 'Informatique',
    ordre: 8,
    formations: [
      { nom: 'Pack Office (Word, Excel, PowerPoint)' },
      { nom: 'Outils de gestion de projets' },
      { nom: 'Culture informatique' },
      { nom: "Digitalisation de l'entreprise" },
      { nom: 'Administration systèmes et réseaux' },
      { nom: 'Développement de logiciels / applications' },
      { nom: 'Conception de design et de sites web' },
    ],
  },
  {
    nom: 'Réseau GERME',
    ordre: 9,
    formations: [
      { nom: 'Marketing' },
      { nom: 'Achat et contrôle des stocks' },
      { nom: 'Personnel et productivité' },
      { nom: "Planification d'entreprise" },
    ],
  },
];

const PARTENAIRES = [
  {
    nom: 'FDFP — Fonds de Développement de la Formation Professionnelle',
    numero_agrement: 'N° 05/99/JPM/PH/NAV du 29.11.99',
    description: "Agrément FDFP obtenu en novembre 1999, fondement de l'activité de formation professionnelle continue du cabinet.",
  },
  {
    nom: 'FIRCA — Fonds Interprofessionnel pour la Recherche et le Conseil Agricoles',
    numero_agrement: 'N° SPS/2020/99',
    description: 'Agrément FIRCA obtenu en 2002, permettant l’intervention sur les projets agricoles.',
  },
  {
    nom: 'APEX-CI — Agence pour la Promotion des Exportations de Côte d’Ivoire',
    numero_agrement: 'N° AN-1512040293',
    description: "Agrément APEX-CI pour l'accompagnement à l'export.",
  },
  {
    nom: 'FDPCC',
    numero_agrement: '',
    description: 'Exécution de projets financés par le FDPCC.',
  },
  {
    nom: 'ANADER — Agence Nationale d’Appui au Développement Rural',
    numero_agrement: '',
    description: "Accord cadre de collaboration avec l'ANADER.",
  },
  {
    nom: 'Réseau GERME — Gérer Mieux Son Entreprise',
    numero_agrement: '',
    description: 'Membre du Réseau GERME.',
  },
];

const TEMOIGNAGES = [
  {
    auteur: 'Coopérative agricole partenaire',
    fonction: 'Présidente',
    structure: 'OPA accompagnée par INTERFORMCI',
    contenu:
      "INTERFORMCI nous a accompagnés dans la structuration de notre coopérative avec beaucoup de professionnalisme et de proximité terrain.",
  },
  {
    auteur: 'Responsable RH',
    fonction: 'Directrice des Ressources Humaines',
    structure: 'Entreprise cliente',
    contenu:
      "Les formations en gestion des ressources humaines dispensées par le cabinet ont nettement renforcé les compétences de nos équipes.",
  },
  {
    auteur: 'Chargé de projet',
    fonction: 'Coordinateur de projet',
    structure: 'ONG partenaire',
    contenu:
      "Un appui-conseil rigoureux et adapté à nos réalités de terrain, du diagnostic jusqu'au suivi-évaluation.",
  },
];

const REFERENCES_PROJETS = [
  {
    titre: 'Structuration et renforcement des capacités d’une coopérative agricole',
    client: 'Coopérative agricole, région des Lacs',
    annee: 2022,
    description: "Diagnostic organisationnel, structuration et formation en gestion coopérative.",
    pole: 'etudes',
  },
  {
    titre: 'Programme de renforcement des capacités en gestion des ressources humaines',
    client: 'Entreprise privée, secteur agro-industriel',
    annee: 2023,
    description: 'Cycle de formations GRH pour cadres et managers.',
    pole: 'formation',
  },
  {
    titre: "Étude d'impact environnemental d'un projet agricole",
    client: 'Programme de développement rural',
    annee: 2021,
    description: "Réalisation d'une étude d'impact environnemental et social.",
    pole: 'etudes',
  },
  {
    titre: 'Mise à disposition de salles pour séminaire institutionnel',
    client: 'Organisme public',
    annee: 2023,
    description: "Location de salle équipée pour un séminaire de deux jours.",
    pole: 'location',
  },
  {
    titre: 'Formation en fiscalité et droit des affaires',
    client: 'PME du secteur commercial',
    annee: 2022,
    description: 'Session de formation intra-entreprise sur la fiscalité et le droit des affaires.',
    pole: 'formation',
  },
  {
    titre: 'Appui à la création de champs écoles',
    client: 'Organisation professionnelle agricole',
    annee: 2020,
    description: "Accompagnement méthodologique pour la mise en place de champs écoles paysans.",
    pole: 'etudes',
  },
];

const SALLES = [
  { nom: 'Salle 1', capacite: '10 à 30 places', ordre: 1 },
  { nom: 'Salle 2', capacite: '10 à 30 places', ordre: 2 },
];

const EXPERTS = [
  {
    titre: 'Experts en andragogie',
    description: 'Spécialistes de la formation et de l’apprentissage des adultes.',
    ordre: 1,
  },
  {
    titre: 'Experts-comptables diplômés',
    description: 'Comptabilité, finance et fiscalité des organisations.',
    ordre: 2,
  },
  {
    titre: 'Experts en développement rural',
    description: 'Structuration des OPA et gestion des coopératives.',
    ordre: 3,
  },
  {
    titre: 'Experts en commerce international',
    description: 'Économistes spécialisés en échanges et marchés.',
    ordre: 4,
  },
  {
    titre: 'Experts en psychologie sociale',
    description: 'Accompagnement humain et animation de groupes.',
    ordre: 5,
  },
  {
    titre: 'Spécialistes agriculture & pêche',
    description: 'Production animale, pêche, pisciculture et transformation de produits agricoles.',
    ordre: 6,
  },
];

async function seedMainContent(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::service-pole.service-pole').count({});
  if (existing > 0) {
    strapi.log.info('[seed] Contenu principal déjà présent, seed ignoré.');
    return;
  }

  strapi.log.info('[seed] Insertion du contenu INTERFORMCI...');

  const poleEtudesTitre = 'Études, appui & accompagnement de projets de développement';
  const poleEtudes = await strapi.documents('api::service-pole.service-pole').create({
    data: {
      titre: poleEtudesTitre,
      slug: slugify(poleEtudesTitre),
      description:
        "Études, formation, appui et accompagnement de projets de développement : structuration d'OPA, suivi-évaluation, diagnostics organisationnels, business plans et bien plus.",
      icone: 'line-chart',
      ordre: 1,
    },
  });

  const poleFormationTitre = 'Formation professionnelle continue & renforcement des capacités';
  const poleFormation = await strapi.documents('api::service-pole.service-pole').create({
    data: {
      titre: poleFormationTitre,
      slug: slugify(poleFormationTitre),
      description:
        'Un catalogue de plus de 40 domaines de formation continue : bureautique, droit, langues, GRH, sécurité, commerce, transport, informatique et réseau GERME.',
      icone: 'graduation-cap',
      ordre: 2,
    },
  });

  const poleLocationTitre = 'Location de salles';
  const poleLocation = await strapi.documents('api::service-pole.service-pole').create({
    data: {
      titre: poleLocationTitre,
      slug: slugify(poleLocationTitre),
      description:
        '2 salles polyvalentes de 10 à 30 places, équipées (vidéoprojecteurs, tableaux mobiles), pour réunions, formations, séminaires et assemblées générales.',
      icone: 'building-2',
      ordre: 3,
    },
  });

  const poleByKey: Record<string, any> = {
    etudes: poleEtudes,
    formation: poleFormation,
    location: poleLocation,
  };

  const usedSlugs = new Set<string>();
  const uniqueSlug = (base: string): string => {
    let slug = slugify(base);
    let n = 2;
    while (usedSlugs.has(slug)) {
      slug = `${slugify(base)}-${n}`;
      n += 1;
    }
    usedSlugs.add(slug);
    return slug;
  };

  for (const nom of ETUDES_DOMAINES) {
    await strapi.documents('api::domaine.domaine').create({
      data: {
        nom,
        slug: uniqueSlug(nom),
        pole: poleEtudes.documentId,
        categorie: 'Études & développement',
      },
    });
  }

  for (const cat of FORMATION_CATEGORIES) {
    await strapi.documents('api::formation-categorie.formation-categorie').create({
      data: {
        nom: cat.nom,
        slug: uniqueSlug(cat.nom),
        ordre: cat.ordre,
        formations: cat.formations,
      },
    });
  }

  for (const p of PARTENAIRES) {
    await strapi.documents('api::partenaire.partenaire').create({ data: p });
  }

  for (const t of TEMOIGNAGES) {
    await strapi.documents('api::temoignage.temoignage').create({ data: t });
  }

  for (const ref of REFERENCES_PROJETS) {
    const pole = poleByKey[ref.pole];
    await strapi.documents('api::reference-projet.reference-projet').create({
      data: {
        titre: ref.titre,
        client: ref.client,
        annee: ref.annee,
        description: ref.description,
        pole: pole ? pole.documentId : undefined,
      },
    });
  }

  await strapi.documents('api::page-accueil.page-accueil').create({
    data: {
      hero_titre: 'Formation, Études & Conseils pour le développement de vos organisations',
      hero_sous_titre:
        "Depuis 1998, INTERFORMCI accompagne entreprises, coopératives et institutions ivoiriennes avec expertise et exigence.",
      chiffres_cles: [
        { valeur: 25, suffixe: '+', libelle: "ans d'expérience" },
        { valeur: 6, suffixe: '', libelle: 'agréments & partenariats' },
        { valeur: 2, suffixe: '', libelle: 'salles de formation' },
        { valeur: 40, suffixe: '+', libelle: 'domaines de formation' },
      ],
    },
  });

  await strapi.documents('api::infos-cabinet.infos-cabinet').create({
    data: {
      raison_sociale: "INTERNATIONAL FORMATION CÔTE D'IVOIRE (INTERFORMCI), SARL",
      siege: 'Abidjan Cocody Riviéra 6 Abatta, Lot 87, L’ilot 09',
      adresse_postale: '01 BP 10683 Abidjan 01',
      telephones: [
        { numero: '(+225) 27 22 25 18 39', label: 'Bureau' },
        { numero: '(+225) 07 00 86 41 65', label: 'Mobile' },
      ],
      email: 'cabinterformci@gmail.com',
      site_web: 'www.interformci.com',
      horaires: 'Lundi - Vendredi : 8h00 - 17h30',
    },
  });

  strapi.log.info('[seed] Contenu principal inséré.');
}

async function seedSalles(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::salle.salle').count({});
  if (existing > 0) {
    return;
  }

  for (const salle of SALLES) {
    await strapi.documents('api::salle.salle').create({ data: salle });
  }

  strapi.log.info('[seed] Salles insérées.');
}

async function seedExperts(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::expert.expert').count({});
  if (existing > 0) {
    return;
  }

  for (const expert of EXPERTS) {
    await strapi.documents('api::expert.expert').create({ data: expert });
  }

  strapi.log.info('[seed] Profils d’experts insérés.');
}

export default async function seed({ strapi }: { strapi: Core.Strapi }) {
  await seedMainContent(strapi);
  await seedSalles(strapi);
  await seedExperts(strapi);
}
