import type { MetadataRoute } from 'next';

const BASE_URL = 'https://www.interformci.com';

const ROUTES = [
  '',
  '/a-propos',
  '/equipe',
  '/services',
  '/services/etudes-et-projets',
  '/services/formation-continue',
  '/services/location-de-salles',
  '/services/interim',
  '/references',
  '/actualites',
  '/mediatheque',
  '/contact',
  '/devis',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.7,
  }));
}
