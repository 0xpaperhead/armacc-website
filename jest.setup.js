// jest.setup.js
import '@testing-library/jest-dom';

// Configure test environment for integration tests
global.console = {
  ...console,
  // Suppress console.log in tests unless needed for debugging
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  debug: jest.fn(),
};

// Set up environment variables for testing if needed
process.env.NODE_ENV = 'test';

// Configure timeouts for integration tests
jest.setTimeout(120000); // 2 minutes for real API calls 