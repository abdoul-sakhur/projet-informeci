'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

interface NavChild {
  href: string;
  label: string;
}

interface NavLink {
  href?: string;
  label: string;
  children?: NavChild[];
}

const NAV_LINKS: NavLink[] = [
  { href: '/', label: 'Accueil' },
  {
    href: '/a-propos',
    label: 'Cabinet',
    children: [
      { href: '/mot-de-la-direction', label: 'Mot de la direction' },
      { href: '/a-propos', label: 'Présentation' },
    ],
  },
  {
    href: '/services',
    label: 'Nos services',
    children: [
      { href: '/services/etudes-et-projets', label: 'Études & projets' },
      { href: '/services/formation-continue', label: 'Formation continue' },
      { href: '/services/interim', label: 'Intérim & personnel' },
      { href: '/services/location-de-salles', label: 'Location de salles' },
    ],
  },
  {
    label: 'Actu & Médias',
    children: [
      { href: '/actualites', label: 'Actualités' },
      { href: '/mediatheque', label: 'Médiathèque' },
    ],
  },
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
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  const isLinkActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  const isGroupActive = (link: NavLink) =>
    (link.href ? isLinkActive(link.href) : false) ||
    (link.children?.some((child) => isLinkActive(child.href)) ?? false);

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
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
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

        <nav className="hidden items-center gap-4 lg:flex xl:gap-7">
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setOpenDropdown(link.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {link.href ? (
                  <Link
                    href={link.href}
                    aria-current={isGroupActive(link) ? 'page' : undefined}
                    className={`flex items-center gap-1 whitespace-nowrap border-b-2 pb-0.5 font-medium transition-colors ${
                      isGroupActive(link)
                        ? 'border-secondary text-primary-dark'
                        : 'border-transparent text-primary-dark hover:text-secondary'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <button
                    type="button"
                    aria-expanded={openDropdown === link.label}
                    aria-current={isGroupActive(link) ? 'page' : undefined}
                    className={`flex items-center gap-1 whitespace-nowrap border-b-2 pb-0.5 font-medium transition-colors ${
                      isGroupActive(link)
                        ? 'border-secondary text-primary-dark'
                        : 'border-transparent text-primary-dark hover:text-secondary'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
                {openDropdown === link.label && (
                  <div className="absolute left-0 top-full w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        aria-current={isLinkActive(child.href) ? 'page' : undefined}
                        className={`block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isLinkActive(child.href)
                            ? 'bg-secondary-light text-secondary'
                            : 'text-text hover:bg-secondary-light hover:text-secondary'
                        }`}
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
                href={link.href!}
                aria-current={isLinkActive(link.href!) ? 'page' : undefined}
                className={`whitespace-nowrap border-b-2 pb-0.5 font-medium transition-colors ${
                  isLinkActive(link.href!)
                    ? 'border-secondary text-primary-dark'
                    : 'border-transparent text-primary-dark hover:text-secondary'
                }`}
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
            <div key={link.label}>
              {link.href ? (
                <Link
                  href={link.href}
                  aria-current={isGroupActive(link) ? 'page' : undefined}
                  className={`block rounded-lg px-3 py-3 font-medium transition-colors ${
                    isGroupActive(link)
                      ? 'bg-secondary-light text-secondary'
                      : 'text-primary-dark hover:bg-secondary-light'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <span
                  className={`block rounded-lg px-3 py-3 font-medium ${
                    isGroupActive(link) ? 'text-secondary' : 'text-primary-dark'
                  }`}
                >
                  {link.label}
                </span>
              )}
              {link.children && (
                <div className="ml-3 flex flex-col gap-1 border-l border-gray-200 pl-3">
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      aria-current={isLinkActive(child.href) ? 'page' : undefined}
                      className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                        isLinkActive(child.href)
                          ? 'bg-secondary-light font-semibold text-secondary'
                          : 'text-text hover:bg-secondary-light hover:text-secondary'
                      }`}
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
