import type { Meta, StoryObj } from "@storybook/react-vite";
import { GoChevronLeft } from "react-icons/go";
import { IoNotifications } from "react-icons/io5";

import { fn } from "storybook/test";
import Header from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Header 컴포넌트는 헤더 영역을 렌더링하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: { onClick: fn() },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[375px] mx-auto border border-gray-200",
    left: (
      <button className="focus:outline-none">
        <img src="/logo/logo.svg" alt="clab" className="w-15" />
      </button>
    ),
    right: (
      <button className="focus:outline-none">
        <IoNotifications size={24} />
      </button>
    ),
  },
};

export const Left_BackButton: Story = {
  args: {
    className: "w-[375px] mx-auto border border-gray-200",
    left: (
      <button className="focus:outline-none">
        <GoChevronLeft size={24} />
      </button>
    ),
  },
};

export const Left_Title: Story = {
  args: {
    className: "w-[375px] mx-auto border border-gray-200",
    left: <h1 className="text-20-bold">제목</h1>,
  },
};
