import { PostItem } from './post';

export interface NewsItem extends PostItem {
  content?: string;
  articleUrl: string;
  source?: string;
  date: string;
  memberImageUrl?: string;
}
