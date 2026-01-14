import type { Meta, StoryObj } from "@storybook/react-vite";

import Title from "./Title";

const meta = {
  title: "Components/Title",
  component: Title,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Title 컴포넌트는 제목을 렌더링하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Title>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-[375px] mx-auto",
    children: "진행중인 스터디",
  },
};
