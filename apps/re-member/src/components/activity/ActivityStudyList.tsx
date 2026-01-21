import { Section } from "../common";
import { MOCK_ACTIVITIES } from "@/shared/mock/activity";
import ActivityStudyItem from "./ActivityStudyItem";

export default function ActivityStudyList() {
  return (
    <Section.List>
      {MOCK_ACTIVITIES.map((activity) => (
        <ActivityStudyItem key={activity.id} activity={activity} />
      ))}
    </Section.List>
  );
}
