import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function LibrarySearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // 검색 로직 구현
  };

  return (
    <div className="px-gutter">
      <div className="border-gray-2 gap-md flex items-center rounded-lg border px-4 py-3">
        <input
          type="text"
          placeholder="도서명 또는 저자명"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="text-14-regular placeholder:text-gray-3 flex-1 bg-transparent outline-none"
        />
        <button onClick={handleSearch} className="text-gray-4">
          <IoSearch className="size-5" />
        </button>
      </div>
    </div>
  );
}
