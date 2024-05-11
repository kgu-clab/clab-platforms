import type { Meta, StoryObj } from '@storybook/react';

import OTPInput from './OTPInput';

const meta = {
  title: 'Components/OTPInput',
  component: OTPInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'OTPInput은 OTP 입력을 편리하게 도와주는 컴포넌트입니다.',
  },
  argTypes: {
    type: {
      description: 'input 타입을 설정합니다.',
      control: 'select',
      options: ['text', 'number', 'password'],
      table: {
        defaultValue: { summary: '"text"' },
        type: {
          summary: '"text" | "number" | "password"',
        },
      },
    },
    length: {
      description: 'OTPInput의 길이를 설정합니다.',
      control: 'number',
      table: {
        type: {
          summary: 'number',
        },
      },
    },
    value: {
      description: 'OTPInput의 값을 설정합니다.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
} satisfies Meta<typeof OTPInput>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 기본 설정의 OTPInput 입니다.
 */
export const Default: Story = {};
/**
 * OTPInput의 길이를 지정할 수 있습니다.
 */
export const Length: Story = {
  args: {
    length: 4,
  },
};
