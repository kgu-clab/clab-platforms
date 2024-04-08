import { PostItem } from './post';

export interface NewsItem extends Omit<PostItem, 'writerName'> {
  articleUrl: string;
  date: string;
  source: string;
  content: string;
  files: string[];
}
