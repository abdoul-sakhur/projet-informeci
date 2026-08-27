'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PlayCircle, Video as VideoIcon } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@/lib/youtube';
import type { VideoYoutube } from '@/lib/types';

interface VideoGridProps {
  videos: VideoYoutube[];
}

export default function VideoGrid({ videos }: VideoGridProps) {
  const [selected, setSelected] = useState<VideoYoutube | null>(null);
  const embedUrl = selected ? getYoutubeEmbedUrl(selected.url) : null;

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl bg-white py-16 text-center ring-1 ring-black/5">
        <VideoIcon className="h-10 w-10 text-gray-300" aria-hidden="true" />
        <p className="text-sm text-text/60">Aucune vidéo pour le moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => {
          const thumbUrl = getYoutubeThumbnail(video.url);
          return (
            <button
              key={video.id}
              type="button"
              onClick={() => setSelected(video)}
              className="group relative aspect-video overflow-hidden rounded-2xl bg-primary-dark shadow-sm ring-1 ring-black/5"
            >
              {thumbUrl && (
                <Image
                  src={thumbUrl}
                  alt={video.titre}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 400px, 100vw"
                  className="object-cover opacity-90 transition-opacity group-hover:opacity-70"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle
                  className="h-14 w-14 text-white drop-shadow-lg transition-transform group-hover:scale-110"
                  aria-hidden="true"
                />
              </div>
              <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-left text-sm font-semibold text-white">
                {video.titre}
              </p>
            </button>
          );
        })}
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} title={selected?.titre ?? 'Vidéo'}>
        {embedUrl ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
            <iframe
              src={embedUrl}
              title={selected?.titre}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <p className="py-10 text-center text-sm text-text/60">Lien vidéo invalide.</p>
        )}
      </Modal>
    </>
  );
}
