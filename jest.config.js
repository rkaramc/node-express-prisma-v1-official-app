module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/prisma-mock.ts'],
};
process.env = Object.assign(process.env, {
  DATABASE_URL: 'postgresql://realworld@localhost:5432/realworld?schema=public',
});
