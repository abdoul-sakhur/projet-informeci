import type { InfosCabinet } from './types';

const SITE_URL = 'https://www.interformci.com';

function toE164(numero: string): string {
  return `+${numero.replace(/\D/g, '')}`;
}

export function buildOrganizationJsonLd(infos: InfosCabinet | null) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'INTERFORMCI',
    alternateName: "International Formation Côte d'Ivoire",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    description:
      "Cabinet ivoirien de Formation, Études et Conseils créé en 1998 à Abidjan, agréé FDFP et FIRCA.",
    foundingDate: '1998',
    address: {
      '@type': 'PostalAddress',
      streetAddress: infos?.siege ?? 'Cocody Riviéra 6 Abatta, Lot 87, L’ilot 09',
      addressLocality: 'Abidjan',
      addressCountry: 'CI',
    },
    telephone: (infos?.telephones ?? []).map((t) => toE164(t.numero)),
    email: infos?.email ?? 'cabinterformci@gmail.com',
    areaServed: 'CI',
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function buildServiceJsonLd(serviceType: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    provider: { '@type': 'ProfessionalService', name: 'INTERFORMCI' },
    areaServed: 'CI',
    description,
  };
}
