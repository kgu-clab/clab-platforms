export interface MembershipFeeType {
  id?: number;
  memberId?: string;
  memberName?: string;
  category: string;
  amount: number;
  content: string;
  imageUrl?: string;
  createdAt?: string;
}
