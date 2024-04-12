import React from 'react';

import { twMerge } from 'tailwind-merge';

import { CellProps, RowProps, TableProps } from './Table.types';

const Table = ({ head, className, children, ...rest }: TableProps) => {
  return (
    <table
      className={twMerge('w-full table-auto border-collapse', className)}
      {...rest}
    >
      {head && (
        <thead>
          <tr className="bg-gray-100 text-center">
            {head.map((item, index) => (
              <th
                key={index}
                className="text-nowrap p-2 first:rounded-l-lg last:rounded-r-lg"
              >
                {item}
              </th>
            ))}
          </tr>
        </thead>
      )}

      <tbody className="divide-y text-sm">{children}</tbody>
    </table>
  );
};

const Row = ({ className, onClick, children, ...rest }: RowProps) => {
  return (
    <tr
      className={twMerge(
        'w-full text-center transition-colors hover:bg-gray-50',
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
