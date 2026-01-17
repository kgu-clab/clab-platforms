import { IoChatbubbleOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import type { PostDetailCommentData } from "@/app/types/community";
import { useState } from "react";

interface PostDetailCommentItemProps {
  commentData: PostDetailCommentData;
}

export default function PostDetailCommentItem({
  commentData,
}: PostDetailCommentItemProps) {
  const {
    author,
    generation,
    createdAt,
    content,
    likeCount,
    isAuthor = false,
  } = commentData;

  const [isLiked, setIsLiked] = useState(false);

  const onClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="gap-md px-gutter flex">
      <div className="bg-gray-2 size-8 shrink-0 rounded-full" />
      <div className="gap-sm flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <div className="gap-sm flex items-center">
            <span className="text-14-semibold text-black">
              {author}({generation})
            </span>
            <span className="text-12-regular text-gray-4">{createdAt}</span>
          </div>
          {isAuthor && (
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
            <span>{isLiked ? likeCount + 1 : likeCount}</span>
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
