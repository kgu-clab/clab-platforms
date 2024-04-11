import { ComponentPropsWithRef } from 'react';

export interface TableProps extends ComponentPropsWithRef<'table'> {
  head?: readonly string[];
}

export interface RowProps extends ComponentPropsWithRef<'tr'> {}

export interface CellProps extends ComponentPropsWithRef<'td'> {}
