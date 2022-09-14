module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/prisma-test-data.ts', '<rootDir>/tests/prisma-mock.ts'],
};
