// Shared palette for card grids that want a colored background (instead of
// plain white) — cycles through brand-consistent gradients by index.
export const CARD_GRADIENTS = [
  'from-primary to-primary-dark',
  'from-secondary to-emerald-800',
  'from-primary to-secondary',
  'from-amber-500 to-orange-600',
  'from-teal-600 to-primary-dark',
  'from-primary-dark to-primary',
];

export function getCardGradient(index: number): string {
  return CARD_GRADIENTS[index % CARD_GRADIENTS.length];
}
