import React from 'react';
import { CellProps, RowProps, TableProps } from './Table.types';
import { twMerge } from 'tailwind-merge';

const Table = ({ head, className, children, ...rest }: TableProps) => {
  return (
    <table
      className={twMerge('table-auto border-collapse w-full', className)}
      {...rest}
    >
      {head && (
        <thead>
          <tr className="text-center bg-gray-100">
            {head.map((item, index) => (
              <th
                key={index}
                className="p-2 first:rounded-l-lg last:rounded-r-lg text-nowrap"
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

const Row = ({ className, onClick, children, ...rest }: RowProps) => {
  return (
    <tr
      className={twMerge(
        'w-full text-center hover:bg-gray-50 transition-colors',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </tr>
  );
};

const Cell = ({ className, children, ...rest }: CellProps) => {
  return (
    <td
      className={twMerge('p-2 first:rounded-l-lg last:rounded-r-lg', className)}
      {...rest}
    >
      {children}
    </td>
  );
};

Row.displayName = 'TableRow';
Cell.displayName = 'TableCell';

Table.Row = Row;
Table.Cell = Cell;

export default Table;
