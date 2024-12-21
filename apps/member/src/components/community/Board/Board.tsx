import { PATH } from '@constants/path';
import { useBoardByCategory, useHire, useNews } from '@hooks/queries';
import { useBoardByHot } from '@hooks/queries/board/useBoardByHot';

import { BoardSectionItem } from '../BoardSection';

const NoticeBoard = () => {
  const { data } = useBoardByCategory({ category: 'notice' });

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
  const { data } = useBoardByCategory({ category: 'free' });

  return (
    <BoardSectionItem title="자유" to={PATH.COMMUNITY_FREE} data={data.items} />
  );
};
FreeBoard.displayName = 'NoticeBoard';

const DevelopmentQnABoard = () => {
  const { data } = useBoardByCategory({ category: 'development_qna' });

  return (
    <BoardSectionItem
      title="개발 질문"
      to={PATH.COMMUNITY_DEVELOPMENT_QNA}
      data={data.items}
    />
  );
};
DevelopmentQnABoard.displayName = 'DevelopmentQnABoard';

const InformationReviewsBoard = () => {
  const { data } = useBoardByCategory({ category: 'information_reviews' });

  return (
    <BoardSectionItem
      title="정보 및 후기"
      to={PATH.COMMUNITY_INFORMATION_REVIEWS}
      data={data.items}
    />
  );
};
InformationReviewsBoard.displayName = 'InformationReviewsBoard';

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

const HotBoard = () => {
  const { data } = useBoardByHot();

  return <BoardSectionItem title="HOT" data={data.data} />;
};
HotBoard.displayName = 'HotBoard';

export {
  NoticeBoard,
  FreeBoard,
  DevelopmentQnABoard,
  InformationReviewsBoard,
  NewsBoard,
  HireBoard,
  HotBoard,
};
