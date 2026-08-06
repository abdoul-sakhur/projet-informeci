import { ImageIcon } from 'lucide-react';

export type Ratio = '16/9' | '4/3' | '3/4' | '1/1';

interface ImagePlaceholderProps {
  label: string;
  ratio?: Ratio;
  className?: string;
  rounded?: string;
}

export const ratioClass: Record<Ratio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
};

export default function ImagePlaceholder({
  label,
  ratio = '4/3',
  className = '',
  rounded = 'rounded-2xl',
}: ImagePlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`flex flex-col items-center justify-center gap-3 bg-gray-200 ${rounded} ${ratioClass[ratio]} ${className}`}
    >
      <ImageIcon className="h-10 w-10 text-gray-400" aria-hidden="true" />
      <span className="px-4 text-center text-sm font-medium text-gray-500">{label}</span>
    </div>
  );
}
