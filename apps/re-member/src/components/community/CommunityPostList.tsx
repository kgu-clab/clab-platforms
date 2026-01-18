import type { PostData } from "@/types/community";
import CommunityPostItem from "./CommunityPostItem";

interface PostItem {
  postData: PostData;
  chipLabel?: string;
}

const MOCK_POSTS: PostItem[] = [
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

export default function CommunityPostList() {
  return (
    <div className="flex flex-col">
      {MOCK_POSTS.map((post) => (
        <CommunityPostItem
          key={post.postData.id}
          postData={post.postData}
          chipLabel={post.chipLabel}
        />
      ))}
    </div>
  );
}
