import { cn } from '@clab-platforms/utils';

interface ReactionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  countNumber?: string;
}
const ReactionButton = ({
  onClick,
  className,
  countNumber,
  children,
}: ReactionButtonProps) => {
  return (
    <button onClick={onClick} className={cn('p-1', className)}>
      {children}
      <p className="text-gray-600">{countNumber ? countNumber : 0}</p>
    </button>
  );
};

export default ReactionButton;
