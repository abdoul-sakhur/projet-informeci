import { ArrowRight } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

export default function CTASecondaire() {
  return (
    <section className="bg-neutral py-20 sm:py-24">
      <AnimatedSection className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
          Vous avez un projet ou un besoin spécifique ?
        </h2>
        <p className="mt-4 leading-relaxed text-text/80">
          Étude, accompagnement de projet, formation, mise à disposition de personnel ou location
          de salle : échangeons sur votre besoin. Notre équipe vous accompagne pour identifier la
          solution la plus adaptée à votre organisation.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/devis" variant="secondary">
            Demander un devis
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="ghost">
            Nous contacter
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
