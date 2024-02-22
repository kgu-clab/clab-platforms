import classNames from 'classnames';
import { PropsWithChildren } from 'react';

interface TableProps {
  head: string[];
  className?: string;
  children: React.ReactNode;
}

interface RowProps {
  className?: string;
  onClick?: () => void;
}

const Table = ({ head, className, children }: TableProps) => {
  return (
    <table className={classNames('table-auto', className)}>
      <thead>
        <tr className="bg-gray-100 text-center">
          {head.map((item, index) => (
            <th
              key={index}
              className="py-2 first:rounded-l-lg last:rounded-r-lg"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm divide-y">{children}</tbody>
    </table>
  );
};

Table.Row = ({ className, onClick, children }: PropsWithChildren<RowProps>) => {
  return (
    <tr
      className={classNames(
        'items-center text-center hover:bg-gray-100',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

export default Table;
