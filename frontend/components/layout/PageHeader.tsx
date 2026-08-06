interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark pb-16 pt-36 sm:pb-20 sm:pt-40">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        {eyebrow && (
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/20">
            {eyebrow}
          </span>
        )}
        <h1 className="text-4xl font-bold text-white sm:text-5xl">{title}</h1>
        {description && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{description}</p>
        )}
      </div>
    </section>
  );
}
