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
        { numero: '(+225) 07 07 43 15 60', label: 'Mobile 2' },
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

async function patchTelephones(strapi: Core.Strapi) {
  const [infos]: any[] = await strapi.documents('api::infos-cabinet.infos-cabinet').findMany({
    populate: ['telephones'],
  });
  if (!infos) return;

  const numeros: string[] = (infos.telephones ?? []).map((t: any) => t.numero);
  const troisieme = '(+225) 07 07 43 15 60';
  if (numeros.includes(troisieme)) return;

  await strapi.documents('api::infos-cabinet.infos-cabinet').update({
    documentId: infos.documentId,
    data: {
      telephones: [
        ...(infos.telephones ?? []).map((t: any) => ({ id: t.id, numero: t.numero, label: t.label })),
        { numero: troisieme, label: 'Mobile 2' },
      ],
    },
  });

  strapi.log.info('[seed] Troisième numéro de téléphone ajouté.');
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
      poste: infos.direction_titre ?? 'Gérante-Associée',
      photo: infos.direction_photo?.id,
      departement: 'Direction',
      ordre: 1,
    },
  });

  strapi.log.info('[seed] Premier membre de l’équipe inséré.');
}

// Postes fournis par la cliente après présentation, en plus de la gérante déjà
// seedée : crée un emplacement par poste avec un nom placeholder explicite (pas
// de nom fictif) — à compléter (nom + photo) depuis l'admin. Le champ
// `departement` sert ici de niveau hiérarchique (grade), pour regrouper la
// grille de la page /equipe en lignes par rang plutôt qu'en vrac.
const POSTES_EQUIPE: { poste: string; departement: string }[] = [
  { poste: 'Directeur administratif et financier', departement: 'Direction' },
  { poste: 'Directrice des ressources humaines', departement: 'Direction' },
  { poste: 'Responsable chargé des études, projets et digitalisation', departement: 'Responsables' },
  { poste: 'Responsable chargé de la formation', departement: 'Responsables' },
  { poste: 'Responsable suivi et planification', departement: 'Responsables' },
  { poste: 'Comptable', departement: 'Équipe support' },
  { poste: 'Assistante secrétaire', departement: 'Équipe support' },
  { poste: 'Gestionnaire de site', departement: 'Équipe support' },
  { poste: 'Chargé de liaison', departement: 'Équipe support' },
];

async function patchMembresEquipePostes(strapi: Core.Strapi) {
  const existants: any[] = await strapi.documents('api::membre-equipe.membre-equipe').findMany({});
  const postesExistants = new Set(existants.map((m) => m.poste));
  let ordre = existants.reduce((max, m) => Math.max(max, m.ordre ?? 0), 0);

  for (const { poste, departement } of POSTES_EQUIPE) {
    if (postesExistants.has(poste)) continue;
    ordre += 1;
    await strapi.documents('api::membre-equipe.membre-equipe').create({
      data: { nom: 'Nom à renseigner', poste, departement, ordre },
    });
  }

  // Complète le grade des entrées déjà créées avant l'ajout du regroupement
  // par rang (elles existent mais avec `departement` vide).
  const parPoste = new Map(POSTES_EQUIPE.map((p) => [p.poste, p.departement]));
  for (const membre of existants) {
    if (membre.departement) continue;
    const departement = parPoste.get(membre.poste) ?? (membre.poste?.includes('Gérante') ? 'Direction' : null);
    if (!departement) continue;
    await strapi.documents('api::membre-equipe.membre-equipe').update({
      documentId: membre.documentId,
      data: { departement },
    });
  }

  strapi.log.info('[seed] Emplacements des postes de l’équipe complétés.');
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
  await patchRegistreCommerce(strapi);
  await patchTelephones(strapi);
  await seedPhotoBureaux(strapi);
  await seedDirection(strapi);
  await seedHeroSlides(strapi);
  await patchHeroSlidesRemoveLogoImages(strapi);
  await seedMembresEquipe(strapi);
  await patchMembresEquipePostes(strapi);
}
