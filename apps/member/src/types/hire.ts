import type { PostItem } from './post';

/**
 * 경력 수준
 * 신입 | 경력 | 무관
 */
export type CareerLevel = 'FRESHMAN' | 'EXPERIENCED' | 'NOT_SPECIFIED';
/**
 * 고용 형태
 * 정규직 | 계약직 | 인턴 | 어시스턴트 | 파트타임
 */
export type EmploymentType =
  | 'FULL_TIME'
  | 'CONTRACT'
  | 'INTERN'
  | 'ASSISTANT'
  | 'PART_TIME';

export interface HireItem extends Omit<PostItem, 'isOwner' | 'category'> {
  careerLevel: CareerLevel;
  recruitmentPeriod: string;
  jobPostingUrl: string;
  companyName: string;
  employmentType: EmploymentType | null;
}
