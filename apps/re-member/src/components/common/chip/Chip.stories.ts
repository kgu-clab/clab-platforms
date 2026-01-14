import type { Meta, StoryObj } from "@storybook/react-vite";

import Chip from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["red", "yellow", "green", "purple", "primary", "disabled"],
    },
  },
  args: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = {
  args: {
    color: "red",
    children: "중요",
  },
};

export const Yellow: Story = {
  args: {
    color: "yellow",
    children: "중요",
  },
};

export const Green: Story = {
  args: {
    color: "green",
    children: "중요",
  },
};

export const Purple: Story = {
  args: {
    color: "purple",
    children: "중요",
  },
};

export const Primary: Story = {
  args: {
    color: "primary",
    children: "중요",
  },
};
