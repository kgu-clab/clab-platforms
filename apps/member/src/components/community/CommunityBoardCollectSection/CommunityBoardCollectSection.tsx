import Section from '@components/common/Section/Section';

import { useIntersectionObserver } from '@hooks/common/useIntersectionObserver';
import { useBoards } from '@hooks/queries';

import BoardCollectCard from '../BoardCollectCard/BoardCollectCard';

/**
 * 커뮤니티 게시글 모아보기
 * 커뮤니티 게시글을 최신순으로 모아봤어요.
 */
const CommunityBoardCollectSection = () => {
  const { data, fetchNextPage } = useBoards();
  const { targetRef } = useIntersectionObserver({ fetchNextPage });

  return (
    <Section>
      <Section.Header
        title="모아보기"
        description="커뮤니티 게시글을 최신순으로 모아봤어요"
      />
      <Section.Body className="space-y-4">
        {data.map(({ id, ...props }) => (
          <BoardCollectCard key={`board-collect-${id}`} id={id} {...props} />
        ))}
      </Section.Body>
      <div ref={targetRef}></div>
    </Section>
  );
};

export default CommunityBoardCollectSection;
