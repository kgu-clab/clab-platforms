import { Header, PlusButton, Section, Title } from "@/components/common";
import { BottomNavbar } from "@/components/menu";
import {
  LibrarySearchInput,
  LibraryFilter,
  LibraryBookList,
} from "@/components/library";
import { useNavigate } from "react-router";
import { ROUTE } from "@/shared/config/route";

export default function LibraryPage() {
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate(ROUTE.LIBRARY_CREATE);
  };

  return (
    <>
      <Header
        left={<Title>도서관</Title>}
        className="absolute left-0 right-0 top-0 bg-white"
      />

      <Section className="pt-header-height scrollbar-hide pb-bottom-padding overflow-y-auto">
        <LibrarySearchInput />
        <LibraryFilter />
        <LibraryBookList />
      </Section>

      <PlusButton onClick={handleAddBook} />
      <BottomNavbar />
    </>
  );
}
