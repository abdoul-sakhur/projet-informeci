import fs from 'fs';
import path from 'path';
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
        { valeur: 28, suffixe: '+', libelle: "ans d'expérience" },
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
      registre_commerce: 'CI-ABJ-03-2026-M-18258',
    },
  });

  strapi.log.info('[seed] Contenu principal inséré.');
}

// One-off correction: the site launched with "25 ans d'expérience"; the real
// figure (1998 → today) is 28. Existing installs already have this component
// seeded, so the create-time default above won't reach them — patch in place.
async function patchExperienceStat(strapi: Core.Strapi) {
  const [page]: any[] = await strapi.documents('api::page-accueil.page-accueil').findMany({
    populate: ['chiffres_cles'],
  });
  if (!page?.chiffres_cles) return;

  const stat = page.chiffres_cles.find((c: any) => c.libelle === "ans d'expérience");
  if (!stat || stat.valeur === 28) return;

  const chiffres_cles = page.chiffres_cles.map((c: any) =>
    c.libelle === "ans d'expérience" ? { ...c, valeur: 28 } : c
  );

  await strapi.documents('api::page-accueil.page-accueil').update({
    documentId: page.documentId,
    data: { chiffres_cles },
  });

  strapi.log.info('[seed] Statistique "ans d’expérience" corrigée à 28.');
}

const INTERIM_TITRE = 'Intérim & mise à disposition de personnel';

async function seedInterimPole(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::service-pole.service-pole').findFirst({
    filters: { titre: INTERIM_TITRE },
  });
  if (existing) return;

  await strapi.documents('api::service-pole.service-pole').create({
    data: {
      titre: INTERIM_TITRE,
      slug: slugify(INTERIM_TITRE),
      description:
        "Mise à disposition de personnel qualifié pour le compte d'entreprises clientes, dans le cadre d'une prestation de sous-traitance.",
      icone: 'briefcase',
      ordre: 4,
    },
  });

  strapi.log.info('[seed] Pôle Intérim créé.');
}

const SAEPP_NOM = 'SAEPP — Société Africaine d’Entreposage de Produits Pétroliers';

async function seedExtraPartenaires(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::partenaire.partenaire').findFirst({
    filters: { nom: SAEPP_NOM },
  });
  if (existing) return;

  await strapi.documents('api::partenaire.partenaire').create({
    data: {
      nom: SAEPP_NOM,
      numero_agrement: '',
      description: 'Partenariat avec la SAEPP.',
    },
  });

  strapi.log.info('[seed] Partenaire SAEPP ajouté.');
}

