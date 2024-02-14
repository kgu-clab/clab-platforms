import { PostItem } from './post';

export interface HireItem extends PostItem {
  careerLevel?: string;
  employmentType?: string;
  companyName?: string;
  recruitmentPeriod: string;
  jobPostingUrl: string;
  memberImageUrl?: string;
  content: string;
}
