import type { CommunityCategoryType } from './community';

export interface CommentItem {
  id: number;
  writerName: string;
  writerImageUrl: string;
  content: string;
  boardId: number;
  boardCategory: CommunityCategoryType;
  hasLikeByMe: boolean;
  likes: number;
  writer: string;
  createdAt: string;
}

export interface CommentListItem {
  id: number;
  writer: string;
  writerImageUrl: string;
  content: string;
  children: Array<CommentListItem>;
  likes: number;
  hasLikeByMe: boolean;
  createdAt: string;
}

export interface CommentWriteItem {
  content: string;
  wantAnonymous: boolean;
}
