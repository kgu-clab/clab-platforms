import { Header, Scrollable, Title } from "@/components/common";
import { LibraryBookItem } from "@/components/library";
import { MOCK_MY_BOOKS } from "@/shared/mock/my";
import { GoChevronLeft } from "react-icons/go";
import { useNavigate } from "react-router";

export default function MyLibraryPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header
        left={
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <GoChevronLeft size={24} />
            <Title>도서 대여 내역</Title>
          </button>
        }
        className="z-100 absolute left-0 right-0 top-0 bg-white"
      />
      <Scrollable className="pt-header-height pb-bottom-padding">
        <div className="px-gutter py-xl grid grid-cols-2 gap-4">
          {MOCK_MY_BOOKS.map((book, index) => (
            <LibraryBookItem key={`${book.id}-${index}`} book={book} />
          ))}
        </div>
      </Scrollable>
    </>
  );
}
