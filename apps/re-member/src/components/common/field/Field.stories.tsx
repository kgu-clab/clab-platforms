import type { Meta, StoryObj } from "@storybook/react-vite";

import Field from "./Field";

const meta = {
  title: "Components/Field",
  component: Field,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Field 컴포넌트는 특정 항목에 대한 제목과 설명을 렌더링하는 컴포넌트입니다.",
      },
    },
  },
  tags: ["autodocs"],
  args: { title: "제목", description: "설명" },
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "작가",
    description: "김기현, 박병대",
  },
};
