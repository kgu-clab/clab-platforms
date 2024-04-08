import { useNavigate } from 'react-router-dom';
import { Button } from '@clab/design-system';
import { PATH } from '@constants/path';
import Content from '@components/common/Content/Content';
import Header from '@components/common/Header/Header';
import CommunityBoardCollectSection from '@components/community/CommunityBoardCollectSection/CommunityBoardCollectSection';
import { useHire, useNews, useBoardsList, useBoards } from '@hooks/queries';
import {
  BoardSection,
  BoardSectionItem,
} from '@components/community/BoardSection';

const CommunityPage = () => {
  const navigate = useNavigate();

  const { data: noticeData } = useBoardsList({ category: 'notice' });
  const { data: freeData } = useBoardsList({ category: 'free' });
  const { data: QnAData } = useBoardsList({ category: 'qna' });
  const { data: graduatedData } = useBoardsList({ category: 'graduated' });
  const { data: newsData } = useNews();
  const { data: hireData } = useHire();
  const { data: collectData } = useBoards({ page: 0, size: 6 });

  return (
    <Content>
      <Header title={'커뮤니티'}>
        <Button size="sm" onClick={() => navigate(PATH.COMMUNITY_WRITE)}>
          글쓰기
        </Button>
      </Header>
      <BoardSection>
        <BoardSectionItem
          title="공지사항"
          data={noticeData.items}
          to={PATH.COMMUNITY_NOTICE}
        />
        <BoardSectionItem
          title="자유"
          data={freeData.items}
          to={PATH.COMMUNITY_FREE}
        />
        <BoardSectionItem
          title="QnA"
          data={QnAData.items}
          to={PATH.COMMUNITY_QNA}
        />
        <BoardSectionItem
          title="졸업생"
          data={graduatedData.items}
          to={PATH.COMMUNITY_GRADUATED}
        />
        <BoardSectionItem
          title="IT 뉴스"
          data={newsData.items}
          to={PATH.COMMUNITY_NEWS}
        />
        <BoardSectionItem
          title="채용 정보"
          data={hireData.items}
          to={PATH.COMMUNITY_HIRE}
        />
      </BoardSection>
      <CommunityBoardCollectSection data={collectData.items} />
    </Content>
  );
};
export default CommunityPage;
