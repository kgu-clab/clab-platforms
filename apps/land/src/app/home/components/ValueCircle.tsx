import { cn } from '@clab-platforms/utils';

interface ValueCircleProps {
  keyword: string;
  description: string;
  className?: string;
}

export default function ValueCircle({
  keyword,
  description,
  className,
}: ValueCircleProps) {
  return (
    <div className={cn('flip-container', className)}>
      <div className="flip">
        <p className="front text-3xl font-bold">{keyword}</p>
        <p className="back flex flex-col p-6 text-xl">
          <span className="mb-4 text-3xl font-extrabold">{keyword}</span>
          {description}
        </p>
      </div>
    </div>
  );
}
