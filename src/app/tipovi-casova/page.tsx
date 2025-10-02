import Link from 'next/link';
import TypeCard from '@/components/TypeCard';
import { BRAND } from '@/lib/site';

export const metadata = {
  title: `Tipovi časova | ${BRAND}`,
  description:
    'Birajte između individualnih časova sa personalizovanim pristupom i grupnih časova koji podstiču saradnju. Fleksibilna opcija za svakog učenika.',
};

export default function TipoviCasovaPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-16'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
          Tipovi časova
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
          Izaberite tip časova koji najbolje odgovara vašim potrebama
        </p>
      </div>

      {/* Cards */}
      <div className='mt-10 grid gap-6 md:grid-cols-2'>
        <TypeCard
          variant='individualni'
          title='Individualni časovi'
          points={[
            'Potpuno personalizovan pristup',
            'Maksimalna pažnja profesora',
            'Fleksibilno vreme',
            'Brži napredak',
          ]}
          ideal='Učenike koji imaju specifične poteškoće, žele brz napredak ili se pripremaju za važne ispite'
        />

        <TypeCard
          variant='grupni'
          title='Grupni časovi'
          points={[
            'Interaktivno učenje',
            'Ekonomičniji pristup',
            'Motivacija kroz takmičenje',
            'Razvoj socijalnih veština',
          ]}
          ideal='Učenike sličnog nivoa znanja koji žele da uče u društvu vršnjaka (2–4 učenika po grupi)'
        />
      </div>

      {/* CTA buttons */}
      <div className='mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row'>
        <Link
          href='/zakazivanje'
          className='rounded-xl bg-violet-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-violet-700'
        >
          Kontaktirajte nas
        </Link>
        <Link
          href='/cenovnik'
          className='rounded-xl border border-slate-300 px-6 py-3 text-slate-700 font-semibold hover:bg-slate-50'
        >
          Pogledajte cene
        </Link>
      </div>
    </main>
  );
}
