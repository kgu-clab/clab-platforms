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
