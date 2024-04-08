import Linker from '@components/common/Linker/Linker';
import Post from '@components/common/Post/Post';
import { toDecodeHTMLEntities } from '@utils/string';
import type { NewsItem } from '@type/news';
import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityNewsPostProps {
  data: NewsItem;
}

const CommunityNewsPost = ({ data }: CommunityNewsPostProps) => {
  return (
    <Post>
      <Post.Head
        title={toDecodeHTMLEntities(data.title)}
        createdAt={data.createdAt}
      />
      <Post.Body className="min-h-60">
        {toDecodeHTMLEntities(data.content)}
      </Post.Body>
      <Linker to={data.articleUrl} target="_blank" className="block text-right">
        {data.source}에서 이어서 읽을 수 있어요
      </Linker>
      <Post.Footer>
        <CommunityReportButton id={data.id} />
      </Post.Footer>
    </Post>
  );
};

export default CommunityNewsPost;
