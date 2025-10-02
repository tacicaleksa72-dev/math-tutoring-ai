import { Check } from 'lucide-react';

export default function About() {
  return (
    <section className='bg-slate-50'>
      <div className='mx-auto max-w-6xl grid gap-12 px-4 py-20 md:grid-cols-2 md:items-center'>
        {/* Left content */}
        <div>
          <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>
            O nama
          </h2>
          <p className='mt-4 text-slate-700'>
            Naš tim čine iskusni profesori matematike sa više od 10 godina
            iskustva u radu sa učenicima svih uzrasta. Specijalizovani smo za
            rad sa učenicima koji imaju poteškoće u savladavanju matematike, kao
            i sa onima koji žele da prošire svoje znanje.
          </p>
          <p className='mt-3 text-slate-700'>
            Koristimo moderne metode nastave i prilagođavamo pristup svakom
            učeniku pojedinačno. Naš cilj je da matematiku učinimo razumljivom i
            zanimljivom.
          </p>

          <ul className='mt-6 space-y-3 text-slate-700'>
            <li className='flex items-start gap-2'>
              <Check className='mt-0.5 h-5 w-5 flex-none text-green-500' />
              <span>Diplomirani profesori matematike</span>
            </li>
            <li className='flex items-start gap-2'>
              <Check className='mt-0.5 h-5 w-5 flex-none text-green-500' />
              <span>Preko 500 zadovoljnih učenika</span>
            </li>
            <li className='flex items-start gap-2'>
              <Check className='mt-0.5 h-5 w-5 flex-none text-green-500' />
              <span>Individualni pristup svakom učeniku</span>
            </li>
          </ul>
        </div>

        {/* Right card */}
        <div className='rounded-2xl bg-white p-8 shadow-sm'>
          <div className='flex flex-col items-center text-center'>
            {/* emoji ikonica kao slika */}
            <span className='text-6xl' role='img' aria-label='profesor'>
              👨‍🏫
            </span>
            <h3 className='mt-4 text-xl font-semibold text-slate-900'>
              Aleksa Tačić
            </h3>
            <p className='text-sm text-slate-600'>Glavni profesor matematike</p>
            <p className='mt-2 text-sm text-slate-500'>
              Matematički fakultet, Univerzitet u Beogradu
              <br />
              12 godina iskustva u nastavi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
