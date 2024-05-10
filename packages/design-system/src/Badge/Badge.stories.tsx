import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import Badge from './Badge.tsx';

const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      '뱃지는 사용자에게 바로 식별하거나 강조하는 역할을 하는 컴포넌트입니다.',
  },
  argTypes: {
    color: {
      description: '뱃지의 색상을 지정합니다.',
      control: 'select',
      options: ['primary', 'blue', 'green', 'red', 'yellow'],
      table: {
        defaultValue: { summary: 'blue' },
        type: {
          summary: '"primary" | "blue" | "green" | "red" | "yellow"',
        },
      },
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 기본 설정의 뱃지입니다.
 */
export const Default: Story = {
  args: {
    children: 'Default Badge',
  },
};
/**
 * 뱃지의 색상을 지정할 수 있습니다.
 */
export const Colors: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="blue">
        Blue
      </Badge>
      <Badge {...args} color="green">
        Green
      </Badge>
      <Badge {...args} color="red">
        Red
      </Badge>
      <Badge {...args} color="yellow">
        Yellow
      </Badge>
    </div>
  ),
};
