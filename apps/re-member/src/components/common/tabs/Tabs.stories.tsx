import type { Meta, StoryObj } from "@storybook/react-vite";

import Tabs from "./Tabs";
import { IoBook, IoPeople, IoSettings } from "react-icons/io5";
import { MdHomeFilled } from "react-icons/md";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabs 컴포넌트는 탭 네비게이션 바를 렌더링하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[375px]",
    children: (
      <>
        <Tabs.Item icon={<MdHomeFilled />} label="홈" href="/" />
        <Tabs.Item icon={<IoBook />} label="도서" href="/books" />
        <Tabs.Item icon={<IoPeople />} label="스터디" href="/studies" />
        <Tabs.Item icon={<IoSettings />} label="설정" href="/settings" />
      </>
    ),
  },
};
