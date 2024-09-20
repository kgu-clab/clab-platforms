import { useMemo } from 'react';

import { DetailsList } from '@clab-platforms/design-system';

import { useModal } from '@hooks/common/useModal';

import { ApplicationMemberType } from '@type/application';

interface Options {
  data: ApplicationMemberType;
}

export function useApplicationInoModal() {
  const { open } = useModal();

  return useMemo(
    () => ({
      open: (options: Options) =>
        open({
          title: '지원서',
          content: <ApplicationInfoModal {...options} />,
        }),
    }),
    [open],
  );
}

interface Props extends Options {}

function ApplicationInfoModal({ data }: Props) {
  const {
    studentId,
    name,
    contact,
    email,
    department,
    grade,
    birth,
    address,
    interests,
    otherActivities,
    githubUrl,
  } = data;

  return (
    <DetailsList className="max-h-[540px] overflow-auto">
      <DetailsList.Item label="학번">{studentId}</DetailsList.Item>
      <DetailsList.Item label="이름">{name}</DetailsList.Item>
      <DetailsList.Item label="학과">{department}</DetailsList.Item>
      <DetailsList.Item label="학년">{grade}</DetailsList.Item>
      <DetailsList.Item label="전화번호">{contact}</DetailsList.Item>
      <DetailsList.Item label="이메일">{email}</DetailsList.Item>
      <DetailsList.Item label="생년월일">{birth}</DetailsList.Item>
      <DetailsList.Item label="거주지">{address}</DetailsList.Item>
      <DetailsList.Item label="희망분야">{interests}</DetailsList.Item>
      <DetailsList.Item label="Github">{githubUrl ?? '-'}</DetailsList.Item>
      <p className="mt-8">{otherActivities}</p>
    </DetailsList>
  );
}
