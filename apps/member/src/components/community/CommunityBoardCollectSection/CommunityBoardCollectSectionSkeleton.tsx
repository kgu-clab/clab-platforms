import { Section } from '@components/common/Section';

import { BoardCollectCardSkeleton } from '../BoardCollectCard';

const CommunityBoardCollectSectionSkeleton = () => {
  return (
    <Section>
      <Section.Header
        title="모아보기"
        description="커뮤니티 게시글을 최신순으로 모아봤어요"
      />
      <Section.Body>
        <BoardCollectCardSkeleton />
        <BoardCollectCardSkeleton />
      </Section.Body>
    </Section>
  );
};

export default CommunityBoardCollectSectionSkeleton;
