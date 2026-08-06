import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';

export default function CTAFinal() {
  return (
    <section className="bg-gradient-to-br from-primary-dark to-primary py-20 sm:py-24">
      <AnimatedSection className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
          Prêt à renforcer les capacités de votre organisation ?
        </h2>
        <p className="mt-4 text-lg text-white/80">
          Contactez notre équipe pour un accompagnement sur mesure en formation, étude ou conseil.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/contact" variant="secondary">
            Discuter de votre projet
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
}
