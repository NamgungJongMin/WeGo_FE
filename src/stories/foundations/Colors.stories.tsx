import type { Meta } from '@storybook/react';

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;

interface ColorBoxProps {
  colorClass: string;
  label: string;
  hexCode: string;
}

const ColorBox = ({ colorClass, label, hexCode }: ColorBoxProps) => (
  <div className="flex flex-col items-center gap-2">
    <div
      className={`h-20 w-20 rounded-lg ${colorClass} flex items-center justify-center border border-line-normal`}
    />
    <div className="text-center">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xs text-label-alternative">{hexCode}</p>
    </div>
  </div>
);

export const Primary = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-bold">Primary Colors</h2>
    <div className="flex gap-4">
      <ColorBox
        colorClass="bg-primary-normal"
        label="Primary Normal"
        hexCode="#2563EB"
      />
      <ColorBox
        colorClass="bg-primary-white"
        label="Primary White"
        hexCode="#FFFFFF"
      />
    </div>
  </div>
);

export const Labels = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-bold">Label Colors</h2>
    <div className="flex flex-wrap gap-4">
      <ColorBox
        colorClass="bg-label-normal"
        label="Label Normal"
        hexCode="#222222"
      />
      <ColorBox
        colorClass="bg-label-strong"
        label="Label Strong"
        hexCode="#000000"
      />
      <ColorBox
        colorClass="bg-label-neutral"
        label="Label Neutral"
        hexCode="#46474C"
      />
      <ColorBox
        colorClass="bg-label-alternative"
        label="Label Alternative"
        hexCode="#878A92"
      />
      <ColorBox
        colorClass="bg-label-assistive"
        label="Label Assistive"
        hexCode="#C2C4C7"
      />
      <ColorBox
        colorClass="bg-label-disable"
        label="Label Disable"
        hexCode="#DBDCDF"
      />
    </div>
  </div>
);

export const Backgrounds = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-bold">Background Colors</h2>
    <div className="flex gap-4">
      <ColorBox
        colorClass="bg-background-normal"
        label="Background Normal"
        hexCode="#FFFFFF"
      />
      <ColorBox
        colorClass="bg-background-alternative"
        label="Background Alternative"
        hexCode="#F7F7F8"
      />
    </div>
  </div>
);

export const Status = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-bold">Status Colors</h2>
    <div className="flex gap-4">
      <ColorBox
        colorClass="bg-status-success"
        label="Status Success"
        hexCode="#52BB65"
      />
      <ColorBox
        colorClass="bg-status-error"
        label="Status Error"
        hexCode="#EC524B"
      />
      <ColorBox
        colorClass="bg-status-infomative"
        label="Status Infomative"
        hexCode="#4A8AF8"
      />
    </div>
  </div>
);

