import Content from '@components/common/Content/Content';
import AlertList from '@components/common/AlertList/AlertList';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';
import { PATH } from '@constants/path';

import { useNews } from '@hooks/queries/useNews';
import { useBlog } from '@hooks/queries/useBlog';
import { useHire } from '@hooks/queries/useHire';
import { useBirthday } from '@hooks/queries/useBirthday';
import { useActivityPicture } from '@hooks/queries/useActivityPicture';
import { useMainSchedule } from '@hooks/queries/useSchedule';
import { useBoards } from '@hooks/queries/useBoards';

const MainPage = () => {
  const { data: mainAlertData } = useMainSchedule();
  const { data: mainBannerData } = useActivityPicture();

  const { data: noticeData } = useBoards('notice');
  const { data: QnAData } = useBoards('qna');
  const { data: birthdayData } = useBirthday();
  const { data: blogData } = useBlog();
  const { data: ITNewsData } = useNews();
  const { data: hireData } = useHire();

  return (
    <Content>
      <AlertList data={mainAlertData.items} />
      <ImageBanner data={mainBannerData.items} />
      <NewsCardSection to={PATH.NEWS} title="최근 동아리 소식은?" data={[]} />
      <CommunitySection>
        <CommunitySection.List
          title="공지사항"
          to={PATH.COMMUNITY_NOTICE}
          data={noticeData.items}
        />
        <CommunitySection.List
          title="QnA"
          to={PATH.COMMUNITY_QNA}
          data={QnAData.items}
        />
      </CommunitySection>
      <BirthdayList data={birthdayData.items} />
      <NewsCardSection
        to={PATH.BLOG}
        title="기술 블로그"
        data={blogData.items}
      />
      <CommunitySection>
        <CommunitySection.List
          title="IT 소식"
          to={PATH.COMMUNITY_NEWS}
          data={ITNewsData.items}
        />
        <CommunitySection.List
          title="채용 정보"
          to={PATH.COMMUNITY_HIRE}
          data={hireData.items}
        />
      </CommunitySection>
    </Content>
  );
};

export default MainPage;
