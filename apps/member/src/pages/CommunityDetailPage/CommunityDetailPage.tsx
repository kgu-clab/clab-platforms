import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import type { CommunityPostItem } from '@type/community';
import type { HireItem } from '@type/hire';
import type { NewsItem } from '@type/news';
import Section from '@components/common/Section/Section';
import Table from '@components/common/Table/Table';
import Pagination from '@components/common/Pagination/Pagination';
import { useState } from 'react';
import { PATH_FINDER } from '@constants/path';
import { toYYMMDD } from '@utils/date';
import { useCommunityList } from '@hooks/queries/useCommunityList';
import { useNews } from '@hooks/queries/useNews';
import { useHire } from '@hooks/queries/useHire';

interface ContentProps {
  name: string;
  data: Array<CommunityPostItem | HireItem | NewsItem>;
}
interface SubTitleProps {
  type: string;
  noticeData: Array<CommunityPostItem>;
  freeData: Array<CommunityPostItem>;
  qnaData: Array<CommunityPostItem>;
  graduatedData: Array<CommunityPostItem>;
  newsData: Array<NewsItem>;
  hireData: Array<HireItem>;
}

const useSubTitle = ({
  type = 'error',
  noticeData,
  freeData,
  qnaData,
  graduatedData,
  newsData,
  hireData,
}: SubTitleProps): ContentProps => {
  let title = 'error';
  let data: Array<CommunityPostItem | HireItem | NewsItem> = [];

  switch (type) {
    case 'notice':
      title = '공지사항';
      data = noticeData;
      break;
    case 'free':
      title = '자유';
      data = freeData;
      break;
    case 'qna':
      title = 'QnA';
      data = qnaData;
      break;
    case 'graduated':
      title = '졸업생';
      data = graduatedData;
      break;
    case 'news':
      title = 'IT 뉴스';
      data = newsData;
      break;
    case 'hire':
      title = '채용 정보';
      data = hireData;
      break;
    default:
      title = `${type} 게시판을 찾을 수 없습니다`;
  }

  return { name: title, data };
};

const CommunityDetailPage = () => {
  const { type = 'error' } = useParams<{ type: string }>();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const limit = 20;
  // const offset = (page - 1) * limit;

  const noticeData = useCommunityList('공지사항', page - 1, limit).data.items;
  const freeData = useCommunityList('자유', page - 1, limit).data.items;
  const qnaData = useCommunityList('QnA', page - 1, limit).data.items;
  const graduatedData = useCommunityList('졸업생', page - 1, limit).data.items;
  const newsData = useNews(page - 1, limit).data.items;
  const hireData = useHire(page - 1, limit).data.items;

  const { name, data } = useSubTitle({
    type,
    noticeData,
    freeData,
    qnaData,
    graduatedData,
    newsData,
    hireData,
  });

  const onClickTitle = (id: string) => {
    navigate(PATH_FINDER.COMMUNITY_POST(type, id), {
      state: { sort: type, id: id },
    });
  };

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
          {data.map(({ id, title, writer, createdAt }, index) => (
            <Table.Row
              key={id}
              className="text-center"
              onClick={() => onClickTitle(String(id))}
            >
              <td className="py-2">{data.length - index}</td>
              <td className="text-left py-2">{title}</td>
              <td className="py-2">{writer ? writer : '-'}</td>
              <td className="py-2">{createdAt ? toYYMMDD(createdAt) : '-'}</td>
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
