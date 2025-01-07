import { APPLICATION_TYPE } from '@/constants';

export type ApplicationType = keyof typeof APPLICATION_TYPE;

export interface Recruitment {
  id: number;
  startDate: string;
  endDate: string;
  applicationType: ApplicationType;
  target: string;
  status: string;
  updatedAt: string;
}
