import classNames from 'classnames';
import { PropsWithChildren } from 'react';

interface TableProps {
  head?: string[];
  className?: string;
  children: React.ReactNode;
}

interface RowProps {
  className?: string;
  onClick?: () => void;
}

interface CellProps {
  className?: string;
}

const Table = ({ head, className, children }: TableProps) => {
  return (
    <table
      className={classNames('table-auto border-collapse w-full', className)}
    >
      {head && (
        <thead>
          <tr className="text-center bg-gray-100">
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
      )}

      <tbody className="text-sm divide-y">{children}</tbody>
    </table>
  );
};

Table.Row = ({ className, onClick, children }: PropsWithChildren<RowProps>) => {
  return (
    <tr
      className={classNames(
        'w-full text-center hover:bg-gray-50 transition-colors',
        { 'cursor-pointer': onClick },
        className,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

Table.Cell = ({ className, children }: PropsWithChildren<CellProps>) => {
  return (
    <td
      className={classNames(
        'p-2 first:rounded-l-lg last:rounded-r-lg',
        className,
      )}
    >
      {children}
    </td>
  );
};

export default Table;
