import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  globalSetup: '<rootDir>/config/testSetup/globalSetup.ts',
  moduleNameMapper: {
    '@/(.*)': ['<rootDir>/app/$1', '<rootDir>/$1']
  },
  clearMocks: true,
  collectCoverageFrom: ['app/**/*.@(js|ts|ts)'],
  coveragePathIgnorePatterns: [
    '<rootDir>/app/common/types/index.ts'
  ],
  fakeTimers: { enableGlobally: false },
  testTimeout: 20000,
  maxWorkers: '50%'
}

export default config;
