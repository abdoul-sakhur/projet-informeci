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
          <SectionTitle
            eyebrow="Qui sommes-nous"
            title="INTERFORMCI, un cabinet ivoirien au service du développement des organisations"
          />
          <p className="mt-6 leading-relaxed text-text/80">
            Créé en 1998 à Abidjan, INTERFORMCI est un cabinet ivoirien spécialisé dans les
            études, la formation professionnelle, l&apos;accompagnement des projets et la mise à
            disposition de personnel.
          </p>
          <p className="mt-4 leading-relaxed text-text/80">
            Depuis sa création, le cabinet accompagne des entreprises, institutions publiques,
            projets et programmes de développement, ONG, coopératives et organisations
            professionnelles dans la réalisation de leurs projets et le développement de leurs
            compétences.
          </p>
          <p className="mt-4 leading-relaxed text-text/80">
            Basé à Cocody Riviera 6 Abatta, INTERFORMCI dispose d&apos;une équipe permanente et
            d&apos;un réseau d&apos;experts permettant de mobiliser des compétences adaptées à la
            diversité des missions qui lui sont confiées.
          </p>
          <div className="mt-8">
            <Button href="/a-propos" variant="ghost">
              En savoir plus sur INTERFORMCI
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
