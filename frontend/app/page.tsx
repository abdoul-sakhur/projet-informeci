import Hero from '@/components/home/Hero';
import StatsBand from '@/components/home/StatsBand';
import PolesGrid from '@/components/home/PolesGrid';
import QuiSommesNous from '@/components/home/QuiSommesNous';
import PartenairesBand from '@/components/home/PartenairesBand';
import Temoignages from '@/components/home/Temoignages';
import CTAFinal from '@/components/home/CTAFinal';
import {
  getPageAccueil,
  getPartenaires,
  getServicePoles,
  getStrapiImageURL,
  getTemoignages,
} from '@/lib/strapi';

const FALLBACK_TITRE = 'Formation, Études & Conseils pour le développement de vos organisations';
const FALLBACK_SOUS_TITRE =
  "Depuis 1998, INTERFORMCI accompagne entreprises, coopératives et institutions ivoiriennes avec expertise et exigence.";

export default async function Home() {
  const [pageAccueil, poles, partenaires, temoignages] = await Promise.all([
    getPageAccueil(),
    getServicePoles(),
    getPartenaires(),
    getTemoignages(),
  ]);

  return (
    <>
      <Hero
        titre={pageAccueil?.hero_titre ?? FALLBACK_TITRE}
        sousTitre={pageAccueil?.hero_sous_titre ?? FALLBACK_SOUS_TITRE}
        backgroundImageUrl={getStrapiImageURL(pageAccueil?.hero_background, 'large')}
      />
      <StatsBand chiffres={pageAccueil?.chiffres_cles ?? []} />
      <PolesGrid poles={poles} />
      <QuiSommesNous photoEquipeUrl={getStrapiImageURL(pageAccueil?.photo_equipe, 'medium')} />
      <PartenairesBand partenaires={partenaires} />
      <Temoignages temoignages={temoignages} />
      <CTAFinal />
    </>
  );
}
