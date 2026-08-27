import type {
  Actualite,
  Domaine,
  Expert,
  FormationCategorie,
  InfosCabinet,
  Mediatheque,
  MembreEquipe,
  PageAccueil,
  Partenaire,
  ReferenceProjet,
  Salle,
  ServicePole,
  StrapiListResponse,
  StrapiMedia,
  StrapiSingleResponse,
  Temoignage,
} from './types';

// Server-side (SSR / server components) reaches Strapi over the Docker network
// (e.g. http://backend:1337). Falls back to the public URL for local (non-Docker) dev.
const STRAPI_SERVER_URL =
  process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
// Client-side (browser) always uses the publicly reachable URL.
const STRAPI_CLIENT_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const REVALIDATE_SECONDS = 60;

async function fetchAPI<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${STRAPI_SERVER_URL}/api${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) {
      return null;
    }
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getServicePoles(): Promise<ServicePole[]> {
  const res = await fetchAPI<StrapiListResponse<ServicePole>>(
    '/service-poles?sort=ordre:asc'
  );
  return res?.data ?? [];
}

export async function getDomaines(): Promise<Domaine[]> {
  const res = await fetchAPI<StrapiListResponse<Domaine>>('/domaines?pagination[pageSize]=100');
  return res?.data ?? [];
}

export async function getFormationCategories(): Promise<FormationCategorie[]> {
  const res = await fetchAPI<StrapiListResponse<FormationCategorie>>(
    '/formation-categories?populate=*&sort=ordre:asc'
  );
  return res?.data ?? [];
}

export async function getTemoignages(): Promise<Temoignage[]> {
  const res = await fetchAPI<StrapiListResponse<Temoignage>>('/temoignages');
  return res?.data ?? [];
}

export async function getReferenceProjets(): Promise<ReferenceProjet[]> {
  const res = await fetchAPI<StrapiListResponse<ReferenceProjet>>(
    '/reference-projets?populate=*&pagination[pageSize]=100'
  );
  return res?.data ?? [];
}

export async function getPartenaires(): Promise<Partenaire[]> {
  const res = await fetchAPI<StrapiListResponse<Partenaire>>('/partenaires?populate=*');
  return res?.data ?? [];
}

export async function getPageAccueil(): Promise<PageAccueil | null> {
  // populate=* doesn't deep-populate media nested inside repeatable components
  // (hero_slides.image), so it's requested explicitly alongside the rest.
  const res = await fetchAPI<StrapiSingleResponse<PageAccueil>>(
    '/page-accueil?populate[hero_background]=true&populate[photo_equipe]=true&populate[chiffres_cles]=true&populate[hero_slides][populate]=image'
  );
  return res?.data ?? null;
}

export async function getInfosCabinet(): Promise<InfosCabinet | null> {
  const res = await fetchAPI<StrapiSingleResponse<InfosCabinet>>('/infos-cabinet?populate=*');
  return res?.data ?? null;
}

export async function getSalles(): Promise<Salle[]> {
  const res = await fetchAPI<StrapiListResponse<Salle>>('/salles?populate=*&sort=ordre:asc');
  return res?.data ?? [];
}

export async function getExperts(): Promise<Expert[]> {
  const res = await fetchAPI<StrapiListResponse<Expert>>('/experts?populate=*&sort=ordre:asc');
  return res?.data ?? [];
}

export async function getMembresEquipe(): Promise<MembreEquipe[]> {
  const res = await fetchAPI<StrapiListResponse<MembreEquipe>>(
    '/membres-equipe?populate=*&sort=ordre:asc'
  );
  return res?.data ?? [];
}

export async function getActualites(): Promise<Actualite[]> {
  const res = await fetchAPI<StrapiListResponse<Actualite>>(
    '/actualites?populate=image,tags&sort=date_debut:desc&pagination[pageSize]=100'
  );
  return res?.data ?? [];
}

export async function getActualiteBySlug(slug: string): Promise<Actualite | null> {
  const res = await fetchAPI<StrapiListResponse<Actualite>>(
    `/actualites?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image,tags`
  );
  return res?.data?.[0] ?? null;
}

export async function getMediatheque(): Promise<Mediatheque | null> {
  const res = await fetchAPI<StrapiSingleResponse<Mediatheque>>(
    '/mediatheque?populate=photos,videos'
  );
  return res?.data ?? null;
}

// Media URLs returned by Strapi are relative (e.g. "/uploads/photo.png") and are
// requested directly by the browser, so they must always use the public client URL,
// regardless of whether the data itself was fetched server-side via the internal URL.
export function getStrapiMediaURL(url: string | undefined | null): string | null {
  if (!url) return null;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${STRAPI_CLIENT_URL}${url}`;
}

const FORMAT_ORDER = ['thumbnail', 'small', 'medium', 'large'] as const;
type FormatName = (typeof FORMAT_ORDER)[number];

// Strapi generates compressed, resized variants (thumbnail/small/medium/large) for any
// upload large enough to need them. Photos straight from a phone camera can be 4+ MB;
// serving the raw original instead of these ready-made variants wastes most of that
// weight for no visual gain at typical card/section display sizes. This picks the
// smallest format that is still >= the requested size, falling back outward (then to
// the original) so small source images (logos, icons) keep working unchanged.
export function getStrapiImageURL(
  media: StrapiMedia | null | undefined,
  preferred: FormatName = 'medium'
): string | null {
  if (!media) return null;

  const startIndex = FORMAT_ORDER.indexOf(preferred);
  for (let i = startIndex; i < FORMAT_ORDER.length; i++) {
    const format = media.formats?.[FORMAT_ORDER[i]];
    if (format?.url) return getStrapiMediaURL(format.url);
  }
  for (let i = startIndex - 1; i >= 0; i--) {
    const format = media.formats?.[FORMAT_ORDER[i]];
    if (format?.url) return getStrapiMediaURL(format.url);
  }

  return getStrapiMediaURL(media.url);
}

export interface ContactMessagePayload {
  nom: string;
  email: string;
  telephone?: string;
  structure?: string;
  sujet?: string;
  message: string;
}

export async function submitContactMessage(
  payload: ContactMessagePayload
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch(`${STRAPI_CLIENT_URL}/api/contact-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: payload }),
    });
    return { ok: res.ok };
  } catch {
    return { ok: false };
  }
}
