import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      '버튼은 클릭을 통해 사용자에게 액션을 제공하는 컴포넌트입니다.',
  },
  argTypes: {
    color: {
      description: '버튼의 색상을 지정합니다.',
      control: 'select',
      options: ['white', 'orange', 'green', 'red', 'blue'],
      table: {
        defaultValue: { summary: 'white' },
        type: {
          summary: '"white" | "orange" | "green" | "red" | "blue"',
        },
      },
    },
    size: {
      description: '버튼의 크기를 지정합니다.',
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      table: {
        defaultValue: { summary: 'md' },
        type: {
          summary: '"sm" | "md" | "lg"',
        },
      },
    },
    disabled: {
      description: '비활성화 상태를 설정합니다.',
      control: 'boolean',
      table: {
        defaultValue: { summary: 'false' },
        type: {
          summary: 'boolean',
        },
      },
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 기본 설정의 버튼입니다.
 */
export const Default: Story = {
  args: {
    children: 'Button',
  },
};
/**
 * 비활성화된 버튼입니다.
 */
export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
};
/**
 * 버튼의 색상을 지정할 수 있습니다.
 */
export const Colors: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Button {...args} color="white">
        White
      </Button>
      <Button {...args} color="orange">
        Orange
      </Button>
      <Button {...args} color="green">
        Green
      </Button>
      <Button {...args} color="red">
        Red
      </Button>
      <Button {...args} color="blue">
        Blue
      </Button>
    </div>
  ),
};
/**
 * 버튼의 크기를 지정할 수 있습니다.
 */
export const Sizes: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Button {...args} size="sm">
        small
      </Button>
      <Button {...args} size="md">
        medium
      </Button>
      <Button {...args} size="lg">
        large
      </Button>
    </div>
  ),
};
