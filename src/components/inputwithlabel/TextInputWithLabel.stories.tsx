import type { Meta, StoryObj } from '@storybook/react';
import Location from '@/assets/input_location.svg';
import { TextInputWithLabel } from './TextInputWithLabel';

const meta = {
  title: 'Components/InputWithLabel/TextInputWithLabel',
  component: TextInputWithLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TextInputWithLabel>;

export default meta;
type Story = StoryObj<typeof TextInputWithLabel>;

export const Default: Story = {
  args: {
    label: 'Default',
    name: 'default',
    type: 'text',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};

export const WithButton: Story = {
  args: {
    label: 'WithButton',
    name: 'withButton',
    type: 'text',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'withButton',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'WithIcon',
    name: 'icon',
    type: 'text',
    value: '',
    placeholder: '내용을 입력해주세요',
    children: <Location />,
    size: 'default',
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'HiddenLabel',
    state: 'srOnly',
    name: 'HiddenLabel',
    type: 'text',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};

export const RequiredLabel: Story = {
  args: {
    label: 'HiddenLabel',
    state: 'required',
    name: 'RequiredLabel',
    type: 'text',
    value: '',
    placeholder: '내용을 입력해주세요',
    size: 'default',
  },
};
