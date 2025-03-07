module.exports = {
    preset: 'next/jest',
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest', // Transform JS/TS files with ts-jest
      '^.+\\.css$': 'jest-transform-stub', // Handle CSS imports
    }
  };
  