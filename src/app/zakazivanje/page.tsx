import { BRAND, SITE_URL } from '@/lib/site';
import BookingForm from '@/components/BookingForm';

export const metadata = {
  title: `Zakazivanje časova | ${BRAND}`,
  description:
    'Popunite formu i zakažite čas matematike. Brzo i jednostavno prijavljivanje za individualne i grupne časove, sa povratnim kontaktom u najkraćem roku.',
};

function SchemaService() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Private Tutoring - Mathematics',
    provider: {
      '@type': 'LocalBusiness',
      name: BRAND,
      url: SITE_URL,
      areaServed: 'Serbia',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'RS',
        addressLocality: 'Beograd',
      },
      telephone: '+381601234567',
    },
    url: `${SITE_URL}/zakazivanje`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'RSD',
      price: '1500',
      description: 'Individualni čas - 60 minuta',
    },
  };
  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function ZakazivanjePage() {
  return (
    <main className='mx-auto max-w-3xl px-4 py-16'>
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
          Zakazivanje časova
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
          Popunite formu i kontaktiraćemo vas u najkraćem roku
        </p>
      </div>

      <BookingForm />

      <SchemaService />
    </main>
  );
}
