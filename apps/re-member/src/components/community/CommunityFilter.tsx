import { CATEGORY } from "@/app/types/community";
import { Button } from "../common";
import CommunityInformationTab from "./CommunityInformationTab";
import CommunityQuestionTab from "./CommunityQuestionTab";
import { useState } from "react";

interface CommunityFilterProps {
  tab: string;
}

export default function CommunityFilter({ tab }: CommunityFilterProps) {
  const [isLatest, setIsLatest] = useState<boolean>(true);

  const onClick = () => {
    setIsLatest(!isLatest);
  };
  return (
    <div className="px-gutter gap-md flex items-center">
      <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto">
        {tab === CATEGORY.INFORMATION && <CommunityInformationTab />}
        {tab === CATEGORY.QUESTION && <CommunityQuestionTab />}
      </div>
      <Button color="text" size="small" className="shrink-0" onClick={onClick}>
        {isLatest ? "최신순" : "인기순"}
      </Button>
    </div>
  );
}
