import { Chip } from "@/components/common";
import { Link } from "react-router";
import { IoHeart, IoChatbubbleOutline } from "react-icons/io5";

export interface CommunityPostItemProps {
  id: string;
  category: string;
  title: string;
  content: string;
  author: string;
  likes: number;
  comments: number;
}

export default function CommunityPostItem({
  id,
  category,
  title,
  content,
  author,
  likes,
  comments,
}: CommunityPostItemProps) {
  const getCategoryColor = (
    cat: string,
  ): "red" | "yellow" | "green" | "purple" => {
    switch (cat) {
      case "자유":
        return "purple";
      case "질문":
        return "yellow";
      case "정보":
        return "green";
      default:
        return "red";
    }
  };

  return (
    <Link
      to={`/community/${id}`}
      className="bg-gray-0 border-gray-2 gap-md p-xl flex w-full flex-col rounded-xl border"
    >
      <div className="gap-xs flex items-center justify-between">
        <Chip color={getCategoryColor(category)}>{category}</Chip>
        <span className="font-regular text-gray-4 text-[12px] leading-normal">
          {author}
        </span>
      </div>

      <div className="gap-xs flex flex-col">
        <h3 className="line-clamp-1 text-[16px] font-semibold leading-normal text-black">
          {title}
        </h3>
        <p className="font-regular text-gray-4 line-clamp-2 text-[14px] leading-normal">
          {content}
        </p>
      </div>

      <div className="gap-md text-gray-4 flex items-center">
        <div className="gap-xs flex items-center">
          <IoHeart size={16} />
          <span className="font-regular text-[12px] leading-normal">
            {likes}
          </span>
        </div>
        <div className="gap-xs flex items-center">
          <IoChatbubbleOutline size={16} />
          <span className="font-regular text-[12px] leading-normal">
            {comments}
          </span>
        </div>
      </div>
    </Link>
  );
}
