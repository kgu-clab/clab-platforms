'use client';

import { useEffect, useState } from 'react';

import { Spinner } from '@clab-platforms/design-system';

import PageLayout from '@/app/PageLayout';
import type { RecruitmentDetailItem } from '@/types';
import { notFound, useParams } from 'next/navigation';

import { useRecruitmentDetail } from '../hooks';
import { DetailSection } from './sections';

export default function Recruitment() {
  const { id } = useParams();
  const { data, isError, isLoading } = useRecruitmentDetail(Number(id));

  const [detailData, setDetailData] = useState<RecruitmentDetailItem | null>(
    null,
  );

  useEffect(() => {
    if (!isLoading) {
      if (isError || !data?.data) {
        notFound();
      } else {
        setDetailData(data?.data);
      }
    }
  }, [isError, data, isLoading]);

  return (
    <PageLayout
      nav
      footer
      className="flex min-h-screen flex-col overflow-hidden"
    >
      {detailData ? (
        <DetailSection detailData={detailData} />
      ) : (
        <>
          <Spinner size="lg" />
        </>
      )}
    </PageLayout>
  );
}
