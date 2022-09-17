import { createUser, getCurrentUser, login, updateUser } from '../../src/services/auth.service';
import { deleteData } from '../prisma-test-data';

describe('AuthService', () => {
  const newdata: any[] = [];
  beforeAll(() => {});
  afterAll(() => deleteData(newdata));
  describe('createUser', () => {
    test('should create new user ', async () => {
      // Given
      const user = {
        // id: 123,
        username: 'RealWorld',
        email: 'realworld@me',
        password: '1234',
      };

      // Then
      const u = await createUser(user);
      newdata.push(u);
      expect(u).toHaveProperty('token');
    });

    test('should throw an error when creating new user with empty username ', async () => {
      // Given
      const user = {
        id: 123,
        username: ' ',
        email: 'realworld@me',
        password: '1234',
      };

      // Then
      const error = String({ errors: { username: ["can't be blank"] } });
      await expect(createUser(user)).rejects.toThrow(error);
    });

    test('should throw an error when creating new user with empty email ', async () => {
      // Given
      const user = {
        id: 123,
        username: 'RealWorld',
        email: '  ',
        password: '1234',
      };

      // Then
      const error = String({ errors: { email: ["can't be blank"] } });
      await expect(createUser(user)).rejects.toThrow(error);
    });

    test('should throw an error when creating new user with empty password ', async () => {
      // Given
      const user = {
        id: 123,
        username: 'RealWorld',
        email: 'realworld@me',
        password: ' ',
      };

      // Then
      const error = String({ errors: { password: ["can't be blank"] } });
      await expect(createUser(user)).rejects.toThrow(error);
    });

    test('should throw an exception when creating a new user with already existing user on same username ', async () => {
      // Given
      const user = {
        id: 123,
        username: 'RealWorld',
        email: 'realworld@me',
        password: '1234',
      };

      // Then
      const error = { email: ['has already been taken'] }.toString();
      await expect(createUser(user)).rejects.toThrow(error);
    });
  });

  describe('login', () => {
    test('should return a token', async () => {
      // Given
      const user = {
        email: 'realworld@me',
        password: '1234',
      };

      // Then
      const loggedinUser = await login(user);
      expect(loggedinUser).toHaveProperty('token');
      expect(loggedinUser.token).not.toEqual('');
    });

    test('should throw an error when the email is empty', async () => {
      // Given
      const user = {
        email: ' ',
        password: '1234',
      };

      // Then
      const error = String({ errors: { email: ["can't be blank"] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test('should throw an error when the password is empty', async () => {
      // Given
      const user = {
        email: 'realworld@me',
        password: ' ',
      };

      // Then
      const error = String({ errors: { password: ["can't be blank"] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test('should throw an error when no user is found', async () => {
      // Given
      const user = {
        email: 'realworld@mex',
        password: '1234',
      };

      // Then
      const error = String({ errors: { 'email or password': ['is invalid'] } });
      await expect(login(user)).rejects.toThrow(error);
    });

    test('should throw an error if the password is wrong', async () => {
      // Given
      const user = {
        email: 'realworld@me',
        password: 'x1234',
      };

      // Then
      const error = String({ errors: { 'email or password': ['is invalid'] } });
      await expect(login(user)).rejects.toThrow(error);
    });
  });

  describe('getCurrentUser', () => {
    test('should return a token', async () => {
      // Given
      const username = 'RealWorld';

      // Then
      await expect(getCurrentUser(username)).resolves.toHaveProperty('token');
    });
  });

  describe('updateUser', () => {
    test('should return a token', async () => {
      // Given
      const user = {
        id: 123,
        username: 'RealWorld',
        email: 'realworld@me',
        password: '1234',
      };

      // Then
      await expect(updateUser(user, user.username)).resolves.toHaveProperty('token');
    });
  });
});
