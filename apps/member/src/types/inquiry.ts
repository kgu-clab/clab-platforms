export type InquiryCategoryType = 'BUG' | 'INQUIRY';

export type InquiryCategoryKorType = '버그' | '문의';

export interface InquiryPostPayload {
  title: string;
  content: string;
  category: InquiryCategoryType;
  imageUrl?: string | null;
}
export interface InquiryWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnonymous: boolean;
  fileUrlList?: Array<string>;
  imageUrl?: string;
}
export interface InquiryAnswerItem {
  isAnswered: boolean;
  answer?: string;
  responder?: string;
  answeredAt?: string;
}

export interface InquiryItem extends InquiryAnswerItem {
  id: number;
  title: string;
  content: string;
  category: InquiryCategoryType;
  memberId: string | null;
  memberName: string;
  createdAt: string;
  imageUrl?: string;
  isOwner: boolean;
}
