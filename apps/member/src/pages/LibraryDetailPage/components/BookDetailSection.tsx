import {
  Badge,
  Button,
  DetailsList,
  Grid,
  Tabs,
} from '@clab-platforms/design-system';

import Image from '@components/common/Image/Image';
import Section from '@components/common/Section/Section';

import { BOOK_STORE_URL } from '@constants/path';
import { SELECT_DEFAULT_OPTION } from '@constants/select';
import { BOOK_STATE } from '@constants/state';
import { useMyProfile } from '@hooks/queries';
import { useBookDetails } from '@pages/LibraryPage/hooks/useBookDetails';
import { createImageUrl } from '@utils/api';
import { bookReviewParser, toBookstore } from '@utils/string';

import yes24Icon from '@assets/svg/yes24.svg';
import aladinIcon from '@assets/webp/aladin.webp';
import kyoboIcon from '@assets/webp/kyobobook.webp';

import type { BookstoreKorean } from '@type/book';

import { useBookLoanBorrowMutation } from '../hooks/useBookLoanBorrowMutation';

const OPTIONS = [
  {
    icon: <img src={kyoboIcon} alt="교보문고" className="size-6" />,
    value: '교보문고',
  },
  {
    icon: <img src={yes24Icon} alt="예스24" className="size-6" />,
    value: '예스24',
  },
  {
    icon: <img src={aladinIcon} alt="알라딘" className="size-6 rounded" />,
    value: '알라딘',
  },
] as const;

interface Props {
  paramsId: string;
}

export function DetailsSection({ paramsId }: Props) {
  const { data: bookDetails } = useBookDetails(+paramsId);
  const { data: myInfo } = useMyProfile();
  const { bookBorrowMutate } = useBookLoanBorrowMutation();

  const {
    id,
    borrowerId,
    category,
    title,
    author,
    publisher,
    imageUrl,
    reviewLinks,
  } = bookDetails;

  const handleBorrowClick = (bookId: number) => {
    bookBorrowMutate({
      bookId: bookId,
      borrowerId: myInfo.id,
    });
  };
  /**
   * 온라인 서점에서 책의 정보를 검색하는 함수입니다.
   * 서버에 저장된 온라인 서점 URL이 존재할 경우 해당 URL로 이동합니다.
   * 존재하지 않을 경우, 책 제목을 검색하여 검색 결과를 보여줍니다.
   */
  const handleTabsChange = (value: string) => {
    const bookStore = toBookstore(value as BookstoreKorean);
    const url = bookReviewParser(reviewLinks || []);
    const targetUrl = url[bookStore] ?? `${BOOK_STORE_URL[bookStore]}${title}`;
    window.open(targetUrl, '_blank');
  };

  return (
    <Section>
      <Grid gap="lg" className="lg:grid-cols-2">
        <Image
          src={createImageUrl(imageUrl)}
          alt={title}
          width="max-w-[420px] w-full"
          height="max-h-[520px] h-full"
          className="object-cover p-4 drop-shadow-lg"
        />
        <div className="flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <h1 className="break-keep text-2xl font-semibold">{title}</h1>
            <DetailsList>
              <DetailsList.Item label="작가">{author}</DetailsList.Item>
              <DetailsList.Item label="출판사">{publisher}</DetailsList.Item>
              <DetailsList.Item label="분류">{category}</DetailsList.Item>
              <DetailsList.Item label="대여 상태">
                <Badge color={borrowerId ? 'red' : 'green'}>
                  {borrowerId ? BOOK_STATE.BORROWED : BOOK_STATE.AVAILABLE}
                </Badge>
              </DetailsList.Item>
            </DetailsList>
            <div>
              <label className="mb-1 ml-1 text-xs">온라인 서점 바로가기</label>
              <Tabs
                value={SELECT_DEFAULT_OPTION}
                options={OPTIONS}
                onChange={handleTabsChange}
              />
            </div>
          </div>
          <Button onClick={() => handleBorrowClick(id)}>대여 신청하기</Button>
        </div>
      </Grid>
    </Section>
  );
}