// Liste de partenaires et agréments transmise par la cliente le 02/09/2026
// ("Agréments et partenaires pour le site internet.pdf"). Créés sans logo —
// la cliente les uploadera elle-même depuis l'admin. Pas de description
// inventée : seules les significations données dans le document sont
// reprises ; TRESOR, CODIVAL et WACI n'ont pas de signification confirmée
// (WACI a plusieurs sens possibles listés dans le document, aucun retenu).
const PARTENAIRES_2026: { nom: string; numero_agrement: string; description: string }[] = [
  {
    nom: 'OCPV — Office d’aide à la Commercialisation des Produits Vivriers',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  {
    nom: 'MIRAH — Ministère des Ressources Animales et Halieutiques',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  {
    nom: 'INTERCOTON — Organisation Interprofessionnelle Agricole de la Filière Cotonnière',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  { nom: 'TRESOR', numero_agrement: '', description: 'Partenaire institutionnel.' },
  { nom: 'CODIVAL', numero_agrement: '', description: 'Partenaire institutionnel.' },
  { nom: 'COIC — Compagnie Ivoirienne de Coton', numero_agrement: '', description: 'Partenaire institutionnel.' },
  {
    nom: 'APINOME — Apiculture, Nourriture, Médicament',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  {
    nom: 'HFHCI — Habitat For Humanity Côte d’Ivoire',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  {
    nom: 'CIDT — Compagnie Ivoirienne pour le Développement des Textiles',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  {
    nom: 'SECO — Société d’Exploitation Cotonnière Olam',
    numero_agrement: '',
    description: 'Partenaire institutionnel.',
  },
  { nom: 'Conseil Régional du Bounkani', numero_agrement: '', description: 'Partenaire institutionnel.' },
  { nom: 'Arche de Bouaké', numero_agrement: '', description: 'Partenaire institutionnel.' },
  { nom: 'WACI', numero_agrement: '', description: 'Partenaire institutionnel.' },
  {
    nom: 'DGH — Direction Générale des Hydrocarbures',
    numero_agrement: 'Arrêté n°1064 du 14.08.2026',
    description: 'Agrément de la Direction Générale des Hydrocarbures.',
  },
  {
    nom: 'Agence Emploi Jeune',
    numero_agrement: 'N° 000478/MPJIPSC/AEJ/DOP/SDES/SGCPTO',
    description: "Agrément de l'Agence Emploi Jeune.",
  },
];

async function seedPartenairesAgrements2026(strapi: Core.Strapi) {
  const uid = 'api::partenaire.partenaire';
  const existants: any[] = await strapi.documents(uid).findMany({});
  const nomsExistants = new Set(existants.map((p) => p.nom));

  for (const p of PARTENAIRES_2026) {
    if (nomsExistants.has(p.nom)) continue;
    await strapi.documents(uid).create({ data: p });
  }

  strapi.log.info('[seed] Partenaires et agréments du 02/09/2026 ajoutés.');
}

async function patchRegistreCommerce(strapi: Core.Strapi) {
  const [infos]: any[] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({});
  if (!infos) return;

  // Existing installs may have no value yet, or the earlier placeholder pending
  // the client's real RCCM number — either way, bring them up to the real value.
  if (infos.registre_commerce && infos.registre_commerce !== 'RCCM à renseigner') return;

  await strapi.documents('api::infos-cabinet.infos-cabinet').update({
    documentId: infos.documentId,
    data: { registre_commerce: 'CI-ABJ-03-2026-M-18258' },
  });

  strapi.log.info('[seed] Registre de commerce mis à jour.');
}

// Le 3e numéro (07 07 43 15 60) avait été ajouté sur demande, mais c'est en
// réalité le contact personnel de la gérante — retiré des coordonnées
// publiques du cabinet sur demande du 02/09/2026.
async function patchTelephones(strapi: Core.Strapi) {
  const [infos]: any[] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({
    populate: ['telephones'],
  });
  if (!infos) return;

  const numeroGerante = '(+225) 07 07 43 15 60';
  const telephones = (infos.telephones ?? []) as any[];
  if (!telephones.some((t) => t.numero === numeroGerante)) return;

  await strapi.documents('api::infos-cabinet.infos-cabinet').update({
    documentId: infos.documentId,
    data: {
      telephones: telephones
        .filter((t) => t.numero !== numeroGerante)
        .map((t) => ({ id: t.id, numero: t.numero, label: t.label })),
    },
  });

  strapi.log.info('[seed] Contact personnel de la gérante retiré des coordonnées publiques.');
}

async function seedPhotoBureaux(strapi: Core.Strapi) {
  const [infos] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({
    populate: ['photo_bureaux'],
  });
  if (!infos || infos.photo_bureaux) return;

  const filepath = path.join(__dirname, '..', '..', 'seed-assets', 'photo-bureaux.jpeg');
  if (!fs.existsSync(filepath)) return;

  const { size } = fs.statSync(filepath);
  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {},
    files: {
      filepath,
      originalFilename: 'photo-bureaux.jpeg',
      mimetype: 'image/jpeg',
      size,
    },
  });

  await strapi.documents('api::infos-cabinet.infos-cabinet').update({
    documentId: infos.documentId,
    data: { photo_bureaux: uploaded.id },
  });

  strapi.log.info('[seed] Photo façade/bureaux importée.');
}

// Nom fictif en attendant le nom réel de la gérante-associée à fournir par le client.
const DIRECTION_MESSAGE = `Faisant nôtre l'aphorisme du philosophe du 16è siècle, Jean BODIN qui écrivait : « Il n'est de richesse que d'hommes... », le cabinet INTERFORMCI a été porté sur les fonts baptismaux, il y a plus de vingt cinq (25) ans, avec pour vision, d'accompagner les partenaires qui nous feraient confiance, dans leur quête quotidienne de performance.

A l'évidence, le pari de la croissance économique et financière, tout comme celui de la pérennité d'une exploitation ou d'un projet ne sauraient de notre avis, être gagnés qu'en s'appuyant sur des ressources humaines avec des compétences avérées, diversifiées et actualisées, mais surtout utiles dans l'environnement dans lequel lesdites compétences doivent être déployées.

Cela est d'autant plus vrai qu'en ce 21è siècle, des métiers se modernisent, d'autres disparaissent, d'autres encore se créent. Qu'il s'agisse de formation initiale, d'adaptation, de reconversion, voire de renforcement des capacités, le champ du savoir n'est jamais clos. Les ressources humaines doivent dans leurs évolutions respectives, être dotées de moyens tant théoriques que pratiques pour répondre à des attentes multiformes et changeantes.

Conscient de cette situation, INTERFORMCI met son expertise et son expérience au service des communautés, des entreprises et de l'administration publique, en vue de les accompagner dans les défis de leur performance globale qui passe nécessairement par le rehaussement continuel des aptitudes et habiletés de leurs ressources humaines respectives.

Ainsi prend tout son sens, notre slogan qui est celui de « La performance par la formation ».

Faites de nous votre partenaire et nous accompagnerons votre performance !`;

async function seedDirection(strapi: Core.Strapi) {
  const [infos]: any[] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({
    populate: ['direction_photo'],
  });
  if (!infos || infos.direction_nom) return;

  const data: Record<string, unknown> = {
    direction_nom: 'Yao Adjoua Clémentine épouse KASSI',
    direction_titre: 'Gérante-Associée',
    direction_message: DIRECTION_MESSAGE,
  };

  const filepath = path.join(__dirname, '..', '..', 'seed-assets', 'direction.jpeg');
  if (fs.existsSync(filepath)) {
    const { size } = fs.statSync(filepath);
    const [uploaded] = await strapi.plugin('upload').service('upload').upload({
      data: {},
      files: {
        filepath,
        originalFilename: 'direction.jpeg',
        mimetype: 'image/jpeg',
        size,
      },
    });
    data.direction_photo = uploaded.id;
  }

  await strapi.documents('api::infos-cabinet.infos-cabinet').update({
    documentId: infos.documentId,
    data,
    status: 'published',
  });

  strapi.log.info('[seed] Mot de la direction importé.');
}

// The homepage hero was a single static title/subtitle/image; it's now a slider.
// Reuses images already in the media library (no fabricated photos) and text
// already established elsewhere on the site (service pole descriptions), so no
// new claims are introduced — just presented as slides instead of one screen.
async function seedHeroSlides(strapi: Core.Strapi) {
  const [page]: any[] = await strapi.documents('api::page-accueil.page-accueil').findMany({
    populate: ['hero_slides', 'hero_background'],
  });
  if (!page || (page.hero_slides && page.hero_slides.length > 0)) return;

  const findFile = async (nameContains: string) => {
    const files: any[] = await strapi.db.query('plugin::upload.file').findMany({
      where: { name: { $contains: nameContains } },
    });
    return files[0] ?? null;
  };

  // "Gemini_Generated_Image_*" are AI-generated logo variants (the InterFormci
  // wordmark on a white background), not photos — never usable as a hero
  // backdrop. Only the two real, camera-shot photos in the library qualify.
  const [imgA, imgB] = await Promise.all([
    findFile('IMG_20221205_141400_535'),
    findFile('IMG_20221205_145358_149'),
  ]);

  const slides = [
    {
      titre: 'Formation, Études & Conseils pour le développement de vos organisations',
      sous_titre:
        "Depuis 1998, INTERFORMCI accompagne entreprises, coopératives et institutions ivoiriennes avec expertise et exigence.",
      image: imgA?.id,
    },
    {
      titre: 'Études, appui & accompagnement de projets de développement',
      sous_titre:
        "Structuration d'OPA, suivi-évaluation, diagnostics organisationnels et business plans.",
      image: imgB?.id,
    },
  ].filter((s) => s.image);

  if (slides.length === 0) return;

  const data: Record<string, unknown> = { hero_slides: slides };
  if (!page.hero_background && imgA?.id) {
    data.hero_background = imgA.id;
  }

  await strapi.documents('api::page-accueil.page-accueil').update({
    documentId: page.documentId,
    data,
  });

  strapi.log.info('[seed] Slider du hero inséré.');
}

// One-off correction: the first version of seedHeroSlides mistakenly picked up
// "Gemini_Generated_Image_*" files as background photos — they're actually
// AI-generated logo variants (wordmark on white), not photos, which showed up
// as a giant pale logo/grid watermark behind the hero text. Swap them out for
// the two real photos already used elsewhere on the site.
async function patchHeroSlidesRemoveLogoImages(strapi: Core.Strapi) {
  const [page]: any[] = await strapi.documents('api::page-accueil.page-accueil').findMany({
    populate: ['hero_slides', 'hero_slides.image', 'hero_background'],
  });
  if (!page?.hero_slides?.length) return;

  const usesLogoImage = page.hero_slides.some((s: any) =>
    s.image?.name?.startsWith('Gemini_Generated_Image')
  );
  if (!usesLogoImage) return;

  const findFile = async (nameContains: string) => {
    const files: any[] = await strapi.db.query('plugin::upload.file').findMany({
      where: { name: { $contains: nameContains } },
    });
    return files[0] ?? null;
  };

  const [imgA, imgB] = await Promise.all([
    findFile('IMG_20221205_141400_535'),
    findFile('IMG_20221205_145358_149'),
  ]);
  if (!imgA && !imgB) return;

  const slides = [
    {
      titre: 'Formation, Études & Conseils pour le développement de vos organisations',
      sous_titre:
        "Depuis 1998, INTERFORMCI accompagne entreprises, coopératives et institutions ivoiriennes avec expertise et exigence.",
      image: imgA?.id,
    },
    {
      titre: 'Études, appui & accompagnement de projets de développement',
      sous_titre:
        "Structuration d'OPA, suivi-évaluation, diagnostics organisationnels et business plans.",
      image: imgB?.id,
    },
  ].filter((s) => s.image);

  const data: Record<string, unknown> = { hero_slides: slides };
  if (page.hero_background?.name?.startsWith('Gemini_Generated_Image') && imgA?.id) {
    data.hero_background = imgA.id;
  }

  await strapi.documents('api::page-accueil.page-accueil').update({
    documentId: page.documentId,
    data,
  });

  strapi.log.info('[seed] Images du hero corrigées (logo remplacé par des photos réelles).');
}

// Real team member (not fabricated): reuses the gérante's already-verified name,
// title and photo (from infos-cabinet.direction_*) as the first entry. Additional
// staff must be added from the admin — INTERFORMCI hasn't provided more names/photos.
async function seedMembresEquipe(strapi: Core.Strapi) {
  const existing = await strapi.documents('api::membre-equipe.membre-equipe').count({});
  if (existing > 0) return;

  const [infos]: any[] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({
    populate: ['direction_photo'],
  });
  if (!infos?.direction_nom) return;

  await strapi.documents('api::membre-equipe.membre-equipe').create({
    data: {
      nom: infos.direction_nom,
      poste: 'Gérante',
      photo: infos.direction_photo?.id,
      departement: 'Direction',
      ordre: 1,
    },
  });

  strapi.log.info('[seed] Première membre de l’équipe insérée.');
}

// Effectif réel transmis par la cliente le 01/09/2026 ("Équipe InterFormci") —
// remplace les emplacements placeholder ("Nom à renseigner") créés avant que
// la liste officielle ne soit communiquée.
const EQUIPE_REELLE: { nom: string; poste: string; departement: string }[] = [
  {
    nom: 'MOTTOH née Amélie Confort Dossou-Yovo',
    poste: 'Responsable Ressources Humaines',
    departement: 'Responsables',
  },
  {
    nom: 'ABRE née Tano Djamba Michelle Stéphanie',
    poste: 'Responsable Cellule Planification et Suivi des Activités',
    departement: 'Responsables',
  },
  {
    nom: 'KOFFI Agohi Victor Jaurès',
    poste: 'Responsable Projets / Études / Digitalisations',
    departement: 'Responsables',
  },
  { nom: 'AKAKOU Williams', poste: 'Responsable Logistique', departement: 'Responsables' },
  { nom: 'KONE Fanvognon Éric', poste: 'Comptable', departement: 'Équipe support' },
  {
    nom: 'AHODEHOU Josiane Christelle Senami',
    poste: 'Assistante Cellule Planification et Suivi des Activités',
    departement: 'Équipe support',
  },
];

async function patchMembresEquipeReels(strapi: Core.Strapi) {
  const uid = 'api::membre-equipe.membre-equipe';
  const existants: any[] = await strapi.documents(uid).findMany({});

  // Aligne le titre de la gérante déjà seedée ("Gérante-Associée") sur
  // l'intitulé officiel de la liste transmise — indépendant du reste du
  // patch pour continuer à s'appliquer même une fois l'effectif migré.
  for (const membre of existants) {
    if (membre.poste === 'Gérante-Associée') {
      await strapi.documents(uid).update({ documentId: membre.documentId, data: { poste: 'Gérante' } });
    }
  }

  // Déjà migré : un des noms réels est présent.
  if (existants.some((m) => m.nom === 'AKAKOU Williams')) return;

  // Retire les emplacements placeholder ("Nom à renseigner") au profit des
  // vraies fiches ci-dessous.
  for (const membre of existants) {
    if (membre.nom === 'Nom à renseigner') {
      await strapi.documents(uid).delete({ documentId: membre.documentId });
    }
  }

  let ordre = existants.reduce((max, m) => Math.max(max, m.ordre ?? 0), 1);
  for (const membre of EQUIPE_REELLE) {
    ordre += 1;
    await strapi.documents(uid).create({ data: { ...membre, ordre } });
  }

  strapi.log.info('[seed] Effectif réel de l’équipe importé.');
}

// Organigramme communiqué par la cliente le 01/09/2026 (deuxième version,
// simplifiée à 4 départements : Direction, Département Projets & Formation,
// Service Comptabilité, Support — fusionne les anciens "Département Projet",
// "Département Formation" et "Cellule Planification"). Deux nouveaux postes
// réels (Gestionnaire de site, Agent de liaison) remplacent les emplacements
// génériques précédents ; l'ancien poste vacant "Assistante Secrétaire" est
// retiré, absorbé par le poste "Assistante" de Josiane Ahodeou.
//
// `nomActuel`/`posteActuel` servent uniquement à retrouver la fiche existante
// lors du premier passage (une personne réelle qu'on renomme, ou un
// emplacement vacant qu'on pourvoit) ; une fois migrée, la fiche est
// retrouvée par son nouveau nom.
interface MembreCible {
  nom: string;
  poste: string;
  departement: string;
  ordre: number;
  nomActuel?: string;
  posteActuel?: string;
}

const STRUCTURE_EQUIPE: MembreCible[] = [
  {
    nomActuel: 'Yao Adjoua Clémentine épouse KASSI',
    nom: 'Clémentine KASSI',
    poste: 'Gérante',
    departement: 'Direction',
    ordre: 1,
  },
  {
    posteActuel: 'Directeur Administratif et Financier',
    nom: 'Jean Jacques KASSI',
    poste: 'Responsable Financier/Système de Management',
    departement: 'Direction',
    ordre: 2,
  },
  {
    nomActuel: 'MOTTOH née Amélie Confort Dossou-Yovo',
    nom: 'Amélie MOTTOH',
    poste: 'Responsable Administratif/Gestion des ressources humaines',
    departement: 'Direction',
    ordre: 3,
  },
  {
    nomActuel: 'KOFFI Agohi Victor Jaurès',
    nom: 'Jaurès KOFFI',
    poste: 'Responsable Projet, Études et Digitalisation',
    departement: 'Département Projets & Formation',
    ordre: 4,
  },
  {
    posteActuel: 'Responsable Formation',
    nom: 'Nom à renseigner',
    poste: 'Responsable Formation',
    departement: 'Département Projets & Formation',
    ordre: 5,
  },
  {
    nomActuel: 'ABRE née Tano Djamba Michelle Stéphanie',
    nom: 'Michelle ABRÉ',
    poste: 'Responsable cellule planification et suivi des activités',
    departement: 'Département Projets & Formation',
    ordre: 6,
  },
  {
    nomActuel: 'KONE Fanvognon Éric',
    nom: 'Éric Koné',
    poste: 'Comptable',
    departement: 'Service Comptabilité',
    ordre: 7,
  },
  {
    nomActuel: 'AHODEHOU Josiane Christelle Senami',
    nom: 'Josiane Ahodeou',
    poste: 'Assistante',
    departement: 'Support',
    ordre: 8,
  },
  { nom: 'Yannick Blé', poste: 'Gestionnaire de site', departement: 'Support', ordre: 9 },
  {
    nomActuel: 'AKAKOU Williams',
    nom: 'William Akaffou',
    poste: 'Agent de liaison',
    departement: 'Support',
    ordre: 10,
  },
];

async function patchStructureEquipe(strapi: Core.Strapi) {
  const uid = 'api::membre-equipe.membre-equipe';
  const existants: any[] = await strapi.documents(uid).findMany({});

  // L'ancien emplacement vacant "Assistante Secrétaire" (Secrétariat) est
  // absorbé par le poste "Assistante" (Support, Josiane Ahodeou) — retiré.
  const secretariatVacant = existants.find(
    (m) => m.poste === 'Assistante Secrétaire' && m.nom === 'Nom à renseigner'
  );
  if (secretariatVacant) {
    await strapi.documents(uid).delete({ documentId: secretariatVacant.documentId });
  }

  for (const cible of STRUCTURE_EQUIPE) {
    let membre: any;
    if (cible.nomActuel) {
      membre = existants.find((m) => m.nom === cible.nomActuel || m.nom === cible.nom);
    } else if (cible.posteActuel) {
      membre =
        existants.find((m) => m.poste === cible.posteActuel) ??
        existants.find((m) => m.nom === cible.nom);
    } else {
      membre = existants.find((m) => m.nom === cible.nom);
    }

    if (!membre) {
      await strapi.documents(uid).create({
        data: { nom: cible.nom, poste: cible.poste, departement: cible.departement, ordre: cible.ordre },
      });
      continue;
    }

    const changes: Record<string, unknown> = {};
    if (membre.nom !== cible.nom) changes.nom = cible.nom;
    if (membre.poste !== cible.poste) changes.poste = cible.poste;
    if (membre.departement !== cible.departement) changes.departement = cible.departement;
    if (membre.ordre !== cible.ordre) changes.ordre = cible.ordre;
    if (Object.keys(changes).length > 0) {
      await strapi.documents(uid).update({ documentId: membre.documentId, data: changes });
    }
  }

  strapi.log.info('[seed] Organigramme de l’équipe mis à jour (4 départements).');
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
  await patchExperienceStat(strapi);
  await seedInterimPole(strapi);
  await seedExtraPartenaires(strapi);
  await seedPartenairesAgrements2026(strapi);
  await patchRegistreCommerce(strapi);
  await patchTelephones(strapi);
  await seedPhotoBureaux(strapi);
  await seedDirection(strapi);
  await seedHeroSlides(strapi);
  await patchHeroSlidesRemoveLogoImages(strapi);
  await seedMembresEquipe(strapi);
  await patchMembresEquipeReels(strapi);
  await patchStructureEquipe(strapi);
}
