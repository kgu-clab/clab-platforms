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
    <button
      className={cn(
        'flex items-center gap-2 rounded-full border px-3 hover:bg-blue-200 hover:bg-opacity-20',
        className,
      )}
      {...props}
    >
      {children}
      <p className="font-medium">{countNumber ?? 0}</p>
    </button>
  );
};

export default ReactionButton;
