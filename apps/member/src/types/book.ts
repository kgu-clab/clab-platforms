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
