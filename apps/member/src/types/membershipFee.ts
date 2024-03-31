/**
 * 회비 상태 타입
 */
export type MembershipStatusType = 'PENDING' | 'HOLD' | 'APPROVED' | 'REJECTED';
/**
 * 회비 신청 인터페이스
 */
export interface MembershipFeeRequestType {
  category: string;
  account: string;
  amount: number;
  content: string;
  imageUrl?: string;
}
/**
 * 회비 정보 인터페이스
 */
export interface MembershipFeeType extends MembershipFeeRequestType {
  id: number;
  memberId: string;
  memberName: string;
  category: string;
  account: string;
  amount: number;
  content: string;
  imageUrl: string;
  status: MembershipStatusType;
  createdAt: string;
}
