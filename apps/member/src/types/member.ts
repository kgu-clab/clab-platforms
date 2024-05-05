/**
 * 계정의 권한 레벨
 * 익명일 경우 null
 */
export type RoleLevel = 1 | 2 | 3 | null;

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
  roleLevel: RoleLevel;
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
