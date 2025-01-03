export type HashtagCategoryType = 'LANGUAGE' | 'FIELD' | 'SKILL' | 'ETC';

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
