import Image from 'next/image';
import Link from 'next/link';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { getInfosCabinet, getStrapiMediaURL } from '@/lib/strapi';

const SERVICES_LINKS = [
  { href: '/services/etudes-et-projets', label: 'Études & accompagnement de projets' },
  { href: '/services/formation-continue', label: 'Formation professionnelle continue' },
  { href: '/services/interim', label: 'Mise à disposition de personnel' },
  { href: '/services/location-de-salles', label: 'Location de salles' },
];

const CABINET_LINKS = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/mediatheque', label: 'Médiathèque' },
];

export default async function Footer() {
  const infos = await getInfosCabinet();
  const logoUrl = getStrapiMediaURL(infos?.logo?.url) || '/logo.png';

  return (
    <footer className="bg-primary-dark text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center rounded-lg bg-white/95 px-3 py-1.5 shadow-sm"
            >
              <Image
                src={logoUrl}
                alt="INTERFORMCI — Formation, Études, Conseils"
                width={infos?.logo?.width ?? 110}
                height={infos?.logo?.height ?? 60}
                unoptimized={Boolean(infos?.logo?.url)}
                className="h-12 w-auto"
              />
            </Link>
            <p className="mt-4 text-sm font-semibold text-white">
              Études • Formations • Conseils • Services aux organisations
            </p>
            <p className="mt-2 text-sm leading-relaxed">
              Cabinet ivoirien créé en 1998 à Abidjan.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-white">Services</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {SERVICES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-white">Cabinet</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {CABINET_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{infos?.siege ?? 'Abidjan Cocody Riviéra 6 Abatta, Lot 87, L’ilot 09'}</span>
              </li>
              {(infos?.telephones ?? []).map((tel) => (
                <li key={tel.id} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <a href={`tel:${tel.numero.replace(/\s/g, '')}`} className="hover:text-secondary">
                    {tel.numero}
                    {tel.label && <span className="text-white/50"> ({tel.label})</span>}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <a
                  href={`mailto:${infos?.email ?? 'cabinterformci@gmail.com'}`}
                  className="hover:text-secondary"
                >
                  {infos?.email ?? 'cabinterformci@gmail.com'}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <a href="mailto:interformci@yahoo.fr" className="hover:text-secondary">
                  interformci@yahoo.fr
                </a>
              </li>
              {infos?.site_web && (
                <li className="flex items-center gap-3">
                  <Globe className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span>{infos.site_web}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto max-w-7xl px-4 text-center text-xs text-white/60 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} INTERFORMCI. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
