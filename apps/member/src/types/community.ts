export interface CommunityPostItem {
  id: number;
  category?: string;
  title: string;
  writer: string;
  createdAt: string;
}

export interface CommunityWriteItem {
  category: string;
  title: string;
  content: string;
  wantAnnonymous: boolean;
}

export interface CommunityPostDetailItem {
  id: number;
  writer: string;
  memberImageUrl: string;
  title: string;
  content: string;
  likes: number;
  hasLikeByMe: boolean;
  createdAt: string;
}
