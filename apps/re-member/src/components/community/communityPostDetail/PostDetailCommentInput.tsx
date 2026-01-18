import { useState } from "react";
import { IoSend } from "react-icons/io5";

interface PostDetailCommentInputProps {
  onSubmit?: (comment: string) => void;
}

export default function PostDetailCommentInput({
  onSubmit,
}: PostDetailCommentInputProps) {
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (comment.trim() && onSubmit) {
      onSubmit(comment);
      setComment("");
    }
  };

  return (
    <div className="gap-md px-gutter py-sm flex items-start">
      <div className="bg-gray-2 size-8 shrink-0 rounded-full" />
      <div className="border-gray-2 px-lg py-md gap-sm flex flex-1 items-end rounded-lg border">
        <textarea
          placeholder="댓글을 남겨보세요..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={1}
          className="text-14-regular scrollbar-hide min-h-18 max-h-24 flex-1 resize-none overflow-auto outline-none"
          style={{ fieldSizing: "content" }}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary flex size-8 shrink-0 items-center justify-center rounded-full"
        >
          <IoSend className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
}
