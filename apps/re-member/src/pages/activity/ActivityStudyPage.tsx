import { ActivityStudyList } from "@/components/activity";
import { PlusButton, Section } from "@/components/common";
import { ROUTE } from "@/shared/config/route";
import { useNavigate } from "react-router";

export default function ActivityStudyPage() {
  const navigate = useNavigate();

  const handleAddStudy = () => {
    navigate(ROUTE.ACTIVITY_CREATE);
  };
  return (
    <>
      <Section title="진행중인 스터디" className="px-gutter">
        <ActivityStudyList />
      </Section>
      <PlusButton onClick={handleAddStudy} />
    </>
  );
}
