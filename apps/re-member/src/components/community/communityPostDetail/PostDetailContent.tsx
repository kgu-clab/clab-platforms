import { useState } from "react";
import { IoHeart, IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";
import type { PostDetailData } from "@/types/community";

interface PostDetailContentProps {
  postDetailData: PostDetailData;
}

export default function PostDetailContent({
  postDetailData,
}: PostDetailContentProps) {
  const { author, generation, createdAt, content, likeCount, commentCount } =
    postDetailData;

  const [isLiked, setIsLiked] = useState(false);

  const onClickLike = () => {
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="gap-lg px-gutter flex flex-col">
      <div className="gap-lg flex items-center">
        <div className="bg-gray-2 size-10 shrink-0 rounded-full" />
        <div className="flex flex-col">
          <span className="text-14-semibold text-black">
            {author}({generation})
          </span>
          <span className="text-12-regular text-gray-4">{createdAt}</span>
        </div>
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
          <span>{commentCount}</span>
        </div>
      </div>
    </div>
  );
}
