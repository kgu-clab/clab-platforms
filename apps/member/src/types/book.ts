export interface BookItem {
  id: number;
  borrowerId: string | null;
  borrowerName: string | null;
  category: string;
  title: string;
  author: string;
  publisher: string;
  imageUrl: string;
  createdAt: string;
  updateTime: string | null;
}

export interface BookLoanRecordItem {
  bookId: number;
  borrowerId: string;
  borrowerName: string;
  dueDate: string;
  borrowedAt: string;
  returnedAt: string | null;
  loanExtensionDate?: string;
}

export interface BookLoanRecordConditionType extends BookLoanRecordItem {
  bookTitle: string;
  bookImageUrl: string;
  loanExtensionCount: number | null;
}

export interface BookLoanRecordOverDueResponse {
  bookId: number;
  bookTitle: string;
  borrowerId: string;
  borrowerName: string;
  borrowedAt: string;
  dueDate: string;
}
