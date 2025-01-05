import { HASHTAG_CATEGORIES } from '@constants/hashtag';

export type HashtagCategoryType =
  (typeof HASHTAG_CATEGORIES)[keyof typeof HASHTAG_CATEGORIES];

export interface Hashtag {
  id: number;
  name: string;
  boardUsageCount: number;
  hashtagCategory: HashtagCategoryType;
}

export interface HashtagBoardItem {
  id: number;
  boardId: number;
  hashtagId: number;
  name: string;
}
