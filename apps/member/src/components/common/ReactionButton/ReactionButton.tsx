import { cn } from '@clab-platforms/utils';

interface ReactionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  countNumber?: number;
  isPending?: boolean;
}
const ReactionButton = ({
  onClick,
  className,
  countNumber,
  children,
  isPending,
}: ReactionButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn('p-1', className)}
      disabled={isPending}
    >
      {children}
      <p className="font-semibold text-gray-600">
        {countNumber ? countNumber : 0}
      </p>
    </button>
  );
};

export default ReactionButton;
