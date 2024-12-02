import type { Meta, StoryObj } from '@storybook/react';
import PasswordInput from './PasswordInput';

const meta = {
  title: 'Components/Common/PasswordInput',
  component: PasswordInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof PasswordInput>;

export const Default: Story = {
  args: {
    name: 'password',
    value: '',
    placeholder: '비밀번호를 입력해주세요',
  },
};

export const WithValue: Story = {
  args: {
    name: 'password',
    value: 'mypassword123',
    placeholder: '비밀번호를 입력해주세요',
  },
};

export const WithCustomClassName: Story = {
  args: {
    name: 'password',
    value: '',
    placeholder: '비밀번호를 입력해주세요',
    className: 'bg-gray-100',
  },
};
