import { FiClock, FiMapPin } from "react-icons/fi";
import { GoPeople } from "react-icons/go";

import { Chip, Section } from "../common";

export default function ActivityScheduleList() {
  return (
    <Section.List>
      <ListItem />
      <ListItem />
      <ListItem />
    </Section.List>
  );
}

function ListItem() {
  return (
    <div className="bg-gray-0 border-gray-2 gap-2xl p-gutter box-border flex w-full rounded-xl border">
      <div className="text-20-semibold text-gray-5 px-sm flex flex-col items-center justify-center leading-tight">
        01
        <br />
        25
      </div>
      <div className="space-y-sm">
        <div className="text-16-medium">웹 스터디 모임</div>
        <div className="gap-md text-12-regular text-gray-4 flex items-center">
          <div className="gap-xs flex items-center">
            <FiClock />
            15:00
          </div>
          <div className="gap-xs flex items-center">
            <FiMapPin />
            서울시 강남구 역삼동
          </div>
          <div className="gap-xs flex items-center">
            <GoPeople />
            12/20
          </div>
        </div>
        <div className="gap-xs flex items-center">
          <Chip color="red">중요</Chip>
          <Chip color="green">전체</Chip>
        </div>
      </div>
    </div>
  );
}
