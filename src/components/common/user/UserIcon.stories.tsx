import type { Meta, StoryObj } from '@storybook/react';
import UserIcon from './UserIcon';

const meta: Meta<typeof UserIcon> = {
  title: 'Components/UserIcon',
  component: UserIcon,
  tags: ['autodocs'],
} satisfies Meta<typeof UserIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Combined: Story = {
  render: () => (
    <div className="divide-y">
      <div className="flex items-center gap-8 pt-10">
        <div className="flex flex-col items-center">
          <UserIcon size="sm" profileImage="" nickname="작은 아이콘" />
          <h4 className="text-lg font-bold">Small</h4>
        </div>
        <div className="flex flex-col items-center">
          <UserIcon size="default" profileImage="" nickname="유저 닉네임" />
          <h4 className="text-lg font-bold">Default</h4>
        </div>
        <div className="flex flex-col items-center">
          <UserIcon size="lg" profileImage="" nickname="큰 아이콘" />
          <h4 className="text-lg font-bold">large</h4>
        </div>
      </div>

      <div className="flex items-center gap-8 pt-10">
        <div className="flex flex-col items-center">
          <UserIcon size="sm" profileImage="user.jpg" nickname="작은 아이콘" />
          <h4 className="text-lg font-bold">Small</h4>
        </div>
        <div className="flex flex-col items-center">
          <UserIcon
            size="default"
            profileImage="user.jpg"
            nickname="유저 닉네임"
          />
          <h4 className="text-lg font-bold">Default</h4>
        </div>
        <div className="flex flex-col items-center">
          <UserIcon size="lg" profileImage="user.jpg" nickname="큰 아이콘" />
          <h4 className="text-lg font-bold">large</h4>
        </div>
      </div>
    </div>
  ),
};
