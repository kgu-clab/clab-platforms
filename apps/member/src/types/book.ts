export type Bookstore = 'kyobobook' | 'yes24' | 'aladin';
export type BookstoreKorean = '교보문고' | '예스24' | '알라딘';

export type BookConditionStatus =
  | 'PENDING'
  | 'APPROVED'
  | 'REJECTED'
  | 'RETURNED';

export interface Book {
  category: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl?: string;
  reviewLinks?: Array<string>;
}

export interface BookItem extends Book {
  id: number;
  borrowerId: string | null;
  borrowerName: string | null;
  dueDate: null;
  createdAt: string;
  updatedAt: string | null;
}

export interface BookLoanRecordConditionType {
  bookLoanRecordId: number;
  bookId: number;
  borrowerId: string;
  borrowerName: string;
  dueDate: string | null;
  bookTitle: string;
  bookImageUrl: string;
  borrowedAt: string | null;
  returnedAt: string | null;
  loanExtensionCount: number | null;
  status: BookConditionStatus;
}

export interface BookLoanRecordOverDueResponse {
  bookId: number;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowedAt: string;
  dueDate: string;
}
