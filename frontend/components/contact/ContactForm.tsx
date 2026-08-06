'use client';

import { useState, type FormEvent } from 'react';
import { Loader2, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitContactMessage } from '@/lib/strapi';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    const { ok } = await submitContactMessage({
      nom: String(formData.get('nom') ?? ''),
      email: String(formData.get('email') ?? ''),
      telephone: String(formData.get('telephone') ?? ''),
      sujet: String(formData.get('sujet') ?? ''),
      message: String(formData.get('message') ?? ''),
    });

    if (ok) {
      setStatus('success');
      form.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="mb-1.5 block text-sm font-semibold text-primary-dark">
            Nom complet
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-primary-dark">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="telephone" className="mb-1.5 block text-sm font-semibold text-primary-dark">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div>
          <label htmlFor="sujet" className="mb-1.5 block text-sm font-semibold text-primary-dark">
            Sujet
          </label>
          <input
            id="sujet"
            name="sujet"
            type="text"
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-primary-dark">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-primary-dark disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Send className="h-4 w-4" aria-hidden="true" />
        )}
        Envoyer le message
      </button>

      {status === 'success' && (
        <p className="flex items-center gap-2 text-sm font-medium text-secondary" role="status">
          <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          Votre message a bien été envoyé. Nous vous répondrons rapidement.
        </p>
      )}
      {status === 'error' && (
        <p className="flex items-center gap-2 text-sm font-medium text-red-600" role="alert">
          <AlertCircle className="h-5 w-5" aria-hidden="true" />
          Une erreur est survenue. Merci de réessayer ou de nous contacter directement.
        </p>
      )}
    </form>
  );
}
