import { ApplicationType } from './application';

export interface RecruitmentType {
  id: number;
  startDate: string;
  endDate: string;
  applicationType: ApplicationType;
  target: string;
  status: string;
  updatedAt: string;
}
