import Content from '@components/common/Content/Content';
import AlertList from '@components/common/AlertList/AlertList';
import ImageBanner from '@components/common/ImageBanner/ImageBanner';
import NewsCardSection from '@components/main/NewsCardSection/NewsCardSection';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import BirthdayList from '@components/main/BirthdayList/BirthdayList';
import { PATH } from '@constants/path';
import {
  birthdayList,
  blogList,
  hireBoardList,
  itNewsBoardList,
  mainAlertList,
  mainBannerList,
  newsList,
  noticeBoardList,
  qnaBoardList,
} from '@mocks/mocks';

const MainPage = () => {
  return (
    <Content>
      <AlertList data={mainAlertList} />
      <ImageBanner data={mainBannerList} />
      <NewsCardSection
        to={PATH.NEWS}
        title="최근 동아리 소식은?"
        data={newsList}
      />
      <CommunitySection.Wrapper>
        <CommunitySection
          title="공지사항"
          to={PATH.COMMUNITY_NOTICE}
          data={noticeBoardList}
        />
        <CommunitySection
          title="QnA"
          to={PATH.COMMUNITY_QNA}
          data={qnaBoardList}
        />
      </CommunitySection.Wrapper>
      <BirthdayList data={birthdayList} />
      <NewsCardSection to={PATH.BLOG} title="기술 블로그" data={blogList} />
      <CommunitySection.Wrapper>
        <CommunitySection
          title="IT 소식"
          to={PATH.COMMUNITY_NEWS}
          data={itNewsBoardList}
        />
        <CommunitySection
          title="채용 정보"
          to={PATH.COMMUNITY_HIRE}
          data={hireBoardList}
        />
      </CommunitySection.Wrapper>
    </Content>
  );
};

export default MainPage;
