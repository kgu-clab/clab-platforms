import { cn } from '@clab-platforms/utils';

interface ReactionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  countNumber?: number;
}
const ReactionButton = ({
  countNumber,
  children,
  className,
  ...props
}: ReactionButtonProps) => {
  return (
    <button className={cn('p-1', className)} {...props}>
      {children}
      <p className="font-semibold text-gray-600">{countNumber ?? 0}</p>
    </button>
  );
};

export default ReactionButton;
