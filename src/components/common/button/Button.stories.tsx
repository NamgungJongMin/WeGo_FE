import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'Components/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    label: '기본',
    fill: 'default',
    size: 'default',
  },
};

export const White: Story = {
  args: {
    label: '화이트',
    fill: 'white',
    size: 'default',
  },
};

export const AddonSize: Story = {
  args: {
    label: '애드온',
    fill: 'default',
    size: 'addon',
  },
};

export const ModalSmall: Story = {
  args: {
    label: '모달sm',
    fill: 'default',
    size: 'modal_sm',
  },
};

export const ModalMedium: Story = {
  args: {
    label: '모달md',
    fill: 'default',
    size: 'modal_md',
  },
};

export const Disabled: Story = {
  args: {
    label: '비활성화 버튼',
    disabled: true,
  },
};
