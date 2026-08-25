export interface ServicePole {
  id: number;
  documentId: string;
  titre: string;
  slug: string;
  description: string;
  icone: string;
  ordre: number;
}

export interface Domaine {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  categorie: string;
  description_courte: string | null;
}

export interface FormationItem {
  id: number;
  nom: string;
  description: string | null;
}

export interface FormationCategorie {
  id: number;
  documentId: string;
  nom: string;
  slug: string;
  ordre: number;
  formations: FormationItem[];
}

export interface Temoignage {
  id: number;
  documentId: string;
  auteur: string;
  fonction: string | null;
  structure: string | null;
  contenu: string;
}

export interface ReferenceProjet {
  id: number;
  documentId: string;
  titre: string;
  client: string | null;
  annee: number | null;
  description: string | null;
  attestation: StrapiMedia | null;
}

export interface Partenaire {
  id: number;
  documentId: string;
  nom: string;
  numero_agrement: string | null;
  description: string | null;
  logo: StrapiMedia | null;
}

export interface ChiffreCle {
  id: number;
  valeur: number;
  suffixe: string | null;
  libelle: string;
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiMedia {
  id: number;
  url: string;
  width: number | null;
  height: number | null;
  alternativeText: string | null;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  } | null;
}

export interface HeroSlide {
  id: number;
  titre: string;
  sous_titre: string | null;
  image: StrapiMedia | null;
}

export interface PageAccueil {
  id: number;
  documentId: string;
  hero_titre: string;
  hero_sous_titre: string;
  hero_background: StrapiMedia | null;
  photo_equipe: StrapiMedia | null;
  chiffres_cles: ChiffreCle[];
  hero_slides: HeroSlide[];
}

export interface MembreEquipe {
  id: number;
  documentId: string;
  nom: string;
  poste: string;
  departement: string | null;
  photo: StrapiMedia | null;
  ordre: number;
}

export interface Salle {
  id: number;
  documentId: string;
  nom: string;
  capacite: string | null;
  description: string | null;
  photo: StrapiMedia | null;
  ordre: number;
}

export interface Expert {
  id: number;
  documentId: string;
  titre: string;
  description: string | null;
  photo: StrapiMedia | null;
  ordre: number;
}

export interface Telephone {
  id: number;
  numero: string;
  label: string | null;
}

export interface InfosCabinet {
  id: number;
  documentId: string;
  logo: StrapiMedia | null;
  photo_bureaux: StrapiMedia | null;
  raison_sociale: string;
  siege: string;
  adresse_postale: string;
  telephones: Telephone[];
  email: string;
  site_web: string;
  horaires: string;
  registre_commerce: string | null;
  direction_nom: string | null;
  direction_titre: string | null;
  direction_photo: StrapiMedia | null;
  direction_message: string | null;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: Record<string, unknown>;
}
