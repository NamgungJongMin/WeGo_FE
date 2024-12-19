import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import 'whatwg-fetch';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jest-fixed-jsdom',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper: {
    '^.+\\.(svg)$': '<rootDir>/src/mocks/librarymocks/svg.js',

    '^swiper/react$': '<rootDir>/src/mocks/librarymocks/swiperMock.jsx',
    '^swiper$': '<rootDir>/src/mocks/librarymocks/swiperMock.jsx',
    '^swiper/css$': '<rootDir>/src/mocks/librarymocks/styleMock.js',
    '^swiper/modules$': '<rootDir>/src/mocks/librarymocks/swiperMock.jsx',
    '^swiper/css/pagination$': '<rootDir>/src/mocks/librarymocks/styleMock.js',

    '^@headlessui/react$':
      '<rootDir>/src/mocks/librarymocks/headlessUIMock.jsx',

    '@/utils/compressImage$':
      '<rootDir>/src/mocks/librarymocks/compressImage.ts',
  },

  setupFilesAfterEnv: ['<rootDir>/src/mocks/zustand.ts'],
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
