import { PostItem } from './post';

export type CommunityCategoryType =
  | 'notice'
  | 'free'
  | 'qna'
  | 'graduated'
  | 'news'
  | 'hire';

export type CommunityCategoryKorType =
  | '공지사항'
  | '자유'
  | 'QnA'
  | '졸업생'
  | 'IT 뉴스'
  | '채용 정보';

export interface CommunityPostItem extends PostItem {}

export interface CommunityWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnonymous: boolean;
}

export interface CommunityPostDetailItem extends PostItem {
  memberImageUrl: string;
  content: string;
  likes: number;
  hasLikeByMe: boolean;
}
