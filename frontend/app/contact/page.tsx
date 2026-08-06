import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/contact/ContactForm';
import { getInfosCabinet } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Contactez INTERFORMCI à Abidjan Cocody Riviéra 6 Abatta pour vos projets de formation, d'étude, de conseil ou de location de salles.",
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const infos = await getInfosCabinet();

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Parlons de votre projet"
        description="Notre équipe vous répond rapidement pour toute demande de formation, d'étude, de conseil ou de location de salles."
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          <AnimatedSection direction="left" className="lg:col-span-3">
            <h2 className="font-serif text-2xl font-bold text-primary-dark">Envoyez-nous un message</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1} className="lg:col-span-2">
            <div className="rounded-2xl bg-neutral p-8 ring-1 ring-black/5">
              <h2 className="font-serif text-xl font-bold text-primary-dark">Nos coordonnées</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-text">
                      {infos?.siege ?? 'Abidjan Cocody Riviéra 6 Abatta, Lot 87, L’ilot 09'}
                    </p>
                    <p className="text-text/60">
                      {infos?.adresse_postale ?? '01 BP 10683 Abidjan 01'}
                    </p>
                  </div>
                </li>
                {(infos?.telephones ?? []).map((tel) => (
                  <li key={tel.id} className="flex items-center gap-3">
                    <Phone className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                    <a
                      href={`tel:${tel.numero.replace(/\s/g, '')}`}
                      className="font-medium text-text hover:text-secondary"
                    >
                      {tel.numero}
                      {tel.label ? ` (${tel.label})` : ''}
                    </a>
                  </li>
                ))}
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <a
                    href={`mailto:${infos?.email ?? 'cabinterformci@gmail.com'}`}
                    className="font-medium text-text hover:text-secondary"
                  >
                    {infos?.email ?? 'cabinterformci@gmail.com'}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                  <span className="font-medium text-text">
                    {infos?.horaires ?? 'Lundi - Vendredi : 8h00 - 17h30'}
                  </span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section className="bg-neutral pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl ring-1 ring-black/5">
            <iframe
              title="Localisation INTERFORMCI — Abidjan Cocody Riviéra 6 Abatta"
              src="https://www.google.com/maps?q=Cocody+Riviera+6+Abatta+Abidjan&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}
