import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import { Button } from '@clab/design-system';
import { PATH } from '@constants/path';
import { useNavigate } from 'react-router-dom';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import { useCommunityList } from '@hooks/queries/useCommunityList';
import { useHire } from '@hooks/queries/useHire';
import { useNews } from '@hooks/queries/useNews';

const CommunityPage = () => {
  const navigate = useNavigate();
  const borderNumber = 8;
  const { data: noticeData } = useCommunityList('공지사항', 0, 6);
  const { data: freeData } = useCommunityList('자유', 0, 6);
  const { data: QnAData } = useCommunityList('QnA', 0, 6);
  const { data: graduatedData } = useCommunityList('졸업생', 0, 6);
  const { data: ITNewsData } = useNews(0, 6);
  const { data: hireData } = useHire(0, 6);

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
          data={noticeData.items}
          to={PATH.COMMUNITY_NOTICE}
          number={borderNumber}
        />
        <CommunitySection
          title="자유"
          data={freeData.items}
          to={PATH.COMMUNITY_FREE}
          number={borderNumber}
        />
        <CommunitySection
          title="QnA"
          data={QnAData.items}
          to={PATH.COMMUNITY_QNA}
          number={borderNumber}
        />
        <CommunitySection
          title="졸업생"
          data={graduatedData.items}
          to={PATH.COMMUNITY_GRADUATED}
          number={borderNumber}
        />
        <CommunitySection
          title="IT 뉴스"
          data={ITNewsData.items}
          to={PATH.COMMUNITY_NEWS}
          number={borderNumber}
        />
        <CommunitySection
          title="채용 정보"
          data={hireData.items}
          to={PATH.COMMUNITY_HIRE}
          number={borderNumber}
        />
      </CommunitySection.Wrapper>
    </Content>
  );
};
export default CommunityPage;
