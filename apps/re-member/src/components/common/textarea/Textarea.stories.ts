import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import Textarea from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "small", "large"],
    },
    showCounter: {
      control: "boolean",
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "어떤 이야기를 나누고 싶으신가요?",
    wrapperClassName: "w-[375px]",
  },
};

export const WithCounter: Story = {
  args: {
    placeholder: "어떤 이야기를 나누고 싶으신가요?",
    maxLength: 1000,
    showCounter: true,
    wrapperClassName: "w-[375px]",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "간단한 메모를 입력하세요",
    wrapperClassName: "w-[375px]",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "긴 내용을 입력하세요",
    wrapperClassName: "w-[375px]",
  },
};

export const WithValue: Story = {
  args: {
    value: "이미 입력된 텍스트입니다.",
    maxLength: 1000,
    showCounter: true,
    wrapperClassName: "w-[375px]",
  },
};
