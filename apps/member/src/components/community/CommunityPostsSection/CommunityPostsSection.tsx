import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from '@clab/design-system';

import Pagination from '@components/common/Pagination/Pagination';
import { Section } from '@components/common/Section';

import { SERVICE_NAME } from '@constants/environment';
import { TABLE_HEAD } from '@constants/head';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { PATH_FINDER } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardsList } from '@hooks/queries';
import { toYYMMDD } from '@utils/date';
import { cn, toDecodeHTMLEntities } from '@utils/string';

import type { CommunityCategoryType } from '@type/community';

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
  const { page, size, handlePageChange } = usePagination(defaultSize);
  const { data } = useBoardsList({ category: type, page, size });

  const handleBoardClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(type, id));
    },
    [navigate, type],
  );

  return (
    <Section className="space-y-2">
      {title && <Section.Header title={title} />}
      <Section.Body>
        <Table head={TABLE_HEAD.COMMUNITY_DETAIL}>
          {data.totalItems === 0 ? (
            <Table.Row>
              <Table.Cell colSpan={4}>
                {COMMUNITY_MESSAGE.NO_ARTICLE}
              </Table.Cell>
            </Table.Row>
          ) : (
            data.items.map(({ id, title, writerName, createdAt }, index) => (
              <Table.Row
                key={id}
                className={cn('text-nowrap text-center', {
                  'bg-gray-50 font-semibold': id === currentId,
                })}
                onClick={() => handleBoardClick(id)}
              >
                <Table.Cell className="w-1/12">
                  {data.totalItems - (index + page * size)}
                </Table.Cell>
                <Table.Cell className="w-7/12 truncate text-left">
                  {toDecodeHTMLEntities(title)}
                </Table.Cell>
                <Table.Cell className="w-3/12">
                  {writerName || SERVICE_NAME}
                </Table.Cell>
                <Table.Cell className="w-1/12">
                  {toYYMMDD(createdAt)}
                </Table.Cell>
              </Table.Row>
            ))
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
