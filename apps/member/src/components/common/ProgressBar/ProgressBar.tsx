import { cn } from '@clab/utils';

interface ProgressBarProps {
  className?: string;
  value: number;
}

const ProgressBar = ({ className, value }: ProgressBarProps) => {
  const valuePercent = value + '%';
  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div
        style={{ width: valuePercent }}
        className={cn('h-2 rounded-full bg-black', className)}
      ></div>
    </div>
  );
};

export default ProgressBar;
