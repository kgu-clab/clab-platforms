import { Chip } from "@/components/common";
import type { PostDetailCommentData } from "@/app/types/community";
import PostDetailCommentItem from "./PostDetailCommentItem";

interface PostDetailCommentListProps {
  comments: PostDetailCommentData[];
}

export default function PostDetailCommentList({
  comments,
}: PostDetailCommentListProps) {
  return (
    <div className="gap-lg flex flex-col">
      <div className="gap-sm px-gutter mb-2xl flex  items-center ">
        <span className="text-18-semibold text-black">댓글</span>
        <Chip color="primary">{comments.length}</Chip>
      </div>

      <div className="gap-3xl flex flex-col">
        {comments.map((comment) => (
          <PostDetailCommentItem key={comment.id} commentData={comment} />
        ))}
      </div>
    </div>
  );
}
