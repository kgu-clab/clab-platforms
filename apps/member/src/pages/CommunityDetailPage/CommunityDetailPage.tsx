import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import type { CommunityPostType } from '@type/community';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';
import Pagination from '@components/common/Pagination/Pagination';
import { useState } from 'react';
import { PATH_FINDER } from '@constants/path';
import { toYYMMDD } from '@utils/date';

import notice from '@mocks/data/noticeList.json';
import gassip from '@mocks/data/gassipList.json';
import qna from '@mocks/data/communityList.json';
import graduated from '@mocks/data/graduatedList.json';
import news from '@mocks/data/newsList.json';
import hire from '@mocks/data/hireList.json';

interface ContentProps {
  name: string;
  data: CommunityPostType[];
}

//** 아래 코드는 API 연동 시 react-query를 사용하여 hook으로 변경 될 예정입니다.
const getSubTitle = (type = 'error'): ContentProps => {
  return {
    notice: {
      name: '공지사항',
      data: notice,
    },
    gassip: {
      name: '자유',
      data: gassip,
    },
    qna: {
      name: 'QnA',
      data: qna,
    },
    graduated: {
      name: '졸업생 게시판',
      data: graduated,
    },
    news: {
      name: 'IT 소식',
      data: news,
    },
    hire: {
      name: '채용 정보',
      data: hire,
    },
    error: {
      name: `${type} 게시판을 찾을 수 없습니다`,
      data: [],
    },
  }[type] as ContentProps;
};

const CommunityDetailPage = () => {
  const { type = 'error' } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 20;
  const offset = (page - 1) * limit;

  const onClickTitle = (id: number) => {
    navigate(PATH_FINDER.COMMUNITY_POST(type, id), {
      state: { sort: type, id: id },
    });
  };

  const { name, data } = getSubTitle(type);

  return (
    <Content>
      <Header title={['커뮤니티', name]}>
        <p>
          총{' '}
          <span className="text-purple-500 font-semibold">{data.length}</span>
          개의 게시글이 있어요
        </p>
      </Header>
      <Section>
        <Table head={['번호', '제목', '작성자', '작성일']}>
          {data
            .slice(offset, offset + limit)
            .map(({ id, title, writer, createAt }) => (
              <Table.Row key={id} className="text-center">
                <td className="py-2">{id}</td>
                <td className="text-left py-2" onClick={() => onClickTitle(id)}>
                  {title}
                </td>
                <td className="py-2">{writer}</td>
                <td className="py-2">{toYYMMDD(createAt)}</td>
              </Table.Row>
            ))}
        </Table>
        <Pagination
          className="flex justify-center"
          totalItems={data.length}
          pageLimit={5}
          postLimit={limit}
          setPage={setPage}
          page={page}
          sort={type}
        />
      </Section>
    </Content>
  );
};

export default CommunityDetailPage;
