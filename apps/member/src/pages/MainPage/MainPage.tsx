import { Suspense } from 'react';
import Content from '@components/common/Content/Content';
import { PATH } from '@constants/path';
import { useNews, useHire } from '@hooks/queries';
import { useBoardsList } from '@hooks/queries/useBoardsList';
import MainNoticeSection from '@components/main/MainNoticeSection/MainNoticeSection';
import {
  BoardSection,
  BoardSectionItem,
} from '@components/community/BoardSection';
import MainBanner from '@components/main/MainBanner/MainBanner';
import BirthdaySection from '@components/main/BirthdaySection/BirthdaySection';
import BlogSection from '@components/main/BlogSection/BlogSection';
import OrganizationNewsSection from '@components/main/OrganizationNewsSection/OrganizationNewsSection';

const MainPage = () => {
  const { data: noticeData } = useBoardsList({ category: 'notice' });
  const { data: QnAData } = useBoardsList({ category: 'qna' });
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
      <Suspense>
        <OrganizationNewsSection />
      </Suspense>
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
      <Suspense>
        <BlogSection />
      </Suspense>
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
