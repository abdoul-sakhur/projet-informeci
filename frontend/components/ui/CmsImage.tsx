import Image from 'next/image';
import ImagePlaceholder, { ratioClass, type Ratio } from './ImagePlaceholder';

interface CmsImageProps {
  src?: string | null;
  alt: string;
  label: string;
  ratio?: Ratio;
  className?: string;
  rounded?: string;
  sizes?: string;
}

export default function CmsImage({
  src,
  alt,
  label,
  ratio = '4/3',
  className = '',
  rounded = 'rounded-2xl',
  sizes = '(min-width: 1024px) 50vw, 100vw',
}: CmsImageProps) {
  if (!src) {
    return <ImagePlaceholder label={label} ratio={ratio} className={className} rounded={rounded} />;
  }

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${rounded} ${ratioClass[ratio]} ${className}`}>
      <Image src={src} alt={alt} fill unoptimized sizes={sizes} className="object-cover" />
    </div>
  );
}
