import type { Meta, StoryObj } from '@storybook/react';

const Typography = () => {
  const typographyList = [
    // Title
    {
      name: 'title-1-eb',
      text: '타이틀 1 Extra Bold',
      className: 'title-1-eb',
    },
    { name: 'title-1-b', text: '타이틀 1 Bold', className: 'title-1-b' },
    { name: 'title-2-b', text: '타이틀 2 Bold', className: 'title-2-b' },
    {
      name: 'title-3-eb',
      text: '타이틀 3 Extra Bold',
      className: 'title-3-eb',
    },
    { name: 'title-4-b', text: '타이틀 4 Bold', className: 'title-4-b' },
    { name: 'title-5-b', text: '타이틀 5 Bold', className: 'title-5-b' },
    { name: 'title-5-sb', text: '타이틀 5 Semi Bold', className: 'title-5-sb' },

    // Heading
    { name: 'heading-1-b', text: '헤딩 1 Bold', className: 'heading-1-b' },
    {
      name: 'heading-1-sb',
      text: '헤딩 1 Semi Bold',
      className: 'heading-1-sb',
    },

    // Body
    { name: 'body-1-r', text: '본문 1 Regular', className: 'body-1-r' },
    { name: 'body-1-m', text: '본문 1 Medium', className: 'body-1-m' },
    { name: 'body-2-r', text: '본문 2 Regular', className: 'body-2-r' },
    { name: 'body-2-sb', text: '본문 2 Semi Bold', className: 'body-2-sb' },
    { name: 'body-2-b', text: '본문 2 Bold', className: 'body-2-b' },
    { name: 'body-3-r', text: '본문 3 Regular', className: 'body-3-r' },
    { name: 'body-3-m', text: '본문 3 Medium', className: 'body-3-m' },
    { name: 'body-3-sb', text: '본문 3 Semi Bold', className: 'body-3-sb' },

    // Caption
    { name: 'caption-1-r', text: '캡션 1 Regular', className: 'caption-1-r' },
    {
      name: 'caption-1-sb',
      text: '캡션 1 Semi Bold',
      className: 'caption-1-sb',
    },
  ];

  return (
    <div className="p-4">
      <h1 className="mb-6 text-2xl font-bold">Typography System</h1>
      <div className="space-y-8">
        {typographyList.map((item) => (
          <div key={item.name} className="flex items-center gap-8">
            <div className="w-32 text-sm text-gray-500">{item.name}</div>
            <p className={item.className}>{item.text}</p>
            <div className="text-sm text-gray-500">
              {`${getComputedStyle(document.documentElement).getPropertyValue(
                `--${item.name}-size`,
              )} / 
                ${getComputedStyle(document.documentElement).getPropertyValue(
                  `--${item.name}-height`,
                )} / 
                ${getComputedStyle(document.documentElement).getPropertyValue(
                  `--${item.name}-weight`,
                )}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
