import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  DESIGN_SYSTEM_COLOR_VARIANT,
  DESIGN_SYSTEM_COLOR_VARIANT_SUMMARY,
} from '../constants';
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
      description: '뱃지의 색상을 설정합니다.',
      control: 'select',
      options: DESIGN_SYSTEM_COLOR_VARIANT,
      table: {
        defaultValue: { summary: DESIGN_SYSTEM_COLOR_VARIANT[0] },
        type: {
          summary: DESIGN_SYSTEM_COLOR_VARIANT_SUMMARY,
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
    children: 'Badge',
  },
};
/**
 * 뱃지의 색상을 설정할 수 있습니다.
 */
export const Colors: Story = {
  render: (args) => (
    <div className="space-x-2">
      <Badge {...args} color="primary">
        Primary
      </Badge>
      <Badge {...args} color="secondary">
        Secondary
      </Badge>
      <Badge {...args} color="red">
        Red
      </Badge>
      <Badge {...args} color="orange">
        Orange
      </Badge>
      <Badge {...args} color="yellow">
        Yellow
      </Badge>
      <Badge {...args} color="green">
        Green
      </Badge>
      <Badge {...args} color="blue">
        Blue
      </Badge>
    </div>
  ),
};
