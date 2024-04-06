import Section from '@components/common/Section/Section';
import { PATH_FINDER } from '@constants/path';
import { categoryToTitle } from '@utils/community';
import { formattedDate } from '@utils/date';
import { LiaCommentSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';
import type { BoardItem } from '@type/board';

interface CommunityBoardCollectSectionProps {
  data: BoardItem[];
}

const CommunityBoardCollectSection = ({
  data,
}: CommunityBoardCollectSectionProps) => {
  return (
    <Section>
      <Section.Header
        title="모아보기"
        description="커뮤니티 게시글을 최신순으로 모아봤어요"
      />
      <Section.Body className="flex flex-col gap-4">
        {data.map(
          ({
            id,
            writerId,
            writerName,
            title,
            category,
            content,
            commentCount,
            createdAt,
          }) => (
            <Link
              key={id}
              to={PATH_FINDER.COMMUNITY_POST(category, id)}
              className="flex items-center gap-4 p-2 text-sm transition-colors border rounded-lg hover:border-clab-main-light text-nowrap"
            >
              <p className="flex items-center justify-center flex-shrink-0 font-semibold bg-gray-100 rounded-lg size-12">
                {categoryToTitle(category)}
              </p>
              <div className="flex flex-col min-w-0 grow">
                <p className="font-semibold truncate">{title}</p>
                <p className="text-gray-500 truncate">{content}</p>
              </div>
              <p className="flex items-center gap-1">
                <LiaCommentSolid />
                {commentCount}
              </p>
              <div className="flex flex-col">
                <p>
                  {writerName} {writerId && `(${writerId})`}
                </p>
                <p>{formattedDate(createdAt)}</p>
              </div>
            </Link>
          ),
        )}
      </Section.Body>
    </Section>
  );
};

export default CommunityBoardCollectSection;
