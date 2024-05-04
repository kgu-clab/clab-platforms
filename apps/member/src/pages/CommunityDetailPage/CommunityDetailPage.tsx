import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Table } from '@clab/design-system';

import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Pagination from '@components/common/Pagination/Pagination';
import Section from '@components/common/Section/Section';
import CommunityWriteButton from '@components/community/CommunityWriteButton/CommunityWriteButton';

import { SERVICE_NAME } from '@constants/environment';
import { TABLE_HEAD } from '@constants/head';
import { COMMUNITY_MESSAGE, ERROR_MESSAGE } from '@constants/message';
import { PATH, PATH_FINDER, PATH_NAME } from '@constants/path';
import { usePagination } from '@hooks/common/usePagination';
import { useBoardsList } from '@hooks/queries/useBoardsList';
import { categoryToTitle, isCommunityCategoryType } from '@utils/community';
import { toYYMMDD } from '@utils/date';
import { toDecodeHTMLEntities } from '@utils/string';

import type { CommunityCategoryType } from '@type/community';

const CommunityDetailPage = () => {
  const { type } = useParams<{ type: CommunityCategoryType }>();

  if (!type || !isCommunityCategoryType(type)) {
    throw new Error(ERROR_MESSAGE.NOT_FOUND);
  }

  const navigate = useNavigate();
  const { page, size, handlePageChange } = usePagination();
  const { data } = useBoardsList({ category: type, page, size });

  const handleBoardClick = useCallback(
    (id: number) => {
      navigate(PATH_FINDER.COMMUNITY_POST(type, id));
    },
    [navigate, type],
  );

  return (
    <Content>
      <Header
        title={[PATH_NAME.COMMUNITY, categoryToTitle(type)]}
        path={[PATH.COMMUNITY]}
      >
        <p>
          총 <b>{data.totalItems}개</b>의 게시글이 있어요
        </p>
        <CommunityWriteButton />
      </Header>
      <Section className="space-y-2">
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
                className="text-nowrap text-center"
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
          className="justify-center"
          totalItems={data.totalItems}
          postLimit={size}
          onChange={handlePageChange}
          page={page}
        />
      </Section>
    </Content>
  );
};

export default CommunityDetailPage;
