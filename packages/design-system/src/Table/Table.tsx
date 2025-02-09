import React, { type HTMLAttributes, type TableHTMLAttributes } from 'react';

import { cn } from '@clab-platforms/utils';

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  head?: readonly string[];
}

interface RowProps extends HTMLAttributes<HTMLTableRowElement> {}

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
  colSpan?: number;
}

function Table({ head, className, children, ...rest }: TableProps) {
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
}

export function Row({ className, onClick, children, ...rest }: RowProps) {
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
}

export function Cell({ className, children, colSpan, ...rest }: CellProps) {
  return (
    <td
      className={cn('p-2 first:rounded-l-lg last:rounded-r-lg', className)}
      colSpan={colSpan}
      {...rest}
    >
      {children}
    </td>
  );
}

Table.displayName = 'Table';
Row.displayName = 'TableRow';
Cell.displayName = 'TableCell';

Table.Row = Row;
Table.Cell = Cell;

export default Table;
