import { Suspense } from 'react';
import Content from '@components/common/Content/Content';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import { PATH } from '@constants/path';
import { useNews, useBlog, useHire } from '@hooks/queries';
import { useBoardsList } from '@hooks/queries/useBoardsList';
import MainNoticeSection from '@components/main/MainNoticeSection/MainNoticeSection';
import {
  BoardSection,
  BoardSectionItem,
} from '@components/community/BoardSection';
import MainBanner from '@components/main/MainBanner/MainBanner';
import BirthdaySection from '@components/main/BirthdaySection/BirthdaySection';

const MainPage = () => {
  const { data: noticeData } = useBoardsList({ category: 'notice' });
  const { data: QnAData } = useBoardsList({ category: 'qna' });
  const { data: blogData } = useBlog();
  const { data: ITNewsData } = useNews();
  const { data: hireData } = useHire();

  return (
    <Content>
      <Suspense>
        <MainNoticeSection />
      </Suspense>
      <Suspense>
        <MainBanner />
      </Suspense>
      <NewsCardSection to={PATH.NEWS} title="최근 동아리 소식은?" />
      <BoardSection>
        <BoardSectionItem
          title="공지사항"
          to={PATH.COMMUNITY_NOTICE}
          data={noticeData.items}
        />
        <BoardSectionItem
          title="QnA"
          to={PATH.COMMUNITY_QNA}
          data={QnAData.items}
        />
      </BoardSection>
      <Suspense>
        <BirthdaySection />
      </Suspense>
      <NewsCardSection
        to={PATH.BLOG}
        title="기술 블로그"
        data={blogData.items}
      />
      <BoardSection>
        <BoardSectionItem
          title="IT 소식"
          to={PATH.COMMUNITY_NEWS}
          data={ITNewsData.items}
        />
        <BoardSectionItem
          title="채용 정보"
          to={PATH.COMMUNITY_HIRE}
          data={hireData.items}
        />
      </BoardSection>
    </Content>
  );
};

export default MainPage;
