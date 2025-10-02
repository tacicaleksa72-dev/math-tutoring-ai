import Link from 'next/link';

type HeroProps = {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Hero({
  title = 'Privatni časovi matematike',
  subtitle = 'Kvalitetno obrazovanje prilagođeno vašem detetu',
  ctaHref = '/zakazivanje',
  ctaLabel = 'Zakaži prvi čas',
}: HeroProps) {
  return (
    <section
      className='
        relative overflow-hidden
        bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600
        text-white
      '
      aria-label='Uvod'
    >
      {/* soft overlay za bolji kontrast teksta */}
      <div className='absolute inset-0 bg-black/10' />

      <div className='relative mx-auto max-w-5xl px-4 py-24 text-center sm:py-28 md:py-32'>
        <h1 className='text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl'>
          {title}
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-lg text-white/90 sm:text-xl'>
          {subtitle}
        </p>

        <div className='mt-8 flex items-center justify-center'>
          <Link
            href={ctaHref}
            className='
              rounded-xl bg-white px-6 py-3 text-base font-semibold text-violet-700
              shadow-sm transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-white/60
            '
          >
            {ctaLabel}
          </Link>
        </div>
      </div>

      {/* dekorativne mrlje (ne utiču na SEO) */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-32 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl'
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-32 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl'
      />
    </section>
  );
}
