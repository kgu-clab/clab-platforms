import { ROLE_LEVEL } from '@constants/state';

/**
 * 계정의 권한 레벨
 * 익명일 경우 null
 */
export type RoleLevelType = (typeof ROLE_LEVEL)[keyof typeof ROLE_LEVEL];
/**
 * 계정 권한의 string
 */
export type RoleLevelKey = keyof typeof ROLE_LEVEL;

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
  roleLevel: RoleLevelType;
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
