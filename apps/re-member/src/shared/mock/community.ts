import type { PostDetailCommentData, PostItem } from "@/types/community";

export const MOCK_CATEGORIES = [
  { id: "free", label: "자유" },
  { id: "field1", label: "분야" },
  { id: "field2", label: "분야" },
  { id: "field3", label: "분야" },
];

export const MOCK_POSTS: PostItem[] = [
  {
    postData: {
      id: 1,
      title: "송년회 참석 투표에 참여해주세요!",
      createdAt: "3분 전",
      author: "한유진",
      generation: 23,
      likeCount: 12,
      commentCount: 12,
    },
    chipLabel: "공지",
  },
  {
    postData: {
      id: 2,
      title: "아자스입니다",
      createdAt: "12분 전",
      author: "한유진",
      generation: 23,
      likeCount: 12,
      commentCount: 12,
    },
    chipLabel: "공지",
  },
  {
    postData: {
      id: 3,
      title: "아자스입니다",
      createdAt: "28분 전",
      author: "한유진",
      generation: 23,
      likeCount: 12,
      commentCount: 12,
    },
    chipLabel: "공지",
  },
  {
    postData: {
      id: 4,
      title: "아자스입니다",
      createdAt: "30분 전",
      author: "한유진",
      generation: 23,
      likeCount: 12,
      commentCount: 12,
    },
  },
];

export const MOCK_POST = {
  author: "한유진",
  generation: 23,
  createdAt: "30분 전",
  content:
    "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!",
  likeCount: 12,
  commentCount: 12,
};

export const MOCK_COMMENTS: PostDetailCommentData[] = [
  {
    id: 1,
    isDeleted: false,
    writerId: "user1",
    writerName: "한유진",
    writerImageUrl: "",
    writerRoleLevel: 1,
    content:
      "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!",
    likes: 12,
    hasLikeByMe: false,
    createdAt: "30분 전",
    isOwner: true,
  },
  {
    id: 2,
    isDeleted: false,
    writerId: "user2",
    writerName: "김민수",
    writerImageUrl: "",
    writerRoleLevel: 1,
    content:
      "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스! 아자아자 아자스!",
    likes: 12,
    hasLikeByMe: true,
    createdAt: "30분 전",
    isOwner: false,
  },
];
