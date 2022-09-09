import { getArticles, getFeed } from '../src/services/article.service';
import { findUserIdByUsername } from '../src/services/auth.service';
import getTags from '../src/services/tag.service';

/* eslint no-console: "off" */
async function exerciseServices() {
  const tags = await getTags('celeb_rkaramc');
  console.log('\ntags:');
  console.dir(tags);

  const articles = await getArticles({}, undefined);
  console.log('\narticles:');
  console.dir(articles, { depth: 1 });

  const articlesByTag = await getArticles({ tag: 'dragons' }, undefined);
  console.log('\narticles by tag:');
  console.dir(articlesByTag, { depth: 1 });

  const articlesByAuthor = await getArticles({ author: 'celeb_rkaramc' }, undefined);
  console.log('\narticles by author:');
  console.dir(articlesByAuthor, { depth: 1 });

  const articlesByFavoritedBy = await getArticles({ favorited: 'rkaramc' }, undefined);
  console.log('\narticles by favorited by:');
  console.dir(articlesByFavoritedBy, { depth: 1 });

  const user = await findUserIdByUsername('rkaramc');
  console.log('\nuser:');
  console.dir(user, { depth: 1 });

  const feed = await getFeed(0, 10, 'rkaramc');
  console.log('\nfeed:');
  console.dir(feed, { depth: 1 });
  console.dir(feed.articles[0]?.author.username, { depth: 2 });
}

exerciseServices();
