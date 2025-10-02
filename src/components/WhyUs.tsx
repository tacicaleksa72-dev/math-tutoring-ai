import { AlarmClock, Target, LineChart } from 'lucide-react';

type Feature = {
  title: string;
  text: string;
  icon: React.ElementType;
  bg: string;
};

const FEATURES: Feature[] = [
  {
    title: 'Individualni pristup',
    text: 'Svaki čas je prilagođen potrebama i tempu učenja vašeg deteta.',
    icon: Target,
    bg: 'bg-rose-50', // svetloružičasta kao na slici
  },
  {
    title: 'Dokazani rezultati',
    text: 'Naši učenici postižu značajno poboljšanje ocena i razumevanja.',
    icon: LineChart,
    bg: 'bg-green-50', // svetlozelena
  },
  {
    title: 'Fleksibilno vreme',
    text: 'Časovi se organizuju u skladu sa vašim rasporedom.',
    icon: AlarmClock,
    bg: 'bg-fuchsia-50', // svetloljubičasta
  },
];

export default function WhyUs() {
  return (
    <section className='mx-auto max-w-6xl px-4 py-16'>
      <div className='mx-auto max-w-3xl text-center'>
        <h2 className='text-3xl font-semibold tracking-tight text-slate-900'>
          Zašto baš mi?
        </h2>
        <p className='mt-4 text-slate-600'>
          Nudimo personalizovane časove matematike koji pomažu učenicima da
          savladaju gradivo i povećaju samopouzdanje u rešavanju matematičkih
          problema.
        </p>
      </div>

      <div className='mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {FEATURES.map(({ title, text, icon: Icon, bg }) => (
          <div
            key={title}
            className={`${bg} rounded-2xl border border-slate-200 p-6 shadow-sm`}
          >
            <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm'>
              <Icon className='h-6 w-6 text-violet-600' />
            </div>
            <h3 className='mt-4 text-lg font-semibold text-slate-900 text-center'>
              {title}
            </h3>
            <p className='mt-2 text-sm text-slate-600 text-center'>{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
