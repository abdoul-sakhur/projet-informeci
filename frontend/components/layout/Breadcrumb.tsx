import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="border-b border-gray-100 bg-white">
      <ol className="mx-auto flex max-w-7xl flex-wrap items-center gap-1.5 px-4 py-3 text-sm text-text/60 sm:px-6 lg:px-8">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-text/30" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="transition-colors hover:text-secondary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-text">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
