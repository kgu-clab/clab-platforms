import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import Button from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "check",
      options: ["large", "small"],
    },
    color: {
      control: "select",
      options: ["active", "disabled", "cancelled"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large_Active: Story = {
  args: {
    className: "w-[375px]",
    children: "신청하기",
  },
};

export const Large_Disabled: Story = {
  args: {
    className: "w-[375px]",
    color: "disabled",
    children: "신청하기",
  },
};

export const Small_Dark: Story = {
  args: {
    size: "small",
    color: "dark",
    children: "전체",
  },
};

export const Small_Outline: Story = {
  args: {
    size: "small",
    color: "outlineActive",
    children: "전체",
  },
};

export const Small_Outline_Disabled: Story = {
  args: {
    size: "small",
    color: "outlineDisabled",
    children: "전체",
  },
};
