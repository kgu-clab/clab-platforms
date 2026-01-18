import { Header } from "@/components/common";
import {
  PostDetailContent,
  PostDetailCommentInput,
  PostDetailCommentList,
} from "@/components/community";
import { BottomNavbar } from "@/components/menu";
import type { PostDetailCommentData } from "@/app/types/community";
import { useNavigate } from "react-router";
import { GoChevronLeft } from "react-icons/go";

const MOCK_POST = {
  author: "한유진",
  generation: 23,
  createdAt: "30분 전",
  content:
    "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!",
  likeCount: 12,
  commentCount: 12,
};

const MOCK_COMMENTS: PostDetailCommentData[] = [
  {
    id: 1,
    author: "한유진",
    generation: 23,
    createdAt: "30분 전",
    content:
      "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스!",
    likeCount: 12,
    isAuthor: true,
  },
  {
    id: 2,
    author: "한유진",
    generation: 23,
    createdAt: "30분 전",
    content:
      "아자스! 아자아자 아자스! 아자스! 아자아자 아자스!아자스! 아자아자 아자스!아자스! 아자아자 아자스! 아자아자 아자스!",
    likeCount: 12,
    isAuthor: true,
  },
];

export default function CommunityDetailPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        left={
          <button onClick={() => navigate(-1)}>
            <GoChevronLeft size={24} />
          </button>
        }
        className="absolute left-0 right-0 top-0 bg-transparent"
      />

      <div className="scrollbar-hide gap-xl pt-header-height pb-bottom-padding flex h-full w-full flex-col overflow-y-auto">
        <PostDetailContent postDetailData={MOCK_POST} />

        <hr className="border-gray-1 border-t" />

        <PostDetailCommentInput />

        <hr className="border-gray-1 border-t" />

        <PostDetailCommentList comments={MOCK_COMMENTS} />
      </div>

      <BottomNavbar />
    </>
  );
}
