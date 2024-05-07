import React, { ComponentPropsWithRef } from 'react';

import { cn } from '../utils';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  head?: readonly string[];
}

export interface RowProps extends ComponentPropsWithRef<'tr'> {}

export interface CellProps extends ComponentPropsWithRef<'td'> {}

const Table = ({ head, className, children, ...rest }: TableProps) => {
  return (
    <table
      className={cn('w-full table-auto border-collapse', className)}
      {...rest}
    >
      {head && (
        <thead>
          <tr className="bg-gray-100 text-center">
            {head.map((item) => (
              <th
                key={`table-head-${item}`}
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
      className={cn(
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
      className={cn('p-2 first:rounded-l-lg last:rounded-r-lg', className)}
      {...rest}
    >
      {children}
    </td>
  );
};

Table.displayName = 'Table';
Row.displayName = 'TableRow';
Cell.displayName = 'TableCell';

Table.Row = Row;
Table.Cell = Cell;

export default Table;
