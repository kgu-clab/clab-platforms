import type { CommunityCategoryKorType } from './community';

export interface BoardType {
  id: number;
  category: CommunityCategoryKorType;
  title: string;
}

export interface BoardItem extends BoardType {
  writerId: number;
  content: string;
  commentCount: number;
  writerName: string;
  createdAt: string;
}
