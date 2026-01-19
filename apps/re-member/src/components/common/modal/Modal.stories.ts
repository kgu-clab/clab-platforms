import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import Modal from "./Modal";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["default", "small", "large"],
    },
    isOpen: {
      control: "boolean",
    },
  },
  args: {
    isOpen: true,
    onClose: fn(),
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "활동 참여하기",
    subtitle: "코어팀 플로우 작성 프로젝트 활동에 참여 신청을 보내요",
    children: "Modal 내용이 여기에 들어갑니다.",
  },
};

export const WithTitle: Story = {
  args: {
    title: "알림",
    children: "이것은 간단한 알림 모달입니다.",
  },
};

export const WithSubtitle: Story = {
  args: {
    title: "활동 참여하기",
    subtitle: "코어팀 플로우 작성 프로젝트",
    children: "활동 참여를 위한 추가 정보를 입력해주세요.",
  },
};

export const SmallSize: Story = {
  args: {
    size: "small",
    title: "확인",
    subtitle: "정말 삭제하시겠습니까?",
    children: "이 작업은 되돌릴 수 없습니다.",
  },
};

export const LargeSize: Story = {
  args: {
    size: "large",
    title: "상세 정보",
    subtitle: "프로젝트 상세 정보",
    description: "아래 내용을 확인해주세요",
    children: "여기에 긴 내용이 들어갈 수 있습니다.",
  },
};

export const NoHeader: Story = {
  args: {
    children: "헤더 없이 본문만 있는 모달입니다.",
  },
};
