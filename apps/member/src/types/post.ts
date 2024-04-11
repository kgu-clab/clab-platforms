import type { CommunityCategoryType } from './community';

export interface PostItem {
  id: number;
  title: string;
  writerName: string;
  createdAt: string;
  isOwner: boolean;
  category?: CommunityCategoryType;
}
