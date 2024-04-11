import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import Section from '@components/common/Section/Section';
import Pagination from '@components/common/Pagination/Pagination';
import { useCallback } from 'react';
import { PATH_FINDER } from '@constants/path';
import { toYYMMDD } from '@utils/date';
import { useBoardsList } from '@hooks/queries/useBoardsList';
import { categoryToTitle, isCommunityCategoryType } from '@utils/community';
import { COMMUNITY_MESSAGE } from '@constants/message';
import { Table } from '@clab/design-system';
import { toDecodeHTMLEntities } from '@utils/string';
import { TABLE_HEAD } from '@constants/head';
import { SERVICE_NAME } from '@constants/environment';
import { usePagination } from '@hooks/common/usePagination';
import type { CommunityCategoryType } from '@type/community';

const CommunityDetailPage = () => {
  const { type } = useParams<{ type: CommunityCategoryType }>();

  if (!type || !isCommunityCategoryType(type)) {
    throw new Error('잘못된 접근입니다.');
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
      <Header title={['커뮤니티', categoryToTitle(type)]}>
        <p>
          총 <span className="font-semibold">{data.totalItems}개</span>의
          게시글이 있어요
        </p>
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
                className="text-center text-nowrap"
                onClick={() => handleBoardClick(id)}
              >
                <Table.Cell className="w-1/12">
                  {data.totalItems - (index + page * size)}
                </Table.Cell>
                <Table.Cell className="w-7/12 text-left truncate">
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
