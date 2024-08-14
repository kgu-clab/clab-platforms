'use client';

import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@clab-platforms/utils';

import { StrictPropsWithChildren } from '@/shared/types';
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
          'w-full rounded-lg border bg-white disabled:bg-inherit',
          className,
        )}
        onClick={() => router.push(to)}
        {...rest}
      >
        <div className="flex h-full flex-col break-keep p-4 text-left">
          {children}
        </div>
      </button>
    );
  },
);

const HomeCardHeader = forwardRef<HTMLHeadingElement, StrictPropsWithChildren>(
  ({ children }, ref) => {
    return (
      <h2 ref={ref} className="mb-2 text-xl font-semibold">
        {children}
      </h2>
    );
  },
);

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

const HomeCardIcon = forwardRef<HTMLDivElement, StrictPropsWithChildren>(
  ({ children }, ref) => {
    return (
      <div
        ref={ref}
        className="mt-2 flex h-full flex-col items-end justify-end"
      >
        {children}
      </div>
    );
  },
);

HomeCard.displayName = 'HomeCard';
HomeCardHeader.displayName = 'HomeCardHeader';
HomeCardDescription.displayName = 'HomeCardDescription';
HomeCardIcon.displayName = 'HomeCardIcon';

export { HomeCard, HomeCardHeader, HomeCardDescription, HomeCardIcon };
