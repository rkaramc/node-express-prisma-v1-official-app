import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export async function createTestUser(num: number) {
  const username = `realworld${num}`;
  const email = `realworld${num}@me`;
  const password = `realworld${num}`;
  const article1 = { title: `Article 1 by ${username}`, description: '', body: '' };
  const article2 = { title: `Article 2 by ${username}`, description: '', body: '' };

  return prisma.user.upsert({
    where: { username },
    update: {},
    create: {
      username,
      email,
      password,
      articles: {
        connectOrCreate: [
          {
            where: { slug: slugify(article1.title) },
            create: {
              ...article1,
              slug: slugify(article1.title),
            },
          },
          {
            where: { slug: slugify(article2.title) },
            create: {
              ...article2,
              slug: slugify(article2.title),
            },
          },
        ],
      },
    },
  });
}

export async function deleteUser(username: string) {
  return prisma.user.delete({ where: { username } });
}
