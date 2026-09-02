import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { getInfosCabinet, getStrapiMediaURL } from '@/lib/strapi';

const QUICK_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/equipe', label: 'Équipe' },
  { href: '/services', label: 'Nos services' },
  { href: '/references', label: 'Références' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/mediatheque', label: 'Médiathèque' },
  { href: '/contact', label: 'Contact' },
];

const AGREMENTS = [
  'Agrément FDFP N° 05/99/JPM/PH/NAV du 29.11.99',
  'Agrément FIRCA N° SPS/2020/99',
  'Agrément APEX-CI N° AN-1512040293',
  'Agrément DGH N° 1064 du 14.08.2026',
  'Agrément Agence Emploi Jeune N° 000478/MPJIPSC/AEJ/DOP/SDES/SGCPTO',
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
            <p className="mt-4 text-sm leading-relaxed">
              Cabinet ivoirien de Formation, Études &amp; Conseils, créé en 1998 à Abidjan.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-white">Liens rapides</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-secondary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-white">Agréments</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {AGREMENTS.map((item) => (
                <li key={item}>{item}</li>
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
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center text-xs text-white/60 sm:flex-row sm:text-left sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} INTERFORMCI. Tous droits réservés.</p>
          <p>
            SARL — Abidjan, Côte d&apos;Ivoire
            {infos?.registre_commerce && <> — {infos.registre_commerce}</>}
          </p>
        </div>
      </div>
    </footer>
  );
}
