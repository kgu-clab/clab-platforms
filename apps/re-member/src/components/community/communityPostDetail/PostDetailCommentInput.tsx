import { Textarea } from "@/components/common";
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
      <div className="px-lg relative flex-1">
        <Textarea
          size="small"
          placeholder="댓글을 입력해주세요."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={400}
          showCounter
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-primary absolute bottom-3 right-6 flex size-8 shrink-0 items-center justify-center rounded-full"
        >
          <IoSend className="size-4 text-white" />
        </button>
      </div>
    </div>
  );
}
