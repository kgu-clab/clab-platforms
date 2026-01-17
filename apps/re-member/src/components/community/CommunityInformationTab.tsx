import { useState } from "react";
import { Button } from "../common";

const FILTERS: string[] = ["전체", "IT 소식", "채용 정보"];

export default function CommunityInformationTab() {
  const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  return (
    <div className="gap-lg flex">
      {FILTERS.map((filter) => (
        <Button
          key={filter}
          color={activeFilter === filter ? "outlineActive" : "ghost"}
          size="small"
          onClick={() => setActiveFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
