import { useState } from 'react';

import {
  Button,
  Grid,
  Input,
  Menubar,
  Table,
} from '@clab-platforms/design-system';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import { ERROR_MESSAGE } from '@constants/message';
import { usePagination } from '@hooks/common/usePagination';
import useToast from '@hooks/common/useToast';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { calculateDDay, formattedDate } from '@utils/date';

import type { Book } from '@type/book';

import { useBookLoanRecordApproveMutation } from '../hooks/useBookLoanRecordApproveMutation';
import { useBookLoanRecordOverdue } from '../hooks/useBookLoanRecordOverdue';
import { useBookRegisterMutation } from '../hooks/useBookRegisterMutation';
import { useMemberInfoModal } from '../hooks/useMemberInfoModal';

type Mode = 'condition' | 'overdue' | 'register';

export function LibrarySection() {
  const toast = useToast();
  const { open } = useMemberInfoModal();
  const { page, size, handlePageChange } = usePagination({
    sectionName: 'library',
  });
  const [inputs, setInputs] = useState<Book>({
    category: '',
    title: '',
    author: '',
    publisher: '',
    imageUrl: '',
    reviewLinks: [],
  });
  const [links, setLinks] = useState({
    yes24Url: '',
    kyoboUrl: '',
    aladinUrl: '',
  });

  const [mode, setMode] = useState<Mode>('condition');

  const { bookLoanRecordApproveMutate } = useBookLoanRecordApproveMutation();
  const { bookRegisterMutate } = useBookRegisterMutation();
  const { data: bookLoanRecordCondition } = useBookLoanRecordConditions({
    hasPermission: true,
    isReturned: false,
    page,
    size,
  });
  const { data: bookLoanRecordOverdue } = useBookLoanRecordOverdue({
    page,
    size,
  });

  const handleMenubarItemClick = (mode: Mode) => {
    setMode(mode);
  };

  const handleApproveButtonClick = (id: number) => {
    bookLoanRecordApproveMutate(id);
  };

  const handleMemberInfoClick = (memberId: string) => {
    open({ memberId: memberId });
  };

  const handleInputsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterButtonClick = async () => {
    const { category, title, author, publisher } = inputs;
    if (!category || !title || !author || !publisher) {
      return toast({
        state: 'error',
        message: ERROR_MESSAGE.NO_DATA,
      });
    }

    const reviewLinkList = Object.values(links).filter((link) => link !== '');

    setInputs((prev) => ({
      ...prev,
      reviewLinks: reviewLinkList,
    }));

    bookRegisterMutate(inputs);
  };

  const renderMode = {
    condition: (
      <Table head={['도서명', ...TABLE_HEAD.BOOK_LOAN_RECORD, '기능']}>
        {bookLoanRecordCondition.items.map(
          ({
            bookLoanRecordId,
            bookTitle,
            borrowerId,
            borrowerName,
            dueDate,
            borrowedAt,
            returnedAt,
          }) => (
            <Table.Row key={bookLoanRecordId}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>
                <BookLoanConditionStatusBadge
                  borrowedAt={borrowedAt}
                  returnedAt={returnedAt}
                />
              </Table.Cell>
              <Table.Cell className="space-x-2">
                {dueDate === null && (
                  <ActionButton
                    onClick={() => handleApproveButtonClick(bookLoanRecordId)}
                  >
                    승인
                  </ActionButton>
                )}
                <ActionButton onClick={() => handleMemberInfoClick(borrowerId)}>
                  정보
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
    overdue: (
      <Table head={TABLE_HEAD.BOOK_LOAN_RECORDS_OVERDUE}>
        {bookLoanRecordOverdue.items.map(
          ({ bookTitle, borrowerId, borrowerName, dueDate, borrowedAt }) => (
            <Table.Row key={borrowerId + bookTitle + borrowedAt}>
              <Table.Cell>{bookTitle}</Table.Cell>
              <Table.Cell>{`${borrowerName} (${borrowerId})`}</Table.Cell>
              <Table.Cell>{formattedDate(borrowedAt)}</Table.Cell>
              <Table.Cell>{formattedDate(dueDate)}</Table.Cell>
              <Table.Cell>{calculateDDay(dueDate)}</Table.Cell>
              <Table.Cell>
                <ActionButton onClick={() => handleMemberInfoClick(borrowerId)}>
                  정보
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ),
        )}
      </Table>
    ),
    register: (
      <div className="space-y-2">
        <Grid gap="md" col="2">
          <Input
            label="카테고리"
            id="category"
            name="category"
            placeholder="카테고리를 작성해주세요"
            value={inputs.category}
            onChange={handleInputsChange}
          />
          <Input
            label="제목"
            id="title"
            name="title"
            placeholder="제목을 작성해주세요"
            value={inputs.title}
            onChange={handleInputsChange}
            required
          />
        </Grid>
        <Grid gap="md" col="2">
          <Input
            label="저자"
            id="author"
            name="author"
            placeholder="저자를 작성해주세요"
            value={inputs.author}
            onChange={handleInputsChange}
          />
          <Input
            label="출판사"
            id="publisher"
            name="publisher"
            placeholder="출판사를 작성해주세요"
            value={inputs.publisher}
            onChange={handleInputsChange}
          />
        </Grid>
        <Input
          label="이미지 URL"
          id="imageUrl"
          name="imageUrl"
          placeholder="ex) https://image.yes24.com/goods/123161563/XL"
          value={inputs.imageUrl}
          onChange={handleInputsChange}
        />
        <Input
          label="서점 링크 - yes24"
          id="yes24Url"
          name="yes24Url"
          placeholder="ex) https://www.yes24.com/Product/Goods/7516911"
          value={links.yes24Url}
          onChange={handleLinksChange}
        />
        <Input
          label="서점 링크 - 교보문고"
          id="kyoboUrl"
          name="kyoboUrl"
          placeholder="ex) https://product.kyobobook.co.kr/detail/S000000935360"
          value={links.kyoboUrl}
          onChange={handleLinksChange}
        />
        <Input
          label="서점 링크 - 알라딘"
          id="aladinUrl"
          name="aladinUrl"
          placeholder="ex) https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8960773433&start=pnaver_02"
          value={links.aladinUrl}
          onChange={handleLinksChange}
        />
        <Button
          color="blue"
          className="w-full"
          onClick={handleRegisterButtonClick}
        >
          등록하기
        </Button>
      </div>
    ),
  }[mode];

  return (
    <Section>
      <Section.Header
        title="도서관"
        description="대여자와 연체자를 확인하거나 신규 도서를 등록할 수 있어요"
      >
        <Menubar>
          <Menubar.Item
            selected={mode === 'condition'}
            onClick={() => handleMenubarItemClick('condition')}
          >
            대여
          </Menubar.Item>
          <Menubar.Item
            selected={mode === 'overdue'}
            onClick={() => handleMenubarItemClick('overdue')}
          >
            연체
          </Menubar.Item>
          <Menubar.Item
            selected={mode === 'register'}
            onClick={() => handleMenubarItemClick('register')}
          >
            등록
          </Menubar.Item>
        </Menubar>
      </Section.Header>
      <Section.Body>
        {renderMode}
        {mode !== 'register' && (
          <Pagination
            className="mt-4 justify-center"
            page={page}
            postLimit={size}
            totalItems={
              mode === 'condition'
                ? bookLoanRecordCondition.totalItems
                : bookLoanRecordOverdue.totalItems
            }
            onChange={handlePageChange}
          />
        )}
      </Section.Body>
    </Section>
  );
}
