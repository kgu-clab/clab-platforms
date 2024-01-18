import Content from '@components/common/Content/Content';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import noticeList from '@mocks/data/noticeList.json';
import communityList from '@mocks/data/communityList.json';
import gassipList from '@mocks/data/gassipList.json';
import itNewsList from '@mocks/data/itNewsList.json';
import hireList from '@mocks/data/hireList.json';
import graduatedList from '@mocks/data/graduatedList.json';
import CommunityHeader from '@components/community/CommunityHeader';

const CommunityPage = () => {
  return (
    <Content>
      <CommunityHeader />
      <div className="grid grid-cols-2 gap-4">
        <CommunitySection
          title="공지사항"
          data={noticeList}
          to="/community/notice"
        />
        <CommunitySection
          title="자유"
          data={gassipList}
          to="/community/gassip"
        />
        <CommunitySection
          title="QnA"
          data={communityList}
          to="/community/qna"
        />
        <CommunitySection
          title="졸업생 게시판"
          data={graduatedList}
          to="/community/graduated"
        />
        <CommunitySection
          title="IT 뉴스"
          data={itNewsList}
          to="/community/news"
        />
        <CommunitySection
          title="채용 정보"
          data={hireList}
          to="/community/hire"
        />
      </div>
    </Content>
  );
};
export default CommunityPage;
