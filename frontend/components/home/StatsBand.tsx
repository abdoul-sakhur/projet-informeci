import CountUp from '@/components/ui/CountUp';
import { StaggerGrid, StaggerItem } from '@/components/ui/StaggerGrid';
import type { ChiffreCle } from '@/lib/types';

interface StatsBandProps {
  chiffres: ChiffreCle[];
}

export default function StatsBand({ chiffres }: StatsBandProps) {
  if (chiffres.length === 0) return null;

  return (
    <section className="bg-white py-12 shadow-sm">
      <StaggerGrid className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {chiffres.map((chiffre) => (
          <StaggerItem key={chiffre.id} className="text-center">
            <p className="font-serif text-4xl font-bold text-primary sm:text-5xl">
              <CountUp value={chiffre.valeur} suffix={chiffre.suffixe ?? ''} />
            </p>
            <p className="mt-2 text-sm font-medium text-text/70 sm:text-base">
              {chiffre.libelle}
            </p>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </section>
  );
}
