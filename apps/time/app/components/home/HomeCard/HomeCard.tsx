'use client';

import { forwardRef, ComponentPropsWithoutRef } from 'react';
import { StrictPropsWithChildren } from '@type/common';
import { cn } from '@utils/component';
import { useRouter } from 'next/navigation';

interface HomeCardProps extends ComponentPropsWithoutRef<'button'> {
  to: string;
}

const HomeCard = forwardRef<HTMLButtonElement, HomeCardProps>(
  ({ to, className, children, ...rest }, ref) => {
    const router = useRouter();

    return (
      <button
        ref={ref}
        className={cn(
          'w-full bg-white border rounded-lg disabled:bg-inherit',
          className,
        )}
        onClick={() => router.push(to)}
        {...rest}
      >
        <div className="flex flex-col h-full p-4 text-left break-keep">
          {children}
        </div>
      </button>
    );
  },
);
HomeCard.displayName = 'HomeCard';

const HomeCardHeader = forwardRef<HTMLHeadingElement, StrictPropsWithChildren>(
  ({ children }, ref) => {
    return (
      <h2 ref={ref} className="mb-2 text-xl font-semibold">
        {children}
      </h2>
    );
  },
);
HomeCardHeader.displayName = 'HomeCardHeader';

const HomeCardDescription = forwardRef<
  HTMLParagraphElement,
  StrictPropsWithChildren
>(({ children }, ref) => {
  return (
    <p ref={ref} className="text-gray-500">
      {children}
    </p>
  );
});
HomeCardDescription.displayName = 'HomeCardDescription';

const HomeCardIcon = forwardRef<HTMLDivElement, StrictPropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="flex flex-col items-end justify-end h-full mt-2"
      >
        {children}
      </div>
    );
  },
);
HomeCardIcon.displayName = 'HomeCardIcon';

export { HomeCard, HomeCardHeader, HomeCardDescription, HomeCardIcon };
