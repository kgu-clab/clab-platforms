import type { Meta, StoryObj } from "@storybook/react-vite";
import Dropdown from "./Dropdown";
import Button from "../button/Button";
import { IoChevronDown } from "react-icons/io5";

const meta = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Dropdown 컴포넌트는 Radix UI Dropdown Menu를 기반으로 한 드롭다운 메뉴입니다.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    align: "start",
    trigger: (
      <Button color="outlineActive" size="small" className="gap-sm">
        <span className="text-14-medium text-primary">언어</span>
        <IoChevronDown className="text-primary size-4" />
      </Button>
    ),
    children: (
      <>
        <Dropdown.Item>C</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>JavaScript</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Java</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item>Python</Dropdown.Item>
      </>
    ),
  },
};
