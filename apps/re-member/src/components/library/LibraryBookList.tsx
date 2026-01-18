import LibraryBookItem from "./LibraryBookItem";
import { MOCK_BOOKS } from "@/shared/mock/library";

export default function LibraryBookList() {
  return (
    <div className="px-gutter">
      <div className="grid grid-cols-2 gap-4">
        {MOCK_BOOKS.map((book) => (
          <LibraryBookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}
