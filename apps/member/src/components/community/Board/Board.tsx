import { PATH } from '@constants/path';
import { useBoardsList, useHire, useNews } from '@hooks/queries';

import { BoardSectionItem } from '../BoardSection';

const NoticeBoard = () => {
  const { data } = useBoardsList({ category: 'notice' });

  return (
    <BoardSectionItem
      title="공지사항"
      to={PATH.COMMUNITY_NOTICE}
      data={data.items}
    />
  );
};
NoticeBoard.displayName = 'NoticeBoard';

const FreeBoard = () => {
  const { data } = useBoardsList({ category: 'free' });

  return (
    <BoardSectionItem title="자유" to={PATH.COMMUNITY_FREE} data={data.items} />
  );
};
FreeBoard.displayName = 'NoticeBoard';

const QnABoard = () => {
  const { data } = useBoardsList({ category: 'qna' });

  return (
    <BoardSectionItem title="QnA" to={PATH.COMMUNITY_QNA} data={data.items} />
  );
};
QnABoard.displayName = 'QnABoard';

const GraduatedBoard = () => {
  const { data } = useBoardsList({ category: 'graduated' });

  return (
    <BoardSectionItem
      title="졸업생"
      to={PATH.COMMUNITY_GRADUATED}
      data={data.items}
    />
  );
};
GraduatedBoard.displayName = 'QnABoard';

const NewsBoard = () => {
  const { data } = useNews();

  return (
    <BoardSectionItem
      title="IT 소식"
      to={PATH.COMMUNITY_NEWS}
      data={data.items}
    />
  );
};
NewsBoard.displayName = 'NewsBoard';

const HireBoard = () => {
  const { data } = useHire();

  return (
    <BoardSectionItem
      title="채용 정보"
      to={PATH.COMMUNITY_HIRE}
      data={data.items}
    />
  );
};
HireBoard.displayName = 'HireBoard';

export {
  NoticeBoard,
  FreeBoard,
  QnABoard,
  GraduatedBoard,
  NewsBoard,
  HireBoard,
};
