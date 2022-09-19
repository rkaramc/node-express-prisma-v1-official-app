import { PrismaClient } from '@prisma/client';

// Refer to https://github.com/prisma/docs/issues/2018#issuecomment-882117186
type CustomGlobal = typeof globalThis & {
  prisma?: PrismaClient;
};

declare const global: CustomGlobal;

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;
