import { ActivityStudyList } from "@/components/activity";
import { Section } from "@/components/common";

export default function ActivityStudyPage() {
  return (
    <>
      <Section title="진행중인 스터디" className="px-gutter">
        <ActivityStudyList />
      </Section>
    </>
  );
}
