import { PostItem } from './post';

export type CommunityCategoryType =
  | 'notice'
  | 'free'
  | 'qna'
  | 'graduated'
  | 'news'
  | 'hire'
  | 'organization';

export type CommunityCategoryKorType =
  | '공지사항'
  | '자유'
  | 'QnA'
  | '졸업생'
  | 'IT 뉴스'
  | '채용 정보'
  | '소식';

export interface CommunityPostItem extends PostItem {}

export interface CommunityWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnonymous: boolean;
}

export interface CommunityPostDetailItem extends PostItem {
  writerId: string | null; // 익명일 경우 null
  writerRoleLevel: number | null; // 익명일 경우 null
  writerImageUrl: string | null; // 기본 사진일 경우 null
  content: string;
  likes: number;
  hasLikeByMe: boolean;
  files: [];
}
