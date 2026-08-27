import type { ActualiteCategorie } from './types';

export type StatutEvenement = 'En cours' | 'À venir' | 'Passé';

export function getStatut(dateDebut: string, dateFin: string | null, now = new Date()): StatutEvenement {
  const debut = new Date(dateDebut);
  const fin = dateFin ? new Date(dateFin) : debut;
  // Comparisons at day granularity so "today" counts as "en cours".
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const start = new Date(debut.getFullYear(), debut.getMonth(), debut.getDate());
  const end = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());

  if (today < start) return 'À venir';
  if (today > end) return 'Passé';
  return 'En cours';
}

const DATE_FORMAT: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
const DATE_FORMAT_SHORT: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long' };

export function formatDateRange(dateDebut: string, dateFin: string | null): string {
  const debut = new Date(dateDebut);
  if (!dateFin || dateFin === dateDebut) {
    return new Intl.DateTimeFormat('fr-FR', DATE_FORMAT).format(debut);
  }
  const fin = new Date(dateFin);
  const sameMonth = debut.getMonth() === fin.getMonth() && debut.getFullYear() === fin.getFullYear();
  const debutLabel = new Intl.DateTimeFormat('fr-FR', sameMonth ? { day: 'numeric' } : DATE_FORMAT_SHORT).format(
    debut
  );
  const finLabel = new Intl.DateTimeFormat('fr-FR', DATE_FORMAT).format(fin);
  return `${debutLabel} – ${finLabel}`;
}

export const CATEGORIE_STYLES: Record<ActualiteCategorie, string> = {
  Formation: 'bg-secondary text-white',
  Atelier: 'bg-primary text-white',
  Webinaire: 'bg-amber-500 text-white',
  Forum: 'bg-primary-dark text-white',
  Conférence: 'bg-rose-600 text-white',
  Colloque: 'bg-teal-600 text-white',
};

export const STATUT_STYLES: Record<StatutEvenement, string> = {
  'En cours': 'bg-secondary text-white',
  'À venir': 'bg-white text-primary-dark',
  Passé: 'bg-black/50 text-white',
};
