import { getArticles, getFeed } from '../src/services/article.service';
import { followUser } from '../src/services/profile.service';
import getTags from '../src/services/tag.service';

jest.retryTimes(0);

describe('Exercise Conduit API', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test('env config is ok', () => {
    expect(process.env.DATABASE_URL).toContain(
      'postgresql://realworld:realworld@localhost:5433/tests',
    );
    expect(process.env.NODE_ENV).toBe('test');
  });

  test('/api/tags with auth', async () => {
    const tags = await getTags('realworld1');
    expect(tags).toBeTruthy();
    expect(tags).toStrictEqual(['welcome', 'realworld2', 'realworld1', 'article']);
  });

  test('/api/tags without auth', async () => {
    const tags = await getTags();
    expect(tags).toBeTruthy();
    expect(tags).toStrictEqual(['welcome', 'realworld2', 'realworld1', 'article']);
  });

  test('/api/articles', async () => {
    const articles = await getArticles({}, undefined);
    expect(articles.articlesCount).toBe(4);
  });

  test('/api/articles?tag={tag}', async () => {
    const articlesByTag = await getArticles({ tag: 'realworld1' }, undefined);
    expect(articlesByTag.articlesCount).toBe(2);
  });

  test('/api/articles?author=xxx', async () => {
    const articlesByAuthor = await getArticles({ author: 'realworld1' }, undefined);
    expect(articlesByAuthor.articlesCount).toBe(2);
  });

  test('/api/articles?favorited=xxx', async () => {
    const articlesByFavoritedBy = await getArticles({ favorited: 'realworld1' }, undefined);
    expect(articlesByFavoritedBy.articlesCount).toBe(0);
  });

  test('/api/feed', async () => {
    await followUser('realworld1', 'realworld2');
    const feed = await getFeed(0, 10, 'realworld2');
    expect(feed.articlesCount).toBe(0);
    expect(feed.articles[0].author.username).toBe('realworld1');
  });
});
