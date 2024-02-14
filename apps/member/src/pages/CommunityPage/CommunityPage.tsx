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

  const { data: noticeData } = useCommunityList('공지사항');
  const { data: freeData } = useCommunityList('자유');
  const { data: QnAData } = useCommunityList('QnA');
  const { data: graduatedData } = useCommunityList('졸업생');
  const { data: newsData } = useNews();
  const { data: hireData } = useHire();

  return (
    <Content>
      <Header title={'커뮤니티'}>
        <Button size="sm" onClick={() => navigate(PATH.COMMUNITY_WRITE)}>
          글쓰기
        </Button>
      </Header>
      <CommunitySection>
        <CommunitySection.List
          title="공지사항"
          data={noticeData.items}
          to={PATH.COMMUNITY_NOTICE}
        />
        <CommunitySection.List
          title="자유"
          data={freeData.items}
          to={PATH.COMMUNITY_FREE}
        />
        <CommunitySection.List
          title="QnA"
          data={QnAData.items}
          to={PATH.COMMUNITY_QNA}
        />
        <CommunitySection.List
          title="졸업생"
          data={graduatedData.items}
          to={PATH.COMMUNITY_GRADUATED}
        />
        <CommunitySection.List
          title="IT 뉴스"
          data={newsData.items}
          to={PATH.COMMUNITY_NEWS}
        />
        <CommunitySection.List
          title="채용 정보"
          data={hireData.items}
          to={PATH.COMMUNITY_HIRE}
        />
      </CommunitySection>
    </Content>
  );
};
export default CommunityPage;
