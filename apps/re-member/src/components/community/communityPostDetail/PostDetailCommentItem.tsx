import { IoChatbubbleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import type { PostDetailCommentData } from "@/types/community";
import { useState } from "react";
import { useNavigate } from "react-router";

interface PostDetailCommentItemProps {
  commentData: PostDetailCommentData;
  to?: string;
}

export default function PostDetailCommentItem({
  commentData,
  to,
}: PostDetailCommentItemProps) {
  const {
    writerName,
    writerImageUrl,
    createdAt,
    content,
    likes,
    hasLikeByMe,
    isOwner,
  } = commentData;

  const [isLiked, setIsLiked] = useState(hasLikeByMe);
  const navigate = useNavigate();

  const onClickLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  const handleClick = () => {
    if (to) {
      navigate(to);
    }
  };

  return (
    <div
      className={`gap-md px-gutter py-xl border-b-gray-2 flex border-b${to ? " cursor-pointer" : ""}`}
      onClick={handleClick}
      role={to ? "button" : undefined}
    >
      <div className="bg-gray-2 size-8 shrink-0 overflow-hidden rounded-full">
        {writerImageUrl && (
          <img
            src={writerImageUrl}
            alt={writerName}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="gap-sm flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="gap-sm flex items-center">
            <span className="text-14-semibold text-black">{writerName}</span>
            <span className="text-12-regular text-gray-4">{createdAt}</span>
          </div>
          {isOwner && (
            <button className="text-12-regular text-gray-4">삭제</button>
          )}
        </div>

        <p className="text-14-regular whitespace-pre-wrap text-black">
          {content}
        </p>

        <div className="text-12-regular text-gray-4 gap-md flex items-center">
          <button
            type="button"
            className="gap-xs flex cursor-pointer items-center"
            onClick={onClickLike}
          >
            {isLiked ? (
              <IoHeart className="text-primary size-4" />
            ) : (
              <IoHeartOutline className="size-4" />
            )}
            <span>{isLiked ? likes + 1 : likes}</span>
          </button>
          <div className="gap-xs flex items-center">
            <IoChatbubbleOutline className="size-4" />
            <span>답글</span>
          </div>
        </div>
      </div>
    </div>
  );
}
