import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from '@clab-platforms/design-system';

import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardByCategory, useBoardByHashtag } from '@hooks/queries';
import { toKoreaISOString } from '@utils/date';

import type { CommunityCategoryType } from '@type/community';

import HashtagButton from '../../common/HashtagButton/HashtagButton';
import CommunityPostsItem from './CommunityPostsItem';

interface Props {
  type: CommunityCategoryType;
  title?: string;
  id?: number;
  size?: number;
}

const CommunityPostsSection = ({
  type,
  title,
  id: currentId,
  size: defaultSize,
}: Props) => {
  const navigate = useNavigate();
  const { page, size, handlePageChange } = usePagination({ defaultSize });
  const { data: categoryData } = useBoardByCategory({
    category: type,
    page,
    size,
  });
  const [hashtagList, setHashtagList] = useState<Array<string>>([]);
  const { data: hashtagData } = useBoardByHashtag({
    hashtags: hashtagList,
    page,
    size,
  });

  const data =
    hashtagList.length > 0 && type === 'development_qna'
      ? hashtagData
      : categoryData;

  const handleBoardClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(type, id));
    },
    [navigate, type],
  );

  const handleHashtagButtonClick = (value: string) => {
    setHashtagList((prevHashtag) => {
      const updatedHashtags = prevHashtag ? [...prevHashtag] : [];

      return updatedHashtags?.includes(value)
        ? updatedHashtags.filter((hashtag) => hashtag !== value)
        : [...updatedHashtags, value];
    });
  };

  return (
    <Section className="space-y-2">
      {title && <Section.Header title={title} />}
      <Section.Body className="flex flex-col gap-4 overflow-auto">
        {type === 'development_qna' && (
          <>
            <p className="text-xl font-bold">해시태그</p>
            <HashtagButton
              clicked={hashtagList}
              onClick={handleHashtagButtonClick}
            />
          </>
        )}
        <Table head={TABLE_HEAD.COMMUNITY_DETAIL}>
          {data.totalItems === 0 ? (
            <Table.Row>
              <Table.Cell className="col-span-full">
                {COMMUNITY_MESSAGE.NO_ARTICLE}
              </Table.Cell>
            </Table.Row>
          ) : (
            data.items.map(
              ({ id, title, commentCount, writerName, createdAt }, index) => (
                <CommunityPostsItem
                  key={id}
                  id={id}
                  title={title}
                  commentCount={commentCount}
                  writerName={writerName}
                  createdAt={toKoreaISOString(createdAt)}
                  onClick={() => handleBoardClick(id)}
                  index={data.totalItems - (index + page * size)}
                  currentId={currentId}
                />
              ),
            )
          )}
        </Table>
        <Pagination
          className="mt-4 justify-center"
          totalItems={data.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section.Body>
    </Section>
  );
};

export default CommunityPostsSection;
