import { GoPeople } from "react-icons/go";
import { PiCrownSimpleFill } from "react-icons/pi";

import { Chip, Section } from "../common";
import { Link } from "react-router";

export default function ActivityStudyList() {
  return (
    <Section.List>
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
      <ListItem />
    </Section.List>
  );
}

function ListItem() {
  return (
    <Link
      to="/activity/123"
      className="bg-gray-0 border-gray-2 grid w-full grid-cols-[1fr_3fr] rounded-xl border"
    >
      <div className="bg-gray-2 overflow-hidden rounded-l-xl"></div>
      <div className="space-y-sm p-gutter">
        <div className="text-16-medium line-clamp-1">
          코어팀 플로우 작성 프로젝트
        </div>
        <div className="gap-md text-12-regular text-gray-4 flex items-center">
          <div className="gap-xs flex items-center">
            <PiCrownSimpleFill />
            장영후(23)
          </div>
          <div className="gap-xs flex items-center">
            <GoPeople />
            12/20
          </div>
        </div>
        <div className="gap-xs flex items-center">
          <Chip color="purple">프로젝트</Chip>
          <Chip color="green">모집중</Chip>
        </div>
      </div>
    </Link>
  );
}
