import { useNavigate } from 'react-router-dom';
import { Button } from '@clab/design-system';
import { PATH } from '@constants/path';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import CommunitySection from '@components/main/CommunitySection/CommunitySection';
import CommunityBoardCollectSection from '@components/community/CommunityBoardCollectSection/CommunityBoardCollectSection';
import { useHire, useNews, useBoardsList, useBoards } from '@hooks/queries';

const CommunityPage = () => {
  const navigate = useNavigate();

  const { data: noticeData } = useBoardsList({ category: 'notice' });
  const { data: freeData } = useBoardsList({ category: 'free' });
  const { data: QnAData } = useBoardsList({ category: 'qna' });
  const { data: graduatedData } = useBoardsList({ category: 'graduated' });
  const { data: newsData } = useNews();
  const { data: hireData } = useHire();
  const { data: allBoardsData } = useBoards({ page: 0, size: 6 });

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
      <CommunityBoardCollectSection data={allBoardsData.items} />
    </Content>
  );
};
export default CommunityPage;
