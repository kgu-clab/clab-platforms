import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle:
      'Input 컴포넌트는 사용자로부터 텍스트를 입력받을 수 있는 컴포넌트입니다.',
  },
  argTypes: {
    value: {
      description: 'Input의 값을 설정합니다.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    label: {
      description: 'Input의 라벨을 설정합니다.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    message: {
      description: 'Input의 메시지를 설정합니다.',
      control: 'text',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;
/**
 * 기본 설정의 Input 입니다.
 */
export const Default: Story = {};
/**
 * Input의 라벨을 지정할 수 있습니다.
 */
export const Label: Story = {
  args: {
    label: '아이디',
  },
};
/**
 * Input의 메시지를 지정할 수 있습니다.
 */
export const Message: Story = {
  args: {
    type: 'password',
    label: '비밀번호',
    message: '비밀번호를 입력해주세요.',
  },
};
