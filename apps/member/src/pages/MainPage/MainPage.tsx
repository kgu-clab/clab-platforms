import Content from '@components/common/Content/Content';
import AlertList from '@components/common/AlertList/AlertList';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';
import { PATH } from '@constants/path';

import { useCommunity } from '@hooks/queries/useCommunity';
import { useNews } from '@hooks/queries/useNews';
import { useBlog } from '@hooks/queries/useBlog';
import { useHire } from '@hooks/queries/useHire';
import { useBirthday } from '@hooks/queries/useBirthday';
import { useActivityPicture } from '@hooks/queries/useActivityPicture';
import { useMainSchedule } from '@hooks/queries/useSchedule';

const MainPage = () => {
  const { data: mainAlertData } = useMainSchedule();
  const { data: mainBannerData } = useActivityPicture();
  const { data: newsData } = useCommunity(0, 4, '동아리 소식');
  const { data: noticeData } = useCommunity(0, 6, '공지사항');
  const { data: QnAData } = useCommunity(0, 6, 'QnA');
  const { data: blogData } = useBlog();
  const { data: hireData } = useHire();
  const { data: birthdayData } = useBirthday();
  const { data: ITNewsData } = useNews();

  return (
    <Content>
      <AlertList data={mainAlertData.items} />
      <ImageBanner data={mainBannerData.items} />
      <NewsCardSection
        to={PATH.NEWS}
        title="최근 동아리 소식은?"
        data={newsData}
      />
      <CommunitySection.Wrapper>
        <CommunitySection
          title="공지사항"
          to={PATH.COMMUNITY_NOTICE}
          data={noticeData}
        />
        <CommunitySection title="QnA" to={PATH.COMMUNITY_QNA} data={QnAData} />
      </CommunitySection.Wrapper>
      <BirthdayList data={birthdayData.items} />
      <NewsCardSection
        to={PATH.BLOG}
        title="기술 블로그"
        data={blogData.items}
      />
      <CommunitySection.Wrapper>
        <CommunitySection
          title="IT 소식"
          to={PATH.COMMUNITY_NEWS}
          data={ITNewsData.items}
        />
        <CommunitySection
          title="채용 정보"
          to={PATH.COMMUNITY_HIRE}
          data={hireData.items}
        />
      </CommunitySection.Wrapper>
    </Content>
  );
};

export default MainPage;
