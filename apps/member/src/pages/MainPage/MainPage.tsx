import Content from '@components/common/Content/Content';
import AlertList from '@components/common/AlertList/AlertList';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';

import bannerList from '@mocks/data/mainBannerList.json';
import alertList from '@mocks/data/mainAlertList.json';
import noticeList from '@mocks/data/noticeList.json';
import newsList from '@mocks/data/newsList.json';
import communityList from '@mocks/data/communityList.json';
import birthdayList from '@mocks/data/birthdayList.json';
import blogList from '@mocks/data/blogList.json';
import { PATH } from '@constants/path';

const MainPage = () => {
  return (
    <Content>
      <AlertList data={alertList} />
      <ImageBanner data={bannerList} />
      <NewsCardSection
        to={PATH.NEWS}
        title="최근 동아리 소식은?"
        data={newsList}
      />
      <CommunitySection.Wrapper>
        <CommunitySection title="공지사항" data={noticeList} />
        <CommunitySection title="커뮤니티" data={communityList} />
      </CommunitySection.Wrapper>
      <BirthdayList data={birthdayList} />
      <NewsCardSection to={PATH.BLOG} title="기술 블로그" data={blogList} />
    </Content>
  );
};

export default MainPage;
