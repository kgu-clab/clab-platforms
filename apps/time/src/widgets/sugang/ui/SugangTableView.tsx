import React from 'react';

import { cn } from '@clab-platforms/utils';

import { dummyData } from '@/widgets/sugang/data';
import { TABLE_HEADERS, TABLE_TITLES } from '@/widgets/sugang/model';
import { TableNameKey } from '@/widgets/sugang/types';

interface TableNameProps {
  tableName: TableNameKey;
}

export default function SugangTableView({ tableName }: TableNameProps) {
  return (
    <div className="size-full text-sm ">
      <SugangTableTitle tableName={tableName} />
      <div
        className={cn(
          'w-full border-t-2 border-black/70 bg-gray-100',
          tableName !== 'REGISTRATION_LIST' ? 'h-80' : '',
        )}
      >
        <DynamicTable tableName={tableName} />
      </div>
    </div>
  );
}

function SugangTableTitle({ tableName }: TableNameProps) {
  const tableTitle = TABLE_TITLES[tableName];

  return (
    <div className="mb-2 w-full justify-between">
      <span className="bg-lime-200">🔵 {`${tableTitle} List`}</span>
    </div>
  );
}

function DynamicTable<T extends TableNameKey>({ tableName }: { tableName: T }) {
  const headers = TABLE_HEADERS[tableName];
  const data = dummyData[tableName];

  return (
    <table className="w-full text-center ">
      <thead>
        <tr>
          {headers.map((header) => (
            <th className="border-b-2 border-black/20 p-1" key={header}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index: number) => (
          <tr key={index} className="border">
            {headers.map((header) => (
              <td className="border p-1" key={header}>
                {row[header as keyof typeof row]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
