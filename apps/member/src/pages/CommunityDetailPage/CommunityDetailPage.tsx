import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import type { CommunityCategoryType } from '@type/community';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';
import Pagination from '@components/common/Pagination/Pagination';
import { useState } from 'react';
import { PATH_FINDER } from '@constants/path';
import { toYYMMDD } from '@utils/date';
import { useBoards } from '@hooks/queries/useBoards';
import { categoryToTitle, isCommunityCategoryType } from '@utils/community';
import { COMMUNITY_MESSAGE } from '@constants/message';

const CommunityDetailPage = () => {
  const { type } = useParams<{ type: CommunityCategoryType }>();

  if (!type || !isCommunityCategoryType(type)) {
    throw new Error('잘못된 접근입니다.');
  }

  const navigate = useNavigate();

  const [pagination, setPagination] = useState({
    page: 0,
    size: 20,
  });

  const { page, size } = pagination;

  const name = categoryToTitle(type);

  const { data } = useBoards(type, page, size);

  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page: page - 1 });
  };

  const onClickTitle = (id: string) => {
    navigate(PATH_FINDER.COMMUNITY_POST(type, id), {
      state: { sort: type, id: id },
    });
  };

  return (
    <Content>
      <Header title={['커뮤니티', name]}>
        <p>
          총 <span className="font-semibold">{data.totalItems}개</span>의
          게시글이 있어요
        </p>
      </Header>
      <Section>
        <Table head={['번호', '제목', '작성자', '작성일']}>
          {data.totalItems === 0 ? (
            <Table.Row>
              <td colSpan={4} className="py-4">
                {COMMUNITY_MESSAGE.NO_ARTICLE}
              </td>
            </Table.Row>
          ) : (
            data.items.map(({ id, title, writer, createdAt }, index) => (
              <Table.Row
                key={id}
                className="text-center"
                onClick={() => onClickTitle(String(id))}
              >
                <td className="py-2">
                  {data.totalItems - (index + page * size)}
                </td>
                <td className="py-2 text-left">{title}</td>
                <td className="py-2">{writer ? writer : '-'}</td>
                <td className="py-2">
                  {createdAt ? toYYMMDD(createdAt) : '-'}
                </td>
              </Table.Row>
            ))
          )}
        </Table>
        {data.totalItems > 0 && (
          <Pagination
            className="flex justify-center"
            totalItems={data.totalItems}
            pageLimit={5}
            postLimit={size}
            setPage={handlePageChange}
            page={page}
            sort={type}
          />
        )}
      </Section>
    </Content>
  );
};

export default CommunityDetailPage;
