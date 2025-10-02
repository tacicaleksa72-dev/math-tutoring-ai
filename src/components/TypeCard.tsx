import { Check, User, Users } from 'lucide-react';

type TypeCardProps = {
  variant: 'individualni' | 'grupni';
  title: string;
  points: string[];
  ideal: string;
};

const STYLES = {
  individualni: {
    wrapper: 'bg-blue-50',
    dot: 'bg-blue-500',
    icon: User,
    iconBg: 'bg-white',
    iconColor: 'text-violet-700',
    idealBg: 'bg-blue-100/60',
  },
  grupni: {
    wrapper: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    icon: Users,
    iconBg: 'bg-white',
    iconColor: 'text-violet-700',
    idealBg: 'bg-emerald-100/60',
  },
};

export default function TypeCard({
  variant,
  title,
  points,
  ideal,
}: TypeCardProps) {
  const S = STYLES[variant];
  const Icon = S.icon;

  return (
    <div className={`${S.wrapper} rounded-2xl border border-slate-200 p-8`}>
      <div className='flex justify-center'>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${S.iconBg} shadow-sm`}
        >
          <Icon className={`h-7 w-7 ${S.iconColor}`} />
        </div>
      </div>

      <h3 className='mt-4 text-center text-2xl font-semibold text-slate-900'>
        {title}
      </h3>

      <ul className='mt-6 space-y-3 text-slate-700'>
        {points.map((p) => (
          <li key={p} className='flex gap-2'>
            <Check className='mt-0.5 h-5 w-5 flex-none text-green-600' />
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div
        className={`${S.idealBg} mt-6 rounded-xl p-4 text-sm text-slate-700`}
      >
        <span className='block font-medium mb-1'>Idealno za:</span>
        <p>{ideal}</p>
      </div>
    </div>
  );
}
