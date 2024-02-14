import { PostItem } from './post';

export interface CommunityPostItem extends PostItem {}

export interface CommunityWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnonymous: boolean;
}

export interface CommunityPostDetailItem {
  id: number;
  writer: string;
  memberImageUrl: string;
  title: string;
  content: string;
  likes: number;
  hasLikeByMe: boolean;
  createdAt: string;
}
