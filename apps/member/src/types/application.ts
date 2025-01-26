import { APPLICATION_TYPE } from '@constants/state';

export type ApplicationType =
  (typeof APPLICATION_TYPE)[keyof typeof APPLICATION_TYPE];

export interface ApplicationMemberType {
  studentId: string;
  recruitmentId: number;
  name: string;
  contact: string;
  email: string;
  department: string;
  grade: number;
  birth: string;
  address: string;
  interests: string;
  otherActivities: string;
  githubUrl?: string;
  applicationType: ApplicationType;
  isPass?: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface Recruitment {
  title: string;
  teamIntroduction: string;
  startDate: string;
  endDate: string;
  processTimeline: string;
  applicationType: ApplicationType;
  jobDescription: string;
  target: string;
}
