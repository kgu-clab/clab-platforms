import { Chip } from "../common";

export default function StudyMemberGrid() {
  return (
    <div className="gap-xs grid grid-cols-4">
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
      <MemberItem />
    </div>
  );
}

function MemberItem() {
  return (
    <div className="gap-sm flex flex-col items-center justify-center">
      <div className="bg-gray-2 size-[50px] rounded-full"></div>
      <Chip color="yellow">리더</Chip>
      <p className="text-13-regular">장영후(23)</p>
    </div>
  );
}
