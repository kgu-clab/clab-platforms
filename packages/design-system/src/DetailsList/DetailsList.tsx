import React from 'react';

import type {
  DetailsListItemProps,
  DetailsListProps,
} from './DetailsList.types';

const DetailsList = ({ title, children }: DetailsListProps) => {
  return (
    <ul className="rounded-lg bg-gray-100 p-4 leading-loose text-black">
      {title && <h2 className="pb-4 text-lg font-semibold">{title}</h2>}
      {children}
    </ul>
  );
};

const DetailsListItem = ({ label, children }: DetailsListItemProps) => {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="grow truncate text-right font-semibold">{children}</span>
    </li>
  );
};

DetailsList.Item = DetailsListItem;

DetailsList.displayName = 'DetailsList';

export default DetailsList;
