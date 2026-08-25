import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import EquipeGrid from '@/components/equipe/EquipeGrid';
import { getMembresEquipe } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Équipe',
  description:
    "L'équipe INTERFORMCI : direction et collaborateurs qui accompagnent nos partenaires en formation, études et conseil.",
  alternates: { canonical: '/equipe' },
};

export default async function EquipePage() {
  const membres = await getMembresEquipe();

  const groupes = new Map<string, typeof membres>();
  for (const membre of membres) {
    const cle = membre.departement ?? 'Notre équipe';
    groupes.set(cle, [...(groupes.get(cle) ?? []), membre]);
  }
  if (groupes.size === 0) {
    groupes.set('Notre équipe', []);
  }

  return (
    <>
      <PageHeader
        eyebrow="L'équipe"
        title="Les personnes qui font INTERFORMCI"
        description="Direction et collaborateurs permanents, mobilisés au quotidien aux côtés de nos partenaires."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Équipe"
            title="Une équipe engagée à vos côtés"
            align="center"
            description="Permanents et consultants diplômés d'universités et grandes écoles ivoiriennes, américaines, canadiennes et françaises."
          />

          <div className="mt-16 space-y-16">
            {[...groupes.entries()].map(([groupe, membresGroupe]) => (
              <div key={groupe}>
                {groupes.size > 1 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-primary-dark">
                      {groupe}
                    </h3>
                    <div className="mt-2 h-px w-10 bg-secondary" />
                  </div>
                )}
                <EquipeGrid membres={membresGroupe} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
