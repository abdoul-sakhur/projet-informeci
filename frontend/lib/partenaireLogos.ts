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

// "Principaux agréments" cités par la cliente — liste fermée, distincte de la
// liste plus large des partenaires accompagnés. Partagée entre la page
// Références et la bande Agréments & partenariats de l'accueil.
export const PRINCIPAUX_AGREMENTS = ['FDFP', 'FIRCA', 'DGH', 'Agence Emploi Jeune', 'Réseau GERME'];

export function estUnAgrementPrincipal(nom: string): boolean {
  return PRINCIPAUX_AGREMENTS.some((agrement) => nom.startsWith(agrement));
}
