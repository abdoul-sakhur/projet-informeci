import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import CmsImage from '@/components/ui/CmsImage';
import SectionTitle from '@/components/ui/SectionTitle';

interface QuiSommesNousProps {
  photoEquipeUrl?: string | null;
}

export default function QuiSommesNous({ photoEquipeUrl }: QuiSommesNousProps) {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <AnimatedSection direction="left">
          <CmsImage
            src={photoEquipeUrl}
            alt="Équipe INTERFORMCI en session de travail"
            label="Photo équipe INTERFORMCI en session de travail"
            ratio="4/3"
          />
        </AnimatedSection>

        <AnimatedSection direction="right" delay={0.1}>
          <SectionTitle eyebrow="Qui sommes-nous" title="Un cabinet ivoirien de référence depuis 1998" />
          <p className="mt-6 leading-relaxed text-text/80">
            Créé en 1998 et agréé en novembre 1999 par le FDFP, le Cabinet INTERFORMCI est une
            structure qui contribue au développement des organisations et entreprises.
            INTERFORMCI est agréé par le FIRCA depuis 2002.
          </p>
          <p className="mt-4 leading-relaxed text-text/80">
            Basé à Abidjan Cocody Riviéra, notre équipe de permanents et d&apos;experts consultants
            accompagne entreprises, coopératives et institutions dans leurs projets d&apos;études,
            de formation et de conseil.
          </p>
          <div className="mt-8">
            <Button href="/a-propos" variant="ghost">
              Découvrir le cabinet
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
