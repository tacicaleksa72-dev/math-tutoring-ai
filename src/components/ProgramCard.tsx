type ProgramCardProps = {
  grade: string; // npr. "5. razred"
  items: string[]; // tačke liste
  bg?: string; // Tailwind bg za pastel pozadinu
  bullet?: string; // Tailwind boja za bullets/tekst
};

export default function ProgramCard({
  grade,
  items,
  bg = 'bg-slate-50',
  bullet = 'text-slate-700',
}: ProgramCardProps) {
  return (
    <div className={`${bg} rounded-2xl border border-slate-200 p-6`}>
      <h3 className='text-xl font-semibold text-slate-900'>{grade}</h3>
      <ul className='mt-4 space-y-2 text-sm'>
        {items.map((t) => (
          <li key={t} className='flex gap-2 leading-6'>
            <span
              className={`mt-2 h-1.5 w-1.5 flex-none rounded-full ${bullet.replace(
                'text-',
                'bg-'
              )}`}
            />
            <span className={`${bullet}`}>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
