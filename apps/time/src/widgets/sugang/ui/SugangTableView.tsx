import React from 'react';

import { dummyData } from '@/widgets/sugang/data';
import { TABLE_HEADERS } from '@/widgets/sugang/model';
import { TableData, TableNameKey } from '@/widgets/sugang/types';

export default function SugangTableView({
  tableName,
}: {
  tableName: TableNameKey;
}) {
  return (
    <div className="size-full text-sm ">
      <SugangTableTitle tableName={tableName} />
      <div
        className={`w-full border-t-2 border-black/70 bg-gray-100 ${tableName !== 'registrationList' ? 'h-80' : ''}`}
      >
        <DynamicTable tableName={tableName} />
      </div>
    </div>
  );
}

function SugangTableTitle({ tableName }: { tableName: TableNameKey }) {
  const tableTitle =
    tableName === 'wishList'
      ? '소망가방'
      : tableName === 'registrationList'
        ? '수강신청'
        : '';

  return (
    <div className="mb-2 w-full justify-between">
      <span className="bg-lime-200">🔵 {`${tableTitle} List`}</span>
    </div>
  );
}

function DynamicTable<T extends TableNameKey>({ tableName }: { tableName: T }) {
  const headers = TABLE_HEADERS[tableName];
  const data =
    tableName === 'lectureList'
      ? (dummyData[tableName] as string[])
      : (dummyData[tableName] as Array<TableData<typeof tableName>>);

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
