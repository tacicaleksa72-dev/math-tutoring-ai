'use client';

import { useState } from 'react';

const GRADES = [
  '5. razred',
  '6. razred',
  '7. razred',
  '8. razred',
  '1. godina',
  '2. godina',
  '3. godina',
  '4. godina',
  'Drugo (pripreme, prijemni...)',
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOk(null);
    setErr(null);

    const fd = new FormData(e.currentTarget);
    const form = Object.fromEntries(fd.entries()) as Record<
      string,
      FormDataEntryValue
    >;
    const consentBool = fd.get('consent') === 'on';

    const required = [
      'studentName',
      'parentName',
      'grade',
      'phone',
      'email',
      'type',
    ];
    for (const k of required) {
      if (!form[k]) {
        setErr('Molimo popunite obavezna polja označena *.');
        return;
      }
    }
    if (!consentBool) {
      setErr('Potrebna je saglasnost za obradu podataka.');
      return;
    }

    setLoading(true);
    const res = await fetch('/api/booking/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, consent: consentBool }),
    });
    setLoading(false);

    if (res.ok) {
      setOk('Hvala! Uskoro ćemo vas kontaktirati.');
      (e.target as HTMLFormElement).reset();
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.error || 'Došlo je do greške. Pokušajte ponovo.');
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className='mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5'
    >
      {/* --- tvoja forma ostaje ista kao ranije --- */}
      {/* red 1 */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Ime i prezime učenika *
          </label>
          <input
            name='studentName'
            required
            className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Uzrast/Razred *
          </label>
          <select
            name='grade'
            required
            className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
          >
            <option value=''>Izaberite razred</option>
            {GRADES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* red 2 */}
      <div className='grid gap-4 sm:grid-cols-2'>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Ime i prezime roditelja *
          </label>
          <input
            name='parentName'
            required
            className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
          />
        </div>
        <div>
          <label className='mb-1 block text-sm font-medium text-slate-700'>
            Broj telefona *
          </label>
          <input
            name='phone'
            required
            inputMode='tel'
            className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
          />
        </div>
      </div>

      {/* email */}
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>
          Email adresa *
        </label>
        <input
          name='email'
          type='email'
          required
          className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* tip časa */}
      <fieldset>
        <legend className='mb-2 text-sm font-medium text-slate-700'>
          Tip časa *
        </legend>
        <div className='grid gap-4 sm:grid-cols-2'>
          <label className='flex w-full cursor-pointer items-start gap-3 rounded-xl border border-slate-300 p-4 has-[:checked]:border-violet-500'>
            <input
              type='radio'
              name='type'
              value='Individualni čas'
              className='mt-1'
              required
            />
            <div>
              <div className='font-medium'>Individualni čas</div>
              <div className='text-sm text-slate-500'>1.500 RSD po času</div>
            </div>
          </label>
          <label className='flex w-full cursor-pointer items-start gap-3 rounded-xl border border-slate-300 p-4 has-[:checked]:border-violet-500'>
            <input
              type='radio'
              name='type'
              value='Grupni čas'
              className='mt-1'
            />
            <div>
              <div className='font-medium'>Grupni čas</div>
              <div className='text-sm text-slate-500'>800 RSD po učeniku</div>
            </div>
          </label>
        </div>
      </fieldset>

      {/* oblasti */}
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>
          Oblasti matematike koje treba pokriti
        </label>
        <textarea
          name='topics'
          rows={3}
          placeholder='Npr. razlomci, jednačine, geometrija...'
          className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* vreme */}
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>
          Preferirano vreme časova
        </label>
        <input
          name='timePrefs'
          placeholder='Npr. ponedeljak i sreda u 17h, vikendima...'
          className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* napomene */}
      <div>
        <label className='mb-1 block text-sm font-medium text-slate-700'>
          Dodatne napomene
        </label>
        <textarea
          name='notes'
          rows={3}
          placeholder='Sve što smatrate važnim da znamo...'
          className='w-full rounded-lg border border-slate-300 px-3 py-2 focus:border-violet-500 focus:outline-none'
        />
      </div>

      {/* consent */}
      <label className='flex items-start gap-2 text-sm text-slate-700'>
        <input type='checkbox' name='consent' />
        <span>
          Slažem se da se moji podaci koriste u svrhu kontaktiranja i
          organizovanja časova. Podaci se neće deliti sa trećim licima. *
        </span>
      </label>

      {/* poruke */}
      {ok && (
        <p className='rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700'>
          {ok}
        </p>
      )}
      {err && (
        <p className='rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700'>
          {err}
        </p>
      )}

      <button
        disabled={loading}
        className='inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60'
      >
        {loading ? 'Slanje...' : 'Pošaljite zahtev'}
      </button>
    </form>
  );
}
