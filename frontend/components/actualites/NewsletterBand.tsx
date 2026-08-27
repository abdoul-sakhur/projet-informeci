'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import { submitContactMessage } from '@/lib/strapi';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function NewsletterBand() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') ?? '');

    const { ok } = await submitContactMessage({
      nom: 'Inscription newsletter',
      email,
      sujet: 'Inscription newsletter — actualités',
      message: `Demande d'inscription à la newsletter des actualités depuis l'adresse ${email}.`,
    });

    if (ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <section className="bg-neutral py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="mb-3 inline-block rounded-full bg-secondary-light px-4 py-1 text-sm font-semibold text-secondary">
          Newsletter
        </span>
        <h2 className="font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
          Ne manquez aucun événement
        </h2>
        <p className="mt-3 text-text/70">
          Formations, conférences et ateliers — directement dans votre boîte mail.
        </p>

        {status === 'success' ? (
          <p className="mt-6 flex items-center justify-center gap-2 font-medium text-secondary">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            Merci ! Votre demande d&apos;inscription a bien été envoyée.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              name="email"
              required
              placeholder="votre@email.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-dark px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary disabled:opacity-60"
            >
              {status === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Send className="h-4 w-4" aria-hidden="true" />
              )}
              S&apos;inscrire
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="mt-3 text-sm font-medium text-red-600" role="alert">
            Une erreur est survenue. Merci de réessayer.
          </p>
        )}
      </div>
    </section>
  );
}
