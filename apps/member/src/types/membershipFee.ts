/**
 * 회비 상태 타입
 */
export type MembershipStatusType = 'PENDING' | 'HOLD' | 'APPROVED' | 'REJECTED';
/**
 * 회비 신청 인터페이스
 */
export interface MembershipFeeRequestType {
  imageUrl?: string;
  category: string;
  amount: number;
  content: string;
}
/**
 * 회비 정보 인터페이스
 */
export interface MembershipFeeType extends MembershipFeeRequestType {
  id: number;
  memberId: string;
  memberName: string;
  status: MembershipStatusType;
  createdAt: string;
}
