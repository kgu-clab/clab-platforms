import { LiaCommentSolid } from 'react-icons/lia';
import { Link } from 'react-router-dom';

import Section from '@components/common/Section/Section';

import { PATH_FINDER } from '@constants/path';
import { useBoards } from '@hooks/queries';
import { categoryToTitle } from '@utils/community';
import { formattedDate } from '@utils/date';

const CommunityBoardCollectSection = () => {
  const { data } = useBoards({ page: 0, size: 6 });

  return (
    <Section>
      <Section.Header
        title="모아보기"
        description="커뮤니티 게시글을 최신순으로 모아봤어요"
      />
      <Section.Body className="flex flex-col gap-4">
        {data.items.map(
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
              className="hover:border-clab-main-light flex items-center gap-4 text-nowrap rounded-lg border p-2 text-sm transition-colors"
            >
              <p className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 font-semibold">
                {categoryToTitle(category)}
              </p>
              <div className="grid w-full">
                <p className="truncate font-semibold">{title}</p>
                <p className="truncate text-gray-500 ">{content}</p>
              </div>
              <div className="flex justify-between gap-2">
                <p className="flex w-12 items-center gap-1">
                  <LiaCommentSolid />
                  {commentCount}
                </p>
                <div className="w-32">
                  <p>
                    {writerName} {writerId && `(${writerId})`}
                  </p>
                  <p>{formattedDate(createdAt)}</p>
                </div>
              </div>
            </Link>
          ),
        )}
      </Section.Body>
    </Section>
  );
};

export default CommunityBoardCollectSection;
