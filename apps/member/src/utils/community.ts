import type { CommunityCategoryType } from '@type/community';
import type { HireItem } from '@type/hire';

export const categoryToTitle = (category: CommunityCategoryType) => {
  switch (category) {
    case 'notice':
      return '공지사항';
    case 'free':
      return '자유';
    case 'qna':
      return 'QnA';
    case 'graduated':
      return '졸업생';
    case 'news':
      return 'IT 뉴스';
    case 'hire':
      return '채용 정보';
  }
};

export const isCommunityCategoryType = (
  type: string,
): type is CommunityCategoryType =>
  ['notice', 'free', 'qna', 'graduated', 'news', 'hire'].includes(type);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHireItem = (item: any): item is HireItem => {
  return (
    item &&
    item.careerLevel &&
    item.employmentType &&
    item.companyName &&
    item.recruitmentPeriod &&
    item.jobPostingUrl
  );
};
