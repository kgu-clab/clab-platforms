import { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  Button,
  Grid,
  Input,
  Menubar,
  Table,
} from '@clab-platforms/design-system';
import { SearchOutline } from '@clab-platforms/icon';
import { cn } from '@clab-platforms/utils';

import ActionButton from '@components/common/ActionButton/ActionButton';
import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';
import BookLoanConditionStatusBadge from '@components/library/BookLoanConditionStatusBadge';

import { TABLE_HEAD } from '@constants/head';
import { BOOK_STATE } from '@constants/state';
import { usePagination } from '@hooks/common/usePagination';
import { useBookLoanRecordConditions } from '@hooks/queries';
import { useBooks } from '@pages/LibraryPage/hooks/useBooks';
import { calculateDDay, formattedDate } from '@utils/date';

import type { Book } from '@type/book';

import { useBookDeleteMutation } from '../hooks/useBookDeleteMutation';
import { useBookLoanRecordApproveMutation } from '../hooks/useBookLoanRecordApproveMutation';
import { useBookLoanRecordOverdue } from '../hooks/useBookLoanRecordOverdue';
import { useBookRegisterMutation } from '../hooks/useBookRegisterMutation';
import { useMemberInfoModal } from '../hooks/useMemberInfoModal';

type Mode = 'condition' | 'overdue' | 'register' | 'view';

export function LibrarySection() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: '',
      title: '',
      author: '',
      publisher: '',
      imageUrl: '',
      reviewLinks: [],
    },
  });
  const { open } = useMemberInfoModal();
  const { page, size, handlePageChange } = usePagination({
    sectionName: 'library',
  });

  const [mode, setMode] = useState<Mode>('condition');
  const [keyword, setKeyword] = useState('');
  const [title, setTitle] = useState('');
  const [links, setLinks] = useState({
    yes24Url: '',
    kyoboUrl: '',
    aladinUrl: '',
  });

  const { bookLoanRecordApproveMutate } = useBookLoanRecordApproveMutation();
  const { bookRegisterMutate, bookRegisterIsPending } =
    useBookRegisterMutation();
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
  const { data: bookList } = useBooks({ page, size: 10, title });
  const { bookDeleteMutate, bookDeleteIsPending } = useBookDeleteMutation();

  const handleMenubarItemClick = (mode: Mode) => {
    setMode(mode);
    handlePageChange(1);
  };

  const handleApproveButtonClick = (id: number) => {
    bookLoanRecordApproveMutate(id);
  };

  const handleMemberInfoClick = (memberId: string) => {
    open({ memberId: memberId });
  };

  const handleLinksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLinks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegisterButtonClick = async (data: Book) => {
    const reviewLinkList = Object.values(links).filter((link) => link !== '');
    bookRegisterMutate({ ...data, reviewLinks: reviewLinkList });
  };

  const handleBookDeleteButtonClick = (id: number) => {
    bookDeleteMutate(id);
  };

  const handleSearchButtonClick = () => {
    setTitle(keyword);
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
      <form
        onSubmit={handleSubmit(handleRegisterButtonClick)}
        className="space-y-2"
      >
        <Grid gap="md" col="2">
          <Input
            label="카테고리"
            id="category"
            placeholder="카테고리를 작성해주세요"
            {...register('category', {
              required: {
                value: true,
                message: '카테고리는 필수 항목이에요.',
              },
            })}
            message={errors.category?.message}
            messageClassName="text-red-500"
          />
          <Input
            label="제목"
            id="title"
            placeholder="제목을 작성해주세요"
            {...register('title', {
              required: {
                value: true,
                message: '제목은 필수 항목이에요.',
              },
            })}
            message={errors.title?.message}
            messageClassName="text-red-500"
          />
        </Grid>
        <Grid gap="md" col="2">
          <Input
            label="저자"
            id="author"
            placeholder="저자를 작성해주세요"
            {...register('author', {
              required: {
                value: true,
                message: '저자는 필수 항목이에요.',
              },
            })}
            message={errors.author?.message}
            messageClassName="text-red-500"
          />
          <Input
            label="출판사"
            id="publisher"
            placeholder="출판사를 작성해주세요"
            {...register('publisher', {
              required: {
                value: true,
                message: '출판사는 필수 항목이에요.',
              },
            })}
            message={errors.publisher?.message}
            messageClassName="text-red-500"
          />
        </Grid>
        <Input
          label="이미지 URL"
          id="imageUrl"
          placeholder="ex) https://image.yes24.com/goods/123161563/XL"
          {...register('imageUrl')}
        />
        <Input
          label="서점 링크 - yes24"
          name="yes24Url"
          placeholder="ex) https://www.yes24.com/Product/Goods/7516911"
          value={links.yes24Url}
          onChange={handleLinksChange}
        />
        <Input
          label="서점 링크 - 교보문고"
          name="kyoboUrl"
          placeholder="ex) https://product.kyobobook.co.kr/detail/S000000935360"
          value={links.kyoboUrl}
          onChange={handleLinksChange}
        />
        <Input
          label="서점 링크 - 알라딘"
          name="aladinUrl"
          placeholder="ex) https://www.aladin.co.kr/shop/wproduct.aspx?ISBN=8960773433&start=pnaver_02"
          value={links.aladinUrl}
          onChange={handleLinksChange}
        />
        <Button
          color="blue"
          className="w-full"
          type="submit"
          disabled={bookRegisterIsPending}
        >
          등록하기
        </Button>
      </form>
    ),
    view: (
      <>
        <div className="mb-4 flex items-center space-x-2">
          <Input
            placeholder="찾으시는 도서명을 입력해주세요"
            id="keyword"
            name="keyword"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full"
          />
          <SearchOutline
            width={24}
            height={24}
            className="hover:cursor-pointer"
            onClick={handleSearchButtonClick}
          />
        </div>
        <Table head={TABLE_HEAD.BOOK_LIST}>
          {bookList.items.map(({ id, category, title, author, borrowerId }) => (
            <Table.Row key={id}>
              <Table.Cell>{category}</Table.Cell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{author}</Table.Cell>
              <Table.Cell>
                <span
                  className={cn(
                    'text-xs',
                    borrowerId ? 'text-pink-600' : 'text-green-600',
                  )}
                >
                  {borrowerId ? BOOK_STATE.BORROWED : BOOK_STATE.AVAILABLE}
                </span>
              </Table.Cell>
              <Table.Cell>
                <ActionButton
                  color="red"
                  onClick={() => handleBookDeleteButtonClick(id)}
                  disabled={bookDeleteIsPending}
                >
                  삭제
                </ActionButton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </>
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
          <Menubar.Item
            selected={mode === 'view'}
            onClick={() => handleMenubarItemClick('view')}
          >
            보기
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
              (mode === 'condition' && bookLoanRecordCondition.totalItems) ||
              (mode === 'overdue' && bookLoanRecordOverdue.totalItems) ||
              (mode === 'view' && bookList.totalItems) ||
              0
            }
            onChange={handlePageChange}
          />
        )}
      </Section.Body>
    </Section>
  );
}
