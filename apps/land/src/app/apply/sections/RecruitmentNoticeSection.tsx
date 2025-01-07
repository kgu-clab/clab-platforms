'use client';

import { useEffect, useState } from 'react';

import { Table } from '@clab-platforms/design-system';

import { RECRUITMENT_HEAD } from '@/constants';
import type { Recruitment } from '@/types';
import {
  formattedDate,
  toKoreaISOString,
  toKoreanApplicationType,
} from '@/utils';
import { useRouter } from 'next/navigation';

import { useRecruitment } from '../hooks';

export default function RecruitmentNoticeSection() {
  const router = useRouter();
  const { data, isError } = useRecruitment();
  const [tableData, setTableData] = useState<Array<Recruitment>>([]);

  useEffect(() => {
    if (!isError) {
      setTableData(data?.data);
    }
  }, [data, isError]);

  const handleRecruitmentNoticeClick = (id: number) => {
    router.push(`/apply/${id}`);
  };

  return (
    <div className="bg-clab-gray flex h-fit w-screen flex-col items-center justify-center overflow-x-hidden break-keep py-32">
      <p className="mb-4 text-4xl font-bold">모집 공고</p>
      <p className="text-clab-dark-yellow mb-8 text-2xl font-bold">
        최근 5개의 모집 공고을 확인할 수 있어요.
      </p>
      <div className="w-full px-8 text-black md:px-20">
        <Table head={RECRUITMENT_HEAD}>
          {tableData?.length ? (
            tableData.map(
              ({
                id,
                startDate,
                endDate,
                applicationType,
                target,
              }: Recruitment) => (
                <Table.Row
                  key={id}
                  onClick={() => handleRecruitmentNoticeClick(id)}
                  className="hover:bg-clab-yellow-gray text-white hover:cursor-pointer"
                >
                  <Table.Cell>C-Lab Core Team 3기 모집</Table.Cell>
                  <Table.Cell>
                    {formattedDate(toKoreaISOString(startDate))} ~{' '}
                    {formattedDate(toKoreaISOString(endDate))}
                  </Table.Cell>
                  <Table.Cell>
                    {toKoreanApplicationType(applicationType)}
                  </Table.Cell>
                  <Table.Cell>{target}</Table.Cell>
                </Table.Row>
              ),
            )
          ) : (
            <Table.Row className="hover:bg-clab-yellow-gray text-white">
              <Table.Cell colSpan={4}>
                확인 가능한 이전 모집 공고가 없어요
              </Table.Cell>
            </Table.Row>
          )}
        </Table>
      </div>
    </div>
  );
}
