import Link from 'next/link';
import { BookOpen, PhoneCall, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className='mt-24 border-t border-slate-800 bg-slate-900 text-slate-300'>
      <div className='mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4'>
        {/* Brand + tagline */}
        <div className='space-y-3'>
          <div className='flex items-center gap-2'>
            <span className='inline-flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15'>
              <BookOpen className='h-5 w-5 text-violet-400' />
            </span>
            <span className='text-lg font-semibold text-white'>
              Mala Škola Matematike
            </span>
          </div>
          <p className='text-sm text-slate-400'>
            Kvalitetni privatni časovi matematike za sve uzraste.
          </p>
        </div>

        {/* Programi */}
        <div>
          <h4 className='mb-3 text-sm font-semibold text-white'>Programi</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/osnovna-skola' className='hover:text-white'>
                Osnovna škola
              </Link>
            </li>
            <li>
              <Link href='/srednja-skola' className='hover:text-white'>
                Srednja škola
              </Link>
            </li>
            <li>
              <Link href='/tipovi-casova' className='hover:text-white'>
                Tipovi časova
              </Link>
            </li>
          </ul>
        </div>

        {/* Informacije */}
        <div>
          <h4 className='mb-3 text-sm font-semibold text-white'>Informacije</h4>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link href='/cenovnik' className='hover:text-white'>
                Cenovnik
              </Link>
            </li>
            <li>
              <Link href='/zakazivanje' className='hover:text-white'>
                Zakazivanje
              </Link>
            </li>
            <li>
              <Link href='/o-nama' className='hover:text-white'>
                O nama
              </Link>
            </li>
          </ul>
        </div>

        {/* Kontakt */}
        <div>
          <h4 className='mb-3 text-sm font-semibold text-white'>Kontakt</h4>
          <ul className='space-y-3 text-sm'>
            <li className='flex items-center gap-2'>
              <PhoneCall className='h-4 w-4 text-pink-400' />
              <a href='tel:+381601234567' className='hover:text-white'>
                +381 60 123 4567
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <Mail className='h-4 w-4 text-pink-400' />
              <a href='mailto:info@mathtutor.rs' className='hover:text-white'>
                info@mathtutor.rs
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <MapPin className='h-4 w-4 text-pink-400' />
              <span>Beograd, Novi Sad</span>
            </li>
          </ul>
        </div>
      </div>

      <div className='border-t border-slate-800'>
        <div className='mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-xs text-slate-500'>
          <span>© {new Date().getFullYear()} Mala Škola Matematike</span>
          <span>
            <Link href='/politika-privatnosti' className='hover:text-slate-300'>
              Politika privatnosti
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
