import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input, Table } from '@clab-platforms/design-system';
import { SearchOutline } from '@clab-platforms/icon';

import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { TABLE_HEAD } from '@constants/head';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardByCategory } from '@hooks/queries';

import type { CommunityCategoryType } from '@type/community';

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
  const { data } = useBoardByCategory({ category: type, page, size });
  const [hashtag, setHashtag] = useState('');

  const handleBoardClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(type, id));
    },
    [navigate, type],
  );
  const handleHashtagSearchClick = () => {};

  return (
    <Section className="space-y-2">
      {title && <Section.Header title={title} />}
      <Section.Body className="flex flex-col gap-4 overflow-auto">
        {type === 'development_qna' && (
          <div className="flex">
            <Input
              placeholder="검색할 해시태그를 입력해주세요"
              className="w-full"
              value={hashtag}
              onChange={(e) => setHashtag(e.target.value)}
            />
            <SearchOutline
              className="mx-4 my-auto hover:cursor-pointer"
              onClick={handleHashtagSearchClick}
            />
          </div>
        )}
        <Table head={TABLE_HEAD.COMMUNITY_DETAIL}>
          {data.totalItems === 0 ? (
            <Table.Row>
              <Table.Cell className="col-span-full">
                {COMMUNITY_MESSAGE.NO_ARTICLE}
              </Table.Cell>
            </Table.Row>
          ) : (
            <>
              {!currentId &&
                // 인기 게시물 상위 3개
                data.items
                  .slice(0, 3)
                  .map(({ id, title, commentCount, writerName, createdAt }) => (
                    <CommunityPostsItem
                      key={id}
                      id={id}
                      title={title}
                      commentCount={commentCount}
                      writerName={writerName}
                      createdAt={createdAt}
                      onClick={() => handleBoardClick(id)}
                    />
                  ))}
              {data.items.map(
                ({ id, title, commentCount, writerName, createdAt }, index) => (
                  <CommunityPostsItem
                    key={id}
                    id={id}
                    title={title}
                    commentCount={commentCount}
                    writerName={writerName}
                    createdAt={createdAt}
                    onClick={() => handleBoardClick(id)}
                    index={data.totalItems - (index + page * size)}
                    currentId={currentId}
                  />
                ),
              )}
            </>
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
