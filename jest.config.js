const { env } = require('process');

module.exports = {
  // bail: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testTimeout: 25000,
  setupFilesAfterEnv: ['<rootDir>/tests/prisma-test-data.ts'],
};
process.env = Object.assign(process.env, {
  DATABASE_URL: env['DATABASE_URL'],
});
