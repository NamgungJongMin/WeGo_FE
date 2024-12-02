import type { Meta, StoryObj } from '@storybook/react';
import TextInput from './TextInput';

const meta = {
  title: 'Components/Common/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof TextInput>;

// 기본 TextInput 스토리
export const Default: Story = {
  args: {
    type: 'text',
    name: 'default',
    placeholder: '텍스트를 입력해주세요',
    size: 'default',
  },
};

// 버튼과 함께 사용되는 TextInput 스토리
export const WithButton: Story = {
  args: {
    type: 'text',
    name: 'withButton',
    placeholder: '검색어를 입력해주세요',
    size: 'withButton',
  },
};

// 최대 길이가 제한된 TextInput 스토리
export const WithMaxLength: Story = {
  args: {
    type: 'text',
    name: 'maxLength',
    placeholder: '최대 10자까지 입력 가능합니다',
    size: 'default',
    maxLength: 10,
  },
};
