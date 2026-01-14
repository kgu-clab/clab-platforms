import { Section } from "@/components/common";
import { useSearchParams } from "react-router";
import ActivityStudyPage from "./ActivityStudyPage";

export default function ActivityHomePage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  if (tab === "study") {
    return <ActivityStudyPage />;
  }

  return (
    <>
      <Section title="2026년 1월" className="px-gutter">
        <div className="gap-lg flex w-full">
          <div className="h-50 flex-1 rounded-xl bg-gray-200" />
          <div className="h-50 flex-1 rounded-xl bg-gray-200" />
        </div>
      </Section>
      <Section title="일정" className="px-gutter">
        <Section.List>
          <div className="h-20 w-full rounded-xl bg-gray-200" />
          <div className="h-20 w-full rounded-xl bg-gray-200" />
          <div className="h-20 w-full rounded-xl bg-gray-200" />
          <div className="h-20 w-full rounded-xl bg-gray-200" />
          <div className="h-20 w-full rounded-xl bg-gray-200" />
          <div className="h-20 w-full rounded-xl bg-gray-200" />
        </Section.List>
      </Section>
    </>
  );
}
