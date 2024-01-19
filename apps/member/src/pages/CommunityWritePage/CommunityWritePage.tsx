import Content from '@components/common/Content/Content';
import CommunityWriteSection from '@components/community/CommunityWriteSection/CommunityWriteSection';
import Header from '@components/common/Header/Header';
import { PATH } from '@constants/path';

const CommunityWritePage = () => {
  return (
    <Content>
      <Header name="커뮤니티" button="글쓰기" to={PATH.COMMUNITY_WRITE} />
      <CommunityWriteSection />
    </Content>
  );
};

export default CommunityWritePage;
