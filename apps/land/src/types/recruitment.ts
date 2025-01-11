import { APPLICATION_TYPE } from '@/constants';

export type ApplicationType = keyof typeof APPLICATION_TYPE;

export interface Recruitment {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  applicationType: ApplicationType;
  target: string;
  status: string;
  updatedAt: string;
}

export interface RecruitmentDetailItem extends Recruitment {
  teamIntroduction: string;
  processTimeLine: string;
  jobDescription: string;
}
