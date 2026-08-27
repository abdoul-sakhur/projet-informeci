'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/equipe', label: 'Équipe' },
  {
    href: '/services',
    label: 'Nos services',
    children: [
      { href: '/services/etudes-et-projets', label: 'Études & projets' },
      { href: '/services/formation-continue', label: 'Formation continue' },
      { href: '/services/location-de-salles', label: 'Location de salles' },
      { href: '/services/interim', label: 'Intérim & personnel' },
    ],
  },
  { href: '/references', label: 'Références' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/devis', label: 'Demande de devis' },
];

interface HeaderProps {
  logoUrl?: string | null;
  logoWidth?: number;
  logoHeight?: number;
}

export default function Header({ logoUrl, logoWidth, logoHeight }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center">
          <Image
            src={logoUrl || '/logo.png'}
            alt="INTERFORMCI — Formation, Études, Conseils"
            width={logoWidth ?? 110}
            height={logoHeight ?? 60}
            priority
            unoptimized={Boolean(logoUrl)}
            className="h-10 w-auto sm:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="flex items-center gap-1 font-medium text-primary-dark transition-colors hover:text-secondary"
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-lg px-4 py-3 text-sm font-medium text-text hover:bg-secondary-light hover:text-secondary"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-medium text-primary-dark transition-colors hover:text-secondary"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="hidden lg:block">
          <Button href="/contact" variant="primary">
            Nous contacter
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileOpen}
          className="p-2 text-primary-dark lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-y-auto bg-white shadow-xl transition-[max-height] duration-300 ${
          mobileOpen ? 'max-h-[calc(100vh-4rem)]' : 'max-h-0'
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4 pt-2">
          {NAV_LINKS.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                className="block rounded-lg px-3 py-3 font-medium text-primary-dark hover:bg-secondary-light"
              >
                {link.label}
              </Link>
              {link.children && (
                <div className="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="rounded-lg px-3 py-2 text-sm text-text hover:bg-secondary-light hover:text-secondary"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/contact"
            className="mt-2 rounded-lg bg-primary px-3 py-3 text-center font-semibold text-white"
          >
            Nous contacter
          </Link>
        </nav>
      </div>
    </header>
  );
}
