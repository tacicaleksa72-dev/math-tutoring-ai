import Link from 'next/link';
import ProgramCard from '@/components/ProgramCard';

import { BRAND } from '@/lib/site';

export const metadata = {
  title: `Programi za osnovnu školu | ${BRAND}`,
  description:
    'Programi za 5–8. razred: razlomci, jednačine, geometrija i priprema za završni ispit. Prilagođeni časovi razvijaju znanje i samopouzdanje učenika.',
};

export default function OsnovnaSkolaPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-16'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
          Programi za osnovnu školu
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
          Sveobuhvatni programi prilagođeni uzrastu i potrebama učenika osnovne
          škole
        </p>
      </div>

      {/* Grid 4 kartice */}
      <div className='mt-10 grid gap-6 md:grid-cols-2'>
        <ProgramCard
          grade='5. razred'
          bg='bg-blue-50'
          bullet='text-blue-700'
          items={[
            'Prirodni brojevi i osnovne operacije',
            'Razlomci – sabiranje i oduzimanje',
            'Decimalni brojevi',
            'Osnove geometrije – uglovi i figure',
            'Merenje i jedinice mere',
            'Tekstualni zadaci',
          ]}
        />
        <ProgramCard
          grade='6. razred'
          bg='bg-green-50'
          bullet='text-green-700'
          items={[
            'Razlomci – množenje i deljenje',
            'Procenti i proporcionalnost',
            'Negativni brojevi',
            'Koordinatni sistem',
            'Površina i obim figura',
            'Statistika – čitanje grafika',
          ]}
        />
        <ProgramCard
          grade='7. razred'
          bg='bg-fuchsia-50'
          bullet='text-fuchsia-700'
          items={[
            'Racionalni brojevi',
            'Algebarski izrazi',
            'Linearne jednačine',
            'Srazmernost i funkcije',
            'Trouglovi i četvorouglovi',
            'Konstrukcije u geometriji',
          ]}
        />
        <ProgramCard
          grade='8. razred'
          bg='bg-rose-50'
          bullet='text-rose-700'
          items={[
            'Realni brojevi i kvadratni koren',
            'Pitagorina teorema',
            'Kvadratne jednačine',
            'Sličnost i podudarnost',
            'Krug i njegova svojstva',
            'Priprema za završni ispit',
          ]}
        />
      </div>

      {/* CTA */}
      <div className='mt-10 flex justify-center'>
        <Link
          href='/zakazivanje'
          className='rounded-xl bg-violet-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-violet-700'
        >
          Zakaži čas za osnovnu školu
        </Link>
      </div>
    </main>
  );
}
