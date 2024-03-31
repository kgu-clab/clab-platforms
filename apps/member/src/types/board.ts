import type { CommunityCategoryKorType } from './community';

export interface BoardItem {
  id: number;
  category: CommunityCategoryKorType;
  title: string;
  writer: string;
  createdAt: string;
}
