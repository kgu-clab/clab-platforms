import { useState } from 'react';

import { Badge, Button, Table } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Image from '@components/common/Image/Image';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import { ROLE_LEVEL, SUPPORT_CATEGORY_STATE } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import { useBoardDeleteMutation, useMyProfile } from '@hooks/queries';
import SupportForm from '@pages/SupportWritePage/components/SupportForm';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { formatMemberName, toKoreaSupportCategory } from '@utils/string';

import { SupportItem } from '@type/support';

import SupportAnswerInput from './SupportAnswerInput';

interface SupportTableRowProps {
  data: SupportItem;
  showAll: boolean;
  currentOpenItemIndex: number;
  onClick(id: number): void;
}

const SupportTableRow = ({
  data,
  showAll,
  currentOpenItemIndex,
  onClick,
}: SupportTableRowProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAnswerEdit, setIsAnswerEdit] = useState(false);

  const { data: myProfile } = useMyProfile();
  const { open } = useModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();

  const {
    id,
    category,
    answer,
    isAnswered,
    answeredAt,
    responder,
    title,
    content,
    imageUrl,
    memberName,
    memberId,
    createdAt,
  } = data;

  const isCurrentItemOpen = currentOpenItemIndex === id;
  const isAdmin = myProfile.roleLevel >= ROLE_LEVEL.ADMIN;
  const isOwner = myProfile.id == memberId;

  const handleEditToggle = () => setIsEdit((prev) => !prev);
  const handleAnswerEditToggle = () => setIsAnswerEdit((prev) => !prev);

  const handleDeleteClick = (id: number) => {
    open({
      title: MODAL_TITLE.DELETE,
      content: MODAL_CONTENT.DELETE,
      accept: {
        text: MODAL_ACCEPT.DELETE,
        onClick: () => boardDeleteMutate(id),
      },
    });
  };

  const handleImageClick = (imageUrl: string) => {
    window.open(imageUrl, '_blank');
  };

  const handleErrorImageModalOpen = (imageUrl: string) => {
    const parsingImageUrl = createImageUrl(imageUrl);
    open({
      title: '오류이미지',
      content: (
        <Image
          src={parsingImageUrl}
          alt="오류이미지"
          onClick={() => handleImageClick(parsingImageUrl)}
        />
      ),
    });
  };

  const renderOwnerActions = () => {
    if (!isOwner) return null;

    return (
      <div className="flex justify-end gap-2 text-blue-600">
        <button
          onClick={handleEditToggle}
          className="cursor-pointer border-none bg-transparent underline"
        >
          수정
        </button>
        <button
          onClick={() => handleDeleteClick(id)}
          className="cursor-pointer border-none bg-transparent underline"
        >
          삭제
        </button>
      </div>
    );
  };

  const renderAnswerSection = () => {
    // 답변 편집 모드인 경우
    if (isAnswerEdit) {
      return (
        <SupportAnswerInput onCancel={handleAnswerEditToggle} data={answer!} />
      );
    }

    // 답변 편집 모드가 아니고, 답변이 있는 경우
    if (isAnswered) {
      return (
        <div className="space-y-2">
          <div>{answer}</div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div>{`${formattedDate(answeredAt)} ${responder}`}</div>
            {isAdmin && (
              <button
                onClick={handleAnswerEditToggle}
                className="cursor-pointer border-none bg-none text-blue-600 underline"
              >
                수정하기
              </button>
            )}
          </div>
        </div>
      );
    }

    // 답변 편집 모드가 아니고, 답변이 없는 경우
    return (
      <div className="space-y-2">
        <div>아직 답변이 되지 않았어요</div>
        {isAdmin && (
          <div className="flex justify-end">
            <button
              onClick={handleAnswerEditToggle}
              className="cursor-pointer border-none bg-none text-blue-600 underline"
            >
              답변하기
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderExpandedContent = () => {
    // 문의 편집 모드인 경우 폼 표시
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
    // 문의 편집 모드가 아니라면
    return (
      <Table.Row className="bg-gray-50">
        <Table.Cell colSpan={5} className="space-y-4 px-6 py-8 text-left">
          <div className="text-gray-500" title={title}>
            {title}
          </div>
          <div className="">{content}</div>
          <div className="flex items-center justify-between">
            <div>
              {category === SUPPORT_CATEGORY_STATE.BUG && imageUrl && (
                <Button onClick={() => handleErrorImageModalOpen(imageUrl!)}>
                  오류 이미지
                </Button>
              )}
            </div>
            {renderOwnerActions()}
          </div>
          <hr />
          {renderAnswerSection()}
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <>
      <Table.Row
        onClick={() => showAll && onClick(id)}
        className={cn('border-none', isCurrentItemOpen && 'bg-gray-50')}
      >
        <Table.Cell>{id}</Table.Cell>
        <Table.Cell className="max-w-[180px] overflow-hidden truncate whitespace-nowrap">
          <span title={title}>{title}</span>
        </Table.Cell>
        <Table.Cell>{formatMemberName(memberName, memberId)}</Table.Cell>
        <Table.Cell>{formattedDate(createdAt)}</Table.Cell>
        <Table.Cell>
          {
            <>
              <Badge color="primary" className="mr-2">
                {toKoreaSupportCategory(category)}
              </Badge>

              <Badge color={isAnswered ? 'green' : 'red'}>
                {isAnswered ? '답변완료' : '답변예정'}
              </Badge>
            </>
          }
        </Table.Cell>
      </Table.Row>

      {isCurrentItemOpen && renderExpandedContent()}
    </>
  );
};

export default SupportTableRow;
