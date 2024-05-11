import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {
  DESIGN_SYSTEM_SIZE_VARIANT,
  DESIGN_SYSTEM_SIZE_VARIANT_SUMMARY,
} from '../constants';
import Spinner from './Spinner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      '스피너는 로딩 상태를 직관적이게 표현해주는 컴포넌트 입니다.',
  },
  argTypes: {
    size: {
      description: '스피너의 크기를 설정합니다.',
      control: 'select',
      options: DESIGN_SYSTEM_SIZE_VARIANT,
      table: {
        defaultValue: { summary: DESIGN_SYSTEM_SIZE_VARIANT[0] },
        type: {
          summary: DESIGN_SYSTEM_SIZE_VARIANT_SUMMARY,
        },
      },
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 기본 설정의 스피너입니다.
 */
export const Default: Story = {};
/**
 * 스피너의 크기를 지정할 수 있습니다.
 */
export const Sizes: Story = {
  render: (args) => (
    <div className="inline-flex items-center gap-5">
      <Spinner {...args} size="sm"></Spinner>
      <Spinner {...args} size="md"></Spinner>
      <Spinner {...args} size="lg"></Spinner>
    </div>
  ),
};
