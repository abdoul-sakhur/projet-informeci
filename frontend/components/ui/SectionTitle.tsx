interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
  as?: 'h1' | 'h2' | 'h3';
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'left',
  light = false,
  as = 'h2',
}: SectionTitleProps) {
  const Heading = as;
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-2xl ${alignClass}`}>
      {eyebrow && (
        <span
          className={`mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold tracking-wide ${
            light ? 'bg-white/10 text-secondary' : 'bg-secondary-light text-secondary'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <Heading
        className={`text-3xl sm:text-4xl font-bold leading-tight ${
          light ? 'text-white' : 'text-primary-dark'
        }`}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-white/80' : 'text-text/80'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
