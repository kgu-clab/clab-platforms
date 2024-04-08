import classNames from 'classnames';
import { type PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  className?: string;
}

interface SectionHeaderProps extends PropsWithChildren {
  title: string;
  description?: string;
}

interface SectionBodyProps extends PropsWithChildren {
  className?: string;
}

const Section = ({ className, children }: SectionProps) => {
  return (
    <div
      className={classNames(
        'flex flex-col rounded-lg border bg-white p-4',
        className,
      )}
    >
      {children}
    </div>
  );
};

Section.Header = ({ children, title, description }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-bold leading-loose text-black">{title}</p>
      <div className="flex items-center">
        <p className="text-sm font-semibold text-gray-500">{description}</p>
        {children}
      </div>
    </div>
  );
};

Section.Body = ({ className, children }: SectionBodyProps) => {
  return <div className={classNames('mt-4', className)}>{children}</div>;
};

export default Section;
