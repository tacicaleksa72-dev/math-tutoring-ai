import Link from 'next/link';
import ProgramCard from '@/components/ProgramCard';
import { BRAND } from '@/lib/site';

export const metadata = {
  title: `Programi za srednju školu | ${BRAND}`,
  description:
    'Časovi za 1–4. godinu: trigonometrija, izvodi, integrali i priprema za prijemne. Individualni pristup pomaže učenicima da savladaju kompleksno gradivo.',
};

export default function SrednjaSkolaPage() {
  return (
    <main className='mx-auto max-w-6xl px-4 py-16'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-3xl md:text-4xl font-semibold tracking-tight text-slate-900'>
          Programi za srednju školu
        </h1>
        <p className='mx-auto mt-3 max-w-2xl text-slate-600'>
          Napredni programi za sve tipove srednjih škola i pripremu za fakultet
        </p>
      </div>

      {/* Grid 4 kartice */}
      <div className='mt-10 grid gap-6 md:grid-cols-2'>
        <ProgramCard
          grade='1. godina'
          bg='bg-indigo-50'
          bullet='text-indigo-700'
          items={[
            'Skupovi i logika',
            'Funkcije i njihova svojstva',
            'Linearne i kvadratne funkcije',
            'Sistemi linearnih jednačina',
            'Planimetrija – trouglovi i četvorouglovi',
            'Vektori u ravni',
          ]}
        />
        <ProgramCard
          grade='2. godina'
          bg='bg-emerald-50'
          bullet='text-emerald-700'
          items={[
            'Trigonometrija – uglovi i funkcije',
            'Trigonometrijske jednačine',
            'Eksponencijalne funkcije',
            'Logaritamske funkcije',
            'Stereometrija – osnove',
            'Analitička geometrija u ravni',
          ]}
        />
        <ProgramCard
          grade='3. godina'
          bg='bg-amber-50'
          bullet='text-amber-700'
          items={[
            'Granična vrednost funkcije',
            'Izvod funkcije',
            'Primena izvoda',
            'Integral funkcije',
            'Stereometrija – tela i površine',
            'Kombinatorika',
          ]}
        />
        <ProgramCard
          grade='4. godina'
          bg='bg-rose-50'
          bullet='text-rose-700'
          items={[
            'Verovatnoća',
            'Statistika i analiza podataka',
            'Kompleksni brojevi',
            'Matrice i determinante',
            'Priprema za maturski ispit',
            'Priprema za prijemni ispit',
          ]}
        />
      </div>

      {/* CTA */}
      <div className='mt-10 flex justify-center'>
        <Link
          href='/zakazivanje'
          className='rounded-xl bg-violet-600 px-6 py-3 text-white font-semibold shadow-sm hover:bg-violet-700'
        >
          Zakaži čas za srednju školu
        </Link>
      </div>
    </main>
  );
}
