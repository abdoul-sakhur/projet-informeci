import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const ALL_SERVICES = [
  { href: '/services/etudes-et-projets', label: 'Études & projets de développement' },
  { href: '/services/formation-continue', label: 'Formation continue' },
  { href: '/services/location-de-salles', label: 'Location de salles' },
];

interface AutresPolesProps {
  current: string;
}

export default function AutresPoles({ current }: AutresPolesProps) {
  const autres = ALL_SERVICES.filter((service) => service.href !== current);

  return (
    <section className="border-t border-gray-100 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-serif text-xl font-bold text-primary-dark">Découvrir nos autres pôles</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {autres.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex items-center justify-between rounded-xl border border-gray-200 p-5 transition-colors hover:border-secondary hover:bg-secondary-light"
            >
              <span className="font-medium text-primary-dark">{service.label}</span>
              <ArrowRight
                className="h-4 w-4 shrink-0 text-secondary transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
