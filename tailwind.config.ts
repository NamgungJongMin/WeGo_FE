import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.stories.{js,ts,jsx,tsx}',
    './src/stories/**/*.{js,ts,jsx,tsx}',
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
      boxShadow: {
        custom: '0px 0px 5px 0px rgba(0, 0, 0, 0.16)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        // title
        '.title-1-eb': {
          fontSize: '32px',
          lineHeight: '40px',
          fontWeight: '800',
        },
        '.title-1-b': {
          fontSize: '32px',
          lineHeight: '40px',
          fontWeight: '700',
        },
        '.title-2-b': {
          fontSize: '28px',
          lineHeight: '36px',
          fontWeight: '700',
        },
        '.title-3-eb': {
          fontSize: '24px',
          lineHeight: '32px',
          fontWeight: '800',
        },
        '.title-4-b': {
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: '700',
        },
        '.title-4-sb': {
          fontSize: '20px',
          lineHeight: '28px',
          fontWeight: '600',
        },
        '.title-5-b': {
          fontSize: '18px',
          lineHeight: '26px',
          fontWeight: '700',
        },
        '.title-5-sb': {
          fontSize: '18px',
          lineHeight: '26px',
          fontWeight: '600',
        },

        // heading
        '.heading-1-b': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '700',
        },
        '.heading-1-sb': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '600',
        },

        // body
        '.body-1-r': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '400',
        },
        '.body-1-m': {
          fontSize: '16px',
          lineHeight: '24px',
          fontWeight: '500',
        },
        '.body-2-r': {
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: '400',
        },
        '.body-2-m': {
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: '500',
        },
        '.body-2-sb': {
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.body-2-b': {
          fontSize: '14px',
          lineHeight: '22px',
          fontWeight: '700',
        },
        '.body-3-r': {
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: '400',
        },
        '.body-3-m': {
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: '500',
        },
        '.body-3-sb': {
          fontSize: '12px',
          lineHeight: '18px',
          fontWeight: '600',
        },

        // caption
        '.caption-1-r': {
          fontSize: '10px',
          lineHeight: '16px',
          fontWeight: '400',
        },
        '.caption-1-sb': {
          fontSize: '10px',
          lineHeight: '16px',
          fontWeight: '600',
        },
      });
    }),
  ],
} satisfies Config;
