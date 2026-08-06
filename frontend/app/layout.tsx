import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getInfosCabinet, getStrapiMediaURL } from '@/lib/strapi';
import { buildOrganizationJsonLd } from '@/lib/jsonld';
import './globals.css';

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.interformci.com'),
  title: {
    default: 'INTERFORMCI — Formation, Études & Conseils à Abidjan',
    template: '%s | INTERFORMCI',
  },
  description:
    "INTERFORMCI est un cabinet ivoirien de Formation, Études et Conseils créé en 1998 à Abidjan, agréé FDFP et FIRCA.",
  alternates: { canonical: './' },
  openGraph: {
    title: 'INTERFORMCI — Formation, Études & Conseils à Abidjan',
    description:
      "Cabinet ivoirien de Formation, Études et Conseils créé en 1998 à Abidjan, agréé FDFP et FIRCA.",
    locale: 'fr_CI',
    type: 'website',
  },
};

export default async function RootLayout({ children }: LayoutProps<'/'>) {
  const infos = await getInfosCabinet();
  const logoUrl = getStrapiMediaURL(infos?.logo?.url);
  const logoWidth = infos?.logo?.width ?? undefined;
  const logoHeight = infos?.logo?.height ?? undefined;

  return (
    <html lang="fr" className={`${playfair.variable} ${jakarta.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationJsonLd(infos)) }}
        />
        <Header logoUrl={logoUrl} logoWidth={logoWidth} logoHeight={logoHeight} />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
