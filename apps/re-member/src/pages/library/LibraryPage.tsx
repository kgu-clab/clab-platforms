import { Header, PlusButton, Section, Title } from "@/components/common";
import { BottomNavbar } from "@/components/menu";
import {
  LibrarySearchBar,
  LibraryFilter,
  LibraryBookList,
} from "@/components/library";

export default function LibraryPage() {
  const handleAddBook = () => {
    // 도서 추가 페이지 이동
  };
  return (
    <>
      <Header
        left={<Title>도서관</Title>}
        className="absolute left-0 right-0 top-0 bg-white"
      />

      <Section className="pt-header-height scrollbar-hide pb-bottom-padding overflow-y-auto">
        <LibrarySearchBar />
        <LibraryFilter />
        <LibraryBookList />
      </Section>

      <PlusButton onClick={handleAddBook} />
      <BottomNavbar />
    </>
  );
}
