export type SupportCategoryType = 'BUG' | 'INQUIRY';

export type SupportCategoryKorType = '버그' | '문의';

export interface Support {
  id: number;
  title: string;
  name: string;
  createdAt: string;
  writerId: string | null; // 익명일 경우 null
  status: 'PENDING' | 'COMPLETED';
  category: SupportCategoryType;
}

export interface SupportWriteItem {
  category: SupportCategoryType;
  title: string;
  id?: number;
  content: string;
  wantAnonymous: boolean;
  fileUrlList?: Array<string>;
  imageUrl?: string;
}

export interface SupportAnswerItem {
  id?: number;
  content?: string;
  responder?: string;
  createdAt?: string;
}

export interface SupportDetail extends Support {
  content: string;
  wantAnonymous: boolean;
  fileUrlList?: Array<string>;
  imageUrl?: string;
  answer?: SupportAnswerItem;
  isOwner: boolean;
}
