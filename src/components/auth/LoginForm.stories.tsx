import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginForm from './LoginForm';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/AuthForm/LoginForm',
  component: LoginForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="relative w-[375px] p-5">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
