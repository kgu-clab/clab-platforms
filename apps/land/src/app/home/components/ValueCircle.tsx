import { cn } from '@clab-platforms/utils';

interface ValueCircleProps {
  keyword: string;
  description: string;
  className?: string;
  flipped: boolean;
}

export default function ValueCircle({
  keyword,
  description,
  className,
  flipped = false,
}: ValueCircleProps) {
  return (
    <div
      className={cn(
        'shadow-clab-blue flex h-72 w-72 flex-col items-center justify-center whitespace-pre-wrap rounded-full text-center shadow-xl',
        flipped ? 'bg-clab-blue shadow-none' : 'bg-none',
        className,
      )}
    >
      <p className="text-clab-light-blue text-3xl font-bold">{keyword}</p>
      {flipped && <p className="p-6">{description}</p>}
    </div>
  );
}
