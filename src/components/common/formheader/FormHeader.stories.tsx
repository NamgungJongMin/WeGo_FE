import { Meta, StoryObj } from '@storybook/react';
import FormHeader from './FormHeader';

const meta = {
  title: 'Components/Common/FormHeader',
  component: FormHeader,
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
    },
  },
} satisfies Meta<typeof FormHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    title: 'Default Title',
  },
} satisfies Story;
