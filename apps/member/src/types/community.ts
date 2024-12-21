import type { RoleLevelType } from './member';

export type CommunityCategoryType =
  | 'notice'
  | 'free'
  | 'development_qna'
  | 'information_reviews'
  | 'news'
  | 'hire'
  | 'organization';

export type CommunityCategoryKorType =
  | '공지사항'
  | '자유'
  | '개발 질문'
  | '정보 및 후기'
  | 'IT 뉴스'
  | '채용 정보'
  | '소식';

/**
 * 경력 수준
 * 신입 | 경력 | 무관
 */
export type CareerLevel = 'FRESHMAN' | 'EXPERIENCED' | 'NOT_SPECIFIED';
/**
 * 고용 형태
 * 정규직 | 계약직 | 인턴 | 어시스턴트 | 파트타임
 */
export type EmploymentType =
  | 'FULL_TIME'
  | 'CONTRACT'
  | 'INTERN'
  | 'ASSISTANT'
  | 'PART_TIME';

export interface Board {
  id: number;
  category: CommunityCategoryType;
  title: string;
  writerId: string;
  content: string;
  commentCount: number;
  writerName: string;
  imageUrl: string | null;
  createdAt: string;
}

export interface CommunityPostItem {
  id: number;
  title: string;
  commentCount: number;
  writerId: string | null; // 익명일 경우 null
  writerName: string;
  createdAt: string;
  isOwner: boolean;
  category: CommunityCategoryType;
}

export interface CommunityWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnonymous: boolean;
  fileUrlList?: string[];
  imageUrl?: string;
}

export interface CommunityPostEmojiItem {
  emoji: string;
  count: number;
  isOwner: boolean;
}

export interface CommunityPostDetailItem extends CommunityPostItem {
  writerRoleLevel: RoleLevelType; // 익명일 경우 null
  writerImageUrl: string | null; // 기본 사진일 경우 null
  content: string;
  likes: number;
  hasLikeByMe: boolean;
  files: [];
  imageUrl: string | null;
  emojiInfos?: Array<CommunityPostEmojiItem>;
  hashtag?: Array<string>;
}

export interface CommunityHireBoard
  extends Omit<CommunityPostItem, 'isOwner' | 'category'> {
  careerLevel: CareerLevel;
  recruitmentPeriod: string;
  jobPostingUrl: string;
  companyName: string;
  employmentType: EmploymentType | null;
}

export interface CommunityNewsBoard extends CommunityPostItem {
  articleUrl: string;
  date: string;
  source: string;
  content: string;
  files: string[];
}

export interface CommunityReactionItem {
  boardId: number;
  category: CommunityCategoryType;
  emoji: string;
  isDeleted: boolean;
}
