'use client';

import { useState } from 'react';

import { Spinner } from '@clab-platforms/design-system';

import { Section } from '@/components';

import { useRecentRecruitment } from '../../hooks';
import {
  CheckResultForm,
  HelpQuestion,
  SelectApplicationType,
} from '../components';

export default function ApplyCheckSection() {
  const { data, isError, isLoading } = useRecentRecruitment();
  const [recruitmentId, setRecruitmentId] = useState(0);

  const handleRecruitButtonClick = (id: number) => {
    setRecruitmentId(id);
  };

  if (isLoading) {
    return (
      <>
        <Spinner size="lg" />
      </>
    );
  }

  return (
    <Section className="border-clab-light-gray h-3/4 w-fit items-center space-y-4 border p-16">
      <SelectApplicationType
        isError={isError}
        applicationTypeData={data?.data}
        handleRecruitButtonClick={handleRecruitButtonClick}
        recruitmentId={recruitmentId}
      />
      {recruitmentId !== 0 && <CheckResultForm recruitmentId={recruitmentId} />}
      <HelpQuestion />
    </Section>
  );
}
