/* eslint-disable react/display-name */
import { type PropsWithChildren } from 'react';

import { cn } from '@utils/string';

import type { StrictPropsWithChildren } from '@type/component';

interface SectionProps extends StrictPropsWithChildren {
  className?: string;
}

interface SectionHeaderProps extends PropsWithChildren {
  title: string;
  description?: string;
}

interface SectionBodyProps extends StrictPropsWithChildren {
  className?: string;
}

const Section = ({ className, children }: SectionProps) => {
  return (
    <div className={cn('rounded-lg border bg-white p-4', className)}>
      {children}
    </div>
  );
};

Section.Header = ({ children, title, description }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-xl font-bold text-black">{title}</h2>
        <p className="text-sm font-semibold text-gray-500">{description}</p>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
};

Section.Body = ({ className, children }: SectionBodyProps) => {
  return <div className={cn('mt-4', className)}>{children}</div>;
};

export default Section;
