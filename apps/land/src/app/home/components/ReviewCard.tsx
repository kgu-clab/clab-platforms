import { cn } from '@clab-platforms/utils';

interface ReviewCardProps {
  description: string;
  writer: string;
  meta: string;
  id: number;
  isVisible: boolean;
  color: string;
}

export default function ReviewCard({
  description,
  writer,
  meta,
  id,
  isVisible,
  color,
}: ReviewCardProps) {
  return (
    <div
      id={`review-card-${id}`}
      className={`review-card flex flex-col transition-all duration-300 ${
        isVisible ? 'translate-y-0 scale-110' : 'translate-y-18 scale-100'
      }`}
    >
      <p
        className={cn(
          'mb-4 font-bold',
          id % 2 === 0 ? 'text-right' : 'text-left',
        )}
      >
        {writer[0]}** | {meta}
      </p>
      <p
        className={cn(
          'rounded-t-xl bg-white p-6 text-black transition-all duration-300 ',
          id % 2 === 0 ? 'rounded-l-xl' : 'rounded-r-xl',
          isVisible && color,
          isVisible && 'font-bold',
        )}
      >
        {description}
      </p>
    </div>
  );
}
