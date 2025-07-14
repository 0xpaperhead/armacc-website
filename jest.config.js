/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>'],
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/*.(test|spec).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!jest.config.js',
    '!next.config.js',
  ],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 120000, // 2 minutes for integration tests with real APIs
  // Configure for integration tests with real APIs
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  // Allow longer timeouts for real API calls
  slowTestThreshold: 30,
  // Handle fetch for Node.js environment
  setupFiles: ['<rootDir>/jest.polyfills.js'],
};

module.exports = config; 