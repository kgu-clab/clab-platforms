export type ApplicationType = 'NORMAL' | 'OPERATION' | 'CORE_TEAM';

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
