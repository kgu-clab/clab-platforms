export type SupportCategoryType = 'BUG' | 'INQUIRY';

export type SupportCategoryKorType = '버그' | '문의';

export interface SupportWriteItem {
  category: SupportCategoryType;
  title: string;
  content: string;
  wantAnonymous: boolean;
  fileUrlList?: Array<string>;
  imageUrl?: string;
}
export interface SupportAnswerItem {
  isAnswered: boolean;
  answer?: string;
  responder?: string;
  answeredAt?: string;
}

export interface SupportItem extends SupportAnswerItem {
  id: number;
  title: string;
  content: string;
  category: SupportCategoryType;
  memberId: string | null;
  memberName: string;
  createdAt: string;
  imageUrl?: string;
}
