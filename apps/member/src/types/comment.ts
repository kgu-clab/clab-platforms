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
  writerId: string | null;
  writerName: string;
  writerImageUrl: string;
  writerRoleLevel: number;
  content: string;
  children: Array<CommentListItem>;
  likes: number;
  hasLikeByMe: boolean;
  isOwner: boolean;
  createdAt: string;
}

export interface CommentWriteItem {
  content: string;
  wantAnonymous: boolean;
}
