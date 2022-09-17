import { followUser, getProfile, unfollowUser } from '../../src/services/profile.service';

describe('ProfileService', () => {
  describe('getProfile', () => {
    test('should return a following property', async () => {
      // Given
      const username = 'RealWorld';
      const usernameAuth = 'Gerome';

      // Then
      await expect(getProfile(username, usernameAuth)).resolves.toHaveProperty('following');
    });

    test('should throw an error if no user is found', async () => {
      // Given
      const username = 'RealWorld';
      const usernameAuth = 'Gerome';

      // Then
      await expect(getProfile(username, usernameAuth)).rejects.toThrowError();
    });
  });

  describe('followUser', () => {
    test('should return a following property', async () => {
      // Given
      const usernamePayload = 'realworld1';
      const usernameAuth = 'realworld2';

      // Then
      expect(followUser(usernamePayload, usernameAuth)).resolves.toHaveProperty('following');
    });

    test('should throw an error if no user is found', async () => {
      // Given
      const usernamePayload = 'realworldx';
      const usernameAuth = 'realworld2';

      // Then
      expect(followUser(usernamePayload, usernameAuth)).rejects.toThrowError();
    });
  });

  describe('unfollowUser', () => {
    test('should return a following property', async () => {
      // Given
      const usernamePayload = 'realworld1';
      const usernameAuth = 'realworld2';

      // Then
      expect(unfollowUser(usernamePayload, usernameAuth)).resolves.toHaveProperty('following');
    });

    test('should throw an error if no user is found', async () => {
      // Given
      const usernamePayload = 'realworldx';
      const usernameAuth = 'realworld2';

      // Then
      expect(unfollowUser(usernamePayload, usernameAuth)).rejects.toThrowError();
    });
  });
});
