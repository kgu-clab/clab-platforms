import { cn } from '@clab-platforms/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function Section({ children, className }: SectionProps) {
  return (
    <div
      className={cn(
        'max-w-screen flex h-full min-h-screen w-screen flex-col items-center justify-center overflow-x-hidden',
        className,
      )}
    >
      {children}
    </div>
  );
}
