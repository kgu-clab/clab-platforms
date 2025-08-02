import { useState } from 'react';

import { Table } from '@clab-platforms/design-system';

import SupportForm from '@pages/SupportWritePage/components/SupportForm';

import { MemberProfileType } from '@type/member';
import { SupportDetail } from '@type/support';

import SupportAnswerSection from './SupportAnswerSection';
import SupportErrorImage from './SupportErrorImage';
import SupportRowActions from './SupportRowActions';

interface SupportRowContentProps {
  data: SupportDetail;
  myProfile: MemberProfileType;
  onClose?: () => void;
}

const SupportRowContent = ({
  data,
  myProfile,
  onClose,
}: SupportRowContentProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const { title, content, imageUrl, isOwner, id, answer } = data;

  const handleEditToggle = () => setIsEdit((prev) => !prev);
  const isAnswered = data.status === 'COMPLETED';

  if (!data) {
    return (
      <Table.Row className="bg-gray-50">
        <Table.Cell colSpan={5} className="p-0">
          <div className="p-4 text-center text-gray-400">로딩 중...</div>
        </Table.Cell>
      </Table.Row>
    );
  }

  if (isEdit) {
    return (
      <Table.Row className="bg-gray-50">
        <Table.Cell colSpan={5} className="p-0">
          <div className="p-4">
            <SupportForm data={data} onClose={handleEditToggle} />
          </div>
        </Table.Cell>
      </Table.Row>
    );
  }

  return (
    <Table.Row className="bg-gray-50">
      <Table.Cell colSpan={5} className="space-y-4 px-6 py-8 text-left">
        <div className="text-gray-500" title={title}>
          {title}
        </div>
        <div className="whitespace-pre-wrap">{content}</div>

        <div className="flex items-center justify-between">
          <SupportErrorImage imageUrl={imageUrl} />
          <SupportRowActions
            isOwner={isOwner}
            id={id}
            onEdit={handleEditToggle}
            isAnswered={isAnswered}
            onClose={onClose}
          />
        </div>

        <hr />
        <SupportAnswerSection
          supportId={id}
          answerData={answer}
          myProfile={myProfile}
          isAnswered={isAnswered}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default SupportRowContent;
