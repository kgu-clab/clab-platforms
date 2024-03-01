import classNames from 'classnames';

interface SectionProps {
  children: React.ReactNode;
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

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

Section.Header = ({ title, children }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-xl font-bold leading-loose text-black">{title}</p>
      <div>{children}</div>
    </div>
  );
};

interface SectionBodyProps {
  className?: string;
  children: React.ReactNode;
}

Section.Body = ({ className, children }: SectionBodyProps) => {
  return <div className={classNames('mt-4', className)}>{children}</div>;
};

export default Section;
