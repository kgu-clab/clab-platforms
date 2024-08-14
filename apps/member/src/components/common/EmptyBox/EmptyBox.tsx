import { cn } from '@clab-platforms/utils';

import { StrictPropsWithChildren } from '@type/component';

interface Props extends StrictPropsWithChildren {
  className?: string;
}

const EmptyBox = ({ className, children }: Props) => {
  return (
    <p className={cn('h-w-full text-center text-gray-500', className)}>
      {children}
    </p>
  );
};

export default EmptyBox;
