import { PropsWithChildren } from 'react';

export interface DetailsListProps extends PropsWithChildren {
  title?: string;
}

export interface DetailsListItemProps {
  label: string;
  children: React.ReactNode;
}
