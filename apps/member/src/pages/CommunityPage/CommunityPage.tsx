import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import Button from '@components/common/Button/Button';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import noticeList from '@mocks/data/noticeList.json';
import communityList from '@mocks/data/communityList.json';
import gassipList from '@mocks/data/gassipList.json';
import itNewsList from '@mocks/data/itNewsList.json';
import hireList from '@mocks/data/hireList.json';
import graduatedList from '@mocks/data/graduatedList.json';

const CommunityPage = () => {
  const navigate = useNavigate();
  const borderNumber = 8;

  return (
    <Content>
      <Header title={['커뮤니티']}>
        <Button size="sm" onClick={() => navigate(PATH.COMMUNITY_WRITE)}>
          글쓰기
        </Button>
      </Header>
      <CommunitySection.Wrapper>
        <CommunitySection
          title="공지사항"
          data={noticeList}
          to={PATH.COMMUNITY_NOTICE}
          number={borderNumber}
        />
        <CommunitySection
          title="자유"
          data={gassipList}
          to={PATH.COMMUNITY_GASSIP}
          number={borderNumber}
        />
        <CommunitySection
          title="QnA"
          data={communityList}
          to={PATH.COMMUNITY_QNA}
          number={borderNumber}
        />
        <CommunitySection
          title="졸업생"
          data={graduatedList}
          to={PATH.COMMUNITY_GRADUATED}
          number={borderNumber}
        />
        <CommunitySection
          title="IT 뉴스"
          data={itNewsList}
          to={PATH.COMMUNITY_NEWS}
          number={borderNumber}
        />
        <CommunitySection
          title="채용 정보"
          data={hireList}
          to={PATH.COMMUNITY_HIRE}
          number={borderNumber}
        />
      </CommunitySection.Wrapper>
    </Content>
  );
};
export default CommunityPage;
