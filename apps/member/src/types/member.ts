/**
 * 멤버 프로필 정보
 */
export interface MemberProfileType {
  id: string;
  name: string;
  interests: string;
  contact: string;
  email: string;
  address: string;
  githubUrl: string;
  imageUrl: string | null;
  roleLevel: number;
  createdAt: string;
  password?: string;
}

export interface MemberType {
  id: string;
  password?: string;
  name: string;
  contact: string;
  email: string;
  department: string;
  grade: number;
  birth: string;
  address: string;
  interests: string;
  githubUrl: string;
  studentStatus: string;
  imageUrl?: string;
}
/**
 * 멤버 정보 수정
 */
export interface MemberProfileRequestType {
  password?: string;
  contact?: string;
  email?: string;
  grade?: string;
  birth?: string;
  address?: string;
  interests?: string;
  githubUrl?: string;
  studentStatus?: string;
  imageUrl?: string | null;
}
