import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import {
  freeBoardList,
  graduatedBoardList,
  hireBoardList,
  itNewsBoardList,
  noticeBoardList,
  qnaBoardList,
} from '@mocks/mocks';

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
          data={noticeBoardList}
          to={PATH.COMMUNITY_NOTICE}
          number={borderNumber}
        />
        <CommunitySection
          title="자유"
          data={freeBoardList}
          to={PATH.COMMUNITY_FREE}
          number={borderNumber}
        />
        <CommunitySection
          title="QnA"
          data={qnaBoardList}
          to={PATH.COMMUNITY_QNA}
          number={borderNumber}
        />
        <CommunitySection
          title="졸업생"
          data={graduatedBoardList}
          to={PATH.COMMUNITY_GRADUATED}
          number={borderNumber}
        />
        <CommunitySection
          title="IT 뉴스"
          data={itNewsBoardList}
          to={PATH.COMMUNITY_NEWS}
          number={borderNumber}
        />
        <CommunitySection
          title="채용 정보"
          data={hireBoardList}
          to={PATH.COMMUNITY_HIRE}
          number={borderNumber}
        />
      </CommunitySection.Wrapper>
    </Content>
  );
};
export default CommunityPage;
