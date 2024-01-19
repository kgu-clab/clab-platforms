import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { PATH } from '@constants/path';
import DetailList from '@components/community/DetailList/DetailList';
import { useParams } from 'react-router-dom';
import notice from '@mocks/data/noticeList.json';
import gassip from '@mocks/data/gassipList.json';
import qna from '@mocks/data/communityList.json';
import graduated from '@mocks/data/graduatedList.json';
import news from '@mocks/data/newsList.json';
import hire from '@mocks/data/hireList.json';
import { useEffect, useState } from 'react';

interface DetailData {
  id: number;
  type?: string;
  title: string;
  writer?: string;
  createAt: string;
}

const CommunityDetailPage = () => {
  const { sort } = useParams<{ sort?: string }>();
  const [data, setData] = useState<DetailData[]>([]);
  useEffect(() => {
    const getSortedList = () => {
      if (sort === 'notice') {
        setData(notice);
      } else if (sort === 'gassip') {
        setData(gassip);
      } else if (sort === 'qna') {
        setData(qna);
      } else if (sort === 'graduated') {
        setData(graduated);
      } else if (sort === 'news') {
        setData(news);
      } else if (sort === 'hire') {
        setData(hire);
      }
    };

    getSortedList();
  }, [sort]);

  return (
    <Content>
      <Header name="커뮤니티" button="글쓰기" to={PATH.COMMUNITY_WRITE} />
      <DetailList data={data} sort={sort} />
    </Content>
  );
};

export default CommunityDetailPage;
