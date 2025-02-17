import { ApplicationType } from './recruitment';

export type ApplicationForm = {
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
  githubUrl: string;
  applicationType: ApplicationType;
};

export type ApplicationResult = {
  recruitmentId: number;
  name: string;
  applicationType: ApplicationType;
  isPass: boolean;
};

export type Question = {
  id: number;
  question: string;
  answer: string;
};
