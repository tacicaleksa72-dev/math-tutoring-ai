import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Mala Škola Matematike',
  description: 'Kvalitetni privatni časovi matematike za sve uzraste.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='sr'>
      <body className='min-h-screen bg-white text-slate-900 antialiased'>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
