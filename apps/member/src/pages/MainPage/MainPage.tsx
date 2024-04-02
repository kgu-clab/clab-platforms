import Content from '@components/common/Content/Content';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';
import { PATH } from '@constants/path';
import {
  useNews,
  useBlog,
  useSchedule,
  useActivityPicture,
  useBirthday,
  useHire,
} from '@hooks/queries';
import { useBoardsList } from '@hooks/queries/useBoardsList';
import MainAlert from '@components/main/MainAlert/MainAlert';

const MainPage = () => {
  const { data: mainAlertData } = useSchedule({});
  const { data: mainBannerData } = useActivityPicture();
  const { data: noticeData } = useBoardsList({ category: 'notice' });
  const { data: QnAData } = useBoardsList({ category: 'qna' });
  const { data: birthdayData } = useBirthday();
  const { data: blogData } = useBlog();
  const { data: ITNewsData } = useNews();
  const { data: hireData } = useHire();

  return (
    <Content>
      <MainAlert data={mainAlertData.items} />
      <ImageBanner data={mainBannerData.items} />
      <NewsCardSection to={PATH.NEWS} title="최근 동아리 소식은?" />
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
