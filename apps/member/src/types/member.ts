/**
 * 멤버 정보
 */
export interface MemberInfo {
  id: string;
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
  imageUrl: string | null;
  role: string;
  createdAt: string;
  lastLoginTime: string;
  loanSuspensionDate: string | null;
}
/**
 * 멤버 프로필 정보
 */
export interface MemberProfileType extends MemberInfo {
  roleLevel: number;
  password?: string;
}
/**
 * 멤버 정보 수정
 */
export interface MemberProfileRequestType {
  password?: string;
  contact?: string;
  email?: string;
  grade?: number;
  birth?: string;
  address?: string;
  interests?: string;
  githubUrl?: string;
  studentStatus?: string;
  imageUrl?: string | null;
}
