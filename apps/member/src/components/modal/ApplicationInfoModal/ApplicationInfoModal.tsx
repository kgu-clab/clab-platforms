import { DetailsList } from '@clab-platforms/design-system';

import { ApplicationMemberType } from '@type/application';

interface ApplicationInfoModalProps {
  applicationInfo: ApplicationMemberType;
}

const ApplicationInfoModal = ({
  applicationInfo,
}: ApplicationInfoModalProps) => {
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
  } = applicationInfo;

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
      <DetailsList.Item label="Github">{githubUrl || '-'}</DetailsList.Item>
      <p className="mt-8">{otherActivities}</p>
    </DetailsList>
  );
};

export default ApplicationInfoModal;
