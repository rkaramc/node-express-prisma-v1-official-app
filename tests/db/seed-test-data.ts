import { PrismaClient } from '@prisma/client';
import { createTestUser } from './test-data';

const prisma = new PrismaClient();

async function main() {
  const realworld1 = await createTestUser(1);
  const realworld2 = await createTestUser(2);
  // eslint-disable-next-line no-console
  console.dir({ realworld1, realworld2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  /* exported e */
  .catch(async e => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
