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
  dueDate?: string | null;
  borrowerId: string;
  borrowedAt?: string;
  returnedAt?: string;
  loanExtensionDate?: string;
}

export interface BookLoanRecordConditionType extends BookLoanRecordItem {
  bookTitle: string;
  bookImageUrl: string;
  loanExtensionCount: number | null;
}
