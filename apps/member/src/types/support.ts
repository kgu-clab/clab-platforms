/**
 * SupportRequestForm에서 사용되는 데이터 타입
 */
export interface SupportRequestDataType {
  category: string;
  amount: number;
  content: string;
  account: string;
  file: File | null;
}
