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
    <div className="px-gutter flex items-center justify-between ">
      {tab === CATEGORY.INFORMATION && <CommunityInformationTab />}
      {tab === CATEGORY.QUESTION && <CommunityQuestionTab />}
      <Button color="text" size="small" className="ml-auto" onClick={onClick}>
        {isLatest ? "최신순" : "인기순"}
      </Button>
    </div>
  );
}
