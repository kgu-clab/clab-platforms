import { useState } from 'react';

import { Button, Grid, Input } from '@clab-platforms/design-system';

import { Section } from '@components/common/Section';
import Select from '@components/common/Select/Select';
import Textarea from '@components/common/Textarea/Textarea';

import { ERROR_MESSAGE } from '@constants/message';
import { SELECT_OPTIONS } from '@constants/select';
import {
  ACTIVITY_JOB_DESCRIPTION_MAX_LENGTH,
  APPLICATION_PROCESS_TIMELINE_MAX_LENGTH,
  APPLICATION_TEAM_INTRODUCTION_MAX_LENGTH,
  APPLICATION_TITLE_MAX_LENGTH,
  APPLICATION_TYPE,
} from '@constants/state';
import useToast from '@hooks/common/useToast';

import { Recruitment } from '@type/application';

import { useRecruitmentCreateMutation } from '../hooks';

export function RecruitmentCreateSection() {
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [inputs, setInputs] = useState<Recruitment>({
    title: '',
    applicationType: APPLICATION_TYPE.NORMAL,
    teamIntroduction: '',
    processTimeline: '',
    jobDescription: '',
    target: '',
    startDate: '',
    endDate: '',
  });
  const {
    mutate: recruitmentCreateMutate,
    isPending: recruitmentCreateIsPending,
  } = useRecruitmentCreateMutation();

  const {
    title,
    applicationType,
    teamIntroduction,
    processTimeline,
    jobDescription,
    target,
    startDate,
    endDate,
  } = inputs;

  const handleInputsChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateButtonClick = () => {
    if (
      !title ||
      !applicationType ||
      !teamIntroduction ||
      !processTimeline ||
      !jobDescription ||
      !target ||
      !startDate ||
      !endDate
    ) {
      return toast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }

    recruitmentCreateMutate(inputs);
  };

  return (
    <Section>
      <Section.Header
        title="모집 공고 생성"
        description="지원자 모집을 위한 모집 공고를 생성해요."
      />
      <Section.Body className="space-y-4">
        {isOpen && (
          <>
            <Input
              label="모집 공고명"
              id="title"
              name="title"
              placeholder="모집 공고명을 입력해주세요. ex) 2025년도 C-Lab 동아리원 모집"
              value={title}
              onChange={handleInputsChange}
              maxLength={APPLICATION_TITLE_MAX_LENGTH}
            />
            <Grid gap="md" col="2">
              <Select
                label="분야"
                options={SELECT_OPTIONS.APPLICATION_TYPE}
                value={applicationType}
                name="applicationType"
                onChange={handleInputsChange}
              />
              <Input
                label="모집 대상"
                id="target"
                name="target"
                placeholder="모집 대상을 작성해주세요. ex) 1~2학년"
                value={target}
                onChange={handleInputsChange}
              />
            </Grid>
            <Textarea
              label="소개"
              id="teamIntroduction"
              name="teamIntroduction"
              placeholder="모집 공고에 대한 설명을 작성해주세요. ex) C-Lab 소개글"
              maxLength={APPLICATION_TEAM_INTRODUCTION_MAX_LENGTH}
              value={teamIntroduction}
              onChange={handleInputsChange}
            />
            <Textarea
              label="모집 일정"
              id="processTimeline"
              name="processTimeline"
              placeholder="모집 일정에 대한 상세한 설명을 작성해주세요. ex) 모집 단계 별 내용"
              maxLength={APPLICATION_PROCESS_TIMELINE_MAX_LENGTH}
              value={processTimeline}
              onChange={handleInputsChange}
            />
            <Textarea
              label="모집 설명"
              id="jobDescription"
              name="jobDescription"
              placeholder="모집 공고 대상에 대한 설명을 작성해주세요. ex) 지원자에 대한 요구사항"
              maxLength={ACTIVITY_JOB_DESCRIPTION_MAX_LENGTH}
              value={jobDescription}
              onChange={handleInputsChange}
            />
            <Grid gap="md" col="2">
              <Input
                label="시작일"
                type="datetime-local"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={handleInputsChange}
              />
              <Input
                label="마감일"
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleInputsChange}
              />
            </Grid>
            <Button
              color="blue"
              className="w-full"
              onClick={handleCreateButtonClick}
            >
              생성하기
            </Button>
          </>
        )}
        <Button
          disabled={recruitmentCreateIsPending}
          className="w-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '닫기' : '모집 공고 작성하기'}
        </Button>
      </Section.Body>
    </Section>
  );
}
