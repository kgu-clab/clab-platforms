import type { CommunityCategoryType } from './community';

export interface PostItem {
  id: number;
  title: string;
  writerId: string | null; // 익명일 경우 null
  writerName: string;
  createdAt: string;
  isOwner: boolean;
  category?: CommunityCategoryType;
}
