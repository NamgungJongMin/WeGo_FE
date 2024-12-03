import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          normal: '#2563EB',
          white: '#FFFFFF',
        },

        label: {
          normal: '#222222',
          strong: '#000000',
          neutral: '#46474C',
          alternative: '#878A92',
          assistive: '#C2C4C7',
          disable: '#DBDCDF',
        },

        background: {
          normal: '#FFFFFF',
          alternative: '#F7F7F8',
        },

        interaction: {
          inactive: '#989BA1',
          disable: '#F7F7F8',
        },

        line: {
          normal: '#E0E0E2',
          strong: '#222222',
          neutral: '#E8E8EA',
          alternative: '#F4F4F5',
        },

        status: {
          success: '#52BB65',
          error: '#EC524B',
          infomative: '#4A8AF8',
        },
      },
      fontFamily: {
        pretendard: ['var(--font-pretendard)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
