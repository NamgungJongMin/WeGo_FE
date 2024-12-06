import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignupForm from './SignupForm';

const queryClient = new QueryClient();

const meta = {
  title: 'Components/AuthForm/SignupForm',
  component: SignupForm,
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
} satisfies Meta<typeof SignupForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
