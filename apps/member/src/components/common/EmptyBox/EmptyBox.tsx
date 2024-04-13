import { cn } from '@utils/string';

import { StrictPropsWithChildren } from '@type/component';

interface EmptyBoxProps extends StrictPropsWithChildren {
  className?: string;
}

const EmptyBox = ({ className, children }: EmptyBoxProps) => {
  return (
    <p className={cn('h-w-full text-center text-gray-500', className)}>
      {children}
    </p>
  );
};

export default EmptyBox;
