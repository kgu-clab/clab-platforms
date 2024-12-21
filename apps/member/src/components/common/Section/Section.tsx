import { type PropsWithChildren, useId } from 'react';

import { cn } from '@clab-platforms/utils';

import type { StrictPropsWithChildren } from '@type/component';

interface SectionProps extends StrictPropsWithChildren {
  className?: string;
}

interface SectionHeaderProps extends PropsWithChildren {
  title: string;
  description?: string;
  className?: string;
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

const Header = ({
  children,
  title,
  description,
  className,
}: SectionHeaderProps) => {
  const id = useId();

  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 id={id} className={cn('text-xl font-bold text-black', className)}>
          {title}
        </h2>
        <p className="text-sm font-semibold text-gray-500">{description}</p>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  );
};

const Body = ({ className, children }: SectionBodyProps) => {
  return <div className={cn('mt-4', className)}>{children}</div>;
};

Section.displayName = 'Section';
Header.displayName = 'SectionHeader';
Body.displayName = 'SectionBody';

Section.Header = Header;
Section.Body = Body;

export default Section;
