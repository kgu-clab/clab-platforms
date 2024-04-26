export type Bookstore = 'kyobobook' | 'yes24' | 'aladin';
export type BookstoreKorean = '교보문고' | '예스24' | '알라딘';

export interface BookItem {
  id: number;
  borrowerId: string | null;
  borrowerName: string | null;
  category: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  reviewLinks: Array<string>;
  dueDate: null;
  createdAt: string;
  updatedAt: string | null;
}

export interface BookLoanRecordConditionType {
  bookId: number;
  borrowerId: string;
  borrowerName: string;
  dueDate: string;
  borrowedAt: string;
  returnedAt: string | null;
  bookTitle: string;
  bookImageUrl: string;
  loanExtensionCount: number | null;
  loanExtensionDate?: string;
}

export interface BookLoanRecordOverDueResponse {
  bookId: number;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowedAt: string;
  dueDate: string;
}
