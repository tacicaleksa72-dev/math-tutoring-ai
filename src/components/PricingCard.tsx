import { Check } from 'lucide-react';
import Link from 'next/link';

type PricingCardProps = {
  title: string;
  price: string;
  note?: string; // npr. "po času (60 minuta)"
  features: string[];
  accent?: 'blue' | 'green';
  boxNoteTitle?: string; // npr. "Paketi sa popustom:"
  boxLines?: string[]; // npr. ["4 časa: 5.400 RSD (10%)", ...]
  ctaHref: string;
  ctaLabel: string;
};

const accents = {
  blue: {
    ring: 'ring-1 ring-blue-200',
    shadow: 'shadow-[0_8px_24px_rgba(59,130,246,0.12)]',
    title: 'text-slate-900',
    price: 'text-blue-600',
    box: 'bg-blue-50',
    btn: 'bg-blue-600 hover:bg-blue-700',
  },
  green: {
    ring: 'ring-1 ring-emerald-200',
    shadow: 'shadow-[0_8px_24px_rgba(16,185,129,0.12)]',
    title: 'text-slate-900',
    price: 'text-emerald-600',
    box: 'bg-emerald-50',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
  },
};

export default function PricingCard({
  title,
  price,
  note,
  features,
  accent = 'blue',
  boxNoteTitle,
  boxLines,
  ctaHref,
  ctaLabel,
}: PricingCardProps) {
  const A = accents[accent];

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-8 ${A.ring} ${A.shadow}`}
    >
      <h3 className={`text-center text-xl font-semibold ${A.title}`}>
        {title}
      </h3>
      <div className={`mt-2 text-center text-4xl font-extrabold ${A.price}`}>
        {price}
      </div>
      {note && (
        <p className='mt-1 text-center text-sm text-slate-500'>{note}</p>
      )}

      <ul className='mt-6 space-y-3 text-slate-700'>
        {features.map((f) => (
          <li key={f} className='flex gap-2'>
            <Check className='mt-0.5 h-5 w-5 flex-none text-green-600' />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {boxLines && boxLines.length > 0 && (
        <div className={`${A.box} mt-6 rounded-xl p-4 text-sm`}>
          {boxNoteTitle && (
            <div className='mb-2 font-medium'>{boxNoteTitle}</div>
          )}
          <ul className='space-y-1'>
            {boxLines.map((l) => (
              <li key={l} className='flex items-center justify-between'>
                <span>{l.split(' (')[0]}</span>
                <span className='text-slate-500'>
                  ({l.split(' (')[1] ?? ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link
        href={ctaHref}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-white ${A.btn}`}
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
