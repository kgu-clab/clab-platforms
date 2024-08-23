import type { CommunityCategoryType } from './community';
import type { RoleLevelType } from './member';

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

export interface CommentListItem extends CommentItem {
  writerId: string | null;
  writerRoleLevel: RoleLevelType;
  children: Array<CommentListItem>;
  isOwner: boolean;
  isDeleted: boolean;
}
