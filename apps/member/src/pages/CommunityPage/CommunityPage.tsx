import Content from '@components/common/Content/Content';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import noticeList from '@mocks/data/noticeList.json';
import communityList from '@mocks/data/communityList.json';
import gassipList from '@mocks/data/gassipList.json';
import itNewsList from '@mocks/data/itNewsList.json';
import hireList from '@mocks/data/hireList.json';
import graduatedList from '@mocks/data/graduatedList.json';
import Header from '@components/common/Header/Header';
import { PATH } from '@constants/path';

const CommunityPage = () => {
  return (
    <Content>
      <Header name="커뮤니티" button="글쓰기" to={PATH.COMMUNITY_WRITE} />
      <div className="grid grid-cols-2 gap-4">
        <CommunitySection
          title="공지사항"
          data={noticeList}
          to={PATH.COMMUNITY_NOTICE}
        />
        <CommunitySection
          title="자유"
          data={gassipList}
          to={PATH.COMMUNITY_GASSIP}
        />
        <CommunitySection
          title="QnA"
          data={communityList}
          to={PATH.COMMUNITY_QNA}
        />
        <CommunitySection
          title="졸업생 게시판"
          data={graduatedList}
          to={PATH.COMMUNITY_GRADUATED}
        />
        <CommunitySection
          title="IT 뉴스"
          data={itNewsList}
          to={PATH.COMMUNITY_NEWS}
        />
        <CommunitySection
          title="채용 정보"
          data={hireList}
          to={PATH.COMMUNITY_HIRE}
        />
      </div>
    </Content>
  );
};
export default CommunityPage;
