import { Section } from "@/components/common";
import { useSearchParams } from "react-router";
import { useState } from "react";
import ActivityStudyPage from "./ActivityStudyPage";
import {
  ActivityCalendar,
  ActivityCalendarHeader,
  ActivityScheduleList,
} from "@/components/activity";

export default function ActivityHomePage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab");

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  if (tab === "study") {
    return <ActivityStudyPage />;
  }

  return (
    <>
      <Section
        title={
          <ActivityCalendarHeader
            currentMonth={currentMonth}
            setCurrentMonth={setCurrentMonth}
          />
        }
        className="px-gutter"
      >
        <ActivityCalendar
          value={selectedDate}
          onChange={setSelectedDate}
          activeStartDate={currentMonth}
          onActiveStartDateChange={setCurrentMonth}
        />
      </Section>
      <Section title="일정" className="px-gutter">
        <ActivityScheduleList />
      </Section>
    </>
  );
}
