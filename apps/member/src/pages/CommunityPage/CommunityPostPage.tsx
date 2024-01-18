import Content from '@components/common/Content/Content';
import CommunityHeader from '@components/community/CommunityHeader';
import PostContentSection from '@components/community/PostContentSection';
import PostCommentSection from '@components/community/PostCommentSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import notice from '@mocks/data/noticeList.json';
import gassip from '@mocks/data/gassipList.json';
import qna from '@mocks/data/communityList.json';
import graduated from '@mocks/data/graduatedList.json';
import news from '@mocks/data/newsList.json';
import hire from '@mocks/data/hireList.json';

interface PostData {
  id: number;
  title: string;
  writer?: string;
  createAt: string;
  contents: string;
}

const CommunityPostPage = () => {
  const { id, sort } = useParams();
  const [data, setData] = useState<PostData[]>([]);

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
      <CommunityHeader />
      <PostContentSection id={id} sort={sort} data={data} />
      <PostCommentSection />
    </Content>
  );
};

export default CommunityPostPage;
