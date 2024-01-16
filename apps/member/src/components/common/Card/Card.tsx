import classNames from 'classnames';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ className, children }: CardProps) => {
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

interface CardHeaderProps {
  title: string;
  children?: React.ReactNode;
}

Card.Header = ({ title, children }: CardHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <p className="text-xl font-bold text-black">{title}</p>
      <div>{children}</div>
    </div>
  );
};

interface CardBodyProps {
  className?: string;
  children: React.ReactNode;
}

Card.Body = ({ className, children }: CardBodyProps) => {
  return <div className={classNames('mt-4', className)}>{children}</div>;
};

export default Card;
