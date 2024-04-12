import { Button, DetailsList } from '@clab/design-system';

import Post from '@components/common/Post/Post';

import { toDecodeHTMLEntities } from '@utils/string';

import type { CareerLevel, EmploymentType, HireItem } from '@type/hire';

import CommunityReportButton from '../CommunityReportButton/CommunityReportButton';

interface CommunityHirePostProps {
  data: HireItem;
}

const toKoreaCareerLevel = (careerLevel: CareerLevel) => {
  switch (careerLevel) {
    case 'FRESHMAN':
      return '신입';
    case 'EXPERIENCED':
      return '경력';
    case 'NOT_SPECIFIED':
      return '무관';
    default:
      return '-';
  }
};

const toKoreaEmploymentType = (employmentType: EmploymentType | null) => {
  switch (employmentType) {
    case 'FULL_TIME':
      return '정규직';
    case 'CONTRACT':
      return '계약직';
    case 'INTERN':
      return '인턴';
    case 'ASSISTANT':
      return '어시스턴트';
    case 'PART_TIME':
      return '파트타임';
    default:
      return '-';
  }
};

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