export const PalletteColors = () => (
  <div className="space-y-8">
    <h2 className="text-xl font-bold">Slate</h2>
    <div className="flex gap-4">
      <ColorBox colorClass="bg-slate-50" label="slate 50" hexCode="#F8F9FC" />
      <ColorBox colorClass="bg-slate-100" label="slate 100" hexCode="#F1F5F9" />
      <ColorBox colorClass="bg-slate-200" label="slate 200" hexCode="#E2E8F0" />
      <ColorBox colorClass="bg-slate-300" label="slate 300" hexCode="#CBD5E1" />
      <ColorBox colorClass="bg-slate-400" label="slate 400" hexCode="#94A3B8" />
      <ColorBox colorClass="bg-slate-500" label="slate 500" hexCode="#64748B" />
      <ColorBox colorClass="bg-slate-600" label="slate 600" hexCode="#475569" />
      <ColorBox colorClass="bg-slate-700" label="slate 700" hexCode="#334155" />
      <ColorBox colorClass="bg-slate-800" label="slate 800" hexCode="#1E293B" />
      <ColorBox colorClass="bg-slate-900" label="slate 900" hexCode="#0F172A" />
      <ColorBox colorClass="bg-slate-950" label="slate 950" hexCode="#020617" />
    </div>

    <h2 className="text-xl font-bold">Gray</h2>
    <div className="flex gap-4">
      <ColorBox colorClass="bg-gray-50" label="gray 50" hexCode="#F9FAFB" />
      <ColorBox colorClass="bg-gray-100" label="gray 100" hexCode="#F3F4F6" />
      <ColorBox colorClass="bg-gray-200" label="gray 200" hexCode="#E5E7EB" />
      <ColorBox colorClass="bg-gray-300" label="gray 300" hexCode="#D1D5DB" />
      <ColorBox colorClass="bg-gray-400" label="gray 400" hexCode="#9CA3AF" />
      <ColorBox colorClass="bg-gray-500" label="gray 500" hexCode="#6B7280" />
      <ColorBox colorClass="bg-gray-600" label="gray 600" hexCode="#4B5565" />
      <ColorBox colorClass="bg-gray-700" label="gray 700" hexCode="#374151" />
      <ColorBox colorClass="bg-gray-800" label="gray 800" hexCode="#1F2937" />
      <ColorBox colorClass="bg-gray-900" label="gray 900" hexCode="#111827" />
      <ColorBox colorClass="bg-gray-950" label="gray 950" hexCode="#030712" />
    </div>

    <h2 className="mt-8 text-xl font-bold">Blue</h2>
    <div className="flex flex-wrap gap-4">
      <ColorBox colorClass="bg-blue-50" label="blue 50" hexCode="#EFF6FF" />
      <ColorBox colorClass="bg-blue-100" label="blue 100" hexCode="#DBEAFE" />
      <ColorBox colorClass="bg-blue-200" label="blue 200" hexCode="#BFDBFE" />
      <ColorBox colorClass="bg-blue-300" label="blue 300" hexCode="#93C5FD" />
      <ColorBox colorClass="bg-blue-400" label="blue 400" hexCode="#60A5FA" />
      <ColorBox colorClass="bg-blue-500" label="blue 500" hexCode="#3B82F6" />
      <ColorBox colorClass="bg-blue-600" label="blue 600" hexCode="#2563EB" />
      <ColorBox colorClass="bg-blue-700" label="blue 700" hexCode="#1D4ED8" />
      <ColorBox colorClass="bg-blue-800" label="blue 800" hexCode="#1E40AF" />
      <ColorBox colorClass="bg-blue-900" label="blue 900" hexCode="#1E3A8A" />
      <ColorBox colorClass="bg-blue-950" label="blue 950" hexCode="#172554" />
    </div>

    <h2 className="mt-8 text-xl font-bold">Red</h2>
    <div className="flex flex-wrap gap-4">
      <ColorBox colorClass="bg-red-50" label="red 50" hexCode="#FEF2F2" />
      <ColorBox colorClass="bg-red-100" label="red 100" hexCode="#FEE2E2" />
      <ColorBox colorClass="bg-red-200" label="red 200" hexCode="#FECACA" />
      <ColorBox colorClass="bg-red-300" label="red 300" hexCode="#FCA5A5" />
      <ColorBox colorClass="bg-red-400" label="red 400" hexCode="#F87171" />
      <ColorBox colorClass="bg-red-500" label="red 500" hexCode="#EF4444" />
      <ColorBox colorClass="bg-red-600" label="red 600" hexCode="#DC2626" />
      <ColorBox colorClass="bg-red-700" label="red 700" hexCode="#B91C1C" />
      <ColorBox colorClass="bg-red-800" label="red 800" hexCode="#991B1B" />
      <ColorBox colorClass="bg-red-900" label="red 900" hexCode="#7F1D1D" />
      <ColorBox colorClass="bg-red-950" label="red 950" hexCode="#450A0A" />
    </div>

    <h2 className="mt-8 text-xl font-bold">Yellow</h2>
    <div className="flex flex-wrap gap-4">
      <ColorBox colorClass="bg-yellow-50" label="yellow 50" hexCode="#FEFCE8" />
      <ColorBox
        colorClass="bg-yellow-100"
        label="yellow 100"
        hexCode="#FEF9C3"
      />
      <ColorBox
        colorClass="bg-yellow-200"
        label="yellow 200"
        hexCode="#FEF08A"
      />
      <ColorBox
        colorClass="bg-yellow-300"
        label="yellow 300"
        hexCode="#FDE047"
      />
      <ColorBox
        colorClass="bg-yellow-400"
        label="yellow 400"
        hexCode="#FACC15"
      />
      <ColorBox
        colorClass="bg-yellow-500"
        label="yellow 500"
        hexCode="#EAB308"
      />
      <ColorBox
        colorClass="bg-yellow-600"
        label="yellow 600"
        hexCode="#CA8A04"
      />
      <ColorBox
        colorClass="bg-yellow-700"
        label="yellow 700"
        hexCode="#A16207"
      />
      <ColorBox
        colorClass="bg-yellow-800"
        label="yellow 800"
        hexCode="#854D0E"
      />
      <ColorBox
        colorClass="bg-yellow-900"
        label="yellow 900"
        hexCode="#713F12"
      />
      <ColorBox
        colorClass="bg-yellow-950"
        label="yellow 950"
        hexCode="#422006"
      />
    </div>

    <h2 className="mt-8 text-xl font-bold">Green</h2>
    <div className="flex flex-wrap gap-4">
      <ColorBox colorClass="bg-green-50" label="green 50" hexCode="#F0FDF4" />
      <ColorBox colorClass="bg-green-100" label="green 100" hexCode="#DCFCE7" />
      <ColorBox colorClass="bg-green-200" label="green 200" hexCode="#BBF7D0" />
      <ColorBox colorClass="bg-green-300" label="green 300" hexCode="#86EFAC" />
      <ColorBox colorClass="bg-green-400" label="green 400" hexCode="#4ADE80" />
      <ColorBox colorClass="bg-green-500" label="green 500" hexCode="#22C55E" />
      <ColorBox colorClass="bg-green-600" label="green 600" hexCode="#16A34A" />
      <ColorBox colorClass="bg-green-700" label="green 700" hexCode="#15803D" />
      <ColorBox colorClass="bg-green-800" label="green 800" hexCode="#166534" />
      <ColorBox colorClass="bg-green-900" label="green 900" hexCode="#14532D" />
      <ColorBox colorClass="bg-green-950" label="green 950" hexCode="#052E16" />
    </div>
  </div>
);
