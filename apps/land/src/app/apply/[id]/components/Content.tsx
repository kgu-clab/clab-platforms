import { cn } from '@clab-platforms/utils';

interface Props {
  title: string;
  detail: string;
  className?: string;
}

export default function Content({ title, detail, className }: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      <p className="text-clab-blue mb-2 text-2xl font-bold">{title}</p>
      <p className="whitespace-pre-wrap text-xl leading-loose">{detail}</p>
    </div>
  );
}
