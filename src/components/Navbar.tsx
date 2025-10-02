'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const nav = [
  { href: '/', label: 'Početna' },
  { href: '/osnovna-skola', label: 'Osnovna škola' },
  { href: '/srednja-skola', label: 'Srednja škola' },
  { href: '/tipovi-casova', label: 'Tipovi časova' },
  { href: '/cenovnik', label: 'Cenovnik' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className='sticky top-0 z-40 w-full border-b border-slate-200 bg-white/90 backdrop-blur'>
      <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4'>
        {/* Brand */}
        <Link href='/' className='flex items-center gap-2'>
          <span className='inline-flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600/10'>
            <BookOpen className='h-5 w-5 text-violet-600' />
          </span>
          <span className='text-xl font-semibold tracking-tight text-violet-600'>
            Mala Škola Matematike
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-8 md:flex'>
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'text-sm font-medium text-slate-600 transition hover:text-slate-900',
                  active && 'text-slate-900'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className='hidden md:block'>
          <Link
            href='/zakazivanje'
            className='rounded-xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700'
          >
            Zakaži čas
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className='inline-flex items-center rounded-lg p-2 md:hidden'
          aria-label='Open menu'
        >
          <svg width='24' height='24' fill='none' stroke='currentColor'>
            <path
              d='M4 7h16M4 12h16M4 17h16'
              strokeWidth='2'
              strokeLinecap='round'
            />
          </svg>
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className='border-t border-slate-200 bg-white md:hidden'>
          <div className='mx-auto max-w-6xl px-4 py-3'>
            <nav className='flex flex-col gap-2'>
              {nav.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={clsx(
                      'rounded-lg px-2 py-2 text-slate-700 hover:bg-slate-50',
                      active && 'font-semibold text-slate-900'
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href='/zakazivanje'
                onClick={() => setOpen(false)}
                className='mt-2 rounded-xl bg-violet-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-violet-700'
              >
                Zakaži čas
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
