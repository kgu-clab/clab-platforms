import React, { type HTMLAttributes } from 'react';

import { cn } from '@clab-platforms/utils';

export interface DetailsListProps extends HTMLAttributes<HTMLUListElement> {
  label?: string;
}

export interface DetailsListItemProps extends HTMLAttributes<HTMLLIElement> {
  label: string;
  labelClassName?: string;
}

const DetailsList = ({
  label,
  className,
  children,
  ...rest
}: DetailsListProps) => {
  return (
    <ul
      className={cn(
        'rounded-lg bg-gray-100 p-4 leading-loose text-black',
        className,
      )}
      {...rest}
    >
      {label && <h2 className="pb-4 text-lg font-semibold">{label}</h2>}
      {children}
    </ul>
  );
};

const DetailsListItem = ({
  label,
  className,
  labelClassName,
  children,
}: DetailsListItemProps) => {
  return (
    <li className={cn('flex items-center justify-between gap-4', className)}>
      <span className={labelClassName}>{label}</span>
      <span className="grow truncate text-right font-semibold">{children}</span>
    </li>
  );
};

DetailsList.displayName = 'DetailsList';
DetailsListItem.displayName = 'DetailsListItem';

DetailsList.Item = DetailsListItem;

export default DetailsList;
