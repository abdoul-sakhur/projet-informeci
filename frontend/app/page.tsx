import Hero from '@/components/home/Hero';
import StatsBand from '@/components/home/StatsBand';
import PolesGrid from '@/components/home/PolesGrid';
import PourquoiNous from '@/components/home/PourquoiNous';
import QuiSommesNous from '@/components/home/QuiSommesNous';
import PartenairesBand from '@/components/home/PartenairesBand';
import NotreApproche from '@/components/home/NotreApproche';
import CTASecondaire from '@/components/home/CTASecondaire';
import {
  getInfosCabinet,
  getPageAccueil,
  getPartenaires,
  getServicePoles,
  getStrapiImageURL,
} from '@/lib/strapi';

const FALLBACK_TITRE = 'Formation, Études & Conseils pour le développement de vos organisations';
const FALLBACK_SOUS_TITRE =
  "Depuis 1998, INTERFORMCI accompagne entreprises, coopératives et institutions ivoiriennes avec expertise et exigence.";

export default async function Home() {
  const [pageAccueil, poles, partenaires, infos] = await Promise.all([
    getPageAccueil(),
    getServicePoles(),
    getPartenaires(),
    getInfosCabinet(),
  ]);

  const slides = pageAccueil?.hero_slides?.length
    ? pageAccueil.hero_slides.map((s) => ({
        titre: s.titre,
        sousTitre: s.sous_titre,
        imageUrl: getStrapiImageURL(s.image, 'large'),
      }))
    : [
        {
          titre: pageAccueil?.hero_titre ?? FALLBACK_TITRE,
          sousTitre: pageAccueil?.hero_sous_titre ?? FALLBACK_SOUS_TITRE,
          imageUrl: getStrapiImageURL(pageAccueil?.hero_background, 'large'),
        },
      ];

  return (
    <>
      <Hero slides={slides} />
      <StatsBand chiffres={pageAccueil?.chiffres_cles ?? []} />
      <PolesGrid poles={poles} />
      <PourquoiNous />
      <QuiSommesNous
        photoEquipeUrl={getStrapiImageURL(pageAccueil?.photo_equipe, 'medium')}
        photoFacadeUrl={getStrapiImageURL(infos?.photo_bureaux, 'medium')}
      />
      <PartenairesBand partenaires={partenaires} />
      <NotreApproche />
      <CTASecondaire />
    </>
  );
}
