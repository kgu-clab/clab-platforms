import classNames from 'classnames';
import { PropsWithChildren } from 'react';

interface TableProps {
  head: string[];
  className?: string;
  children: React.ReactNode;
}

interface RowProps {
  className?: string;
}

const Table = ({ head, className, children }: TableProps) => {
  return (
    <table className={classNames('table-auto', className)}>
      <thead>
        <tr className="bg-gray-100">
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

Table.Row = ({ className, children }: PropsWithChildren<RowProps>) => {
  return (
    <tr
      className={classNames(
        'items-center text-center cursor-pointer hover:bg-gray-100',
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default Table;
