import type { Meta, StoryObj } from "@storybook/react-vite";

import StepProgressBar from "./StepProgressBar";

const meta = {
  title: "Components/StepProgressBar",
  component: StepProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    currentStep: {
      control: "number",
    },
    totalSteps: {
      control: "number",
    },
  },
} satisfies Meta<typeof StepProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1Of2: Story = {
  args: {
    currentStep: 1,
    totalSteps: 2,
    className: "w-[375px]",
  },
};

export const Step2Of2: Story = {
  args: {
    currentStep: 2,
    totalSteps: 2,
    className: "w-[375px]",
  },
};

export const Step1Of3: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
    className: "w-[375px]",
  },
};

export const Step2Of3: Story = {
  args: {
    currentStep: 2,
    totalSteps: 3,
    className: "w-[375px]",
  },
};

export const Step3Of3: Story = {
  args: {
    currentStep: 3,
    totalSteps: 3,
    className: "w-[375px]",
  },
};
