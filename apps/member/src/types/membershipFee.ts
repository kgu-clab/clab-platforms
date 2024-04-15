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
 * account 필드는 열람 권한이 없을 경우 null
 */
export interface MembershipFeeType
  extends Omit<MembershipFeeRequestType, 'account'> {
  id: number;
  memberId: string;
  memberName: string;
  imageUrl: string;
  status: MembershipStatusType;
  createdAt: string;
  account: string | null;
}
/**
 * 회비 정보 수정 인터페이스
 */
export interface MembershipFeePatchBody {
  category?: string;
  account?: string;
  amount?: number;
  content?: string;
  imageUrl?: string;
  status?: MembershipStatusType;
}
