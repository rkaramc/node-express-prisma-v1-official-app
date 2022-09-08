import * as client from '../prisma/prisma-client';
import { getArticles, getFeed } from '../src/services/article.service';
import { followUser } from '../src/services/profile.service';
import getTags from '../src/services/tag.service';

describe('Exercise Conduit API', () => {
  test('env config is ok', () => {
    expect(process.env.DATABASE_URL).toBeTruthy();
  });

  test('x/api/tags', async () => {
    const tags = await getTags('celeb_rkaramc');
    expect(tags).toBe([]);
  });

  test('/api/tags', async () => {
    client.default.tag
      .groupBy({
        // where: {
        //   articles: {
        //     some: {
        //       author: {
        //         OR: queries,
        //       },
        //     },
        //   },
        // },
        by: ['name'],
        orderBy: {
          _count: {
            name: 'desc',
          },
        },
        take: 10,
      })
      .then(tags => {
        expect(tags).toBe([]);
      });
  });

  test('/api/articles', async () => {
    const articles = await getArticles({}, undefined);
    expect(articles.articlesCount).toBe(2);
  });

  test('/api/articles?tag={tag}', async () => {
    const articlesByTag = await getArticles({ tag: 'dragons' }, undefined);
    expect(articlesByTag.articlesCount).toBe(1);
  });

  test('/api/articles?author=xxx', async () => {
    const articlesByAuthor = await getArticles({ author: 'celeb_rkaramc' }, undefined);
    expect(articlesByAuthor.articlesCount).toBe(1);
  });

  test('/api/articles?favorited=xxx', async () => {
    const articlesByFavoritedBy = await getArticles({ favorited: 'rkaramc' }, undefined);
    expect(articlesByFavoritedBy.articlesCount).toBe(1);
  });

  test('/api/feed', async () => {
    await followUser('celeb_rkaramc', 'rkaramc');
    const feed = await getFeed(0, 10, 'rkaramc');
    expect(feed.articlesCount).toBe(1);
    expect(feed.articles[0].author.username).toBe('celeb_rkaramc');
  });
});
