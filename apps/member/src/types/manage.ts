/*
manage 섹션에서 사용되는 타입입니다.
 */
export type Role = '' | 'ADMIN' | 'USER' | 'SUPER';

export interface AddMemberRequestType {
  id: string;
  password: string;
  name: string;
  email: string;
  contact: string;
  department: string;
  grade: number;
  birth: string;
  address: string;
  interests: string;
  githubUrl?: string;
  studentStatus: string;
  imageUrl?: string;
}
