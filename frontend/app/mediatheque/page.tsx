import type { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import SectionTitle from '@/components/ui/SectionTitle';
import PhotoGallery from '@/components/mediatheque/PhotoGallery';
import VideoGrid from '@/components/mediatheque/VideoGrid';
import { getMediatheque } from '@/lib/strapi';

export const metadata: Metadata = {
  title: 'Médiathèque',
  description:
    'Photos et vidéos des formations, ateliers et événements organisés par INTERFORMCI.',
  alternates: { canonical: '/mediatheque' },
};

export default async function MediathequePage() {
  const mediatheque = await getMediatheque();
  const photos = mediatheque?.photos ?? [];
  const videos = mediatheque?.videos ?? [];

  return (
    <>
      <PageHeader
        eyebrow="Médiathèque"
        title="Photos & vidéos"
        description="Un aperçu en images de nos formations, ateliers et événements."
      />

      <section className="bg-neutral py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Galerie" title="Galerie images" />
          <div className="mt-10">
            <PhotoGallery photos={photos} />
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle eyebrow="Vidéos" title="À voir sur notre chaîne YouTube" />
          <div className="mt-10">
            <VideoGrid videos={videos} />
          </div>
        </div>
      </section>
    </>
  );
}
