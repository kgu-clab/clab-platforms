export type InquiryCategoryType = 'bug' | 'inquiry';

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
  // 답변 정보
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

  // 작성자 정보
  memberId: string | null;
  memberName: string;
  createdAt: string;
  imageUrl?: string;
  isOwner: boolean;
}

export type InquiryCategoryKorType = '버그' | '문의';
