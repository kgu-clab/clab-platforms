import React from 'react';
import type {
  DetailsListItemProps,
  DetailsListProps,
} from './DetailsList.types';

const DetailsList = ({ title, children }: DetailsListProps) => {
  return (
    <ul className="p-4 leading-loose text-black bg-gray-100 rounded-lg">
      {title && <h2 className="pb-4 text-lg font-semibold">{title}</h2>}
      {children}
    </ul>
  );
};

const DetailsListItem = ({ label, children }: DetailsListItemProps) => {
  return (
    <li className="flex items-center justify-between gap-4">
      <span>{label}</span>
      <span className="font-semibold text-right truncate grow">{children}</span>
    </li>
  );
};

DetailsList.Item = DetailsListItem;

DetailsList.displayName = 'DetailsList';

export default DetailsList;
