import Image from 'next/image';
import { User } from 'lucide-react';
import { getStrapiImageURL } from '@/lib/strapi';
import type { Expert } from '@/lib/types';

interface ExpertsGridProps {
  experts: Expert[];
}

export default function ExpertsGrid({ experts }: ExpertsGridProps) {
  if (experts.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap justify-center gap-x-12 gap-y-12">
      {experts.map((expert) => {
        const photoUrl = getStrapiImageURL(expert.photo, 'medium');
        return (
          <div key={expert.id} className="w-40 text-center sm:w-48">
            <div className="relative mx-auto h-36 w-36 overflow-hidden rounded-full bg-gray-100 ring-2 ring-secondary/50 ring-offset-4 ring-offset-neutral sm:h-44 sm:w-44">
              {photoUrl ? (
                <Image
                  src={photoUrl}
                  alt={expert.titre}
                  fill
                  unoptimized
                  sizes="176px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-14 w-14 text-gray-300" aria-hidden="true" />
                </div>
              )}
            </div>
            <h3 className="mt-4 text-sm font-semibold text-primary-dark">{expert.titre}</h3>
            <span className="mt-1 inline-block rounded-full bg-secondary-light px-3 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-secondary">
              Expert associé
            </span>
            {expert.description && (
              <p className="mt-2 text-xs leading-snug text-text/60">{expert.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
