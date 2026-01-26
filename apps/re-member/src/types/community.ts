export const CATEGORY = {
  NOTICE: "notice",
  FREE: "free",
  QUESTION: "question",
  INFORMATION: "information",
};

export interface PostItem {
  postData: PostData;
  chipLabel?: string;
}

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
  isDeleted: boolean;
  writerId: string;
  writerName: string;
  writerImageUrl: string;
  writerRoleLevel: number;
  content: string;
  likes: number;
  hasLikeByMe: boolean;
  createdAt: string;
  isOwner: boolean;
}

export interface MyCommentData extends PostDetailCommentData {
  boardId: number;
  boardCategory: string;
}
