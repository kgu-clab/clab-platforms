import type { Meta, StoryObj } from "@storybook/react-vite";

import { fn } from "storybook/test";
import Input from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["underline", "outlined", "filled"],
    },
  },
  args: { onChange: fn() },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Underline: Story = {
  args: {
    placeholder: "제목을 입력해주세요",
    wrapperClassName: "w-[375px]",
  },
};

export const Underline_WithValue: Story = {
  args: {
    value: "입력된 제목",
    wrapperClassName: "w-[375px]",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    placeholder: "제목을 입력해주세요",
    wrapperClassName: "w-[375px]",
  },
};

export const Filled: Story = {
  args: {
    variant: "filled",
    placeholder: "제목을 입력해주세요",
    wrapperClassName: "w-[375px]",
  },
};

export const WithType: Story = {
  args: {
    type: "email",
    placeholder: "이메일을 입력해주세요",
    wrapperClassName: "w-[375px]",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "비활성화된 입력",
    disabled: true,
    wrapperClassName: "w-[375px]",
  },
};
