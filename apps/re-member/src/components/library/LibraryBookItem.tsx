import { Chip } from "../common";
import { ROUTE } from "@/shared/config/route";
import { useNavigate } from "react-router";
import type { BookData } from "@/app/types/library";

interface LibraryBookItemProps {
  book: BookData;
}

export default function LibraryBookItem({ book }: LibraryBookItemProps) {
  const { id, title, author, publisher, imageUrl, category, borrowerId } = book;
  const navigate = useNavigate();

  const isAvailable = borrowerId === null;

  return (
    <div
      className="flex h-full cursor-pointer flex-col"
      role="button"
      onClick={() => navigate(`${ROUTE.LIBRARY}/${id}`)}
    >
      <div className="bg-gray-1 mb-md aspect-3/4 w-full overflow-hidden rounded-lg">
        {imageUrl && imageUrl !== "없음" ? (
          <img
            src={imageUrl}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-gray-3 text-12-regular">이미지 없음</span>
          </div>
        )}
      </div>
      <h3 className="text-14-medium mb-xs line-clamp-2 text-black">{title}</h3>
      <p className="text-12-regular text-gray-4 mb-sm">
        {author}
        <br />
        {publisher}
      </p>
      <div className="gap-xs mt-auto flex flex-wrap">
        <Chip color="purple">{category}</Chip>
        <Chip color={isAvailable ? "green" : "yellow"}>
          {isAvailable ? "대여가능" : "대여중"}
        </Chip>
      </div>
    </div>
  );
}
