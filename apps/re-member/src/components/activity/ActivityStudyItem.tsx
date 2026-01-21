import { Link } from "react-router";
import { Chip } from "../common";
import { GoPeople } from "react-icons/go";
import { PiCrownSimpleFill } from "react-icons/pi";
import type { ActivityData } from "@/types/activity";

interface ActivityStudyItemProps {
  activity: ActivityData;
}

const STATUS_MAP = {
  WAITING: { label: "모집중", color: "green" },
  PROGRESSING: { label: "진행중", color: "yellow" },
  END: { label: "종료", color: "red" },
} as const;

export default function ActivityStudyItem({
  activity,
}: ActivityStudyItemProps) {
  const { id, name, category, status, imageUrl, leaders, participantCount } =
    activity;
  const statusInfo = STATUS_MAP[status];
  const leader = leaders[0];
  const leaderGeneration = leader?.id.slice(2, 4) ?? "";

  return (
    <Link
      to={`/activity/${id}`}
      className="bg-gray-0 border-gray-2 grid w-full grid-cols-[1fr_3fr] rounded-xl border"
    >
      <div className="bg-gray-2 overflow-hidden rounded-l-xl">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <div className="space-y-sm p-gutter">
        <div className="text-16-medium line-clamp-1">{name}</div>
        <div className="gap-md text-12-regular text-gray-4 flex items-center">
          <div className="gap-xs flex items-center">
            <PiCrownSimpleFill />
            {leader ? `${leader.name}(${leaderGeneration})` : ""}
          </div>
          <div className="gap-xs flex items-center">
            <GoPeople />
            {participantCount}
          </div>
        </div>
        <div className="gap-xs flex items-center">
          <Chip color="purple">
            {category === "PROJECT" ? "프로젝트" : "스터디"}
          </Chip>
          <Chip color={statusInfo.color}>{statusInfo.label}</Chip>
        </div>
      </div>
    </Link>
  );
}
