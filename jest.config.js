module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.svg$': '<rootDir>/__mocks__/svgrMock.js',
    '^@src(.*)$': '<rootDir>/src$1',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};
