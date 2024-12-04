import type { Meta, StoryObj } from '@storybook/react';
import TextareaWithLabel from './TextareaWithLabel';

const meta = {
  title: 'Components/Common/TextareaWithLabel',
  component: TextareaWithLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextareaWithLabel>;

export default meta;
type Story = StoryObj<typeof TextareaWithLabel>;

export const Default: Story = {
  args: {
    label: '내용 입력',
    name: 'default',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};

export const SmallSize: Story = {
  args: {
    label: '내용 입력',
    name: 'smallSize',
    value: '',
    placeholder: '텍스트를 입력해주세요',
    size: 'small',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: '숨겨진 레이블',
    srOnly: true,
    name: 'hiddenLabel',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};
