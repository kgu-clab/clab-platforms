import { PostItem } from './post';

export interface NewsItem extends PostItem {
  articleUrl: string;
  date: string;
  source: string;
  content: string;
  files: string[];
}
