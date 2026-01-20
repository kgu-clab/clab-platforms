import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Input } from "../common";

export default function LibrarySearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // 검색 로직 구현
  };

  return (
    <div className="px-gutter gap-md flex items-center">
      <Input
        type="text"
        placeholder="도서명 또는 저자명"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
      />
      <button onClick={handleSearch} className="text-gray-4 absolute right-7">
        <IoSearch className="size-5" />
      </button>
    </div>
  );
}
