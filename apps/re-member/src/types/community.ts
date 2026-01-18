export const CATEGORY = {
  NOTICE: "notice",
  FREE: "free",
  QUESTION: "question",
  INFORMATION: "information",
};

export interface PostData {
  id: number;
  title: string;
  createdAt: string;
  author: string;
  generation: number;
  likeCount: number;
  commentCount: number;
}

export interface PostDetailData {
  author: string;
  generation: number;
  createdAt: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

export interface PostDetailCommentData {
  id: number;
  author: string;
  generation: number;
  createdAt: string;
  content: string;
  likeCount: number;
  isAuthor?: boolean;
}
