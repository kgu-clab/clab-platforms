import { Header, Scrollable } from "@/components/common";
import {
  PostDetailContent,
  PostDetailCommentInput,
  PostDetailCommentList,
} from "@/components/community";
import { BottomNavbar } from "@/components/menu";
import { useNavigate } from "react-router";
import { GoChevronLeft } from "react-icons/go";
import { MOCK_POST, MOCK_COMMENTS } from "@/shared/mock/community";

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

      <Scrollable className="gap-xl pt-header-height">
        <PostDetailContent postDetailData={MOCK_POST} />

        <hr className="border-gray-1 border-t" />

        <PostDetailCommentInput />

        <hr className="border-gray-1 border-t" />

        <PostDetailCommentList comments={MOCK_COMMENTS} />
      </Scrollable>

      <BottomNavbar />
    </>
  );
}
