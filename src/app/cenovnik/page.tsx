import PricingCard from '@/components/PricingCard';
import { BRAND } from '@/lib/site';

export const metadata = {
  title: `Cenovnik | ${BRAND}`,
  description:
    'Pogledajte cene individualnih i grupnih časova matematike. Jasno prikazane opcije, popusti za pakete i fleksibilni modeli plaćanja za sve učenike.',
};

export default function CenovnikPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-16'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
          Cenovnik
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
          Transparentne cene bez skrivenih troškova
        </p>
      </div>

      {/* Grid: dve pricing kartice */}
      <div className='mt-10 grid gap-6 md:grid-cols-2'>
        <PricingCard
          title='Individualni časovi'
          price='1.500 RSD'
          note='po času (60 minuta)'
          features={[
            'Potpuno personalizovan pristup',
            'Fleksibilno vreme',
            'Maksimalna pažnja profesora',
            'Prilagođeni materijali',
          ]}
          boxNoteTitle='Paketi sa popustom:'
          boxLines={[
            '4 časa: 5.400 RSD (10% popust)',
            '8 časova: 10.200 RSD (15% popust)',
          ]}
          ctaHref='/zakazivanje'
          ctaLabel='Zakaži individualni čas'
          accent='blue'
        />

        <PricingCard
          title='Grupni časovi'
          price='800 RSD'
          note='po učeniku, po času (60 minuta)'
          features={[
            'Grupe od 2–4 učenika',
            'Interaktivno učenje',
            'Ekonomičniji pristup',
            'Motivacija kroz saradnju',
          ]}
          boxNoteTitle='Mesečni paketi:'
          boxLines={[
            '4 časa: 2.880 RSD (10% popust)',
            '8 časova: 5.440 RSD (15% popust)',
          ]}
          ctaHref='/zakazivanje'
          ctaLabel='Zakaži grupni čas'
          accent='green'
        />
      </div>

      {/* Dodatne informacije */}
      <section className='mt-10 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm'>
        <h2 className='text-center text-xl font-semibold text-slate-900'>
          Dodatne informacije
        </h2>

        <div className='mt-6 grid gap-8 md:grid-cols-2'>
          <div>
            <h3 className='text-sm font-semibold text-slate-700'>
              Uslovi plaćanja:
            </h3>
            <ul className='mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700'>
              <li>Plaćanje unapred za pojedinačne časove</li>
              <li>Paketi se plaćaju unapred sa popustom</li>
              <li>Mogućnost plaćanja na rate za veće pakete</li>
              <li>Prihvatamo gotovinu i kartice</li>
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-slate-700'>
              Otkazivanje časova:
            </h3>
            <ul className='mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700'>
              <li>Besplatno otkazivanje 24h unapred</li>
              <li>Mogućnost prebacivanja časa</li>
              <li>Povraćaj sredstava za neodržane časove</li>
              <li>Fleksibilnost u slučaju bolesti</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
