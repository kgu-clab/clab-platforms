export const BOOK_STATUS = {
  ALL: "all",
  AVAILABLE: "available",
  BORROWED: "borrowed",
} as const;

export type BookStatus = (typeof BOOK_STATUS)[keyof typeof BOOK_STATUS];

export interface BookData {
  id: number;
  borrowerId: number | null;
  borrowerName: string | null;
  category: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BookDetailData extends BookData {
  reviewLinks: string[];
}

export interface BookListResponse {
  currentPage: number;
  hasPrevious: boolean;
  hasNext: boolean;
  totalPages: number;
  totalItems: number;
  take: number;
  items: BookData[];
}
