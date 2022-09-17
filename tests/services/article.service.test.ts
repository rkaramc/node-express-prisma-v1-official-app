import {
  deleteComment,
  favoriteArticle,
  unfavoriteArticle,
} from '../../src/services/article.service';
import { apiTestData } from '../prisma-test-data';

describe('ArticleService', () => {
  describe('deleteComment', () => {
    test('should throw an error ', () => {
      // Given
      const id = 123;
      const username = 'RealWorld';

      // Then
      expect(deleteComment(id, username)).rejects.toThrowError();
    });
  });

  describe('favoriteArticle', () => {
    test.only('should return the favorited article', async () => {
      // Given
      const user = apiTestData![0];
      const article = user.articles[0];

      const { slug } = article;
      const { username } = user;

      // Then
      expect(favoriteArticle(slug, username)).resolves.toHaveProperty('favoritesCount');
    });

    test('should throw an error if no user is found', async () => {
      // Given
      const slug = 'how-to-train-your-dragon';
      const username = 'RealWorld';

      // Then
      await expect(favoriteArticle(slug, username)).rejects.toThrowError();
    });
  });
  describe('unfavoriteArticle', () => {
    test('should return the unfavorited article', async () => {
      const user = apiTestData![0];
      const article = user.articles[0];

      const { slug } = article;
      const { username } = user;

      // Then
      await expect(unfavoriteArticle(slug, username)).resolves.toHaveProperty('favoritesCount');
    });

    test('should throw an error if no user is found', async () => {
      // Given
      const user = apiTestData![0];
      const article = user.articles[0];

      const { slug } = article;
      const { username } = user;

      // Then
      await expect(unfavoriteArticle(slug, username)).rejects.toThrowError();
    });
  });
});
