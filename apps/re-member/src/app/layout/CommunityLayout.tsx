import { Header, Tabs, Title } from "@/components/common";
import { BottomNavbar } from "@/components/menu";

import { ROUTE } from "@/shared/config/route";
import {
  BsFillClipboardFill,
  BsFillEmojiSmileFill,
  BsFillInfoSquareFill,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import { Outlet } from "react-router";

export default function CommunityLayout() {
  return (
    <>
      <Header
        left={<Title>커뮤니티</Title>}
        className="absolute left-0 right-0 top-0 bg-white"
      />

      <div className="pt-header-height scrollbar-hide gap-3xl pb-bottom-padding flex h-full w-full flex-col overflow-y-auto">
        <Tabs>
          <Tabs.Item
            icon={<BsFillClipboardFill />}
            label="공지"
            href={ROUTE.COMMUNITY_NOTICE}
          />
          <Tabs.Item
            icon={<BsFillEmojiSmileFill />}
            label="자유"
            href={ROUTE.COMMUNITY_FREE}
          />
          <Tabs.Item
            icon={<BsFillQuestionCircleFill />}
            label="질문"
            href={ROUTE.COMMUNITY_QUESTION}
          />
          <Tabs.Item
            icon={<BsFillInfoSquareFill />}
            label="정보"
            href={ROUTE.COMMUNITY_INFORMATION}
          />
        </Tabs>
        <Outlet />
      </div>
      <BottomNavbar />
    </>
  );
}
