export function getPartenaireAcronyme(nom: string): string {
  return nom.split('—')[0].trim();
}

const LOGOS: Record<string, string> = {
  FDFP: '/partenaires/fdfp.png',
  FIRCA: '/partenaires/firca.png',
  ANADER: '/partenaires/anader.png',
};

export function getPartenaireLogo(nom: string): string | null {
  return LOGOS[getPartenaireAcronyme(nom)] ?? null;
}
