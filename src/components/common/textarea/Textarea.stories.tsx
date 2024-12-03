import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta = {
  title: 'Components/Common/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    name: 'default',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};

export const SmallSize: Story = {
  args: {
    name: 'smallSize',
    value: '',
    placeholder: '텍스트를 입력해주세요',
    size: 'small',
  },
};
