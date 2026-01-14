import { Header, Tabs, Title } from "@/components/common";
import { BottomNavbar } from "@/components/menu";
import { FaCalendarDays } from "react-icons/fa6";
import { BsPeopleFill } from "react-icons/bs";

import { ROUTE } from "@/shared/config/route";
import { Outlet } from "react-router";

export default function ActivityLayout() {
  return (
    <>
      <Header
        left={<Title>활동</Title>}
        className="absolute left-0 right-0 top-0 bg-white"
      />

      <div className="pt-header-height scrollbar-hide gap-3xl pb-bottom-padding flex h-full w-full flex-col overflow-y-auto">
        <Tabs>
          <Tabs.Item
            icon={<FaCalendarDays />}
            label="일정"
            href={ROUTE.ACTIVITY}
          />
          <Tabs.Item
            icon={<BsPeopleFill />}
            label="스터디"
            href={ROUTE.ACTIVITY_STUDY}
          />
        </Tabs>
        <Outlet />
      </div>
      <BottomNavbar />
    </>
  );
}
