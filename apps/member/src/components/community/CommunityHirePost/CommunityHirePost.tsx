import { Button, DetailsList } from '@clab/design-system';
import { toDecodeHTMLEntities } from '@clab/utils';

import Post from '@components/common/Post/Post';

import { toKoreaCareerLevel, toKoreaEmploymentType } from '@utils/string';

import type { CommunityHireBoard } from '@type/community';

import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityHirePostProps {
  data: CommunityHireBoard;
}

const CommunityHirePost = ({ data }: CommunityHirePostProps) => {
  return (
    <Post>
      <Post.Head
        title={toDecodeHTMLEntities(data.title)}
        createdAt={data.createdAt}
      />
      <Post.Body className="mx-auto w-full max-w-md space-y-4">
        <DetailsList>
          <DetailsList.Item label="기업명">{data.companyName}</DetailsList.Item>
          <DetailsList.Item label="경력 수준">
            {toKoreaCareerLevel(data.careerLevel)}
          </DetailsList.Item>
          <DetailsList.Item label="고용 형태">
            {toKoreaEmploymentType(data.employmentType)}
          </DetailsList.Item>
          <DetailsList.Item label="채용 기간">
            {data.recruitmentPeriod}
          </DetailsList.Item>
        </DetailsList>
        <Button
          color="green"
          onClick={() => window.open(data.jobPostingUrl)}
          className="w-full"
        >
          지원 공고 보러가기
        </Button>
      </Post.Body>
      <Post.Footer>
        <CommunityReportButton id={data.id} />
      </Post.Footer>
    </Post>
  );
};

export default CommunityHirePost;
