import Content from '@components/common/Content/Content';
import AlertList from '@components/common/AlertList/AlertList';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardList from '@components/main/NewsCardList/NewsCardList';
import CommunityCard from '@components/main/CommunityCard/CommunityCard';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';

import bannerList from '@mocks/data/mainBannerList.json';
import alertList from '@mocks/data/mainAlertList.json';
import noticeList from '@mocks/data/noticeList.json';
import communityList from '@mocks/data/communityList.json';
import birthdayList from '@mocks/data/birthdayList.json';

const MainPage = () => {
  return (
    <Content>
      <AlertList data={alertList} />
      <ImageBanner data={bannerList} />
      <NewsCardList />
      <CommunityCard.Wrapper>
        <CommunityCard title="공지사항" data={noticeList} />
        <CommunityCard title="커뮤니티" data={communityList} />
      </CommunityCard.Wrapper>
      <BirthdayList data={birthdayList} />
    </Content>
  );
};

export default MainPage;
