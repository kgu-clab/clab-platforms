import { IoHeartOutline, IoChatbubbleOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import { Chip } from "../common";
import { ROUTE } from "@/shared/config/route";
import type { PostData } from "@/types/community";

interface CommunityPostItemProps {
  postData: PostData;
  chipLabel?: string;
}

export default function CommunityPostItem({
  postData,
  chipLabel,
}: CommunityPostItemProps) {
  const { id, title, createdAt, author, generation, likeCount, commentCount } =
    postData;

  const navigate = useNavigate();

  return (
    <div
      className="border-b-gray-2 gap-sm px-gutter py-xl flex cursor-pointer flex-col border-b"
      role="button"
      onClick={() => navigate(`${ROUTE.COMMUNITY}/${id}`)}
    >
      <div className="gap-md flex items-center">
        {chipLabel && <Chip>{chipLabel}</Chip>}
        <span className="text-16-medium truncate text-black">{title}</span>
      </div>
      <div className="text-12-regular text-gray-4 flex items-center justify-between">
        <div className="gap-xs flex items-center">
          <span>{createdAt}</span>
          <span>|</span>
          <span>
            {author}({generation})
          </span>
        </div>
        <div className="gap-md flex items-center">
          <div className="gap-xs flex items-center">
            <IoHeartOutline className="size-4" />
            <span>{likeCount}</span>
          </div>
          <div className="gap-xs flex items-center">
            <IoChatbubbleOutline className="size-4" />
            <span>{commentCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
