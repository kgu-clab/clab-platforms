import { useState } from 'react';

import { Badge, Button, Table } from '@clab-platforms/design-system';
import { cn } from '@clab-platforms/utils';

import Image from '@components/common/Image/Image';

import { MODAL_ACCEPT, MODAL_CONTENT, MODAL_TITLE } from '@constants/modal';
import { SELECT_OPTIONS_INQURIY_TYPE } from '@constants/select';
import { ROLE_LEVEL } from '@constants/state';
import { useModal } from '@hooks/common/useModal';
import { useBoardDeleteMutation, useMyProfile } from '@hooks/queries';
import InquiryForm from '@pages/InquiryWritePage/components/InquiryForm';
import { createImageUrl } from '@utils/api';
import { formattedDate } from '@utils/date';
import { formatMemberName, toKoreaInquiryCategory } from '@utils/string';

import { InquiryItem } from '@type/inquiry';

import InquiryAnswerInput from './InquiryAnswerInput';

interface InquiryTableRowProps {
  data: InquiryItem;
  showAll: boolean;
  currentOpenItemIndex: number;
  onClick(id: number): void;
}

const InquiryTableRow = ({
  data,
  showAll,
  currentOpenItemIndex,
  onClick,
}: InquiryTableRowProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isAnswerEdit, setIsAnswerEdit] = useState(false);

  const { data: myProfile } = useMyProfile();
  const { open } = useModal();
  const { boardDeleteMutate } = useBoardDeleteMutation();

  const isCurrentItemOpen = currentOpenItemIndex === data.id;
  const isBugType = data.category === SELECT_OPTIONS_INQURIY_TYPE[0].value;
  const isAdmin = myProfile.roleLevel >= ROLE_LEVEL.ADMIN;

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
    if (!data.isOwner) return null;

    return (
      <>
        <button
          onClick={handleEditToggle}
          className="mr-2 cursor-pointer border-none bg-transparent text-blue-600 underline"
        >
          수정
        </button>
        <button
          onClick={() => handleDeleteClick(data.id)}
          className="cursor-pointer border-none bg-transparent text-blue-600 underline"
        >
          삭제
        </button>
      </>
    );
  };
  const renderAnswerSection = () => {
    // 답변 편집 모드인 경우
    if (isAnswerEdit) {
      return (
        <InquiryAnswerInput
          onCancel={handleAnswerEditToggle}
          data={data.answer!}
        />
      );
    }

    // 답변 편집 모드가 아니고, 답변이 있는 경우
    if (data.isAnswered) {
      return (
        <div className="space-y-2">
          <div>{data.answer}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            {formattedDate(data.answeredAt)} {data.responder}
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

    // 답변 편집 모드가 아니고,  답변이 없는 경우
    return (
      <div className="space-y-2">
        <div>아직 답변이 되지 않았어요</div>
        {isAdmin && (
          <button
            onClick={handleAnswerEditToggle}
            className="cursor-pointer border-none bg-none text-blue-600 underline"
          >
            답변하기
          </button>
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
              <InquiryForm data={data} onClose={handleEditToggle} />
            </div>
          </Table.Cell>
        </Table.Row>
      );
    }
    // 문의 편집 모드가 아니라면
    return (
      <Table.Row className="bg-gray-50">
        <Table.Cell colSpan={5} className="space-y-4 px-6 py-8 text-left">
          <div className="text-gray-500">{data.title}</div>
          <div className="">{data.content}</div>
          <div className="flex gap-3">
            {isBugType && (
              <Button onClick={() => handleErrorImageModalOpen(data.imageUrl!)}>
                오류 이미지
              </Button>
            )}
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
        onClick={() => showAll && onClick(data.id)}
        className={cn('border-none', isCurrentItemOpen && 'bg-gray-50')}
      >
        <Table.Cell>{data.id}</Table.Cell>
        <Table.Cell className="max-w-[180px] overflow-hidden truncate whitespace-nowrap">
          <span title={data.title}>{data.title}</span>
        </Table.Cell>
        <Table.Cell>
          {formatMemberName(data.memberName, data.memberId)}
        </Table.Cell>
        <Table.Cell>{formattedDate(data.createdAt)}</Table.Cell>
        <Table.Cell>
          {
            <>
              <Badge color="primary" className="mr-2">
                {toKoreaInquiryCategory(data.category)}
              </Badge>

              <Badge color={data.isAnswered ? 'green' : 'red'}>
                {data.isAnswered ? '답변완료' : '답변예정'}
              </Badge>
            </>
          }
        </Table.Cell>
      </Table.Row>

      {isCurrentItemOpen && renderExpandedContent()}
    </>
  );
};

export default InquiryTableRow;
