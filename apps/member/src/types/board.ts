import type { CommunityCategoryKorType } from './community';

export interface BoardType {
  id: number;
  category: CommunityCategoryKorType;
  title: string;
}

export interface BoardItem extends BoardType {
  writer: string;
  createdAt: string;
}
