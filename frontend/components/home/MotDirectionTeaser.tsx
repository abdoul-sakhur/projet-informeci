import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import CmsImage from '@/components/ui/CmsImage';
import SectionTitle from '@/components/ui/SectionTitle';

interface MotDirectionTeaserProps {
  photoUrl?: string | null;
  nom?: string | null;
  titre?: string | null;
  premierParagraphe: string;
}

export default function MotDirectionTeaser({
  photoUrl,
  nom,
  titre,
  premierParagraphe,
}: MotDirectionTeaserProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark py-20 sm:py-24">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-[180px_1fr] sm:items-center">
          <AnimatedSection direction="left">
            <CmsImage
              src={photoUrl}
              alt={nom ?? 'Direction INTERFORMCI'}
              label="Portrait — Direction"
              ratio="3/4"
            />
          </AnimatedSection>
          <AnimatedSection direction="right" delay={0.1}>
            <SectionTitle eyebrow="Le mot de la direction" title="Mot de la gérante-associée" light />
            {nom && (
              <p className="mt-3 text-sm font-semibold text-white">
                {nom}
                {titre && <span className="font-normal text-white/70"> — {titre}</span>}
              </p>
            )}
            <p className="mt-4 text-sm leading-relaxed text-white/85">{premierParagraphe}</p>
            <div className="mt-6">
              <Button href="/mot-de-la-direction" variant="outline">
                Lire la suite
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
